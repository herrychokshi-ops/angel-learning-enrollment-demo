# Angel Learning Center — Online Enrollment

Static multi-location enrollment portal for Angel Learning Center (ALC). Parents pick a center, complete the packet in the browser, download prefilled PDFs, and upload required documents. No parent login. Packet email + DocuSign wiring are planned next (not live yet).

**Live demo:** https://herrychokshi-ops.github.io/angel-learning-enrollment-demo/

---

## Who this is for

New developers joining the RevenelX / ALC enrollment project. This README covers local setup, repo layout, how forms work, config edits, and deploy.

---

## Prerequisites

| Tool | Notes |
|------|--------|
| **Git** | Clone and branch |
| **Node.js 18+** (optional) | Only for `node --check` / future tooling — not required to run the site |
| **Python 3** *or* any static file server | Serve the folder locally |
| Modern browser | Chrome / Edge / Firefox / Safari |

No `npm install` is required for day-to-day UI work. The app is plain HTML/CSS/JS plus a CDN copy of jsPDF.

---

## Quick start (local)

```bash
git clone https://github.com/herrychokshi-ops/angel-learning-enrollment-demo.git
cd angel-learning-enrollment-demo
git checkout master
```

Serve the repo root (must be the folder that contains `index.html`):

```bash
# Option A — Python
python3 -m http.server 8765

# Option B — Node (if you have npx)
npx --yes serve -l 8765 .
```

Open:

**http://localhost:8765/**

Useful pages:

| URL | Purpose |
|-----|---------|
| `/` or `/index.html` | Main enrollment portal |
| `/mockups.html` | Email / delivery story mockups |
| `/questionnaire.html` | Client intake questionnaire UI |

> **Important:** Open via `http://localhost…`, not `file://`. File uploads, PDF generation (jsPDF CDN), and some browser APIs behave poorly on `file://`.

---

## Resetting demo data

Progress is stored in the browser (`localStorage` key `alc-enrollment-v1-multi`).

- Use **Reset packet** in the top nav, or  
- DevTools → Application → Local Storage → clear this origin.

---

## Repository layout

```
.
├── index.html              # Main app shell + all form markup
├── app.js                  # Routing, state, checklist, uploads, carry-forward
├── config.js               # Locations, programs, schools, uploads, email, handbook
├── packet-pdf.js           # Client-side PDF generation (jsPDF)
├── styles.css              # Brand + layout + print styles
├── mockups.html            # Product / email flow mockups
├── questionnaire.html      # Client questionnaire capture
├── assets/
│   ├── logo.png
│   ├── icon.png
│   └── Parent-Handbook-2026.pdf
├── data/                   # Intake snapshots & decisions (JSON, not runtime-required)
│   ├── client-intake-normalized.json
│   ├── v1-decisions.json
│   ├── schools-by-location.json
│   └── alc-enrollment-questionnaire-2026-08-06.json
├── .github/workflows/pages.yml   # GitHub Pages deploy
└── vercel.json             # cleanUrls if hosting on Vercel
```

Runtime config is **`config.js`** → `window.ALC_CONFIG`.  
`data/*.json` is documentation / intake history for the team—not loaded by the live page unless you wire it later.

---

## Product behavior (current)

### Parent flow

1. Open the public link (one URL for all locations).
2. Choose an ALC center.
3. Complete checklist forms (transport only if program needs it).
4. Download blank Meal Benefit (IES) PDF → complete offline → upload in Documents.
5. Sign handbook + photo/video permission.
6. Upload required documents.
7. On **Done**, download prefilled PDFs for the front desk.

### Forms (checklist)

| # | ID | Notes |
|---|-----|--------|
| 01 | `enrollment` | Child, guardians (incl. father employer), **2 emergency contacts** (not parents) |
| 02 | `financial` | Tuition agreement; **optional 2nd responsible party**; Next button always visible |
| 03 | `transport` | Only if program has `transport: true` (Pre-K / before-after / summer, etc.) |
| 04 | `emergency` | Vehicle emergency medical; parent **cell** phones |
| 05 | `ies` | **Not filled online** — download blank official form, upload completed copy |
| 06 | `handbook` | Parent Handbook 2026 acknowledgment |
| 07 | `photo` | **Required** signed photo/video permission |
| 08 | `uploads` | Required docs (SSNs, birth cert, shots, GA residency, parent IDs, completed IES) |

Staff can attach missing documents later via **Staff** (`#staff`).

### Required document uploads

Configured in `config.js` → `uploads[]` (`required: true`):

- Parent SSN document(s) (1–2)
- Child SSN document
- Birth certificate
- Immunization / shot records (GA Form 3231)
- Proof of GA residency (any one parent)
- Parent / guardian photo ID(s)
- Completed Meal Benefit (IES) form

Uploads in this static demo store **file metadata in `localStorage`** (not durable cloud storage).

---

## Configuration guide

Edit **`config.js`** for most product changes:

| Area | Key |
|------|-----|
| Centers | `locations.*` (`enabled`, `inbox`, `address`, `phone`, `hours`, `hospital`) |
| Programs | `programs[]` (`id`, `label`, `transport`) |
| Bus schools | `transport.schools.<locationId>[]` |
| Required uploads | `uploads[]` |
| Handbook text / PDF | `handbook` |
| Email subject / CC | `email` |
| Soft-launch flags | `v1Locations`, location `enabled` |

After changing `config.js`, hard-refresh the browser (cache).

### Demo / sample data

`app.js` → `SAMPLE` object powers **Load sample (Savannah)**. Update it when form fields change so demos stay accurate.

---

## Local development tips

### Sanity checks

```bash
node --check app.js
node --check config.js
node --check packet-pdf.js
```

### Branching

```bash
git checkout master
git pull origin master
git checkout -b cursor/short-description-6c87   # or your team branch convention
```

Push and open a PR into `master`. GitHub Pages deploys from **`master`** on push.

### Print & PDF

- **Print webpage** prints only the **active** view (see `@media print` in `styles.css`).
- **Download … PDF** uses jsPDF from CDN (`cdnjs`) + `packet-pdf.js`.
- If downloads fail: hard refresh, allow multiple downloads in the browser, confirm network can reach the jsPDF CDN.
- Blank IES: Meal Benefit step → **Download blank IES PDF**.

---

## Deploy

### GitHub Pages (current production demo)

- Workflow: `.github/workflows/pages.yml`
- Branch: `master`
- Environment: `github-pages`
- URL: https://herrychokshi-ops.github.io/angel-learning-enrollment-demo/

After merging to `master`, check:

https://github.com/herrychokshi-ops/angel-learning-enrollment-demo/actions

### Vercel (optional)

`vercel.json` enables `cleanUrls`. Link the repo in Vercel and deploy the root; no build step required for the static site.

---

## Architecture notes

- **No backend** in V1 static demo — all state is client-side.
- **Carry-forward:** saving Enrollment copies name/address/contacts into later forms (`applyCarryForward` in `app.js`).
- **Hash routing:** `#home`, `#packet`, `#enrollment`, `#financial`, … `#staff`, `#done`.
- **i18n:** Spanish strings exist; product default is English (`config.product.language`).
- **Security:** do not add typed full SSN fields without an approved encrypted backend. Current policy = document uploads only.

---

## Contacts & stakeholders

| Role | Name | Email |
|------|------|--------|
| Owner (ALC) | Laukik Patel | lpatel@angellearningcenter.com |
| ALC | Hardik Patel | hpatel@angellearningcenter.com |
| Ops (RevenelX) | Sash K | sash@revenelx.com |

Client decisions / open engineering work: `data/v1-decisions.json`.

---

## Known next engineering (not done yet)

From `data/v1-decisions.json`:

1. Wire real center email (Resend / SES / Workspace SMTP) — PDFs are download-only today  
2. DocuSign account + envelopes  
3. Durable secure upload storage (S3/Blob) — replace `localStorage` file metadata  
4. Confirm owner CC spelling / addresses  
5. Host on ALC’s own server when client is ready (they provide hosting per proposal)

---

## Manual QA checklist (new release)

- [ ] Pick Savannah → Enrollment saves; father employer fields present  
- [ ] Two emergency contacts required; hint says not parents  
- [ ] Financial: optional 2nd party; **Next** goes to Transport *or* Emergency  
- [ ] Transport hidden unless Pre-K / before-after / summer selected  
- [ ] Emergency: father/mother **cell** fields  
- [ ] Meal Benefit: blank PDF downloads; Documents has “Completed IES” slot  
- [ ] Photo / Video form signs and shows on checklist  
- [ ] Parent ID required in Documents  
- [ ] Done: Enrollment PDF + Financial PDF + Full packet download  
- [ ] Print webpage ≈ one screen (not dozens of empty pages)  
- [ ] Staff view can add a missing document  

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Blank page / scripts fail | Use `http://localhost`, not `file://` |
| Old UI after pull | Hard refresh (Ctrl/Cmd+Shift+R); clear site data |
| PDF buttons do nothing | Check console for jsPDF CDN block; refresh; allow multiple downloads |
| Transport missing / stuck | Transport only for transport-eligible programs; Financial Next should still go to Emergency |
| Forms “already filled” | Click **Reset packet** |
| Pages deploy fails | Ensure workflow job has `environment: github-pages` (see `pages.yml`) |

---

## License / confidentiality

Client project for Angel Learning Center. Treat enrollment data, SSNs, and uploads as sensitive. Do not commit real parent PII into the repo.
