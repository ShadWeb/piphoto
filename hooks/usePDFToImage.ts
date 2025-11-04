// hooks/usePDFToImage.ts
import { useState, useCallback, useEffect } from "react";
import {
  PDFToImageConverter,
  PDFPageImage,
  PDFToImageOptions,
} from "@/lib/pdf-to-image";

export const usePDFToImage = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<PDFPageImage[]>([]);

  useEffect(() => {
    return () => {
      // پاکسازی هنگام unmount
      PDFToImageConverter.cleanup();
    };
  }, []);

  const convertPDF = useCallback(
    async (pdfFile: File, options?: PDFToImageOptions) => {
      setIsConverting(true);
      setError(null);
      setImages([]);

      try {
        const result = await PDFToImageConverter.convertPDFToImages(
          pdfFile,
          options
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

  const convertSinglePage = useCallback(
    async (
      pdfFile: File,
      pageNumber: number = 1,
      options?: PDFToImageOptions
    ) => {
      setIsConverting(true);
      setError(null);
      setImages([]);

      try {
        const result = await PDFToImageConverter.convertPDFToImage(
          pdfFile,
          pageNumber,
          options
        );
        setImages([result]);
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

  const downloadImage = useCallback(
    (image: PDFPageImage, filename?: string) => {
      PDFToImageConverter.downloadImage(image, filename);
    },
    []
  );

  const downloadAllImages = useCallback(
    (prefix?: string) => {
      PDFToImageConverter.downloadAllImages(images, prefix);
    },
    [images]
  );

  const reset = useCallback(() => {
    setImages([]);
    setError(null);
    setIsConverting(false);
  }, []);

  return {
    convertPDF,
    convertSinglePage,
    downloadImage,
    downloadAllImages,
    images,
    isConverting,
    error,
    reset,
  };
};

export default usePDFToImage;
