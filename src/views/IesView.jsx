import React, { useState, useEffect } from "react";
import { downloadBlankIesPdf } from "../pdf/pdfGenerator";
import { useEnrollment } from "../context/EnrollmentContext";

export function IesView() {
  const { state, saveForm, applyCarryForward, showToast, t, navigateTo } = useEnrollment();

  const savedData = state.data?.ies || {};

  const [formData, setFormData] = useState({
    iesDownloadAck: !!savedData.iesDownloadAck,
    iesAckPrint: savedData.iesAckPrint || "",
    iesAckDate: savedData.iesAckDate || "",
  });

  useEffect(() => {
    applyCarryForward({ force: false, onlyForm: "ies" });
  }, [applyCarryForward]);

  useEffect(() => {
    const ies = state.data?.ies || {};
    setFormData((prev) => ({
      ...prev,
      ...ies,
      iesDownloadAck: !!ies.iesDownloadAck,
    }));
  }, [state.data?.ies]);

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
    saveForm("ies", formData, true);
  };

  const handleDownloadBlank = async () => {
    try {
      await downloadBlankIesPdf();
      showToast("Blank IES PDF downloaded — complete offline, then upload in Documents if applicable");
    } catch (err) {
      console.error(err);
      showToast("Blank IES download failed");
    }
  };

  return (
    <section id="view-ies" className="view is-active">
      <form className="form-shell" data-form="ies" onSubmit={handleSubmit} noValidate>
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
          <p className="eyebrow">CACFP · Meal benefit</p>
          <h2>Meal Benefit Form (official CACFP)</h2>
          <p className="section-lead">
            The Income Eligibility Statement must match the official Georgia Bright from the Start / USDA CACFP
            form word-for-word. Download the official blank PDF, complete it offline if needed, and optionally
            upload the finished form in Documents.
          </p>
        </div>

        <fieldset>
          <legend>Official form — download &amp; upload</legend>
          <p>
            Use the official Georgia Bright from the Start / USDA CACFP Meal Benefit Income Eligibility Statement.
            Complete every field on the official form, sign it, and optionally upload the completed PDF in Documents
            under <strong>Completed Meal Benefit (IES)</strong>.
          </p>
          <div className="hero-cta" style={{ marginBottom: "1rem" }}>
            <button
              type="button"
              className="btn btn-primary"
              id="downloadBlankIes"
              onClick={handleDownloadBlank}
            >
              Download blank IES PDF
            </button>
          </div>
          <p className="hint">
            Little Angels (infants): also complete any infant feeding / affidavit pages included with the center’s CACFP packet.
          </p>
        </fieldset>

        <fieldset className="agreement-box">
          <legend>Acknowledgment</legend>
          <label className="check">
            <input
              type="checkbox"
              name="iesDownloadAck"
              checked={formData.iesDownloadAck}
              onChange={handleChange}
              required
            />
            I understand how to complete the official Meal Benefit (IES) form and may upload it in Documents when applicable.
          </label>
          <div className="grid-2">
            <label>
              Printed name
              <input
                name="iesAckPrint"
                className="signature"
                value={formData.iesAckPrint}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Date
              <input
                type="date"
                name="iesAckDate"
                value={formData.iesAckDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" data-i18n="saveComplete">
            {t("saveComplete") || "Save & mark complete"}
          </button>
          <a
            href="#handbook"
            className="btn btn-secondary"
            data-nav="handbook"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("handbook");
            }}
          >
            Next: Handbook →
          </a>
        </div>
      </form>
    </section>
  );
}

export default IesView;
