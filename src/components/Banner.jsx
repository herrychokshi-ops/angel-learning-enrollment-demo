import React from "react";
import { useEnrollment } from "../context/EnrollmentContext";

export function Banner() {
  const { t } = useEnrollment();

  return (
    <div className="demo-banner prod-banner">
      Client approval preview · multi-location · no parent login · packet email to each center
    </div>
  );
}

export default Banner;
