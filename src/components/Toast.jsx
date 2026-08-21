import React from "react";
import { useEnrollment } from "../context/EnrollmentContext";

export function Toast() {
  const { toast } = useEnrollment();

  if (!toast.visible) return null;

  return (
    <div className={`toast ${toast.visible ? "show" : ""}`} id="toast">
      {toast.message}
    </div>
  );
}

export default Toast;
