import React from "react";
import { downloadPdfBundle, downloadWaitlistPdf } from "../pdf/pdfGenerator";
import { useEnrollment } from "../context/EnrollmentContext";

export function WaitlistDoneView() {
  const { state, activeLocation, showToast, navigateTo } = useEnrollment();

  const en = state.data?.enrollment || {};
  const childName =
    [en.childFirst, en.childMI, en.childLast].filter(Boolean).join(" ").trim() ||
    en.childPreferred ||
    "Child";
  const inbox = activeLocation?.inbox || "savannah@angellearningcenter.com";

  const handleDownload = async (type) => {
    try {
      if (type === "waitlist") {
        await downloadWaitlistPdf({ state, location: activeLocation });
        showToast("Waitlist packet PDF downloading…");
      } else {
        await downloadPdfBundle({ state, location: activeLocation, which: "enrollment" });
        showToast("Enrollment PDF downloading…");
      }
    } catch (err) {
      console.error(err);
      showToast("PDF generation failed — see console");
    }
  };

  return (
    <section id="view-waitlist-done" className="view is-active">
      <div className="done-panel">
        <div className="success-banner">
          <div>
            <strong>Waitlist agreement ready</strong>
            <span>
              Your waitlist enrollment form is complete. Download and print the agreement below, or email it to the
              center.
            </span>
          </div>
        </div>

        <p className="eyebrow">Waitlist · next steps</p>
        <h2>Secure your future seat</h2>
        <p className="section-lead">
          Download your completed waitlist agreement and enrollment details for {childName}. The center will contact you
          when a spot becomes available.
        </p>

        <div className="mail-summary" id="waitlistMailSummary">
          <div className="mail-row">
            <small>SENT TO CENTER</small>
            <strong>{inbox}</strong>
          </div>
          <div className="mail-row">
            <small>SUBJECT</small>
            <strong>Waitlist Agreement for {childName}</strong>
          </div>
        </div>

        <div className="pdf-actions hero-cta" style={{ marginBottom: "1.25rem" }}>
          <button type="button" className="btn btn-primary" onClick={() => handleDownload("waitlist")}>
            Download waitlist packet PDF
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => handleDownload("enrollment")}>
            Download enrollment form only
          </button>
        </div>

        <p className="hint">
          The waitlist packet PDF includes your completed enrollment form first, followed by the waitlist agreement.
          Bring the signed packet and payment to the center to secure your place on the waitlist.
        </p>

        <div className="hero-cta">
          <a
            href="#home"
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("home");
            }}
          >
            Back to home
          </a>
        </div>
      </div>
    </section>
  );
}

export default WaitlistDoneView;
