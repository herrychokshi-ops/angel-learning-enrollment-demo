/**
 * Validate, save (mark complete), and navigate to the next step.
 */
export function completeFormAndGo({
  event,
  form,
  saveForm,
  formId,
  getPayload,
  navigateTo,
  target,
  validate,
}) {
  event?.preventDefault();

  if (validate) {
    const err = validate();
    if (err) return false;
  }

  const el = form || event?.currentTarget?.closest?.("form");
  if (el && !el.checkValidity()) {
    el.reportValidity();
    return false;
  }

  const payload = typeof getPayload === "function" ? getPayload() : getPayload;
  saveForm(formId, payload, true, { silent: true });
  navigateTo(target);
  return true;
}
