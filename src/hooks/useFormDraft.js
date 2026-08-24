import { useEffect, useRef } from "react";
import { useEnrollment } from "../context/EnrollmentContext";

/**
 * Debounced auto-save while the user edits a form (does not mark complete).
 */
export function useFormDraft(formId, formData, options = {}) {
  const { enabled = true, mapData } = options;
  const { autoSaveForm } = useEnrollment();
  const skipInitial = useRef(true);

  useEffect(() => {
    if (!enabled) return;

    if (skipInitial.current) {
      skipInitial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const payload = mapData ? mapData(formData) : formData;
      autoSaveForm(formId, payload);
    }, 500);

    return () => clearTimeout(timer);
  }, [formId, formData, autoSaveForm, enabled, mapData]);
}
