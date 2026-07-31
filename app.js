const FORMS = [
  {
    id: "enrollment",
    num: "01",
    titleKey: "formEnrollment",
    blurbKey: "blurbEnrollment",
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

const DEMO_USERS = {
  parent: { email: "parent@angellearning.demo", password: "parent123", name: "Sofia Rivera", role: "parent" },
  staff: { email: "staff@angellearning.demo", password: "staff123", name: "Mrs. T. Johnson", role: "staff" },
};

const AUTH_KEY = "alc-enrollment-auth-v1";
const ACCOUNTS_KEY = "alc-enrollment-accounts-v1";

const I18N = {
  en: {
    demoBanner: "Interactive mockup · not live data",
    demoBannerHint: "· for demonstration only",
    portalLabel: "Parent Portal · Demo",
    navHome: "Home",
    navForms: "Forms",
    navStaff: "Staff view",
    resetDemo: "Reset demo",
    authKicker: "Secure parent & staff access",
    authTitle: "Sign in to your portal",
    authLead: "Parents complete enrollment online. Staff review submitted packets in one place.",
    roleParent: "Parent",
    roleStaff: "Staff",
    authEmail: "Email",
    authPassword: "Password",
    authRemember: "Keep me signed in on this device",
    authSignIn: "Sign in",
    authCreate: "Create account",
    authNeedAccount: "Need an account? Create one",
    authHaveAccount: "Already have an account? Sign in",
    authSignOut: "Sign out",
    demoCredsTitle: "Demo logins (click to fill)",
    authError: "Invalid email or password. Try a demo login below.",
    authExists: "An account with that email already exists. Sign in instead.",
    authCreated: "Account created — you’re signed in",
    authWelcome: "Welcome back",
    hours: "Mon–Fri 6:30 AM – 5:30 PM",
    heroKicker: "Enrollment packet · 2026–2027",
    heroLead:
      "Complete every required form online — enrollment, tuition, transportation, emergency contacts, and CACFP meal benefits — in one guided flow.",
    ctaStart: "Start enrollment packet",
    ctaSample: "Load sample child",
    ctaJump: "Jump to a form",
    overviewTitle: "What parents complete online",
    overviewLead: "Replaces paper PDFs and Word docs with a single, mobile-friendly experience.",
    packetEyebrow: "Your packet",
    packetTitle: "Enrollment checklist",
    packetLead: "Progress saves in this browser for the demo. Click any form to fill it out.",
    progress: "{n} of {total} complete",
    statusDone: "Complete",
    statusTodo: "To do",
    backPacket: "← Back to packet",
    backHome: "← Back to home",
    saveComplete: "Save & mark complete",
    toastSaved: "Saved — form marked complete",
    toastSample: "Sample family loaded — open any form to review",
    toastReset: "Demo reset",
    toastSubmitted: "Packet sent to staff inbox",
    confirmReset: "Clear all demo form progress on this device?",
    doneStrong: "Packet submitted for review",
    doneText:
      "Thank you. Your enrollment forms are ready for Angel Learning Center staff to review. You’ll receive confirmation once everything is verified.",
    doneEyebrow: "Submission summary",
    doneTitle: "You’re all set",
    doneLead: "Here’s what was completed in this packet. Staff can open the received packet view to process it.",
    viewStaff: "Sign in as staff to review",
    reviewChecklist: "Review checklist",
    printPreview: "Print / PDF preview",
    staffEyebrow: "Center operations",
    staffTitle: "Received enrollment packets",
    staffLead:
      "What staff would see when a parent finishes the online packet — timestamps, form status, and child details in one place.",
    staffEmpty: "No packets yet. Complete the parent flow (or load sample data and finish) to see one appear here.",
    staffChild: "Child",
    staffSubmitted: "Submitted",
    staffForms: "Forms complete",
    staffParent: "Primary parent",
    staffPhone: "Phone",
  },
  es: {
    demoBanner: "Maqueta interactiva · no es información real",
    demoBannerHint: "· solo para demostración",
    portalLabel: "Portal para padres · Demo",
    navHome: "Inicio",
    navForms: "Formularios",
    navStaff: "Vista del personal",
    resetDemo: "Reiniciar demo",
    authKicker: "Acceso seguro para padres y personal",
    authTitle: "Inicie sesión en su portal",
    authLead: "Los padres completan la inscripción en línea. El personal revisa los paquetes en un solo lugar.",
    roleParent: "Padre/Madre",
    roleStaff: "Personal",
    authEmail: "Correo electrónico",
    authPassword: "Contraseña",
    authRemember: "Mantener sesión en este dispositivo",
    authSignIn: "Iniciar sesión",
    authCreate: "Crear cuenta",
    authNeedAccount: "¿Necesita una cuenta? Créela aquí",
    authHaveAccount: "¿Ya tiene cuenta? Inicie sesión",
    authSignOut: "Cerrar sesión",
    demoCredsTitle: "Accesos demo (pulse para llenar)",
    authError: "Correo o contraseña incorrectos. Pruebe un acceso demo abajo.",
    authExists: "Ya existe una cuenta con ese correo. Inicie sesión.",
    authCreated: "Cuenta creada — sesión iniciada",
    authWelcome: "Bienvenido/a",
    hours: "Lun–Vie 6:30 AM – 5:30 PM",
    heroKicker: "Paquete de inscripción · 2026–2027",
    heroLead:
      "Complete todos los formularios requeridos en línea — inscripción, matrícula, transporte, emergencias y beneficios de comidas CACFP — en un solo flujo.",
    ctaStart: "Comenzar paquete de inscripción",
    ctaSample: "Cargar niño de ejemplo",
    ctaJump: "Ir a un formulario",
    overviewTitle: "Lo que los padres completan en línea",
    overviewLead: "Reemplaza PDFs y documentos Word con una experiencia móvil y sencilla.",
    packetEyebrow: "Su paquete",
    packetTitle: "Lista de inscripción",
    packetLead: "El progreso se guarda en este navegador para la demo. Pulse cualquier formulario.",
    progress: "{n} de {total} completados",
    statusDone: "Completo",
    statusTodo: "Pendiente",
    backPacket: "← Volver al paquete",
    backHome: "← Volver al inicio",
    saveComplete: "Guardar y marcar completo",
    toastSaved: "Guardado — formulario marcado completo",
    toastSample: "Familia de ejemplo cargada — abra cualquier formulario",
    toastReset: "Demo reiniciada",
    toastSubmitted: "Paquete enviado a la bandeja del personal",
    confirmReset: "¿Borrar todo el progreso de la demo en este dispositivo?",
    doneStrong: "Paquete enviado para revisión",
    doneText:
      "Gracias. Sus formularios están listos para que el personal de Angel Learning Center los revise. Recibirá confirmación cuando todo esté verificado.",
    doneEyebrow: "Resumen de envío",
    doneTitle: "Todo listo",
    doneLead: "Esto es lo que se completó. El personal puede abrir la bandeja de paquetes recibidos.",
    viewStaff: "Entrar como personal para revisar",
    reviewChecklist: "Revisar lista",
    printPreview: "Imprimir / vista PDF",
    staffEyebrow: "Operaciones del centro",
    staffTitle: "Paquetes de inscripción recibidos",
    staffLead:
      "Lo que vería el personal cuando un padre termina el paquete en línea — marcas de tiempo, estado y datos del niño.",
    staffEmpty: "Aún no hay paquetes. Complete el flujo de padres (o cargue datos de ejemplo y termine) para ver uno aquí.",
    staffChild: "Niño",
    staffSubmitted: "Enviado",
    staffForms: "Formularios completos",
    staffParent: "Padre/madre principal",
    staffPhone: "Teléfono",
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
    finAgree: "He leído este acuerdo y acepto voluntariamente ser personalmente responsable de todos los montos adeudados.",
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

const STORAGE_KEY = "alc-enrollment-demo-v2";
const LANG_KEY = "alc-enrollment-lang";

let currentRole = "parent";
let currentUser = null;

function loadAccounts() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function loadAuth() {
  try {
    return (
      JSON.parse(sessionStorage.getItem(AUTH_KEY)) ||
      JSON.parse(localStorage.getItem(AUTH_KEY)) ||
      null
    );
  } catch {
    return null;
  }
}

function persistAuth(user, remember) {
  const payload = JSON.stringify(user);
  sessionStorage.setItem(AUTH_KEY, payload);
  if (remember) localStorage.setItem(AUTH_KEY, payload);
  else localStorage.removeItem(AUTH_KEY);
}

function clearAuth() {
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
  currentUser = null;
}

function findUser(email, password) {
  const e = email.trim().toLowerCase();
  for (const demo of Object.values(DEMO_USERS)) {
    if (demo.email === e && demo.password === password) return { ...demo };
  }
  const created = loadAccounts().find((a) => a.email === e && a.password === password);
  if (created) return { ...created };
  return null;
}

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

function loadState() {
  try {
    return (
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        completed: {},
        data: {},
        submissions: [],
      }
    );
  } catch {
    return { completed: {}, data: {}, submissions: [] };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();
if (!state.submissions) state.submissions = [];
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
  const chip = document.getElementById("userChip");
  if (chip && currentUser) {
    chip.textContent = `${currentUser.name} · ${
      currentUser.role === "staff" ? t("roleStaff") : t("roleParent")
    }`;
  }
  renderLists();
  renderStaff();
}

function showToast(message) {
  const el = document.getElementById("toast");
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

function renderStaff() {
  const box = document.getElementById("staffInbox");
  if (!box) return;
  if (!state.submissions.length) {
    box.innerHTML = `<div class="staff-empty">${t("staffEmpty")}</div>`;
    return;
  }

  box.innerHTML = [...state.submissions]
    .reverse()
    .map((sub) => {
      const formsHtml = FORMS.map((f) => {
        const ok = sub.completed?.[f.id];
        return `<span class="status ${ok ? "done" : ""}">${formTitle(f)}: ${
          ok ? t("statusDone") : t("statusTodo")
        }</span>`;
      }).join(" ");
      return `
        <article class="staff-card">
          <h3>${t("staffChild")}: ${sub.childName || "—"}</h3>
          <div class="staff-meta">
            <span>${t("staffSubmitted")}: ${new Date(sub.submittedAt).toLocaleString()}</span>
            <span>${t("staffForms")}: ${sub.formsComplete}/${FORMS.length}</span>
            <span>${t("staffParent")}: ${sub.parentName || "—"}</span>
            <span>${t("staffPhone")}: ${sub.phone || "—"}</span>
          </div>
          <div class="chip-group">${formsHtml}</div>
        </article>
      `;
    })
    .join("");
}

function setAuthMode(mode) {
  const signIn = document.getElementById("signInForm");
  const signUp = document.getElementById("signUpForm");
  const showUp = document.getElementById("showSignUp");
  const showIn = document.getElementById("showSignIn");
  const isUp = mode === "signup";
  if (signIn) signIn.hidden = isUp;
  if (signUp) signUp.hidden = !isUp;
  if (showUp) showUp.hidden = isUp;
  if (showIn) showIn.hidden = !isUp;
  const authErr = document.getElementById("authError");
  const signUpErr = document.getElementById("signUpError");
  if (authErr) authErr.hidden = true;
  if (signUpErr) signUpErr.hidden = true;
}

function setRole(role) {
  currentRole = role;
  document.querySelectorAll(".role-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.role === role);
  });
  const demo = DEMO_USERS[role];
  const email = document.getElementById("authEmail");
  const pass = document.getElementById("authPassword");
  if (email && !email.value) email.value = demo.email;
  if (pass && !pass.value) pass.value = demo.password;
}

function enterApp(user, { silent = false } = {}) {
  currentUser = user;
  const auth = document.getElementById("authScreen");
  const shell = document.getElementById("appShell");
  if (auth) auth.hidden = true;
  if (shell) shell.hidden = false;

  const chip = document.getElementById("userChip");
  if (chip) chip.hidden = false;

  const staffLink = document.getElementById("navStaffLink");
  if (staffLink) staffLink.style.display = user.role === "staff" ? "" : "none";

  applyI18n();
  if (user.role === "staff") {
    if (location.hash !== "#staff") location.hash = "#staff";
    else navigateFromHash();
  } else if (!location.hash || location.hash === "#" || location.hash === "#staff") {
    location.hash = "#home";
  } else {
    navigateFromHash();
  }
  if (!silent) showToast(`${t("authWelcome")}, ${user.name.split(" ")[0]}`);
}

function showAuth() {
  const auth = document.getElementById("authScreen");
  const shell = document.getElementById("appShell");
  if (auth) auth.hidden = false;
  if (shell) shell.hidden = true;
  setAuthMode("signin");
  setRole(currentRole);
}

function showView(id) {
  if (!currentUser) {
    showAuth();
    return;
  }
  let viewId = id || "home";
  if (viewId === "staff" && currentUser.role !== "staff") {
    viewId = "home";
    location.hash = "#home";
  }
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
  const el = document.getElementById(`view-${viewId}`);
  if (el) {
    el.classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById("view-home")?.classList.add("is-active");
  }
  if (viewId === "staff") renderStaff();
  if (viewId === "done") maybeSubmitPacket();
  renderLists();
}

function navigateFromHash() {
  if (!currentUser) {
    showAuth();
    return;
  }
  const id = (location.hash || "#home").slice(1) || "home";
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

function maybeSubmitPacket() {
  const n = completedCount();
  if (n < 1) return;
  const childName =
    state.data.enrollment?.childFirst && state.data.enrollment?.childLast
      ? `${state.data.enrollment.childFirst} ${state.data.enrollment.childLast}`
      : state.data.financial?.finChildName || "Sample child";
  const parentName =
    state.data.financial?.rpName ||
    `${state.data.enrollment?.momFirst || ""} ${state.data.enrollment?.momLast || ""}`.trim();
  const phone = state.data.enrollment?.momCell || state.data.financial?.rpPhone || "";
  const fingerprint = `${childName}|${n}|${Object.keys(state.completed).sort().join(",")}`;
  const already = state.submissions.some((s) => s.fingerprint === fingerprint);
  if (already) {
    renderStaff();
    return;
  }
  state.submissions.push({
    fingerprint,
    childName,
    parentName,
    phone,
    submittedAt: new Date().toISOString(),
    formsComplete: n,
    completed: { ...state.completed },
  });
  saveState(state);
  renderStaff();
  showToast(t("toastSubmitted"));
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
    saveState(state);
    renderLists();
    showToast(t("toastSaved"));
  });
});

document.getElementById("resetDemo")?.addEventListener("click", () => {
  if (!confirm(t("confirmReset"))) return;
  state = { completed: {}, data: {}, submissions: [] };
  saveState(state);
  document.querySelectorAll("form[data-form]").forEach((f) => f.reset());
  renderLists();
  renderStaff();
  showToast(t("toastReset"));
  location.hash = "#home";
});

document.getElementById("printDemo")?.addEventListener("click", () => window.print());
document.getElementById("loadSample")?.addEventListener("click", loadSample);
document.getElementById("loadSamplePacket")?.addEventListener("click", loadSample);

document.getElementById("switchToStaff")?.addEventListener("click", () => {
  clearAuth();
  showAuth();
  setRole("staff");
  const demo = DEMO_USERS.staff;
  document.getElementById("authEmail").value = demo.email;
  document.getElementById("authPassword").value = demo.password;
  setAuthMode("signin");
});

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

document.querySelectorAll(".role-tab").forEach((btn) => {
  btn.addEventListener("click", () => setRole(btn.dataset.role));
});

document.querySelectorAll(".cred-chip").forEach((btn) => {
  btn.addEventListener("click", () => {
    const role = btn.dataset.fill;
    setRole(role);
    setAuthMode("signin");
    const demo = DEMO_USERS[role];
    document.getElementById("authEmail").value = demo.email;
    document.getElementById("authPassword").value = demo.password;
    document.getElementById("authError")?.setAttribute("hidden", "");
  });
});

document.getElementById("showSignUp")?.addEventListener("click", () => setAuthMode("signup"));
document.getElementById("showSignIn")?.addEventListener("click", () => setAuthMode("signin"));

document.getElementById("signInForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  const remember = document.getElementById("authRemember")?.checked;
  const err = document.getElementById("authError");
  let user = findUser(email, password);
  if (!user) {
    if (err) {
      err.hidden = false;
      err.textContent = t("authError");
    }
    return;
  }
  // If they used parent/staff tab, prefer that role for demo accounts
  if (user.email === DEMO_USERS.parent.email) user.role = "parent";
  if (user.email === DEMO_USERS.staff.email) user.role = "staff";
  if (err) err.hidden = true;
  persistAuth(user, remember);
  enterApp(user);
});

document.getElementById("signUpForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signUpName").value.trim();
  const email = document.getElementById("signUpEmail").value.trim().toLowerCase();
  const password = document.getElementById("signUpPassword").value;
  const err = document.getElementById("signUpError");
  const exists =
    Object.values(DEMO_USERS).some((u) => u.email === email) ||
    loadAccounts().some((a) => a.email === email);
  if (exists) {
    if (err) {
      err.hidden = false;
      err.textContent = t("authExists");
    }
    return;
  }
  const user = { email, password, name, role: currentRole === "staff" ? "staff" : "parent" };
  const accounts = loadAccounts();
  accounts.push(user);
  saveAccounts(accounts);
  if (err) err.hidden = true;
  persistAuth(user, true);
  showToast(t("authCreated"));
  enterApp(user);
});

document.getElementById("signOutBtn")?.addEventListener("click", () => {
  clearAuth();
  location.hash = "";
  showAuth();
  showToast(t("authSignOut"));
});

window.addEventListener("hashchange", navigateFromHash);
hydrateForms();
applyI18n();

const existing = loadAuth();
if (existing) {
  enterApp(existing, { silent: true });
} else {
  showAuth();
  setRole("parent");
  const demo = DEMO_USERS.parent;
  document.getElementById("authEmail").value = demo.email;
  document.getElementById("authPassword").value = demo.password;
}
