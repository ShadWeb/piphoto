// hooks/usePDFToImage.ts
import { useState, useCallback, useEffect } from "react";
import {
  PDFToImageConverter,
  PDFPageImage,
  PDFToImageOptions,
} from "@/lib/pdf-to-image";
import JSZip from "jszip";

export interface ConversionRange {
  start: number;
  end: number;
}

export const usePDFToImage = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<PDFPageImage[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      PDFToImageConverter.cleanup();
    };
  }, []);

  // تابع جدید برای دریافت اطلاعات PDF
  const getPDFInfo = useCallback(async (file: File) => {
    try {
      const pdfjsLib = await PDFToImageConverter.loadPDFJS();
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const pages = pdfDoc.numPages;
      await pdfDoc.destroy();
      return pages;
    } catch (err) {
      console.error("Error getting PDF info:", err);
      throw err;
    }
  }, []);

  const loadPDF = useCallback(
    async (file: File) => {
      setPdfFile(file);
      setError(null);

      try {
        const pages = await getPDFInfo(file);
        setTotalPages(pages);
        return pages;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load PDF";
        setError(errorMessage);
        throw err;
      }
    },
    [getPDFInfo]
  );

  const convertPDF = useCallback(
    async (
      file: File,
      options?: PDFToImageOptions,
      range?: ConversionRange
    ) => {
      setIsConverting(true);
      setError(null);
      setImages([]);

      try {
        const result = await PDFToImageConverter.convertPDFToImages(
          file,
          options,
          range
        );
        setImages(result);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Conversion failed";
        setError(errorMessage);
        throw err;
      } finally {
        setIsConverting(false);
      }
    },
    []
  );

  const convertSelectedPages = useCallback(
    async (options?: PDFToImageOptions, range?: ConversionRange) => {
      if (!pdfFile) return;
      return await convertPDF(pdfFile, options, range);
    },
    [pdfFile, convertPDF]
  );

  const downloadImage = useCallback(
    (image: PDFPageImage, filename?: string) => {
      PDFToImageConverter.downloadImage(image, filename);
    },
    []
  );

  const downloadAllImagesAsZip = useCallback(
    async (prefix: string = "converted") => {
      if (images.length === 0) return;

      const zip = new JSZip();

      images.forEach((image, index) => {
        const extension = image.blob.type.split("/")[1];
        const filename = `${prefix}-page-${image.pageNumber}.${extension}`;
        zip.file(filename, image.blob);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${prefix}-pages.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [images]
  );

  const reset = useCallback(() => {
    setImages([]);
    setError(null);
    setIsConverting(false);
    setTotalPages(0);
    setPdfFile(null);
  }, []);

  return {
    convertPDF,
    convertSelectedPages,
    downloadImage,
    downloadAllImages: downloadAllImagesAsZip,
    loadPDF,
    images,
    isConverting,
    error,
    totalPages,
    pdfFile,
    reset,
  };
};

export default usePDFToImage;
