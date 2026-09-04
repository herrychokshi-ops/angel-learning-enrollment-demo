/** Uppercase string field values when saving enrollment forms. */
export function uppercaseFormPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return payload;
  }

  const out = { ...payload };
  for (const [key, value] of Object.entries(out)) {
    if (typeof value === "string") {
      out[key] = value.toUpperCase();
    }
  }
  return out;
}
