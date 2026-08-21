import React from "react";
import ProgressBar from "../components/ProgressBar";
import FormList from "../components/FormList";
import { useEnrollment } from "../context/EnrollmentContext";

export function PacketView() {
  const { loadSample, t } = useEnrollment();

  return (
    <section id="view-packet" className="view is-active">
      <div className="page-head">
        <p className="eyebrow" data-i18n="packetEyebrow">
          {t("packetEyebrow")}
        </p>
        <h2 data-i18n="packetTitle">{t("packetTitle")}</h2>
        <p className="section-lead" data-i18n="packetLead">
          {t("packetLead")}
        </p>
        <div className="hero-cta" style={{ marginBottom: "1rem" }}>
          <button
            type="button"
            className="btn btn-green"
            id="loadSamplePacket"
            data-i18n="ctaSample"
            onClick={loadSample}
          >
            {t("ctaSample") || "Load sample child"}
          </button>
        </div>
        <ProgressBar />
      </div>
      <FormList id="packetList" />
    </section>
  );
}

export default PacketView;
