import React, { useState, useEffect } from "react";
import { useEnrollment } from "../context/EnrollmentContext";

export function HandbookView() {
  const { state, saveForm, applyCarryForward, t, navigateTo } = useEnrollment();

  const savedData = state.data?.handbook || {};

  const [formData, setFormData] = useState({
    hbAgree: !!savedData.hbAgree,
    hbPrint: savedData.hbPrint || "",
    hbDate: savedData.hbDate || "",
    hbSignature: savedData.hbSignature || "",
    hbChild: savedData.hbChild || "",
  });

  useEffect(() => {
    applyCarryForward({ force: false, onlyForm: "handbook" });
  }, [applyCarryForward]);

  useEffect(() => {
    const hb = state.data?.handbook || {};
    setFormData((prev) => ({
      ...prev,
      ...hb,
      hbAgree: !!hb.hbAgree,
    }));
  }, [state.data?.handbook]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    saveForm("handbook", formData, true);
  };

  const showPrefillNotice = !!(
    state.data?.enrollment?.childFirst ||
    state.data?.enrollment?.momFirst ||
    state.data?.enrollment?.dadFirst
  );

  return (
    <section id="view-handbook" className="view is-active">
      <form className="form-shell" data-form="handbook" onSubmit={handleSubmit} noValidate>
        <div className="page-head">
          <a
            href="#packet"
            className="back"
            data-nav="packet"
            data-i18n="backPacket"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("packet");
            }}
          >
            {t("backPacket") || "← Back to packet"}
          </a>
          <p className="eyebrow">Handbook · 2026</p>
          <h2>Parent Handbook Acknowledgment</h2>
          <p className="section-lead">
            Official 56-page Parent Handbook (2026). Please open and review, then sign the acknowledgment used at enrollment.
          </p>
          <p className="hero-cta" style={{ marginBottom: "1rem" }}>
            <a
              className="btn btn-secondary"
              href="assets/Parent-Handbook-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Parent Handbook 2026 (PDF)
            </a>
          </p>
          {showPrefillNotice ? (
            <p className="prefill-notice">
              Name, address, and contact fields were filled from the Enrollment form so you don’t retype them. Edit anything that needs changes.
            </p>
          ) : null}
        </div>

        <fieldset className="agreement-box">
          <legend>Acknowledgment</legend>
          <div className="scroll-terms">
            <p id="hbAckText">
              I acknowledge that I have received and read the Angel Learning Center Parent Handbook. I understand the policies, procedures, and expectations contained within and agree to abide by them while my child is enrolled at Angel Learning Center. I understand that policies may be updated as needed, and I will be notified of any changes.
            </p>
            <p className="hint">
              Source: Parent Handbook 2026 · contact info@angellearningcenter.com · agreements section (end of handbook).
            </p>
          </div>
          <label className="check">
            <input
              type="checkbox"
              name="hbAgree"
              checked={formData.hbAgree}
              onChange={handleChange}
              required
            />
            I have received and read the 2026 Parent Handbook and agree to its policies.
          </label>
          <div className="grid-2">
            <label>
              Printed name
              <input
                name="hbPrint"
                className="signature"
                value={formData.hbPrint}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Date
              <input type="date" name="hbDate" value={formData.hbDate} onChange={handleChange} />
            </label>
          </div>
          <label>
            Parent / guardian signature
            <input
              name="hbSignature"
              className="signature"
              placeholder="Type full legal name"
              value={formData.hbSignature}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Child’s full name
            <input
              name="hbChild"
              placeholder="As on enrollment"
              value={formData.hbChild}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" data-i18n="saveComplete">
            {t("saveComplete") || "Save & mark complete"}
          </button>
          <a
            href="#photo"
            className="btn btn-secondary"
            data-nav="photo"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("photo");
            }}
          >
            Next: Photo / Video →
          </a>
        </div>
      </form>
    </section>
  );
}

export default HandbookView;
