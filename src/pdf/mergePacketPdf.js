import { PDFDocument } from "pdf-lib";

function isPdfFile(meta) {
  const type = String(meta?.type || "").toLowerCase();
  const name = String(meta?.name || "").toLowerCase();
  return type === "application/pdf" || name.endsWith(".pdf");
}

function isImageFile(meta) {
  const type = String(meta?.type || "").toLowerCase();
  return type.startsWith("image/");
}

export function getCompletedIesUpload(data) {
  const files = data?.uploads?.files?.completed_ies || [];
  return files.find((f) => f?.dataUrl) || null;
}

async function dataUrlToBytes(dataUrl) {
  const response = await fetch(dataUrl);
  return response.arrayBuffer();
}

async function appendImagePage(packetDoc, bytes, mimeType) {
  let image;
  if (mimeType === "image/png") {
    image = await packetDoc.embedPng(bytes);
  } else if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
    image = await packetDoc.embedJpg(bytes);
  } else {
    return false;
  }

  const page = packetDoc.addPage([612, 792]);
  const margin = 36;
  const maxW = page.getWidth() - margin * 2;
  const maxH = page.getHeight() - margin * 2;
  const scale = Math.min(maxW / image.width, maxH / image.height, 1);
  const width = image.width * scale;
  const height = image.height * scale;

  page.drawImage(image, {
    x: (page.getWidth() - width) / 2,
    y: (page.getHeight() - height) / 2,
    width,
    height,
  });

  return true;
}

export async function appendIesToPacketPdf(packetBlob, data) {
  const upload = getCompletedIesUpload(data);
  if (!upload?.dataUrl) {
    return packetBlob;
  }

  try {
    const packetDoc = await PDFDocument.load(await packetBlob.arrayBuffer());
    const iesBytes = await dataUrlToBytes(upload.dataUrl);

    if (isPdfFile(upload)) {
      const iesDoc = await PDFDocument.load(iesBytes);
      const pages = await packetDoc.copyPages(iesDoc, iesDoc.getPageIndices());
      pages.forEach((page) => packetDoc.addPage(page));
    } else if (isImageFile(upload)) {
      const ok = await appendImagePage(packetDoc, iesBytes, upload.type);
      if (!ok) {
        return packetBlob;
      }
    } else {
      return packetBlob;
    }

    const merged = await packetDoc.save();
    return new Blob([merged], { type: "application/pdf" });
  } catch (err) {
    console.error("Failed to append uploaded IES to packet PDF:", err);
    return packetBlob;
  }
}
