// lib/pdf-to-image.ts
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

export interface ConversionRange {
  start: number;
  end: number;
}

export class PDFToImageConverter {
  private static pdfjsLib: any = null;

  private static async loadPDFJS() {
    if (typeof window === "undefined") {
      throw new Error("PDF conversion is only available in browser");
    }

    if (this.pdfjsLib) {
      return this.pdfjsLib;
    }

    const pdfjsLib = await import("pdfjs-dist");

    try {
      const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.min.mjs");
      const workerBlob = new Blob([pdfjsWorker.default], {
        type: "application/javascript",
      });
      pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(workerBlob);
    } catch (error) {
      console.warn("Failed to load worker from local file, using CDN fallback");
      const version = "3.11.174";
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
    }

    this.pdfjsLib = pdfjsLib;
    return pdfjsLib;
  }

  static async getPDFInfo(pdfFile: File): Promise<{ totalPages: number }> {
    const pdfjsLib = await this.loadPDFJS();
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const totalPages = pdfDoc.numPages;
    await pdfDoc.destroy();
    return { totalPages };
  }

  static async convertPDFToImages(
    pdfFile: File,
    options: PDFToImageOptions = {},
    range?: ConversionRange
  ): Promise<PDFPageImage[]> {
    const { scale = 2.0, quality = 1.0, format = "image/png" } = options;

    const pdfjsLib = await this.loadPDFJS();
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const images: PDFPageImage[] = [];

    // تعیین محدوده صفحات برای تبدیل
    const startPage = range?.start || 1;
    const endPage = range?.end || pdfDoc.numPages;

    // اعتبارسنجی محدوده
    if (startPage < 1 || endPage > pdfDoc.numPages || startPage > endPage) {
      await pdfDoc.destroy();
      throw new Error("Invalid page range");
    }

    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas context not available");
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderParams = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderParams).promise;

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => {
            resolve(blob!);
          },
          format,
          quality
        );
      });

      const dataUrl = canvas.toDataURL(format, quality);

      images.push({
        dataUrl,
        blob,
        pageNumber: pageNum,
        width: canvas.width,
        height: canvas.height,
      });
    }

    await pdfDoc.destroy();
    return images;
  }

  static async convertPDFToImage(
    pdfFile: File,
    pageNumber: number = 1,
    options: PDFToImageOptions = {}
  ): Promise<PDFPageImage> {
    const images = await this.convertPDFToImages(pdfFile, options, {
      start: pageNumber,
      end: pageNumber,
    });
    const image = images[0];

    if (!image) {
      throw new Error(`Page ${pageNumber} not found`);
    }

    return image;
  }

  static downloadImage(image: PDFPageImage, filename?: string) {
    const url = URL.createObjectURL(image.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      filename || `page-${image.pageNumber}.${image.blob.type.split("/")[1]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static downloadAllImages(images: PDFPageImage[], prefix: string = "page") {
    images.forEach((image, index) => {
      setTimeout(() => {
        this.downloadImage(
          image,
          `${prefix}-${image.pageNumber}.${image.blob.type.split("/")[1]}`
        );
      }, index * 100);
    });
  }

  static cleanup() {
    // پاکسازی منابع اگر لازم باشد
  }
}

export default PDFToImageConverter;
