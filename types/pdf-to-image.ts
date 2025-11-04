// types/pdf-to-image.ts
export interface PDFToImageOptions {
  scale?: number;
  quality?: number;
  format?: "image/png" | "image/jpeg" | "image/webp";
}

export interface PDFPageImage {
  dataUrl: string;
  blob: Blob;
  pageNumber: number;
  width: number;
  height: number;
}
