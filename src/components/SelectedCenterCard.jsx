import React from "react";
import ALC_CONFIG from "../config";
import { useEnrollment } from "../context/EnrollmentContext";

export function SelectedCenterCard() {
  const { activeLocation, navigateTo, startWaitlistFlow, startFullEnrollment, setFullFlowMode } = useEnrollment();

  if (!activeLocation || !activeLocation.id) return null;

  const routeCount = (ALC_CONFIG.transport?.schools?.[activeLocation.id] || []).length;
  const ccList = (ALC_CONFIG.email?.cc || []).join(", ");

  return (
    <div className="selected-center" id="selectedCenterCard">
      <p className="eyebrow">Selected center</p>
      <h3 id="selCenterName">{activeLocation.legalName || activeLocation.name}</h3>
      <p id="selCenterMeta" className="section-lead">
        {activeLocation.address} · {activeLocation.phone}
        {activeLocation.hours ? ` · ${activeLocation.hours}` : ""}
      </p>
      <p id="selCenterInbox" className="center-inbox">
        Forms email To: {activeLocation.inbox} · CC: {ccList} · {routeCount} bus schools
      </p>
      <div className="hero-cta">
        {/* <a
          href="#packet"
          className="btn btn-primary"
          data-nav="packet"
          onClick={(e) => {
            e.preventDefault();
            setFullFlowMode();
            navigateTo("packet");
          }}
        >
          Continue to checklist →
        </a> */}
        <a
          href="#enrollment"
          className="btn btn-primary"
          data-nav="enrollment"
          onClick={(e) => {
            e.preventDefault();
            startFullEnrollment();
          }}
        >
          Start Enrollment Form →
        </a>
        <button
          type="button"
          className="btn btn-waitlist"
          onClick={startWaitlistFlow}
        >
          Waitlist Form →
        </button>
      </div>
    </div>
  );
}

export default SelectedCenterCard;
