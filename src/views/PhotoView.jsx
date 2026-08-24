import React, { useState, useEffect } from "react";
import { useEnrollment } from "../context/EnrollmentContext";
import { useFormDraft } from "../hooks/useFormDraft";
import { completeFormAndGo } from "../utils/formNext";

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
    permWaterSprinkler: !!savedData.permWaterSprinkler,
    permWaterSplashing: !!savedData.permWaterSplashing,
    permWaterPools: !!savedData.permWaterPools,
    permWaterTable: !!savedData.permWaterTable,
    prepBabyWipes: !!savedData.prepBabyWipes,
    prepBandAids: !!savedData.prepBandAids,
    prepNeosporin: !!savedData.prepNeosporin,
    prepBactine: !!savedData.prepBactine,
    prepSunscreen: !!savedData.prepSunscreen,
    prepInsectRepellent: !!savedData.prepInsectRepellent,
    prepNonRxOintment: !!savedData.prepNonRxOintment,
    prepBabyPowder: !!savedData.prepBabyPowder,
    prepOther: savedData.prepOther || "",
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
      permWaterSprinkler: !!ph.permWaterSprinkler,
      permWaterSplashing: !!ph.permWaterSplashing,
      permWaterPools: !!ph.permWaterPools,
      permWaterTable: !!ph.permWaterTable,
      prepBabyWipes: !!ph.prepBabyWipes,
      prepBandAids: !!ph.prepBandAids,
      prepNeosporin: !!ph.prepNeosporin,
      prepBactine: !!ph.prepBactine,
      prepSunscreen: !!ph.prepSunscreen,
      prepInsectRepellent: !!ph.prepInsectRepellent,
      prepNonRxOintment: !!ph.prepNonRxOintment,
      prepBabyPowder: !!ph.prepBabyPowder,
      prepOther: ph.prepOther || "",
    }));
  }, [state.data?.photo]);

  useFormDraft("photo", formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e) => {
    completeFormAndGo({
      event: e,
      saveForm,
      formId: "photo",
      getPayload: () => formData,
      navigateTo,
      target: "uploads",
    });
  };

  const showPrefillNotice = !!(
    state.data?.enrollment?.childFirst ||
    state.data?.enrollment?.momFirst ||
    state.data?.enrollment?.dadFirst
  );

  return (
    <section id="view-photo" className="view is-active">
      <form className="form-shell" data-form="photo" onSubmit={(e) => e.preventDefault()} noValidate>
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

          <p className="subhead">Water activities consent <span className="pill-muted">Optional</span></p>
          <p className="hint">Matches the Permissions page in your enrollment packet PDF.</p>
          <label className="check">
            <input type="checkbox" name="permWaterSprinkler" checked={formData.permWaterSprinkler} onChange={handleChange} />
            Sprinkler
          </label>
          <label className="check">
            <input type="checkbox" name="permWaterSplashing" checked={formData.permWaterSplashing} onChange={handleChange} />
            Play Splashing
          </label>
          <label className="check">
            <input type="checkbox" name="permWaterPools" checked={formData.permWaterPools} onChange={handleChange} />
            Swimming Pools
          </label>
          <label className="check">
            <input type="checkbox" name="permWaterTable" checked={formData.permWaterTable} onChange={handleChange} />
            Water Table Play
          </label>

          <p className="subhead">Topical preparations <span className="pill-muted">Optional</span></p>
          <p className="hint">Select any external preparations you authorize the center to apply.</p>
          <label className="check">
            <input type="checkbox" name="prepBabyWipes" checked={formData.prepBabyWipes} onChange={handleChange} />
            Baby wipes
          </label>
          <label className="check">
            <input type="checkbox" name="prepBandAids" checked={formData.prepBandAids} onChange={handleChange} />
            Band-Aids
          </label>
          <label className="check">
            <input type="checkbox" name="prepNeosporin" checked={formData.prepNeosporin} onChange={handleChange} />
            Neosporin or similar ointment
          </label>
          <label className="check">
            <input type="checkbox" name="prepBactine" checked={formData.prepBactine} onChange={handleChange} />
            Bactine or similar first aid spray
          </label>
          <label className="check">
            <input type="checkbox" name="prepSunscreen" checked={formData.prepSunscreen} onChange={handleChange} />
            Sunscreen
          </label>
          <label className="check">
            <input type="checkbox" name="prepInsectRepellent" checked={formData.prepInsectRepellent} onChange={handleChange} />
            Insect repellent
          </label>
          <label className="check">
            <input type="checkbox" name="prepNonRxOintment" checked={formData.prepNonRxOintment} onChange={handleChange} />
            Non-prescription ointment (A&amp;D, Desitin, Vaseline, etc.)
          </label>
          <label className="check">
            <input type="checkbox" name="prepBabyPowder" checked={formData.prepBabyPowder} onChange={handleChange} />
            Baby Powder
          </label>
          <label>
            Other topical preparation (optional)
            <input name="prepOther" value={formData.prepOther} onChange={handleChange} />
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
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            Next: Documents →
          </button>
        </div>
      </form>
    </section>
  );
}

export default PhotoView;
