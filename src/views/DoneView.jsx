import React from "react";
import ALC_CONFIG from "../config";
import FormList from "../components/FormList";
import { downloadPdfBundle } from "../pdf/pdfGenerator";
import { useEnrollment } from "../context/EnrollmentContext";

export function DoneView() {
  const { state, activeLocation, addSibling, showToast, t, navigateTo } = useEnrollment();

  const handleDownloadPdfs = async (which) => {
    try {
      await downloadPdfBundle({ state, location: activeLocation, which });
      showToast(
        which === "financial"
          ? "Financial PDF downloading…"
          : which === "enrollment"
            ? "Enrollment PDF downloading…"
            : "Full packet PDF downloading…"
      );
    } catch (err) {
      console.error(err);
      showToast("PDF generation failed — see console");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const inbox = activeLocation?.inbox || "savannah@angellearningcenter.com";
  const cc = (ALC_CONFIG.email?.cc || []).join(", ");
  const subject = ALC_CONFIG.email?.subject || "Enrollment Packet for Angel Learning Center";

  return (
    <section id="view-done" className="view is-active">
      <div className="done-panel">
        <div className="success-banner">
          <div>
            <strong data-i18n="doneStrong">{t("doneStrong") || "Packet ready for the center"}</strong>
            <span data-i18n="doneText">
              {t("doneText") ||
                "No login. Prefill packet emails the center only (no parent copy). DocuSign seals signatures when the account is connected."}
            </span>
          </div>
        </div>

        <p className="eyebrow" data-i18n="doneEyebrow">
          {t("doneEyebrow") || "What happens next"}
        </p>
        <h2 data-i18n="doneTitle">{t("doneTitle") || "You’re all set"}</h2>
        <p className="section-lead" data-i18n="doneLead">
          {t("doneLead") ||
            "Fill online once → completed packet goes to the front desk inbox for your location. No parent account."}
        </p>

        <div className="mail-summary" id="mailSummary">
          <div className="mail-row">
            <small data-i18n="emailToCenter">{t("emailToCenter") || "SENT TO CENTER"}</small>
            <strong id="doneInbox">{inbox}</strong>
          </div>
          <div className="mail-row">
            <small>CC (owner — confirm address)</small>
            <strong id="doneCc">{cc}</strong>
          </div>
          <div className="mail-row">
            <small>SUBJECT</small>
            <strong id="doneSubject">{subject}</strong>
          </div>
          <div className="mail-row">
            <small data-i18n="emailAttachments">{t("emailAttachments") || "ATTACHMENTS"}</small>
            <strong id="doneAttachNote">
              Download one combined prefilled packet PDF below (center email wiring is next — not auto-sent yet)
            </strong>
          </div>
        </div>

        <div className="pdf-actions hero-cta" style={{ marginBottom: "1.25rem" }}>
          <button
            type="button"
            className="btn btn-primary"
            id="downloadPacketPdfs"
            onClick={() => handleDownloadPdfs("packet")}
          >
            Download full packet PDF
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            id="downloadEnrollmentPdf"
            onClick={() => handleDownloadPdfs("enrollment")}
          >
            Enrollment PDF
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            id="downloadFinancialPdf"
            onClick={() => handleDownloadPdfs("financial")}
          >
            Financial PDF (full legal text)
          </button>
        </div>

        <p className="hint" id="pdfHint">
          PDFs are generated in your browser from the filled answers. The full packet includes your uploaded Meal Benefit (IES) form at the end when that file was uploaded in Documents. Re-upload the IES if you added it before this update.
        </p>

        <FormList asLink={false} compact={true} id="doneList" />

        <div className="hero-cta">
          <a
            href="#packet"
            className="btn btn-secondary"
            data-nav="packet"
            data-i18n="reviewChecklist"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("packet");
            }}
          >
            {t("reviewChecklist") || "Review checklist"}
          </a>
          <button
            type="button"
            className="btn btn-secondary"
            id="printDemo"
            data-i18n="printPreview"
            onClick={handlePrint}
          >
            {t("printPreview") || "Print webpage"}
          </button>
          <button
            type="button"
            className="btn btn-green"
            id="addSibling"
            onClick={addSibling}
          >
            Add sibling to packet
          </button>
        </div>
      </div>
    </section>
  );
}

export default DoneView;
