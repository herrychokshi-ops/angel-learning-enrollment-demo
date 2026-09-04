import ALC_CONFIG from "../config";
import { needsEmergencyMedicalForm, normalizePrograms } from "../utils/programSelection";

function isBlank(value) {
  if (value === undefined || value === null) return true;
  if (typeof value === "boolean") return !value;
  if (Array.isArray(value)) return value.length === 0;
  return String(value).trim() === "";
}

function needsTransport(programs) {
  const selected = new Set(normalizePrograms(programs));
  return (ALC_CONFIG.programs || []).some((p) => p.transport && selected.has(p.id));
}

const TEXT_FIELDS = [
  { form: "enrollment", section: "Enrollment", key: "childFirst", label: "Child First Name" },
  { form: "enrollment", section: "Enrollment", key: "childMI", label: "Child Middle Initial" },
  { form: "enrollment", section: "Enrollment", key: "childLast", label: "Child Last Name" },
  { form: "enrollment", section: "Enrollment", key: "childPreferred", label: "Child Preferred Name" },
  { form: "enrollment", section: "Enrollment", key: "childGrade", label: "Grade / Class" },
  { form: "enrollment", section: "Enrollment", key: "startDate", label: "Enrollment Start Date" },
  { form: "enrollment", section: "Enrollment", key: "childDob", label: "Child Date of Birth" },
  { form: "enrollment", section: "Enrollment", key: "childGender", label: "Child Gender" },
  { form: "enrollment", section: "Enrollment", key: "childAddress", label: "Child Street Address" },
  { form: "enrollment", section: "Enrollment", key: "childCity", label: "Child City" },
  { form: "enrollment", section: "Enrollment", key: "childZip", label: "Child ZIP Code" },
  { form: "enrollment", section: "Enrollment", key: "medicalNotes", label: "Medical Conditions / Notes" },
  { form: "enrollment", section: "Enrollment", key: "momFirst", label: "Mother / Guardian First Name" },
  { form: "enrollment", section: "Enrollment", key: "momMI", label: "Mother / Guardian Middle Initial" },
  { form: "enrollment", section: "Enrollment", key: "momLast", label: "Mother / Guardian Last Name" },
  { form: "enrollment", section: "Enrollment", key: "momCell", label: "Mother / Guardian Cell Phone" },
  { form: "enrollment", section: "Enrollment", key: "momEmail", label: "Mother / Guardian Email" },
  { form: "enrollment", section: "Enrollment", key: "momEmployer", label: "Mother / Guardian Employer" },
  { form: "enrollment", section: "Enrollment", key: "momOccupation", label: "Mother / Guardian Occupation" },
  { form: "enrollment", section: "Enrollment", key: "dadFirst", label: "Father / Guardian First Name" },
  { form: "enrollment", section: "Enrollment", key: "dadMI", label: "Father / Guardian Middle Initial" },
  { form: "enrollment", section: "Enrollment", key: "dadLast", label: "Father / Guardian Last Name" },
  { form: "enrollment", section: "Enrollment", key: "dadCell", label: "Father / Guardian Cell Phone" },
  { form: "enrollment", section: "Enrollment", key: "dadEmail", label: "Father / Guardian Email" },
  { form: "enrollment", section: "Enrollment", key: "dadEmployer", label: "Father / Guardian Employer" },
  { form: "enrollment", section: "Enrollment", key: "dadOccupation", label: "Father / Guardian Occupation" },
  { form: "enrollment", section: "Enrollment", key: "ec1Name", label: "Emergency Contact 1 Name" },
  { form: "enrollment", section: "Enrollment", key: "ec1Home", label: "Emergency Contact 1 Home Phone" },
  { form: "enrollment", section: "Enrollment", key: "ec1Work", label: "Emergency Contact 1 Work Phone" },
  { form: "enrollment", section: "Enrollment", key: "ec1Cell", label: "Emergency Contact 1 Cell Phone" },
  { form: "enrollment", section: "Enrollment", key: "ec1Rel", label: "Emergency Contact 1 Relationship" },
  { form: "enrollment", section: "Enrollment", key: "ec2Name", label: "Emergency Contact 2 Name" },
  { form: "enrollment", section: "Enrollment", key: "ec2Home", label: "Emergency Contact 2 Home Phone" },
  { form: "enrollment", section: "Enrollment", key: "ec2Work", label: "Emergency Contact 2 Work Phone" },
  { form: "enrollment", section: "Enrollment", key: "ec2Cell", label: "Emergency Contact 2 Cell Phone" },
  { form: "enrollment", section: "Enrollment", key: "ec2Rel", label: "Emergency Contact 2 Relationship" },
  { form: "enrollment", section: "Enrollment", key: "careFrom", label: "Care Hours — From" },
  { form: "enrollment", section: "Enrollment", key: "careTo", label: "Care Hours — To" },
  { form: "enrollment", section: "Enrollment", key: "tuitionAmount", label: "Current Tuition Amount" },
  { form: "enrollment", section: "Enrollment", key: "previousDaycareName", label: "Daycare Name" },
  { form: "enrollment", section: "Enrollment", key: "previousHomeCareName", label: "Home Care Name" },

  { form: "financial", section: "Financial Agreement", key: "rpName", label: "Responsible Party Name" },
  { form: "financial", section: "Financial Agreement", key: "rpDob", label: "Responsible Party Date of Birth" },
  { form: "financial", section: "Financial Agreement", key: "rpDl", label: "Responsible Party Driver's License" },
  { form: "financial", section: "Financial Agreement", key: "rpState", label: "Responsible Party License State" },
  { form: "financial", section: "Financial Agreement", key: "rpAddress", label: "Responsible Party Address" },
  { form: "financial", section: "Financial Agreement", key: "rpCityStateZip", label: "Responsible Party City / State / ZIP" },
  { form: "financial", section: "Financial Agreement", key: "rpPhone", label: "Responsible Party Phone" },
  { form: "financial", section: "Financial Agreement", key: "rpEmail", label: "Responsible Party Email" },
  { form: "financial", section: "Financial Agreement", key: "rpEmployer", label: "Responsible Party Employer" },
  { form: "financial", section: "Financial Agreement", key: "rp2Name", label: "Second Party Name (optional)" },
  { form: "financial", section: "Financial Agreement", key: "rp2Dob", label: "Second Party Date of Birth" },
  { form: "financial", section: "Financial Agreement", key: "rp2Dl", label: "Second Party Driver's License" },
  { form: "financial", section: "Financial Agreement", key: "rp2State", label: "Second Party License State" },
  { form: "financial", section: "Financial Agreement", key: "rp2Address", label: "Second Party Address" },
  { form: "financial", section: "Financial Agreement", key: "rp2CityStateZip", label: "Second Party City / State / ZIP" },
  { form: "financial", section: "Financial Agreement", key: "rp2Employer", label: "Second Party Employer" },
  { form: "financial", section: "Financial Agreement", key: "rp2Phone", label: "Second Party Phone" },
  { form: "financial", section: "Financial Agreement", key: "rp2Email", label: "Second Party Email" },
  { form: "financial", section: "Financial Agreement", key: "finChildName", label: "Enrolled Child Name" },
  { form: "financial", section: "Financial Agreement", key: "finEnrollDate", label: "Enrollment Date" },
  { form: "financial", section: "Financial Agreement", key: "finPrintName", label: "Financial Agreement Printed Name" },
  { form: "financial", section: "Financial Agreement", key: "finSignDate", label: "Financial Agreement Date" },
  { form: "financial", section: "Financial Agreement", key: "finSignature", label: "Financial Agreement Signature" },
  { form: "financial", section: "Financial Agreement", key: "finCardholderName", label: "Cardholder Name" },
  { form: "financial", section: "Financial Agreement", key: "finCardNumber", label: "Card Number" },
  { form: "financial", section: "Financial Agreement", key: "finCardExp", label: "Card Expiration" },
  { form: "financial", section: "Financial Agreement", key: "finCardCvv", label: "Card CVV" },

  { form: "transport", section: "Transportation", key: "trChild", label: "Transport Child Name", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trSchoolChoice", label: "School Selection", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trSchoolAddress", label: "School Address", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trPickupTime", label: "Pickup Time", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trArriveTime", label: "Arrival Time", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trMiles", label: "Approximate Miles", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trSignature", label: "Transport Signature", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trDate", label: "Transport Date", whenTransport: true },

  { form: "emergency", section: "Emergency Medical", key: "emChild", label: "Emergency Form Child Name", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emDob", label: "Emergency Form Date of Birth", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emAddress", label: "Emergency Form Address", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emFather", label: "Father Name", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emMother", label: "Mother Name", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emFatherCell", label: "Father Cell Phone", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emMotherCell", label: "Mother Cell Phone", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emAltName", label: "Alternate Emergency Contact Name", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emAltPhone", label: "Alternate Emergency Contact Phone", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emDoctor", label: "Child's Doctor", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emDoctorPhone", label: "Doctor Phone", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emFacility", label: "Preferred Hospital / Facility", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emAllergies", label: "Allergies", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emMeds", label: "Current Medications", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emSpecial", label: "Special Medical Information", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emAuthChild", label: "Authorization Child Name", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emDate", label: "Emergency Form Date", whenEmergency: true },
  { form: "emergency", section: "Emergency Medical", key: "emSignature", label: "Emergency Form Signature", whenEmergency: true },

  { form: "ies", section: "Meal Benefit (IES)", key: "iesAckPrint", label: "IES Acknowledgment Printed Name" },
  { form: "ies", section: "Meal Benefit (IES)", key: "iesAckDate", label: "IES Acknowledgment Date" },

  { form: "handbook", section: "Parent Handbook", key: "hbPrint", label: "Handbook Printed Name" },
  { form: "handbook", section: "Parent Handbook", key: "hbDate", label: "Handbook Date" },
  { form: "handbook", section: "Parent Handbook", key: "hbSignature", label: "Handbook Signature" },
  { form: "handbook", section: "Parent Handbook", key: "hbChild", label: "Handbook Child Name" },

  { form: "photo", section: "Photo / Permissions", key: "photoChild", label: "Photo Permission Child Name" },
  { form: "photo", section: "Photo / Permissions", key: "photoPrint", label: "Photo Permission Printed Name" },
  { form: "photo", section: "Photo / Permissions", key: "photoDate", label: "Photo Permission Date" },
  { form: "photo", section: "Photo / Permissions", key: "photoSignature", label: "Photo Permission Signature" },
  { form: "photo", section: "Photo / Permissions", key: "prepOther", label: "Other External Preparations" },
];

const CHECKBOX_FIELDS = [
  { form: "enrollment", section: "Enrollment", key: "mealBreakfast", label: "Meal — Breakfast" },
  { form: "enrollment", section: "Enrollment", key: "mealLunch", label: "Meal — Lunch" },
  { form: "enrollment", section: "Enrollment", key: "mealSnack", label: "Meal — PM Snack" },
  { form: "financial", section: "Financial Agreement", key: "finAgree", label: "Financial Agreement Acknowledgment" },
  { form: "ies", section: "Meal Benefit (IES)", key: "iesDownloadAck", label: "IES Download Acknowledgment" },
  { form: "handbook", section: "Parent Handbook", key: "hbAgree", label: "Parent Handbook Acknowledgment" },
  { form: "photo", section: "Photo / Permissions", key: "photoAgree", label: "Photo / Video Permission Agreement" },
  { form: "photo", section: "Photo / Permissions", key: "permWaterSprinkler", label: "Water Permission — Sprinkler" },
  { form: "photo", section: "Photo / Permissions", key: "permWaterSplashing", label: "Water Permission — Play Splashing" },
  { form: "photo", section: "Photo / Permissions", key: "permWaterPools", label: "Water Permission — Swimming Pools" },
  { form: "photo", section: "Photo / Permissions", key: "permWaterTable", label: "Water Permission — Water Table Play" },
  { form: "photo", section: "Photo / Permissions", key: "prepBabyWipes", label: "External Prep — Baby Wipes" },
  { form: "photo", section: "Photo / Permissions", key: "prepBandAids", label: "External Prep — Band-Aids" },
  { form: "photo", section: "Photo / Permissions", key: "prepNeosporin", label: "External Prep — Neosporin" },
  { form: "photo", section: "Photo / Permissions", key: "prepBactine", label: "External Prep — Bactine" },
  { form: "photo", section: "Photo / Permissions", key: "prepSunscreen", label: "External Prep — Sunscreen" },
  { form: "photo", section: "Photo / Permissions", key: "prepInsectRepellent", label: "External Prep — Insect Repellent" },
  { form: "photo", section: "Photo / Permissions", key: "prepNonRxOintment", label: "External Prep — Non-prescription Ointment" },
  { form: "photo", section: "Photo / Permissions", key: "prepBabyPowder", label: "External Prep — Baby Powder" },
  { form: "transport", section: "Transportation", key: "trMon", label: "Transport Day — Monday", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trTue", label: "Transport Day — Tuesday", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trWed", label: "Transport Day — Wednesday", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trThu", label: "Transport Day — Thursday", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trFri", label: "Transport Day — Friday", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trPermEmergency", label: "Transport Permission — Emergency Care", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trPermFieldTrips", label: "Transport Permission — Field Trips", whenTransport: true },
  { form: "transport", section: "Transportation", key: "trPermSchool", label: "Transport Permission — School", whenTransport: true },
];

/** Fields rendered on the PDF packet that are not backed by a web form input. */
function collectPdfPacketBlanks(normalized, { transportNeeded, emergencyNeeded }) {
  const d = normalized || {};
  const blanks = [];
  const mother = d.mother || {};
  const father = d.father || {};
  const medical = d.medical || {};
  const contacts = d.emergencyContacts || [];

  const push = (section, label) => blanks.push({ section, label });

  const pdfOnlyFields = [
    { section: "Enrollment", label: "Child's SSN (on enrollment form)", value: d.child?.ssn },
    { section: "Enrollment", label: "Mother / Guardian Home Phone", value: mother.homePhone },
    { section: "Enrollment", label: "Mother / Guardian Work Phone", value: mother.workPhone },
    { section: "Enrollment", label: "Mother / Guardian Work Address", value: mother.workAddress },
    { section: "Enrollment", label: "Mother / Guardian Work Hours", value: mother.workHours },
    { section: "Enrollment", label: "Mother / Guardian SSN", value: mother.ssn },
    { section: "Enrollment", label: "Mother / Guardian Driver's License", value: mother.driversLicense },
    { section: "Enrollment", label: "Mother / Guardian Birthday", value: mother.birthday },
    { section: "Enrollment", label: "Father / Guardian Home Phone", value: father.homePhone },
    { section: "Enrollment", label: "Father / Guardian Work Phone", value: father.workPhone },
    { section: "Enrollment", label: "Father / Guardian Work Address", value: father.workAddress },
    { section: "Enrollment", label: "Father / Guardian Work Hours", value: father.workHours },
    { section: "Enrollment", label: "Father / Guardian SSN", value: father.ssn },
    { section: "Enrollment", label: "Father / Guardian Driver's License", value: father.driversLicense },
    { section: "Enrollment", label: "Father / Guardian Birthday", value: father.birthday },
    { section: "Enrollment", label: "Emergency Contact 1 Address", value: contacts[0]?.address },
    { section: "Enrollment", label: "Emergency Contact 2 Address", value: contacts[1]?.address },
    { section: "Enrollment", label: "Emergency Contact 3 — Name", value: contacts[2]?.name },
    { section: "Enrollment", label: "Emergency Contact 3 — Home Phone", value: contacts[2]?.homePhone },
    { section: "Enrollment", label: "Emergency Contact 3 — Work Phone", value: contacts[2]?.workPhone },
    { section: "Enrollment", label: "Emergency Contact 3 — Cell Phone", value: contacts[2]?.cellPhone },
    { section: "Enrollment", label: "Emergency Contact 3 — Address", value: contacts[2]?.address },
    { section: "Enrollment", label: "Emergency Contact 3 — Relationship", value: contacts[2]?.relationship },
    { section: "Emergency Medical", label: "Physician Address", value: medical.doctorAddress, whenEmergency: true },
    { section: "Emergency Medical", label: "Insurance Information", value: medical.insurance, whenEmergency: true },
    { section: "Policy Acknowledgment", label: "Staff Member Name (if applicable)", value: d.policyAck?.staffName },
  ];

  pdfOnlyFields.forEach(({ section, label, value, whenEmergency }) => {
    if (whenEmergency && !emergencyNeeded) return;
    if (isBlank(value)) push(section, label);
  });

  return blanks;
}

function collectCompositeBlanks(data, { transportNeeded, emergencyNeeded }) {
  const blanks = [];
  const en = data?.enrollment || {};
  const ph = data?.photo || {};
  const programs = normalizePrograms(en.programs);

  if (isBlank(programs)) {
    blanks.push({ section: "Enrollment", label: "Care Program(s)" });
  }

  const photoSelected =
    ph.photoClassroom || ph.photoFamily || ph.photoWeb || ph.photoMarketing || ph.photoNone;
  if (!photoSelected) {
    blanks.push({ section: "Photo / Permissions", label: "Photo / Video Release Selection" });
  }

  if (transportNeeded) {
    const tr = data?.transport || {};
    const anyDay = tr.trMon || tr.trTue || tr.trWed || tr.trThu || tr.trFri;
    if (!anyDay) {
      blanks.push({ section: "Transportation", label: "Transport Days (none selected)" });
    }
  }

  if (emergencyNeeded) {
    // no extra composite fields
  }

  const files = data?.uploads?.files || {};
  (ALC_CONFIG.uploads || []).forEach((def) => {
    if (!(files[def.id] || []).length) {
      blanks.push({
        section: "Documents",
        label: `${def.label}${def.required ? "" : " (optional)"}`,
      });
    }
  });

  return blanks;
}

export function collectBlankFields(data = {}, normalized = null) {
  const en = data?.enrollment || {};
  const programs = en.programs;
  const transportNeeded = needsTransport(programs);
  const emergencyNeeded = needsEmergencyMedicalForm(programs);

  const blanks = [];

  TEXT_FIELDS.forEach((def) => {
    if (def.whenTransport && !transportNeeded) return;
    if (def.whenEmergency && !emergencyNeeded) return;
    const formData = data?.[def.form] || {};
    if (isBlank(formData[def.key])) {
      blanks.push({ section: def.section, label: def.label });
    }
  });

  CHECKBOX_FIELDS.forEach((def) => {
    if (def.whenTransport && !transportNeeded) return;
    const formData = data?.[def.form] || {};
    if (isBlank(formData[def.key])) {
      blanks.push({ section: def.section, label: def.label });
    }
  });

  if (normalized) {
    blanks.push(...collectPdfPacketBlanks(normalized, { transportNeeded, emergencyNeeded }));
  }

  blanks.push(...collectCompositeBlanks(data, { transportNeeded, emergencyNeeded }));

  const seen = new Set();
  return blanks.filter((item) => {
    const id = `${item.section}::${item.label}`;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

export function groupBlankFields(blanks) {
  const SECTION_ORDER = [
    "Enrollment",
    "Financial Agreement",
    "Transportation",
    "Emergency Medical",
    "Meal Benefit (IES)",
    "Parent Handbook",
    "Photo / Permissions",
    "Policy Acknowledgment",
    "Documents",
  ];

  const groups = new Map();
  blanks.forEach((item) => {
    if (!groups.has(item.section)) {
      groups.set(item.section, []);
    }
    groups.get(item.section).push(item.label);
  });

  const ordered = SECTION_ORDER.filter((section) => groups.has(section)).map((section) => ({
    section,
    labels: groups.get(section),
  }));

  groups.forEach((labels, section) => {
    if (!SECTION_ORDER.includes(section)) {
      ordered.push({ section, labels });
    }
  });

  return ordered;
}
