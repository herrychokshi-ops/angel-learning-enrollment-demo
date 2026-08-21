import React, { useState, useEffect } from "react";
import { useEnrollment } from "../context/EnrollmentContext";

export function PhotoView() {
  const { state, saveForm, applyCarryForward, t, navigateTo } = useEnrollment();

  const savedData = state.data?.photo || {};

  const [formData, setFormData] = useState({
    photoClassroom: !!savedData.photoClassroom,
    photoFamily: !!savedData.photoFamily,
    photoWeb: !!savedData.photoWeb,
    photoMarketing: !!savedData.photoMarketing,
    photoNone: !!savedData.photoNone,
    photoChild: savedData.photoChild || "",
    photoAgree: !!savedData.photoAgree,
    photoPrint: savedData.photoPrint || "",
    photoDate: savedData.photoDate || "",
    photoSignature: savedData.photoSignature || "",
  });

  useEffect(() => {
    applyCarryForward({ force: false, onlyForm: "photo" });
  }, [applyCarryForward]);

  useEffect(() => {
    const ph = state.data?.photo || {};
    setFormData((prev) => ({
      ...prev,
      ...ph,
      photoClassroom: !!ph.photoClassroom,
      photoFamily: !!ph.photoFamily,
      photoWeb: !!ph.photoWeb,
      photoMarketing: !!ph.photoMarketing,
      photoNone: !!ph.photoNone,
      photoAgree: !!ph.photoAgree,
    }));
  }, [state.data?.photo]);

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
    saveForm("photo", formData, true);
  };

  const showPrefillNotice = !!(
    state.data?.enrollment?.childFirst ||
    state.data?.enrollment?.momFirst ||
    state.data?.enrollment?.dadFirst
  );

  return (
    <section id="view-photo" className="view is-active">
      <form className="form-shell" data-form="photo" onSubmit={handleSubmit} noValidate>
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
          <p className="eyebrow">Permissions</p>
          <h2>Photo / Video Permission</h2>
          <p className="section-lead">
            Required for enrollment. Tell us how Angel Learning Center may use photos and video of your child.
          </p>
          {showPrefillNotice ? (
            <p className="prefill-notice">
              Name, address, and contact fields were filled from the Enrollment form so you don’t retype them. Edit anything that needs changes.
            </p>
          ) : null}
        </div>

        <fieldset className="agreement-box">
          <legend>Permission</legend>
          <div className="scroll-terms">
            <p>
              I understand that Angel Learning Center may take photographs and/or video of children during normal program activities, special events, and classroom learning. These images may be used for classroom displays, center communications to enrolled families, the center website or social media, and marketing materials, unless I limit permission below.
            </p>
          </div>
          <p className="subhead">I grant permission for (check all that apply)</p>
          <label className="check">
            <input
              type="checkbox"
              name="photoClassroom"
              checked={formData.photoClassroom}
              onChange={handleChange}
            />
            Classroom / center displays
          </label>
          <label className="check">
            <input
              type="checkbox"
              name="photoFamily"
              checked={formData.photoFamily}
              onChange={handleChange}
            />
            Communications to enrolled families
          </label>
          <label className="check">
            <input
              type="checkbox"
              name="photoWeb"
              checked={formData.photoWeb}
              onChange={handleChange}
            />
            Website / social media
          </label>
          <label className="check">
            <input
              type="checkbox"
              name="photoMarketing"
              checked={formData.photoMarketing}
              onChange={handleChange}
            />
            Marketing / promotional materials
          </label>
          <label className="check">
            <input
              type="checkbox"
              name="photoNone"
              checked={formData.photoNone}
              onChange={handleChange}
            />
            I do <strong>not</strong> grant photo/video permission
          </label>

          <label>
            Child’s full name
            <input
              name="photoChild"
              value={formData.photoChild}
              onChange={handleChange}
              required
            />
          </label>

          <label className="check">
            <input
              type="checkbox"
              name="photoAgree"
              checked={formData.photoAgree}
              onChange={handleChange}
              required
            />
            I have read this Photo / Video Permission form and my choices above are correct.
          </label>

          <div className="grid-2">
            <label>
              Printed name
              <input
                name="photoPrint"
                className="signature"
                value={formData.photoPrint}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Date
              <input
                type="date"
                name="photoDate"
                value={formData.photoDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            Parent / guardian signature
            <input
              name="photoSignature"
              className="signature"
              placeholder="Type full legal name"
              value={formData.photoSignature}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" data-i18n="saveComplete">
            {t("saveComplete") || "Save & mark complete"}
          </button>
          <a
            href="#uploads"
            className="btn btn-secondary"
            data-nav="uploads"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("uploads");
            }}
          >
            Next: Documents →
          </a>
        </div>
      </form>
    </section>
  );
}

export default PhotoView;
