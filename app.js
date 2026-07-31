const FORMS = [
  {
    id: "enrollment",
    num: "01",
    title: "Enrollment Form",
    blurb: "Child & guardian details, emergency contacts, care hours",
  },
  {
    id: "financial",
    num: "02",
    title: "Financial Responsibility & Tuition",
    blurb: "Responsible party info and payment agreement",
  },
  {
    id: "transport",
    num: "03",
    title: "Transportation Agreement",
    blurb: "School pickup authorization and schedule",
  },
  {
    id: "emergency",
    num: "04",
    title: "Vehicle Emergency Medical",
    blurb: "Doctor, allergies, and emergency care consent",
  },
  {
    id: "ies",
    num: "05",
    title: "CACFP Meal Benefit (IES)",
    blurb: "Income eligibility statement for 2026–2027",
  },
];

const STORAGE_KEY = "alc-enrollment-demo-v1";

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

function showToast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.hidden = false;
  el.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    el.classList.remove("show");
  }, 2200);
}

function completedCount() {
  return FORMS.filter((f) => state.completed[f.id]).length;
}

function renderLists() {
  const makeItem = (form, asLink = true) => {
    const done = !!state.completed[form.id];
    const inner = `
      <span class="form-num">${form.num}</span>
      <span class="form-meta">
        <strong>${form.title}</strong>
        <span>${form.blurb}</span>
      </span>
      <span class="status ${done ? "done" : ""}">${done ? "Complete" : "To do"}</span>
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
  if (text) text.textContent = `${n} of ${FORMS.length} complete`;
}

function showView(id) {
  const viewId = id || "home";
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
  const el = document.getElementById(`view-${viewId}`);
  if (el) {
    el.classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById("view-home")?.classList.add("is-active");
  }
  renderLists();
}

function navigateFromHash() {
  const id = (location.hash || "#home").slice(1) || "home";
  showView(id);
}

function hydrateForms() {
  document.querySelectorAll("form[data-form]").forEach((form) => {
    const id = form.dataset.form;
    const data = state.data[id] || {};
    Object.entries(data).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (!field) return;
      if (field instanceof RadioNodeList) {
        [...field].forEach((input) => {
          if (input.type === "checkbox" || input.type === "radio") {
            input.checked = Array.isArray(value) ? value.includes(input.value || "on") : !!value;
          }
        });
        return;
      }
      if (field.type === "checkbox") {
        field.checked = !!value;
      } else if (field.type === "radio") {
        field.checked = field.value === value;
      } else {
        field.value = value ?? "";
      }
    });
  });
}

function serializeForm(form) {
  const data = {};
  const fd = new FormData(form);
  for (const [key, value] of fd.entries()) {
    if (data[key] !== undefined) {
      data[key] = [].concat(data[key], value);
    } else {
      data[key] = value;
    }
  }
  form.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    if (!cb.name) return;
    if (!(cb.name in data)) data[cb.name] = false;
    else if (data[cb.name] === "on") data[cb.name] = true;
  });
  return data;
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
    showToast("Saved — form marked complete");
  });
});

document.body.addEventListener("click", (e) => {
  const link = e.target.closest("[data-nav]");
  if (!link) return;
  const nav = link.getAttribute("data-nav");
  if (!nav) return;
  // Let hash update drive the view
});

document.getElementById("resetDemo")?.addEventListener("click", () => {
  if (!confirm("Clear all demo form progress on this device?")) return;
  state = { completed: {}, data: {} };
  saveState(state);
  document.querySelectorAll("form[data-form]").forEach((f) => f.reset());
  renderLists();
  showToast("Demo reset");
  location.hash = "#home";
});

document.getElementById("printDemo")?.addEventListener("click", () => {
  window.print();
});

window.addEventListener("hashchange", navigateFromHash);
hydrateForms();
navigateFromHash();
renderLists();
