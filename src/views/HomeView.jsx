import React from "react";
import LocationGrid from "../components/LocationGrid";
import SelectedCenterCard from "../components/SelectedCenterCard";
import FormList from "../components/FormList";
import { useEnrollment } from "../context/EnrollmentContext";

export function HomeView() {
  const { loadSample, navigateTo } = useEnrollment();

  return (
    <section id="view-home" className="view is-active">
      <div className="hero">
        <p className="hero-kicker">Online enrollment · 2026–2027</p>
        <h1 className="hero-brand">Angel Learning Center</h1>
        <p className="hero-lead">
          One public link · parent picks center first · fill once · shared fields carry across forms · prefilled packet emails{" "}
          <strong>that location’s inbox only</strong> (no parent account, no parent PDF copy).
        </p>
        <div className="hero-cta">
          <a
            href="#locations"
            className="btn btn-primary"
            id="ctaPickLocation"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("locations")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Choose your center
          </a>
          <button type="button" className="btn btn-green" id="loadSample" onClick={loadSample}>
            Load sample (Savannah)
          </button>
          <a href="mockups.html" className="btn btn-secondary">
            See email delivery story
          </a>
        </div>
      </div>

      <section className="section" id="locations">
        <h2>Choose your Angel Learning Center</h2>
        <p className="section-lead">
          Client answered: <strong>one link → parent picks location first</strong>. All four sites use the same form packet; school bus list, center address, phone, hours, and “To” email change with the selection.
        </p>
        <LocationGrid />
        <SelectedCenterCard />
      </section>

      <section className="section packet-overview">
        <h2>What parents complete (same packet everywhere)</h2>
        <p className="section-lead">
          Enrollment · tuition · transport <em>only for Pre-K / before-after / summer</em> · emergency · meal benefit (download official IES) · handbook · photo/video permission · required document uploads. Name/address/contacts autofill after Enrollment.
        </p>
        <FormList id="formList" />
      </section>
    </section>
  );
}

export default HomeView;
