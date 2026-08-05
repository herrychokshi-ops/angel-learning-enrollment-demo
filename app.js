const FORMS = [
  {
    id: "enrollment",
    num: "01",
    title: "Enrollment Form",
    blurb: "Child & guardian details, emergency contacts, care hours",
    titleEs: "Formulario de inscripción",
    blurbEs: "Datos del niño, tutores, contactos de emergencia y horario",
  },
  {
    id: "financial",
    num: "02",
    title: "Financial Responsibility & Tuition",
    blurb: "Responsible party info and payment agreement",
    titleEs: "Responsabilidad financiera y matrícula",
    blurbEs: "Parte responsable y acuerdo de pago",
  },
  {
    id: "transport",
    num: "03",
    title: "Transportation Agreement",
    blurb: "School pickup authorization and schedule",
    titleEs: "Acuerdo de transporte",
    blurbEs: "Autorización de recogida escolar y horario",
  },
  {
    id: "emergency",
    num: "04",
    title: "Vehicle Emergency Medical",
    blurb: "Doctor, allergies, and emergency care consent",
    titleEs: "Información médica de emergencia",
    blurbEs: "Médico, alergias y autorización de emergencia",
  },
  {
    id: "ies",
    num: "05",
    title: "CACFP Meal Benefit (IES)",
    blurb: "Income eligibility statement for 2026–2027",
    titleEs: "Beneficios de comidas CACFP (IES)",
    blurbEs: "Declaración de elegibilidad por ingresos 2026–2027",
  },
];

const I18N = {
  en: {
    demoBanner: "Interactive mockup · not live data",
    demoBannerHint: "· for demonstration only",
    navHome: "Home",
    navForms: "Forms",
    resetDemo: "Reset demo",
    heroKicker: "Enrollment packet · 2026–2027",
    heroLead:
      "No login required. Complete enrollment, tuition, transportation, emergency, and meal-benefit forms online — then send the packet to the center by email.",
    ctaStart: "Start enrollment packet",
    ctaSample: "Load sample child",
    ctaJump: "Jump to a form",
    overviewTitle: "What parents complete online",
    overviewLead:
      "Open the link, fill once. Child name, address, and contacts carry across all forms. Submit sends prefilled PDFs to the center — no login.",
    packetEyebrow: "Your packet",
    packetTitle: "Enrollment checklist",
    packetLead: "Progress saves in this browser for the demo. Shared fields autofill after Enrollment.",
    progress: "{n} of {total} complete",
    statusDone: "Complete",
    statusTodo: "To do",
    backPacket: "← Back to packet",
    saveComplete: "Save & mark complete",
    toastSaved: "Saved — form marked complete",
    toastSample: "Sample family loaded — open any form to review",
    toastReset: "Demo reset",
    toastSubmitted: "Demo: packet would email the center as PDFs",
    confirmReset: "Clear all demo form progress on this device?",
    doneStrong: "Packet emailed to the center",
    doneText:
      "No login required. Your prefilled forms are sent as PDFs to Angel Learning Center, and a copy can go to your email.",
    doneEyebrow: "What happens next",
    doneTitle: "You’re all set",
    doneLead:
      "Fill online once → we email the completed packet to the front desk. No parent account, no password.",
    emailToCenter: "SENT TO CENTER",
    emailAttachments: "ATTACHMENTS",
    emailAttachmentList: "5 prefilled PDF forms",
    reviewChecklist: "Review checklist",
    printPreview: "Print / PDF preview",
  },
  es: {
    demoBanner: "Maqueta interactiva · no es información real",
    demoBannerHint: "· solo para demostración",
    navHome: "Inicio",
    navForms: "Formularios",
    resetDemo: "Reiniciar demo",
    heroKicker: "Paquete de inscripción · 2026–2027",
    heroLead:
      "No se necesita iniciar sesión. Complete en línea inscripción, matrícula, transporte, emergencia y comidas — y envíe el paquete al centro por correo.",
    ctaStart: "Comenzar paquete de inscripción",
    ctaSample: "Cargar niño de ejemplo",
    ctaJump: "Ir a un formulario",
    overviewTitle: "Lo que los padres completan en línea",
    overviewLead:
      "Abra el enlace y llene una vez. Nombre, dirección y contactos se copian a todos los formularios. Envíe PDF al centro — sin inicio de sesión.",
    packetEyebrow: "Su paquete",
    packetTitle: "Lista de inscripción",
    packetLead: "El progreso se guarda en este navegador para la demo. Pulse cualquier formulario.",
    progress: "{n} de {total} completados",
    statusDone: "Completo",
    statusTodo: "Pendiente",
    backPacket: "← Volver al paquete",
    saveComplete: "Guardar y marcar completo",
    toastSaved: "Guardado — formulario marcado completo",
    toastSample: "Familia de ejemplo cargada — abra cualquier formulario",
    toastReset: "Demo reiniciada",
    toastSubmitted: "Demo: el paquete se enviaría al centro en PDF",
    confirmReset: "¿Borrar todo el progreso de la demo en este dispositivo?",
    doneStrong: "Paquete enviado por correo al centro",
    doneText:
      "No se requiere inicio de sesión. Sus formularios se envían en PDF a Angel Learning Center; también puede recibir una copia.",
    doneEyebrow: "Qué sigue",
    doneTitle: "Todo listo",
    doneLead:
      "Llene en línea una vez → enviamos el paquete a recepción. Sin cuenta de padre ni contraseña.",
    emailToCenter: "ENVIADO AL CENTRO",
    emailAttachments: "ADJUNTOS",
    emailAttachmentList: "5 formularios PDF prefllenados",
    reviewChecklist: "Revisar lista",
    printPreview: "Imprimir / vista PDF",
    enrollmentTitle: "Formulario de inscripción",
    enrollmentLead: "Niño, padres/tutores, contactos de emergencia y horario de cuidado.",
    financialTitle: "Responsabilidad financiera y acuerdo de matrícula",
    financialLead: "Reconozca la responsabilidad de matrícula, cuotas y términos de pago.",
    transportTitle: "Acuerdo de transporte",
    transportLead: "Autorice al personal a transportar a su hijo desde la escuela.",
    emergencyTitle: "Información médica de emergencia del vehículo",
    emergencyLead: "Contactos, médico, alergias y autorización médica de emergencia.",
    iesTitle: "Declaración de elegibilidad de comidas (IES)",
    iesLead: "Requerido cada año para el Programa de Alimentos CACFP.",
    firstName: "Nombre",
    lastName: "Apellido",
    preferredName: "Nombre preferido",
    gradeClass: "Grado / clase",
    startDate: "Fecha de inicio",
    dob: "Fecha de nacimiento",
    gender: "Género",
    childSsn: "SSN del niño",
    address: "Dirección",
    city: "Ciudad",
    medicalNotes: "Condiciones médicas, medicamentos o atención especial",
    motherGuardian: "Madre / tutora",
    fatherGuardian: "Padre / tutor",
    cellPhone: "Celular",
    email: "Correo electrónico",
    employer: "Empleador",
    occupation: "Ocupación",
    custodial: "Padre con custodia",
    emergencyContacts: "Contactos de emergencia",
    pickupHint: "(autorizados para recoger — se requiere ID)",
    contact1: "Contacto 1",
    fullName: "Nombre completo",
    relationship: "Parentesco",
    careSchedule: "Horario de cuidado",
    hoursFrom: "Horario desde",
    hoursTo: "Hasta",
    tenHourHint: "No puede exceder 10 horas al día.",
    tuitionAmount: "Monto actual de matrícula",
    form1: "Formulario 1 de 5",
    form2: "Formulario 2 de 5",
    form3: "Formulario 3 de 5",
    form4: "Formulario 4 de 5",
    form5: "Formulario 5 de 5 · CACFP 2026–2027",
    nextFinancial: "Siguiente: Acuerdo de matrícula →",
    nextTransport: "Siguiente: Transporte →",
    nextEmergency: "Siguiente: Emergencia →",
    nextIes: "Siguiente: Beneficios de comidas →",
    finishPacket: "Terminar paquete →",
    responsibleParty: "Parte responsable",
    legalName: "Nombre legal completo",
    dl: "Licencia / ID estatal",
    state: "Estado",
    cityStateZip: "Ciudad / Estado / ZIP",
    phone: "Teléfono",
    child: "Niño",
    childName: "Nombre del niño",
    enrollDate: "Fecha de inscripción",
    agreement: "Acuerdo",
    finTerms1:
      "Reconozco que soy legal y financieramente responsable del pago de toda matrícula, cuotas de inscripción, cargos por mora, pagos devueltos, actividades y cualquier otro cargo por la inscripción de mi hijo en Angel Learning Center.",
    finTerms2:
      "El incumplimiento de pago puede resultar en cargos, suspensión o terminación de servicios, negativa a futuras inscripciones, cobranzas y acción civil en un tribunal de Georgia.",
    finAgree:
      "He leído este acuerdo y acepto voluntariamente ser personalmente responsable de todos los montos adeudados.",
    printedName: "Nombre en letra de molde",
    date: "Fecha",
    esign: "Firma electrónica",
    childRoute: "Niño y ruta",
    pickupTime: "Hora de recogida",
    otherSchool: "Otra escuela",
    arriveAlc: "Llegada a Angel Learning Center",
    transportDays: "Días de transporte",
    staffAuth: "El personal de Angel Learning está autorizado a transportar a mi hijo.",
    schoolDistance: "Nombre de la escuela (distancia)",
    miles: "Millas aproximadas del centro",
    signature: "Firma",
    parentSignature: "Firma del padre / tutor",
    parents: "Padres",
    fatherName: "Nombre del padre",
    motherName: "Nombre de la madre",
    fatherPhones: "Padre casa / trabajo",
    motherPhones: "Madre casa / trabajo",
    emergencyMedical: "Emergencia y médico",
    altContact: "Contacto de emergencia (si no se puede contactar a los padres)",
    doctor: "Médico del niño",
    doctorPhone: "Teléfono del médico",
    facility: "Centro médico que usa el centro",
    allergies: "Alergias del niño",
    meds: "Medicamentos recetados actuales",
    specialNeeds: "Necesidades y condiciones especiales",
    authorization: "Autorización",
    emAuthText:
      "En caso de una emergencia con mi hijo, y si Angel Learning Center no puede comunicarse conmigo, autorizo cualquier atención médica de emergencia necesaria. También acepto ser totalmente responsable de todos los gastos médicos.",
    iesPart1: "Parte I — Niños inscritos",
    childNameLastFirst: "Nombre del niño (Apellido, Nombre, M.I.)",
    caseNumber: "Núm. de caso SNAP / TANF / FDPIR (si aplica)",
    iesPart2: "Parte II — Ingresos del hogar",
    childIncome: "Ingreso total de niños / frecuencia",
    hhMember: "Miembro del hogar",
    earnings: "Ganancias del trabajo",
    otherIncome: "Otros ingresos",
    hhSize: "Total de miembros del hogar",
    ssn4: "Últimos 4 del SSN",
    iesPart3: "Parte III — Inscripción / comidas",
    careFrom: "Normalmente en cuidado desde",
    days: "Días",
    mealsReceived: "Comidas que normalmente recibe",
    iesPart4: "Parte IV — Certificación",
    iesCert: "Certifico que toda la información es verdadera y que se reportaron todos los ingresos.",
    childInfo: "Información del niño",
  },
};

const SAMPLE = {
  enrollment: {
    childFirst: "Maya",
    childMI: "J",
    childLast: "Rivera",
    childPreferred: "Maya",
    childGrade: "Afterschool · K",
    startDate: "2026-08-10",
    childDob: "2019-03-14",
    childGender: "Female",
    childSsn: "XXX-XX-4821",
    childAddress: "412 Magnolia Lane",
    childCity: "Savannah",
    childZip: "31407",
    medicalNotes: "Mild peanut allergy — EpiPen in backpack",
    momFirst: "Sofia",
    momMI: "A",
    momLast: "Rivera",
    momCell: "(912) 555-0148",
    momEmail: "sofia.rivera@email.com",
    momEmployer: "Memorial Health",
    momOccupation: "Nurse",
    momCustodial: true,
    dadFirst: "Luis",
    dadMI: "M",
    dadLast: "Rivera",
    dadCell: "(912) 555-0192",
    dadEmail: "luis.rivera@email.com",
    dadCustodial: true,
    ec1Name: "Ana Morales",
    ec1Home: "(912) 555-0177",
    ec1Work: "(912) 555-0178",
    ec1Cell: "(912) 555-0179",
    ec1Rel: "Aunt",
    careFrom: "07:00",
    careTo: "17:00",
    mealBreakfast: true,
    mealLunch: true,
    mealSnack: true,
    tuitionAmount: "$185 / week",
  },
  financial: {
    rpName: "Sofia A. Rivera",
    rpDob: "1990-06-02",
    rpDl: "GA-0582914",
    rpState: "GA",
    rpAddress: "412 Magnolia Lane",
    rpCityStateZip: "Savannah, GA 31407",
    rpSsn: "XXX-XX-7712",
    rpPhone: "(912) 555-0148",
    rpEmail: "sofia.rivera@email.com",
    rpEmployer: "Memorial Health",
    finChildName: "Maya J. Rivera",
    finEnrollDate: "2026-08-10",
    finAgree: true,
    finPrintName: "Sofia A. Rivera",
    finSignDate: "2026-07-31",
    finSignature: "Sofia A. Rivera",
  },
  transport: {
    trChild: "Maya J. Rivera",
    trSchoolChoice: "godley",
    trGodleyTime: "14:45",
    trArriveTime: "15:15",
    trMon: true,
    trTue: true,
    trWed: true,
    trThu: true,
    trFri: true,
    trStaffAuth: true,
    trSchoolDistanceName: "Godley Station School",
    trMiles: "4.2",
    trSignature: "Sofia A. Rivera",
    trDate: "2026-07-31",
  },
  emergency: {
    emChild: "Maya J. Rivera",
    emDob: "2019-03-14",
    emAddress: "412 Magnolia Lane, Savannah, GA 31407",
    emFather: "Luis M. Rivera",
    emMother: "Sofia A. Rivera",
    emFatherPhones: "(912) 555-0192 · (912) 555-2200",
    emMotherPhones: "(912) 555-0148 · (912) 555-3300",
    emAltName: "Ana Morales",
    emAltPhone: "(912) 555-0179",
    emDoctor: "Dr. Elena Brooks",
    emDoctorPhone: "(912) 555-4410",
    emFacility: "St. Joseph Hospital Emergency Room, 11705 Mercy Blvd., 912-819-4100",
    emAllergies: "Peanuts",
    emMeds: "Epinephrine auto-injector as needed",
    emSpecial: "None",
    emAuthChild: "Maya J. Rivera",
    emDate: "2026-07-31",
    emSignature: "Sofia A. Rivera",
  },
  ies: {
    iesChild1: "Rivera, Maya J.",
    iesDob1: "2019-03-14",
    iesCase1: "",
    iesChildIncome: "$0 / monthly",
    iesAdult1: "Sofia Rivera",
    iesEarn1: "$4200 / monthly",
    iesOther1: "$0",
    iesHhSize: "3",
    iesSsn4: "7712",
    iesCareFrom: "07:00",
    iesCareTo: "17:00",
    iesMon: true,
    iesTue: true,
    iesWed: true,
    iesThu: true,
    iesFri: true,
    iesMealB: true,
    iesMealL: true,
    iesMealP: true,
    iesPrint: "Sofia A. Rivera",
    iesDate: "2026-07-31",
    iesSignature: "Sofia A. Rivera",
    iesAddress: "412 Magnolia Lane",
    iesCity: "Savannah",
    iesState: "GA",
    iesZip: "31407",
    iesPhone: "(912) 555-0148",
  },
};

const STORAGE_KEY = "alc-enrollment-demo-v3";
const LANG_KEY = "alc-enrollment-lang";

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { completed: {}, data: {} };
  } catch {
    return { completed: {}, data: {} };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();
let lang = localStorage.getItem(LANG_KEY) || "en";

function t(key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

function applyI18n() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (value && value !== key) el.textContent = value;
  });
  document.getElementById("langEn")?.classList.toggle("active", lang === "en");
  document.getElementById("langEs")?.classList.toggle("active", lang === "es");
  renderLists();
}

function showToast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  el.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove("show"), 2400);
}

function completedCount() {
  return FORMS.filter((f) => state.completed[f.id]).length;
}

function formTitle(form) {
  return lang === "es" ? form.titleEs : form.title;
}

function formBlurb(form) {
  return lang === "es" ? form.blurbEs : form.blurb;
}

function renderLists() {
  const makeItem = (form, asLink = true) => {
    const done = !!state.completed[form.id];
    const status = done ? t("statusDone") : t("statusTodo");
    const inner = `
      <span class="form-num">${form.num}</span>
      <span class="form-meta">
        <strong>${formTitle(form)}</strong>
        <span>${formBlurb(form)}</span>
      </span>
      <span class="status ${done ? "done" : ""}">${status}</span>
    `;
    if (asLink) {
      return `<li><a href="#${form.id}" data-nav="${form.id}">${inner}</a></li>`;
    }
    return `<li><div class="row">${inner}</div></li>`;
  };

  const html = FORMS.map((f) => makeItem(f)).join("");
  const home = document.getElementById("formList");
  const packet = document.getElementById("packetList");
  const done = document.getElementById("doneList");
  if (home) home.innerHTML = html;
  if (packet) packet.innerHTML = html;
  if (done) done.innerHTML = FORMS.map((f) => makeItem(f, false)).join("");

  const n = completedCount();
  const fill = document.getElementById("progressFill");
  const text = document.getElementById("progressText");
  if (fill) fill.style.width = `${(n / FORMS.length) * 100}%`;
  if (text) text.textContent = t("progress").replace("{n}", n).replace("{total}", FORMS.length);
}

function fullName(first, mi, last) {
  return [first, mi, last].map((p) => (p || "").trim()).filter(Boolean).join(" ").replace(/\s+/g, " ");
}

function childFullName(en = {}) {
  return fullName(en.childFirst, en.childMI, en.childLast);
}

function childLastFirst(en = {}) {
  const last = (en.childLast || "").trim();
  const first = (en.childFirst || "").trim();
  const mi = (en.childMI || "").trim();
  if (!last && !first) return "";
  return `${last}${last && first ? ", " : ""}${first}${mi ? ` ${mi}.` : ""}`.trim();
}

function cityStateZip(en = {}) {
  const city = (en.childCity || "").trim();
  const zip = (en.childZip || "").trim();
  if (city && zip) return `${city}, GA ${zip}`;
  if (city) return `${city}, GA`;
  return zip;
}

function homeLine(en = {}) {
  const line1 = (en.childAddress || "").trim();
  const place = cityStateZip(en);
  if (line1 && place) return `${line1}, ${place}`;
  return line1 || place || "";
}

function isBlank(v) {
  return v === undefined || v === null || v === "" || v === false;
}

/** Copy shared answers across the 5 forms so parents type name/address once. */
function carryForwardMap() {
  const en = state.data.enrollment || {};
  const fin = state.data.financial || {};
  const child = childFullName(en) || fin.finChildName || "";
  const childLf = childLastFirst(en) || child;
  const mom = fullName(en.momFirst, en.momMI, en.momLast);
  const dad = fullName(en.dadFirst, en.dadMI, en.dadLast);
  const signer = fin.rpName || mom || dad || "";
  const address = homeLine(en) || fin.rpAddress || "";
  const phone = en.momCell || en.dadCell || fin.rpPhone || "";
  const email = en.momEmail || en.dadEmail || fin.rpEmail || "";
  const dob = en.childDob || "";
  const today = new Date().toISOString().slice(0, 10);

  return {
    financial: {
      finChildName: child,
      rpName: signer,
      rpAddress: en.childAddress || "",
      rpCityStateZip: cityStateZip(en),
      rpPhone: phone,
      rpEmail: email,
      rpEmployer: en.momEmployer || en.dadEmployer || "",
      finPrintName: signer,
      finSignature: signer,
      finSignDate: today,
      finEnrollDate: en.startDate || "",
    },
    transport: {
      trChild: child,
      trSignature: signer,
      trDate: today,
      trArriveTime: en.careTo || "",
    },
    emergency: {
      emChild: child,
      emAuthChild: child,
      emDob: dob,
      emAddress: address || en.childAddress || "",
      emFather: dad,
      emMother: mom,
      emFatherPhones: [en.dadCell].filter(Boolean).join(" · "),
      emMotherPhones: [en.momCell].filter(Boolean).join(" · "),
      emSignature: signer,
      emDate: today,
    },
    ies: {
      iesChild1: childLf,
      iesDob1: dob,
      iesAdult1: signer || mom,
      iesPrint: signer,
      iesSignature: signer,
      iesDate: today,
      iesAddress: en.childAddress || "",
      iesCity: en.childCity || "",
      iesState: en.childCity || en.childZip ? "GA" : "",
      iesZip: en.childZip || "",
      iesPhone: phone,
      iesCareFrom: en.careFrom || "",
      iesCareTo: en.careTo || "",
      iesMealB: en.mealBreakfast,
      iesMealL: en.mealLunch,
      iesMealP: en.mealSnack,
    },
  };
}

function mergeCarry(target, source, { force = false } = {}) {
  const out = { ...(target || {}) };
  let changed = 0;
  Object.entries(source || {}).forEach(([key, value]) => {
    if (isBlank(value)) return;
    if (force || isBlank(out[key])) {
      if (out[key] !== value) {
        out[key] = value;
        changed += 1;
      }
    }
  });
  return { data: out, changed };
}

function applyCarryForward({ force = false, onlyForm = null } = {}) {
  const map = carryForwardMap();
  let total = 0;
  Object.entries(map).forEach(([formId, source]) => {
    if (onlyForm && onlyForm !== formId) return;
    // Don't force-overwrite form fields the parent already finished, unless force on non-completed
    const formForce = force && !state.completed[formId];
    const { data, changed } = mergeCarry(state.data[formId], source, { force: formForce });
    if (changed) {
      state.data[formId] = data;
      total += changed;
    }
  });
  if (total) saveState(state);
  return total;
}

function updatePrefillNotice(viewId) {
  document.querySelectorAll(".prefill-notice").forEach((n) => n.remove());
  if (!["financial", "transport", "emergency", "ies"].includes(viewId)) return;
  const en = state.data.enrollment || {};
  if (!childFullName(en) && !en.momFirst) return;
  const head = document.querySelector(`#view-${viewId} .page-head`);
  if (!head) return;
  const note = document.createElement("p");
  note.className = "prefill-notice";
  note.setAttribute("data-i18n-skip", "1");
  note.textContent =
    lang === "es"
      ? "Campos como nombre, dirección y contacto se rellenaron desde el Formulario de inscripción. Puede editarlos."
      : "Name, address, and contact fields were filled from the Enrollment form so you don’t retype them. Edit anything that needs changes.";
  head.appendChild(note);
}

function showView(id) {
  const viewId = id || "home";
  if (["financial", "transport", "emergency", "ies"].includes(viewId)) {
    applyCarryForward({ force: false, onlyForm: viewId });
    hydrateForms();
  }
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
  const el = document.getElementById(`view-${viewId}`);
  if (el) {
    el.classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById("view-home")?.classList.add("is-active");
  }
  updatePrefillNotice(viewId);
  if (viewId === "done") {
    showToast(t("toastSubmitted"));
  }
  renderLists();
}

function navigateFromHash() {
  let id = (location.hash || "#home").slice(1) || "home";
  if (id === "staff" || id === "auth") id = "home";
  showView(id);
}

function setFieldValue(field, value) {
  if (!field) return;
  if (field instanceof RadioNodeList || (field.length && field[0]?.type === "radio")) {
    const list = field instanceof RadioNodeList ? [...field] : [...field];
    list.forEach((input) => {
      if (input.type === "radio") input.checked = input.value === value;
      if (input.type === "checkbox") {
        input.checked = Array.isArray(value)
          ? value.includes(input.value || "on")
          : !!value;
      }
    });
    return;
  }
  if (field.type === "checkbox") field.checked = !!value;
  else if (field.type === "radio") field.checked = field.value === value;
  else field.value = value ?? "";
}

function hydrateForms() {
  document.querySelectorAll("form[data-form]").forEach((form) => {
    const id = form.dataset.form;
    const data = state.data[id] || {};
    Object.entries(data).forEach(([name, value]) => {
      setFieldValue(form.elements.namedItem(name), value);
    });
  });
}

function fillFormsFromData(dataset, markComplete) {
  state.data = JSON.parse(JSON.stringify(dataset));
  state.completed = {};
  if (markComplete) {
    FORMS.forEach((f) => {
      state.completed[f.id] = true;
    });
  }
  saveState(state);
  hydrateForms();
  renderLists();
}

function serializeForm(form) {
  const data = {};
  const fd = new FormData(form);
  for (const [key, value] of fd.entries()) {
    if (data[key] !== undefined) data[key] = [].concat(data[key], value);
    else data[key] = value;
  }
  form.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    if (!cb.name) return;
    if (!(cb.name in data)) data[cb.name] = false;
    else if (data[cb.name] === "on") data[cb.name] = true;
  });
  return data;
}

function loadSample() {
  fillFormsFromData(SAMPLE, true);
  showToast(t("toastSample"));
  location.hash = "#packet";
}

document.querySelectorAll("form[data-form]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const id = form.dataset.form;
    state.data[id] = serializeForm(form);
    state.completed[id] = true;
    if (id === "enrollment" || id === "financial") {
      applyCarryForward({ force: true });
      hydrateForms();
    }
    saveState(state);
    renderLists();
    showToast(
      id === "enrollment"
        ? lang === "es"
          ? "Guardado — datos copiados a los demás formularios"
          : "Saved — shared details carried to the other forms"
        : t("toastSaved")
    );
  });
});

document.getElementById("resetDemo")?.addEventListener("click", () => {
  if (!confirm(t("confirmReset"))) return;
  state = { completed: {}, data: {} };
  saveState(state);
  document.querySelectorAll("form[data-form]").forEach((f) => f.reset());
  renderLists();
  showToast(t("toastReset"));
  location.hash = "#home";
});

document.getElementById("printDemo")?.addEventListener("click", () => window.print());
document.getElementById("loadSample")?.addEventListener("click", loadSample);
document.getElementById("loadSamplePacket")?.addEventListener("click", loadSample);

document.getElementById("langEn")?.addEventListener("click", () => {
  lang = "en";
  localStorage.setItem(LANG_KEY, lang);
  applyI18n();
});
document.getElementById("langEs")?.addEventListener("click", () => {
  lang = "es";
  localStorage.setItem(LANG_KEY, lang);
  applyI18n();
});

window.addEventListener("hashchange", navigateFromHash);
hydrateForms();
applyI18n();
navigateFromHash();
