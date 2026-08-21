import React from "react";
import { useEnrollment } from "../context/EnrollmentContext";

export function ProgressBar() {
  const { activeForms, completedCount, t } = useEnrollment();

  const total = activeForms.length;
  const n = completedCount;
  const percent = total > 0 ? (n / total) * 100 : 0;
  const text = (t("progress") || "{n} of {total} complete")
    .replace("{n}", String(n))
    .replace("{total}", String(total));

  return (
    <div className="progress-wrap">
      <div className="progress-bar">
        <span id="progressFill" style={{ width: `${percent}%` }}></span>
      </div>
      <p className="progress-label">
        <span id="progressText">{text}</span>
      </p>
    </div>
  );
}

export default ProgressBar;
