import React from "react";
import { pdf } from "@react-pdf/renderer";
import PacketPdf from "./PacketPdf";
import WaitlistAgreementPdf from "./WaitlistPdf";
import { appendUploadsToPacketPdf, getUploadsForMerge, mergePdfBlobs } from "./mergePacketPdf";

const BLANK_IES_FILENAME = "IES2026-2027_ENGLISH.pdf";

function safeName(s) {
  return String(s || "child")
    .replace(/[^\w\-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 40);
}

export async function saveDocumentAsPdf(documentComponent, filename, { appendUploadsData } = {}) {
  try {
    let blob = await pdf(documentComponent).toBlob();
    if (appendUploadsData) {
      blob = await appendUploadsToPacketPdf(blob, appendUploadsData);
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return {
      appendedUploads: appendUploadsData ? getUploadsForMerge(appendUploadsData).length : 0,
    };
  } catch (err) {
    console.error("PDF generation failed:", filename, err);
    throw err;
  }
}

function getBlankIesAssetUrl() {
  if (typeof window !== "undefined" && window.location?.origin && window.location.protocol !== "file:") {
    return `${window.location.origin}/assets/${BLANK_IES_FILENAME}`;
  }
  return `/assets/${BLANK_IES_FILENAME}`;
}

export async function downloadBlankIesPdf() {
  const response = await fetch(getBlankIesAssetUrl());
  if (!response.ok) {
    throw new Error(`Could not load ${BLANK_IES_FILENAME}`);
  }
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = BLANK_IES_FILENAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
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
    enrollment: { ...(fromStore.enrollment || {}), ...(fromState.enrollment || {}) },
    photo: { ...(fromStore.photo || {}), ...(fromState.photo || {}) },
    transport: { ...(fromStore.transport || {}), ...(fromState.transport || {}) },
    uploads: {
      ...(fromStore.uploads || {}),
      ...(fromState.uploads || {}),
      files: {
        ...(fromStore.uploads?.files || {}),
        ...(fromState.uploads?.files || {}),
      },
    },
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
    which === "packet" ? { appendUploadsData: data } : {}
  );

  return { queued: 1 };
}

export async function downloadWaitlistPdf({ state, location }) {
  const data = readLatestPacketData(state);
  const loc = location || {};
  const en = data.enrollment || {};
  const dateStr = new Date().toISOString().slice(0, 10);
  const base = `ALC_${safeName(en.childLast || loc.id)}_${safeName(en.childFirst)}_${dateStr}`;
  const filename = `${base}_Waitlist_Packet.pdf`;

  const enrollmentBlob = await pdf(<PacketPdf data={data} location={loc} which="waitlist" />).toBlob();
  const agreementBlob = await pdf(<WaitlistAgreementPdf data={data} location={loc} />).toBlob();
  const mergedBlob = await mergePdfBlobs([agreementBlob, enrollmentBlob]);

  const url = URL.createObjectURL(mergedBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);

  return { queued: 1 };
}
