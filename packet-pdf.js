/**
 * Client-side prefilled PDF packet (jsPDF).
 * Generates readable filled documents — not pixel-perfect official Adobe form fields yet,
 * but includes all form answers + full financial legal text for center/print use.
 */
(function () {
  function line(doc, label, value, x, y, maxW) {
    const v = value == null || value === "" ? "—" : String(value);
    const text = `${label}: ${v}`;
    const lines = doc.splitTextToSize(text, maxW);
    doc.text(lines, x, y);
    return y + lines.length * 5 + 2;
  }

  function sectionTitle(doc, title, y) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, 14, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    return y + 8;
  }

  function ensureSpace(doc, y, need) {
    if (y + need > 280) {
      doc.addPage();
      return 16;
    }
    return y;
  }

  function getPdf() {
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) throw new Error("jsPDF not loaded");
    return new jsPDF({ unit: "mm", format: "letter" });
  }

  function header(doc, title, loc) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Angel Learning Center", 14, 16);
    doc.setFontSize(11);
    doc.text(title, 14, 23);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const meta = [
      loc?.legalName || loc?.name || "",
      loc?.address || "",
      loc?.phone || "",
      loc?.inbox ? `Packet To: ${loc.inbox}` : "",
    ]
      .filter(Boolean)
      .join(" · ");
    const lines = doc.splitTextToSize(meta, 180);
    doc.text(lines, 14, 29);
    return 29 + lines.length * 4 + 6;
  }

  function footerPage(doc) {
    const n = doc.getNumberOfPages();
    for (let i = 1; i <= n; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        `Generated ${new Date().toLocaleString()} · Prefilled from online enrollment · Page ${i} of ${n}`,
        14,
        272
      );
      doc.setTextColor(0);
    }
  }

  function enrollmentPdf(data, loc) {
    const en = data.enrollment || {};
    const doc = getPdf();
    let y = header(doc, "Enrollment Form (prefilled)", loc);
    y = sectionTitle(doc, "Child", y);
    y = line(doc, "Name", [en.childFirst, en.childMI, en.childLast].filter(Boolean).join(" "), 14, y, 180);
    y = line(doc, "Preferred", en.childPreferred, 14, y, 180);
    y = line(doc, "DOB / Gender / Grade", `${en.childDob || "—"} / ${en.childGender || "—"} / ${en.childGrade || "—"}`, 14, y, 180);
    y = line(doc, "Start date", en.startDate, 14, y, 180);
    y = line(doc, "Address", `${en.childAddress || ""}, ${en.childCity || ""} ${en.childZip || ""}`, 14, y, 180);
    y = line(doc, "Programs", Array.isArray(en.programs) ? en.programs.join(", ") : en.programs, 14, y, 180);
    y = line(doc, "Medical notes", en.medicalNotes, 14, y, 180);
    y = ensureSpace(doc, y, 30);
    y = sectionTitle(doc, "Mother / guardian", y);
    y = line(doc, "Name", [en.momFirst, en.momMI, en.momLast].filter(Boolean).join(" "), 14, y, 180);
    y = line(doc, "Cell / Email", `${en.momCell || "—"} / ${en.momEmail || "—"}`, 14, y, 180);
    y = line(doc, "Employer / Occupation", `${en.momEmployer || "—"} / ${en.momOccupation || "—"}`, 14, y, 180);
    y = line(doc, "Custodial", en.momCustodial ? "Yes" : "No", 14, y, 180);
    y = ensureSpace(doc, y, 30);
    y = sectionTitle(doc, "Father / guardian", y);
    y = line(doc, "Name", [en.dadFirst, en.dadMI, en.dadLast].filter(Boolean).join(" "), 14, y, 180);
    y = line(doc, "Cell / Email", `${en.dadCell || "—"} / ${en.dadEmail || "—"}`, 14, y, 180);
    y = line(doc, "Employer / Occupation", `${en.dadEmployer || "—"} / ${en.dadOccupation || "—"}`, 14, y, 180);
    y = line(doc, "Custodial", en.dadCustodial ? "Yes" : "No", 14, y, 180);
    y = ensureSpace(doc, y, 25);
    y = sectionTitle(doc, "Emergency contact 1", y);
    y = line(doc, "Name / Relationship", `${en.ec1Name || "—"} / ${en.ec1Rel || "—"}`, 14, y, 180);
    y = line(doc, "Phones", `H ${en.ec1Home || "—"}  W ${en.ec1Work || "—"}  C ${en.ec1Cell || "—"}`, 14, y, 180);
    y = ensureSpace(doc, y, 25);
    y = sectionTitle(doc, "Emergency contact 2", y);
    y = line(doc, "Name / Relationship", `${en.ec2Name || "—"} / ${en.ec2Rel || "—"}`, 14, y, 180);
    y = line(doc, "Phones", `H ${en.ec2Home || "—"}  W ${en.ec2Work || "—"}  C ${en.ec2Cell || "—"}`, 14, y, 180);
    y = ensureSpace(doc, y, 25);
    y = sectionTitle(doc, "Care schedule & meals", y);
    y = line(doc, "Hours", `${en.careFrom || "—"} – ${en.careTo || "—"}`, 14, y, 180);
    y = line(
      doc,
      "Meals",
      [en.mealBreakfast && "Breakfast", en.mealLunch && "Lunch", en.mealSnack && "PM Snack"].filter(Boolean).join(", ") || "—",
      14,
      y,
      180
    );
    y = line(doc, "ALC location id", en.enLocation || loc?.id, 14, y, 180);
    footerPage(doc);
    return doc;
  }

  function financialPdf(data, loc) {
    const fin = data.financial || {};
    const doc = getPdf();
    let y = header(doc, "Financial Responsibility & Tuition Agreement (prefilled)", loc);
    y = sectionTitle(doc, "Responsible party", y);
    y = line(doc, "Full legal name", fin.rpName, 14, y, 180);
    y = line(doc, "DOB / DL / State", `${fin.rpDob || "—"} / ${fin.rpDl || "—"} / ${fin.rpState || "—"}`, 14, y, 180);
    y = line(doc, "Address", fin.rpAddress, 14, y, 180);
    y = line(doc, "City/State/ZIP", fin.rpCityStateZip, 14, y, 180);
    y = line(doc, "Phone / Email", `${fin.rpPhone || "—"} / ${fin.rpEmail || "—"}`, 14, y, 180);
    y = line(doc, "Employer", fin.rpEmployer, 14, y, 180);
    if (fin.rp2Name) {
      y = ensureSpace(doc, y, 30);
      y = sectionTitle(doc, "Second responsible party (optional)", y);
      y = line(doc, "Full legal name", fin.rp2Name, 14, y, 180);
      y = line(doc, "DOB / DL / State", `${fin.rp2Dob || "—"} / ${fin.rp2Dl || "—"} / ${fin.rp2State || "—"}`, 14, y, 180);
      y = line(doc, "Address", fin.rp2Address, 14, y, 180);
      y = line(doc, "City/State/ZIP", fin.rp2CityStateZip, 14, y, 180);
      y = line(doc, "Phone / Email", `${fin.rp2Phone || "—"} / ${fin.rp2Email || "—"}`, 14, y, 180);
      y = line(doc, "Employer", fin.rp2Employer, 14, y, 180);
    }
    y = line(doc, "Child / Enroll date", `${fin.finChildName || "—"} / ${fin.finEnrollDate || "—"}`, 14, y, 180);
    y = ensureSpace(doc, y, 20);
    y = sectionTitle(doc, "Agreement (full text)", y);
    doc.setFontSize(9);
    const legal = [
      "Financial responsibility. I acknowledge that I am the individual legally and financially responsible for payment of all tuition, registration fees, late fees, returned payment fees, activity fees, and any other charges incurred for my child's enrollment at Angel Learning Center. I understand that tuition is due regardless of my child's attendance unless otherwise provided in the Center's written policies.",
      "Failure to Pay. Failure to pay may result in Angel Learning Center's right to: (1) Assess applicable late fees and returned payment fees in accordance with Center policy; (2) Suspend or terminate childcare services until the account is brought current; (3) Refuse future enrollment while any balance remains unpaid; (4) Refer the account to a collection agency; (5) File a civil action in a Georgia court, including Magistrate (Small Claims) Court where permitted by law, to recover any unpaid balance; (6) Seek recovery of court filing fees, service fees, post-judgment interest, and any other amounts recoverable under Georgia law.",
      "Contact information. I agree to keep my mailing address, email address, telephone number, and employer information current and notify the Center within five (5) business days of any changes.",
      "Acknowledgment. I certify that the information provided above is true and correct. I have read this Agreement, understand my financial obligations, and voluntarily agree to be personally responsible for all amounts owed to Angel Learning Center. I understand that this Agreement is a legally binding contract and may be used as evidence in any collection or legal proceeding arising from unpaid tuition or fees.",
    ];
    legal.forEach((para) => {
      y = ensureSpace(doc, y, 28);
      const lines = doc.splitTextToSize(para, 180);
      doc.text(lines, 14, y);
      y += lines.length * 4.2 + 4;
    });
    doc.setFontSize(10);
    y = ensureSpace(doc, y, 30);
    y = sectionTitle(doc, "Signature", y);
    y = line(doc, "Agreed (checkbox)", fin.finAgree ? "Yes" : "No", 14, y, 180);
    y = line(doc, "Printed name", fin.finPrintName, 14, y, 180);
    y = line(doc, "E-signature", fin.finSignature, 14, y, 180);
    y = line(doc, "Date", fin.finSignDate, 14, y, 180);
    footerPage(doc);
    return doc;
  }

  function emergencyPdf(data, loc) {
    const em = data.emergency || {};
    const doc = getPdf();
    let y = header(doc, "Vehicle Emergency Medical Information (prefilled)", loc);
    y = line(doc, "Child", em.emChild, 14, y, 180);
    y = line(doc, "DOB", em.emDob, 14, y, 180);
    y = line(doc, "Address", em.emAddress, 14, y, 180);
    y = line(doc, "Father / Mother", `${em.emFather || "—"} / ${em.emMother || "—"}`, 14, y, 180);
    y = line(doc, "Father cell", em.emFatherCell || em.emFatherPhones, 14, y, 180);
    y = line(doc, "Mother cell", em.emMotherCell || em.emMotherPhones, 14, y, 180);
    y = line(doc, "Alt contact", `${em.emAltName || "—"} ${em.emAltPhone || ""}`, 14, y, 180);
    y = line(doc, "Doctor", `${em.emDoctor || "—"} ${em.emDoctorPhone || ""}`, 14, y, 180);
    y = line(doc, "Facility", em.emFacility, 14, y, 180);
    y = line(doc, "Allergies", em.emAllergies, 14, y, 180);
    y = line(doc, "Meds", em.emMeds, 14, y, 180);
    y = line(doc, "Special", em.emSpecial, 14, y, 180);
    y = line(doc, "Auth child / Signature / Date", `${em.emAuthChild || "—"} / ${em.emSignature || "—"} / ${em.emDate || "—"}`, 14, y, 180);
    footerPage(doc);
    return doc;
  }

  function transportPdf(data, loc) {
    const tr = data.transport || {};
    if (!tr.trChild && !tr.trSignature) return null;
    const doc = getPdf();
    let y = header(doc, "Transportation Agreement (prefilled)", loc);
    y = line(doc, "Child", tr.trChild, 14, y, 180);
    y = line(doc, "Location", tr.trLocation, 14, y, 180);
    y = line(doc, "School choice", tr.trSchoolChoice, 14, y, 180);
    y = line(doc, "School address", tr.trSchoolAddress, 14, y, 180);
    y = line(doc, "Direction / When", `${tr.trDirection || "—"} / ${tr.trWhen || "—"}`, 14, y, 180);
    y = line(doc, "Pickup / Arrive", `${tr.trPickupTime || "—"} / ${tr.trArriveTime || "—"}`, 14, y, 180);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
      .filter((_, i) => tr[["trMon", "trTue", "trWed", "trThu", "trFri"][i]])
      .join(", ");
    y = line(doc, "Days", days || "—", 14, y, 180);
    y = line(doc, "Miles", tr.trMiles, 14, y, 180);
    y = line(doc, "Staff authorized", tr.trStaffAuth ? "Yes" : "No", 14, y, 180);
    y = line(doc, "Signature / Date", `${tr.trSignature || "—"} / ${tr.trDate || "—"}`, 14, y, 180);
    footerPage(doc);
    return doc;
  }

  function handbookPdf(data, loc) {
    const hb = data.handbook || {};
    const doc = getPdf();
    let y = header(doc, "Parent Handbook Acknowledgment 2026 (prefilled)", loc);
    const ack =
      "I acknowledge that I have received and read the Angel Learning Center Parent Handbook. I understand the policies, procedures, and expectations contained within and agree to abide by them while my child is enrolled at Angel Learning Center. I understand that policies may be updated as needed, and I will be notified of any changes.";
    const lines = doc.splitTextToSize(ack, 180);
    doc.text(lines, 14, y);
    y += lines.length * 5 + 8;
    y = line(doc, "Agreed", hb.hbAgree ? "Yes" : "No", 14, y, 180);
    y = line(doc, "Child", hb.hbChild, 14, y, 180);
    y = line(doc, "Printed / Signature / Date", `${hb.hbPrint || "—"} / ${hb.hbSignature || "—"} / ${hb.hbDate || "—"}`, 14, y, 180);
    y = line(doc, "Handbook file", "Parent-Handbook-2026.pdf (linked online)", 14, y, 180);
    footerPage(doc);
    return doc;
  }

  function iesPdf(data, loc) {
    const ies = data.ies || {};
    const doc = getPdf();
    let y = header(doc, "Meal Benefit Form — acknowledgment (prefilled)", loc);
    y = line(doc, "Acknowledged download/complete & upload", ies.iesDownloadAck ? "Yes" : "No", 14, y, 180);
    y = line(doc, "Printed name / Date", `${ies.iesAckPrint || "—"} / ${ies.iesAckDate || "—"}`, 14, y, 180);
    y = ensureSpace(doc, y, 20);
    const note = doc.splitTextToSize(
      "Parent completes the official Georgia CACFP Income Eligibility Statement offline, then uploads the completed form in Documents.",
      180
    );
    doc.text(note, 14, y);
    footerPage(doc);
    return doc;
  }

  function blankIesPdf() {
    const doc = getPdf();
    let y = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("CACFP Meal Benefit Income Eligibility Statement", 14, y);
    y += 8;
    doc.setFontSize(11);
    doc.text("Blank worksheet for print / offline completion", 14, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const instructions = [
      "Angel Learning Center requires the official Georgia Bright from the Start / USDA CACFP Meal Benefit Income Eligibility Statement.",
      "1) Print this cover sheet and complete the official IES form fields on paper (or use the DECAL fillable PDF if available).",
      "2) Include infant affidavit pages when enrolling Little Angels (6 weeks–12 months).",
      "3) Upload the completed form in the online Documents step (Completed Meal Benefit / IES).",
      "Official forms: https://www.decal.ga.gov/BftS/FormList.aspx?cat=CACFP",
      "",
      "Child name: ________________________________  DOB: ______________",
      "Parent / guardian: _______________________________________________",
      "SNAP / TANF / FDPIR case # (if any): _____________________________",
      "Household size: ______   Adult signer last 4 SSN: ______",
      "Care hours: ________ to ________   Days: M T W Th F",
      "Meals: Breakfast ___  Lunch ___  PM Snack ___",
      "Signature: _______________________________  Date: ______________",
    ];
    instructions.forEach((p) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }
      const lines = doc.splitTextToSize(p, 180);
      doc.text(lines, 14, y);
      y += lines.length * 5 + 3;
    });
    return doc;
  }

  function photoPdf(data, loc) {
    const ph = data.photo || {};
    const doc = getPdf();
    let y = header(doc, "Photo / Video Permission (prefilled)", loc);
    y = line(doc, "Child", ph.photoChild, 14, y, 180);
    y = line(
      doc,
      "Permissions",
      [
        ph.photoClassroom && "Classroom",
        ph.photoFamily && "Family communications",
        ph.photoWeb && "Website/social",
        ph.photoMarketing && "Marketing",
        ph.photoNone && "NO permission",
      ]
        .filter(Boolean)
        .join(", ") || "—",
      14,
      y,
      180
    );
    y = line(doc, "Agreed", ph.photoAgree ? "Yes" : "No", 14, y, 180);
    y = line(doc, "Printed / Signature / Date", `${ph.photoPrint || "—"} / ${ph.photoSignature || "—"} / ${ph.photoDate || "—"}`, 14, y, 180);
    footerPage(doc);
    return doc;
  }

  function safeName(s) {
    return String(s || "child")
      .replace(/[^\w\-]+/g, "_")
      .replace(/_+/g, "_")
      .slice(0, 40);
  }

  window.ALC_generateBlankIesPdf = function () {
    blankIesPdf().save(`ALC_Blank_IES_${new Date().toISOString().slice(0, 10)}.pdf`);
    return true;
  };

  /**
   * @param {object} opts
   * @param {object} opts.state
   * @param {object} opts.location
   * @param {"packet"|"enrollment"|"financial"} opts.which
   */
  window.ALC_generatePdfs = function generatePdfs(opts) {
    const data = opts.state?.data || {};
    const loc = opts.location || {};
    const which = opts.which || "packet";
    const en = data.enrollment || {};
    const base = `ALC_${safeName(en.childLast || loc.id)}_${safeName(en.childFirst)}_${new Date().toISOString().slice(0, 10)}`;

    const jobs = [];
    if (which === "enrollment" || which === "packet") {
      jobs.push({ doc: () => enrollmentPdf(data, loc), name: `${base}_01_Enrollment.pdf` });
    }
    if (which === "financial" || which === "packet") {
      jobs.push({ doc: () => financialPdf(data, loc), name: `${base}_02_Financial.pdf` });
    }
    if (which === "packet") {
      jobs.push({ doc: () => transportPdf(data, loc), name: `${base}_03_Transport.pdf` });
      jobs.push({ doc: () => emergencyPdf(data, loc), name: `${base}_04_Emergency.pdf` });
      jobs.push({ doc: () => iesPdf(data, loc), name: `${base}_05_IES_Ack.pdf` });
      jobs.push({ doc: () => handbookPdf(data, loc), name: `${base}_06_Handbook_Ack.pdf` });
      jobs.push({ doc: () => photoPdf(data, loc), name: `${base}_07_Photo_Permission.pdf` });
    }

    let saved = 0;
    jobs.forEach((job, idx) => {
      setTimeout(() => {
        try {
          const d = job.doc();
          if (d) {
            d.save(job.name);
            saved += 1;
          }
        } catch (e) {
          console.error("PDF fail", job.name, e);
        }
      }, idx * 700);
    });
    return { queued: jobs.length };
  };
})();
