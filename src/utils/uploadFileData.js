const IES_UPLOAD_ID = "completed_ies";

export function shouldRetainUploadData() {
  return true;
}

function readDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function filesToUploadMeta(fileList, { uploadedBy = "parent", note = "", retainData = false } = {}) {
  const files = Array.from(fileList || []);
  return Promise.all(
    files.map(async (file) => {
      const meta = {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        uploadedBy,
        note: String(note || "").trim(),
      };

      if (retainData) {
        meta.dataUrl = await readDataUrl(file);
      }

      return meta;
    })
  );
}

export { IES_UPLOAD_ID };
