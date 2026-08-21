import React, { useState } from "react";
import ALC_CONFIG from "../config";
import { useEnrollment } from "../context/EnrollmentContext";
import { filesToUploadMeta, shouldRetainUploadData } from "../utils/uploadFileData";

export function UploadsView() {
  const { state, saveForm, uploadFile, t, navigateTo } = useEnrollment();

  const savedData = state.data?.uploads || {};
  const [upConfirm, setUpConfirm] = useState(!!savedData.upConfirm);

  const files = state.data?.uploads?.files || {};
  const uploadDefs = ALC_CONFIG.uploads || [];
  const requiredList = uploadDefs.filter((u) => u.required);
  const optionalList = uploadDefs.filter((u) => !u.required);

  const handleFileChange = async (e, def) => {
    const inputFiles = e.target.files;
    if (!inputFiles || inputFiles.length === 0) return;

    try {
      const metaList = await filesToUploadMeta(inputFiles, {
        uploadedBy: "parent",
        retainData: shouldRetainUploadData(def.id),
      });
      uploadFile(def.id, metaList, "parent");
    } catch (err) {
      console.error("Upload failed:", err);
    }

    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = requiredList.filter((u) => !(files[u.id] || []).length);
    if (missing.length > 0) {
      const ok = window.confirm(
        `Missing required documents:\n• ${missing.map((m) => m.label).join("\n• ")}\n\nSave anyway? Staff can upload missing files later.`
      );
      if (!ok) return;
    }

    saveForm("uploads", { upConfirm }, true);
  };

  const renderSlot = (def) => {
    const saved = files[def.id] || [];
    const hasFiles = saved.length > 0;

    let statusContent;
    if (hasFiles) {
      statusContent = (
        <span className="upload-status done">
          On file: {saved.map((f) => f.name).join(", ")}
        </span>
      );
    } else if (def.required) {
      statusContent = <span className="upload-status todo">Required</span>;
    } else {
      statusContent = <span className="upload-status">Optional</span>;
    }

    return (
      <div key={def.id} className="upload-row" data-upload-id={def.id}>
        <div className="upload-row-head">
          <strong>
            {def.label}
            {def.required ? " *" : ""}
          </strong>
          {statusContent}
        </div>
        {def.note ? <p className="hint">{def.note}</p> : null}
        <label className="upload-file-label">
          <span>Choose file{def.multiple ? "(s)" : ""}</span>
          <input
            type="file"
            name={`up_${def.id}`}
            data-upload-id={def.id}
            accept=".pdf,image/*"
            multiple={!!def.multiple}
            onChange={(e) => handleFileChange(e, def)}
          />
        </label>
      </div>
    );
  };

  return (
    <section id="view-uploads" className="view is-active">
      <form className="form-shell" data-form="uploads" onSubmit={handleSubmit} noValidate>
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
          <p className="eyebrow">Documents</p>
          <h2>Required uploads</h2>
          <p className="section-lead">
            Required: parent SSN document(s) (1 or 2), child SSN, birth certificate, immunization / shot records, proof of GA residency (any one parent), and parent/guardian photo ID(s). Optional: completed Meal Benefit (IES) form and credit card photos for automated billing. Staff can add any missing document later from the Staff view.
          </p>
        </div>

        <fieldset>
          <legend>Required for enrollment</legend>
          <div id="uploadSlots" className="upload-slots">
            {requiredList.map(renderSlot)}
          </div>
          <label className="check">
            <input
              type="checkbox"
              name="upConfirm"
              checked={upConfirm}
              onChange={(e) => setUpConfirm(e.target.checked)}
              required
            />
            I confirm these documents are accurate and complete for enrollment review (or will be completed by staff later).
          </label>
        </fieldset>

        <fieldset>
          <legend>Optional / if applicable</legend>
          <div id="uploadSlotsOptional" className="upload-slots">
            {optionalList.map(renderSlot)}
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" data-i18n="saveComplete">
            {t("saveComplete") || "Save & mark complete"}
          </button>
          <a
            href="#done"
            className="btn btn-secondary"
            data-nav="done"
            data-i18n="finishPacket"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("done");
            }}
          >
            {t("finishPacket") || "Finish packet →"}
          </a>
        </div>
      </form>
    </section>
  );
}

export default UploadsView;
