import React, { useState, useEffect, useCallback } from "react";
import ALC_CONFIG from "../config";
import { useEnrollment } from "../context/EnrollmentContext";
import { useFormDraft } from "../hooks/useFormDraft";
import { completeFormAndGo } from "../utils/formNext";
import {
  isProgramDisabled,
  isProgramVisible,
  normalizePrograms,
  toggleProgram,
  validatePrograms,
} from "../utils/programSelection";

export function EnrollmentView() {
  const { state, saveForm, applyLocation, selectedLocationId, activeLocation, t, navigateTo } = useEnrollment();

  const savedData = state.data?.enrollment || {};

  const [formData, setFormData] = useState({
    enLocation: savedData.enLocation || selectedLocationId || "savannah",
    programs: normalizePrograms(
      Array.isArray(savedData.programs)
        ? savedData.programs
        : String(savedData.programs || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
    ),
    childFirst: savedData.childFirst || "",
    childMI: savedData.childMI || "",
    childLast: savedData.childLast || "",
    childPreferred: savedData.childPreferred || "",
    childGrade: savedData.childGrade || "",
    startDate: savedData.startDate || "",
    childDob: savedData.childDob || "",
    childGender: savedData.childGender || "",
    childAddress: savedData.childAddress || "",
    childCity: savedData.childCity || "",
    childZip: savedData.childZip || "",
    medicalNotes: savedData.medicalNotes || "",
    momFirst: savedData.momFirst || "",
    momMI: savedData.momMI || "",
    momLast: savedData.momLast || "",
    momCell: savedData.momCell || "",
    momEmail: savedData.momEmail || "",
    momEmployer: savedData.momEmployer || "",
    momOccupation: savedData.momOccupation || "",
    momCustodial: !!savedData.momCustodial,
    dadFirst: savedData.dadFirst || "",
    dadMI: savedData.dadMI || "",
    dadLast: savedData.dadLast || "",
    dadCell: savedData.dadCell || "",
    dadEmail: savedData.dadEmail || "",
    dadEmployer: savedData.dadEmployer || "",
    dadOccupation: savedData.dadOccupation || "",
    dadCustodial: !!savedData.dadCustodial,
    ec1Name: savedData.ec1Name || "",
    ec1Home: savedData.ec1Home || "",
    ec1Work: savedData.ec1Work || "",
    ec1Cell: savedData.ec1Cell || "",
    ec1Rel: savedData.ec1Rel || "",
    ec2Name: savedData.ec2Name || "",
    ec2Home: savedData.ec2Home || "",
    ec2Work: savedData.ec2Work || "",
    ec2Cell: savedData.ec2Cell || "",
    ec2Rel: savedData.ec2Rel || "",
    careFrom: savedData.careFrom || "",
    careTo: savedData.careTo || "",
    mealBreakfast: !!savedData.mealBreakfast,
    mealLunch: !!savedData.mealLunch,
    mealSnack: !!savedData.mealSnack,
  });

  const [programError, setProgramError] = useState("");

  useEffect(() => {
    const en = state.data?.enrollment || {};
    setFormData((prev) => ({
      ...prev,
      ...en,
      enLocation: en.enLocation || selectedLocationId || "savannah",
      programs: normalizePrograms(
        Array.isArray(en.programs)
          ? en.programs
          : String(en.programs || "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
      ),
    }));
  }, [state.data?.enrollment, selectedLocationId]);

  const enrollmentPayload = useCallback(
    () => ({
      ...formData,
      programs: normalizePrograms(formData.programs || []),
    }),
    [formData]
  );

  const mapEnrollmentData = useCallback(
    (data) => ({
      ...data,
      programs: normalizePrograms(data.programs || []),
    }),
    []
  );

  useFormDraft("enrollment", formData, { mapData: mapEnrollmentData });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = (e) => {
    const locId = e.target.value;
    setFormData((prev) => ({ ...prev, enLocation: locId }));
    applyLocation(locId);
  };

  const handleProgramToggle = (programId) => {
    setProgramError("");
    setFormData((prev) => ({
      ...prev,
      programs: toggleProgram(prev.programs || [], programId),
    }));
  };

  const handleNext = (e) => {
    completeFormAndGo({
      event: e,
      saveForm,
      formId: "enrollment",
      getPayload: enrollmentPayload,
      navigateTo,
      target: "financial",
      validate: () => {
        const programValidation = validatePrograms(formData.programs || []);
        if (programValidation) {
          setProgramError(programValidation);
          return programValidation;
        }
        setProgramError("");
        return null;
      },
    });
  };

  const currentLoc = ALC_CONFIG.locations?.[formData.enLocation] || activeLocation;
  const routeCount = (ALC_CONFIG.transport?.schools?.[currentLoc.id] || []).length;
  const programsList = ALC_CONFIG.programs || [];

  return (
    <section id="view-enrollment" className="view is-active">
      <form className="form-shell" data-form="enrollment" onSubmit={(e) => e.preventDefault()} noValidate>
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
          <p className="eyebrow" data-i18n="form1">
            {t("form1") || "Form 1 of 5"}
          </p>
          <h2 data-i18n="enrollmentTitle">{t("enrollmentTitle") || "Enrollment Form"}</h2>
          <p className="section-lead" data-i18n="enrollmentLead">
            {t("enrollmentLead") || "Child, parent/guardian, emergency contacts, and care schedule."}
          </p>
        </div>

        <fieldset>
          <legend>Center &amp; program</legend>
          <label>
            <span>ALC location</span>
            <select
              name="enLocation"
              id="enLocation"
              value={formData.enLocation}
              onChange={handleLocationChange}
              required
            >
              {Object.values(ALC_CONFIG.locations || {}).map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} — {loc.address.split(",")[0]}
                </option>
              ))}
            </select>
          </label>

          <div className="location-context" id="enLocationContext" aria-live="polite">
            <strong>{currentLoc.legalName}</strong>
            <br />
            {currentLoc.address}
            <br />
            {currentLoc.phone} · {currentLoc.hours || ""}
            <br />
            Packet emails: <code>{currentLoc.inbox}</code> · {routeCount} school stop(s) on transport form
          </div>

          <p className="subhead">Program(s) for this child</p>
          <p className="hint">
            Choose up to two programs. Little Angels, Tiny Explorers, Busy Bee, and Little Learners are age groups —
            only one can be selected, and when one is chosen only Part-time Stars can be added (all other programs are
            hidden). Before care, after care, and before &amp; after care are standalone — selecting one hides all other
            programs (you can switch between those three only). Summer Camp and Holiday Weeks are selected together.
          </p>
          <p className="hint">
            Transportation and Vehicle Emergency Medical forms appear when Pre-K, care programs, or summer/holiday
            programs are selected.
          </p>
          {programError ? (
            <p className="hint" style={{ color: "var(--danger, #b42318)" }} role="alert">
              {programError}
            </p>
          ) : null}

          <div className="chip-group" id="programChips">
            {programsList.map((p) => {
              if (!isProgramVisible(p.id, formData.programs || [])) return null;
              const isChecked = (formData.programs || []).includes(p.id);
              const disabled = isProgramDisabled(p.id, formData.programs || []);
              return (
                <label
                  key={p.id}
                  className={`chip${disabled && !isChecked ? " is-disabled" : ""}`}
                >
                  <input
                    type="checkbox"
                    data-program={p.id}
                    checked={isChecked}
                    disabled={disabled && !isChecked}
                    onChange={() => handleProgramToggle(p.id)}
                  />
                  {p.label}
                </label>
              );
            })}
          </div>
          <input type="hidden" name="programs" value={(formData.programs || []).join(",")} />
        </fieldset>

        <fieldset>
          <legend data-i18n="childInfo">{t("childInfo") || "Child information"}</legend>
          <div id="multiChildBar" className="multi-child-bar">
            <p className="hint" style={{ margin: 0 }}>
              Enrolling more than one child? Complete a separate packet for each child. Legal &amp; document forms cover the household.
            </p>
          </div>
          <div className="grid-3">
            <label>
              <span data-i18n="firstName">{t("firstName") || "First name"}</span>
              <input name="childFirst" value={formData.childFirst} onChange={handleChange} required />
            </label>
            <label>
              M.I. <input name="childMI" maxLength={1} value={formData.childMI} onChange={handleChange} />
            </label>
            <label>
              <span data-i18n="lastName">{t("lastName") || "Last name"}</span>
              <input name="childLast" value={formData.childLast} onChange={handleChange} required />
            </label>
          </div>
          <div className="grid-3">
            <label>
              <span data-i18n="preferredName">{t("preferredName") || "Preferred name"}</span>
              <input name="childPreferred" value={formData.childPreferred} onChange={handleChange} />
            </label>
            <label>
              <span data-i18n="gradeClass">{t("gradeClass") || "Grade / class"}</span>
              <input name="childGrade" value={formData.childGrade} onChange={handleChange} />
            </label>
            <label>
              <span data-i18n="startDate">{t("startDate") || "Start date"}</span>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            </label>
          </div>
          <div className="grid-2">
            <label>
              <span data-i18n="dob">{t("dob") || "Date of birth"}</span>
              <input type="date" name="childDob" value={formData.childDob} onChange={handleChange} required />
            </label>
            <label>
              <span data-i18n="gender">{t("gender") || "Gender"}</span>
              <select name="childGender" value={formData.childGender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          </div>
          <p className="hint">
            SSN numbers are not typed in this web form. Upload parent and child SSN documents in the Documents step (required).
          </p>
          <label>
            <span data-i18n="address">{t("address") || "Home address"}</span>
            <input name="childAddress" value={formData.childAddress} onChange={handleChange} />
          </label>
          <div className="grid-2">
            <label>
              <span data-i18n="city">{t("city") || "City"}</span>
              <input name="childCity" value={formData.childCity} onChange={handleChange} />
            </label>
            <label>
              ZIP <input name="childZip" value={formData.childZip} onChange={handleChange} />
            </label>
          </div>
          <label>
            <span data-i18n="medicalNotes">
              {t("medicalNotes") || "Medical conditions, medications, or special attention"}
            </span>
            <textarea
              name="medicalNotes"
              rows={3}
              value={formData.medicalNotes}
              onChange={handleChange}
            ></textarea>
          </label>
        </fieldset>

        <fieldset>
          <legend data-i18n="motherGuardian">{t("motherGuardian") || "Mother / guardian"}</legend>
          <div className="grid-3">
            <label>
              <span data-i18n="firstName">{t("firstName") || "First name"}</span>
              <input name="momFirst" value={formData.momFirst} onChange={handleChange} />
            </label>
            <label>
              M.I. <input name="momMI" maxLength={1} value={formData.momMI} onChange={handleChange} />
            </label>
            <label>
              <span data-i18n="lastName">{t("lastName") || "Last name"}</span>
              <input name="momLast" value={formData.momLast} onChange={handleChange} />
            </label>
          </div>
          <div className="grid-2">
            <label>
              <span data-i18n="cellPhone">{t("cellPhone") || "Cell phone"}</span>
              <input type="tel" name="momCell" value={formData.momCell} onChange={handleChange} />
            </label>
            <label>
              <span data-i18n="email">{t("email") || "Email"}</span>
              <input type="email" name="momEmail" value={formData.momEmail} onChange={handleChange} />
            </label>
          </div>
          <div className="grid-2">
            <label>
              <span data-i18n="employer">{t("employer") || "Employer"}</span>
              <input name="momEmployer" value={formData.momEmployer} onChange={handleChange} />
            </label>
            <label>
              <span data-i18n="occupation">{t("occupation") || "Occupation"}</span>
              <input name="momOccupation" value={formData.momOccupation} onChange={handleChange} />
            </label>
          </div>
          <label className="check">
            <input
              type="checkbox"
              name="momCustodial"
              checked={formData.momCustodial}
              onChange={handleChange}
            />
            <span data-i18n="custodial">{t("custodial") || "Custodial parent"}</span>
          </label>
        </fieldset>

        <fieldset>
          <legend data-i18n="fatherGuardian">{t("fatherGuardian") || "Father / guardian"}</legend>
          <div className="grid-3">
            <label>
              <span data-i18n="firstName">{t("firstName") || "First name"}</span>
              <input name="dadFirst" value={formData.dadFirst} onChange={handleChange} />
            </label>
            <label>
              M.I. <input name="dadMI" maxLength={1} value={formData.dadMI} onChange={handleChange} />
            </label>
            <label>
              <span data-i18n="lastName">{t("lastName") || "Last name"}</span>
              <input name="dadLast" value={formData.dadLast} onChange={handleChange} />
            </label>
          </div>
          <div className="grid-2">
            <label>
              <span data-i18n="cellPhone">{t("cellPhone") || "Cell phone"}</span>
              <input type="tel" name="dadCell" value={formData.dadCell} onChange={handleChange} />
            </label>
            <label>
              <span data-i18n="email">{t("email") || "Email"}</span>
              <input type="email" name="dadEmail" value={formData.dadEmail} onChange={handleChange} />
            </label>
          </div>
          <div className="grid-2">
            <label>
              <span data-i18n="employer">{t("employer") || "Employer"}</span>
              <input name="dadEmployer" value={formData.dadEmployer} onChange={handleChange} />
            </label>
            <label>
              <span data-i18n="occupation">{t("occupation") || "Occupation"}</span>
              <input name="dadOccupation" value={formData.dadOccupation} onChange={handleChange} />
            </label>
          </div>
          <label className="check">
            <input
              type="checkbox"
              name="dadCustodial"
              checked={formData.dadCustodial}
              onChange={handleChange}
            />
            <span data-i18n="custodial">{t("custodial") || "Custodial parent"}</span>
          </label>
        </fieldset>

        <fieldset>
          <legend>
            <span data-i18n="emergencyContacts">{t("emergencyContacts") || "Emergency contacts"}</span>
            <span className="hint" data-i18n="pickupHint">
              {" "}({t("pickupHint") || "authorized for pickup — ID required"})
            </span>
          </legend>
          <p className="hint">
            Georgia requires <strong>two</strong> emergency contacts. Contacts <strong>cannot be the child’s parents/guardians</strong>.
          </p>
          <div className="repeat-block">
            <p className="subhead" data-i18n="contact1">
              {t("contact1") || "Contact 1"}
            </p>
            <label>
              <span data-i18n="fullName">{t("fullName") || "Full name"}</span>
              <input name="ec1Name" value={formData.ec1Name} onChange={handleChange} required />
            </label>
            <div className="grid-3">
              <label>Home <input type="tel" name="ec1Home" value={formData.ec1Home} onChange={handleChange} /></label>
              <label>Work <input type="tel" name="ec1Work" value={formData.ec1Work} onChange={handleChange} /></label>
              <label>
                Cell <input type="tel" name="ec1Cell" value={formData.ec1Cell} onChange={handleChange} required />
              </label>
            </div>
            <label>
              <span data-i18n="relationship">{t("relationship") || "Relationship"}</span>
              <input
                name="ec1Rel"
                value={formData.ec1Rel}
                onChange={handleChange}
                required
                placeholder="e.g. Aunt, neighbor — not parent"
              />
            </label>
          </div>

          <div className="repeat-block">
            <p className="subhead">Contact 2</p>
            <label>
              <span data-i18n="fullName">{t("fullName") || "Full name"}</span>
              <input name="ec2Name" value={formData.ec2Name} onChange={handleChange} required />
            </label>
            <div className="grid-3">
              <label>Home <input type="tel" name="ec2Home" value={formData.ec2Home} onChange={handleChange} /></label>
              <label>Work <input type="tel" name="ec2Work" value={formData.ec2Work} onChange={handleChange} /></label>
              <label>
                Cell <input type="tel" name="ec2Cell" value={formData.ec2Cell} onChange={handleChange} required />
              </label>
            </div>
            <label>
              <span data-i18n="relationship">{t("relationship") || "Relationship"}</span>
              <input
                name="ec2Rel"
                value={formData.ec2Rel}
                onChange={handleChange}
                required
                placeholder="e.g. Grandparent, friend — not parent"
              />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend data-i18n="careSchedule">{t("careSchedule") || "Care schedule"}</legend>
          <div className="grid-2">
            <label>
              <span data-i18n="hoursFrom">{t("hoursFrom") || "Primary hours from"}</span>
              <input type="time" name="careFrom" value={formData.careFrom} onChange={handleChange} />
            </label>
            <label>
              <span data-i18n="hoursTo">{t("hoursTo") || "To"}</span>
              <input type="time" name="careTo" value={formData.careTo} onChange={handleChange} />
            </label>
          </div>
          <p className="hint" data-i18n="tenHourHint">
            {t("tenHourHint") || "Cannot exceed 10 hours per day."}
          </p>
          <div className="chip-group">
            <label className="chip">
              <input
                type="checkbox"
                name="mealBreakfast"
                checked={formData.mealBreakfast}
                onChange={handleChange}
              />
              Breakfast
            </label>
            <label className="chip">
              <input
                type="checkbox"
                name="mealLunch"
                checked={formData.mealLunch}
                onChange={handleChange}
              />
              Lunch
            </label>
            <label className="chip">
              <input
                type="checkbox"
                name="mealSnack"
                checked={formData.mealSnack}
                onChange={handleChange}
              />
              PM Snack
            </label>
          </div>
          <p className="hint">
            Tuition rates are confirmed by the center — not displayed in this form.
          </p>
        </fieldset>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-primary"
            data-i18n="nextFinancial"
            onClick={handleNext}
          >
            {t("nextFinancial") || "Next: Tuition agreement →"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default EnrollmentView;
