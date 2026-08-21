import React from "react";
import { pdf } from "@react-pdf/renderer";
import PacketPdf from "./PacketPdf";
import BlankIesPdf from "./BlankIesPdf";
import { appendIesToPacketPdf, getCompletedIesUpload } from "./mergePacketPdf";

function safeName(s) {
  return String(s || "child")
    .replace(/[^\w\-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 40);
}

export async function saveDocumentAsPdf(documentComponent, filename, { appendIesData } = {}) {
  try {
    let blob = await pdf(documentComponent).toBlob();
    if (appendIesData) {
      blob = await appendIesToPacketPdf(blob, appendIesData);
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return { appendedIes: appendIesData ? !!getCompletedIesUpload(appendIesData) : false };
  } catch (err) {
    console.error("PDF generation failed:", filename, err);
    throw err;
  }
}

export async function downloadBlankIesPdf() {
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `ALC_Blank_IES_${dateStr}.pdf`;
  await saveDocumentAsPdf(<BlankIesPdf />, filename);
}

/**
 * Download a single combined PDF packet.
 * which = "packet"     → all forms (enrollment + financial + transport if applicable + emergency + ies + handbook + photo)
 * which = "enrollment" → enrollment + financial only
 * which = "financial"  → financial page only
 */
function readLatestPacketData(state) {
  const fromState = state?.data || {};
  let fromStore = {};
  if (typeof window !== "undefined") {
    try {
      const stored = JSON.parse(localStorage.getItem("alc-enrollment-v1-multi") || "null");
      fromStore = stored?.data || {};
    } catch {
      // ignore
    }
  }
  return {
    ...fromStore,
    ...fromState,
    photo: { ...(fromStore.photo || {}), ...(fromState.photo || {}) },
    transport: { ...(fromStore.transport || {}), ...(fromState.transport || {}) },
  };
}

export async function downloadPdfBundle({ state, location, which = "packet" }) {
  const data = readLatestPacketData(state);
  const loc = location || {};
  const en = data.enrollment || {};
  const dateStr = new Date().toISOString().slice(0, 10);
  const base = `ALC_${safeName(en.childLast || loc.id)}_${safeName(en.childFirst)}_${dateStr}`;

  const filenameMap = {
    packet: `${base}_Enrollment_Packet.pdf`,
    enrollment: `${base}_Enrollment_Form.pdf`,
    financial: `${base}_Financial_Agreement.pdf`,
  };

  const filename = filenameMap[which] || filenameMap.packet;

  await saveDocumentAsPdf(
    <PacketPdf data={data} location={loc} which={which} />,
    filename,
    which === "packet" ? { appendIesData: data } : {}
  );

  return { queued: 1 };
}
