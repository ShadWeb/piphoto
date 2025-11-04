// // // components/PDFConverter.tsx
// // import { useState } from "react";
// // import usePDFToImage from "@/hooks/usePDFToImage";

// // const PDFConverter = () => {
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const {
// //     convertPDF,
// //     images,
// //     isConverting,
// //     error,
// //     reset,
// //     downloadImage,
// //     downloadAllImages,
// //   } = usePDFToImage();

// //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = event.target.files?.[0];
// //     if (file && file.type === "application/pdf") {
// //       setSelectedFile(file);
// //       reset();
// //     }
// //   };

// //   const handleConvert = async () => {
// //     if (!selectedFile) return;

// //     try {
// //       await convertPDF(selectedFile, {
// //         scale: 1.5,
// //         quality: 0.9,
// //         format: "image/jpeg",
// //       });
// //     } catch (err) {
// //       console.error("Conversion error:", err);
// //     }
// //   };

// //   const handleDownloadAll = () => {
// //     if (images.length > 0) {
// //       downloadAllImages("converted");
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-4xl mx-auto">
// //       <div className="mb-6">
// //         <input
// //           type="file"
// //           accept=".pdf"
// //           onChange={handleFileChange}
// //           className="mb-4 p-2 border rounded"
// //         />

// //         {selectedFile && (
// //           <div className="flex gap-2 mb-4">
// //             <button
// //               onClick={handleConvert}
// //               disabled={isConverting}
// //               className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
// //             >
// //               {isConverting ? "Converting..." : "Convert to Images"}
// //             </button>

// //             {images.length > 0 && (
// //               <button
// //                 onClick={handleDownloadAll}
// //                 className="bg-green-500 text-white px-4 py-2 rounded"
// //               >
// //                 Download All ({images.length})
// //               </button>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {error && (
// //         <div className="text-red-500 mb-4 p-3 bg-red-50 rounded">
// //           Error: {error}
// //         </div>
// //       )}

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         {images.map((image) => (
// //           <div
// //             key={image.pageNumber}
// //             className="border rounded-lg p-4 bg-white"
// //           >
// //             <div className="mb-2 flex justify-between items-center">
// //               <span className="font-semibold">Page {image.pageNumber}</span>
// //               <span className="text-sm text-gray-500">
// //                 {image.width} × {image.height}
// //               </span>
// //             </div>

// //             <img
// //               src={image.dataUrl}
// //               alt={`Page ${image.pageNumber}`}
// //               className="max-w-full h-auto border rounded"
// //             />

// //             <div className="mt-2 flex gap-2">
// //               <button
// //                 onClick={() => downloadImage(image)}
// //                 className="bg-green-500 text-white px-3 py-1 rounded text-sm flex-1"
// //               >
// //                 Download
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {images.length > 0 && (
// //         <div className="mt-4 text-sm text-gray-600 text-center">
// //           Successfully converted {images.length} page
// //           {images.length > 1 ? "s" : ""}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PDFConverter;
// // components/PDFConverter.tsx
// import { useState } from "react";
// import usePDFToImage from "@/hooks/usePDFToImage";

// const PDFConverter = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const {
//     convertPDF,
//     images,
//     isConverting,
//     error,
//     reset,
//     downloadImage,
//     downloadAllImages,
//   } = usePDFToImage();

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type === "application/pdf") {
//       setSelectedFile(file);
//       reset();
//     }
//   };

//   const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     if (file && file.type === "application/pdf") {
//       setSelectedFile(file);
//       reset();
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//   };

//   const handleConvert = async () => {
//     if (!selectedFile) return;

//     try {
//       await convertPDF(selectedFile, {
//         scale: 1.5,
//         quality: 0.9,
//         format: "image/jpeg",
//       });
//     } catch (err) {
//       console.error("Conversion error:", err);
//     }
//   };

//   const handleDownloadAll = () => {
//     if (images.length > 0) {
//       downloadAllImages("converted");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background-light dark:bg-background-dark py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Hero Section */}
//         <section className="flex flex-col items-center text-center gap-8 mb-12">
//           <div className="flex flex-col gap-4">
//             <h1 className="text-text-light dark:text-text-dark tracking-tight text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//               تبدیل PDF به عکس سریع و آسان
//             </h1>
//             <p className="text-text-light/80 dark:text-text-dark/80 text-base md:text-lg font-normal leading-normal max-w-2xl mx-auto">
//               سرویس رایگان و امن ما فایل های PDF شما را به تصاویر با کیفیت بالا
//               تبدیل می کند، بدون نیاز به نصب هیچ نرم افزاری.
//             </p>
//           </div>

//           <div className="w-full max-w-3xl">
//             <div className="flex flex-col p-4">
//               <div
//                 className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-border-light dark:border-border-dark px-6 py-14 bg-card-light dark:bg-card-dark shadow-sm cursor-pointer transition-colors hover:border-primary/50"
//                 onDrop={handleFileDrop}
//                 onDragOver={handleDragOver}
//                 onClick={() => document.getElementById("pdf-upload")?.click()}
//               >
//                 <div className="flex flex-col items-center gap-2">
//                   <p className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
//                     فایل PDF خود را اینجا بکشید و رها کنید
//                   </p>
//                   <p className="text-text-light/80 dark:text-text-dark/80 text-sm font-normal leading-normal max-w-[480px] text-center">
//                     یا
//                   </p>
//                 </div>

//                 <input
//                   id="pdf-upload"
//                   type="file"
//                   accept=".pdf"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />

//                 <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
//                   <span className="material-symbols-outlined text-lg mr-2">
//                     upload
//                   </span>
//                   <span className="truncate">آپلود PDF</span>
//                 </button>

//                 {selectedFile && (
//                   <div className="text-center mt-2">
//                     <p className="text-text-light dark:text-text-dark text-sm font-medium">
//                       فایل انتخاب شده: {selectedFile.name}
//                     </p>
//                     <p className="text-text-light/60 dark:text-text-dark/60 text-xs">
//                       {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {selectedFile && !images.length && (
//             <div className="flex gap-3">
//               <button
//                 onClick={handleConvert}
//                 disabled={isConverting}
//                 className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[140px]"
//               >
//                 {isConverting ? (
//                   <>
//                     <span className="material-symbols-outlined animate-spin">
//                       refresh
//                     </span>
//                     <span>در حال تبدیل...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span className="material-symbols-outlined">
//                       convert_to_image
//                     </span>
//                     <span>تبدیل به عکس</span>
//                   </>
//                 )}
//               </button>

//               {!isConverting && (
//                 <button
//                   onClick={() => {
//                     setSelectedFile(null);
//                     reset();
//                   }}
//                   className="flex items-center justify-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-xl text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-600 transition-colors"
//                 >
//                   <span className="material-symbols-outlined">close</span>
//                   <span>لغو</span>
//                 </button>
//               )}
//             </div>
//           )}
//         </section>

//         {/* Error Message */}
//         {error && (
//           <div className="max-w-3xl mx-auto mb-8">
//             <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 flex items-center gap-3">
//               <span className="material-symbols-outlined">error</span>
//               <div>
//                 <p className="font-semibold">خطا در تبدیل فایل</p>
//                 <p className="text-sm">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Download Section */}
//         {images.length > 0 && (
//           <section className="flex flex-col items-center gap-8 w-full p-6 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
//             <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <span className="material-symbols-outlined text-green-500 text-2xl">
//                   check_circle
//                 </span>
//                 <h2 className="text-text-light dark:text-text-dark text-xl md:text-2xl font-bold leading-tight tracking-[-0.015em]">
//                   تبدیل با موفقیت انجام شد!
//                 </h2>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={handleDownloadAll}
//                   className="flex items-center justify-center gap-2 w-full md:w-auto min-w-[84px] max-w-[480px] cursor-pointer overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
//                 >
//                   <span className="material-symbols-outlined">folder_zip</span>
//                   <span className="truncate">دانلود همه ({images.length})</span>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSelectedFile(null);
//                     reset();
//                   }}
//                   className="flex items-center justify-center gap-2 px-4 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 >
//                   <span className="material-symbols-outlined">restart_alt</span>
//                   <span>تبدیل جدید</span>
//                 </button>
//               </div>
//             </div>

//             <div className="w-full">
//               <div className="mb-4 flex items-center justify-between">
//                 <p className="text-text-light/80 dark:text-text-dark/80 text-sm">
//                   {images.length} صفحه تبدیل شده
//                 </p>
//                 <p className="text-text-light/60 dark:text-text-dark/60 text-xs">
//                   روی هر عکس کلیک کنید تا دانلود شود
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
//                 {images.map((image) => (
//                   <div
//                     key={image.pageNumber}
//                     className="relative group aspect-[3/4] rounded-lg overflow-hidden border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 shadow-sm"
//                   >
//                     <img
//                       src={image.dataUrl}
//                       alt={`Page ${image.pageNumber}`}
//                       className="w-full h-full object-contain"
//                     />

//                     <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
//                       صفحه {image.pageNumber}
//                     </div>

//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button
//                         onClick={() => downloadImage(image)}
//                         className="p-3 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
//                         title="دانلود این صفحه"
//                       >
//                         <span className="material-symbols-outlined">
//                           download
//                         </span>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PDFConverter;
import { useState, useRef } from "react";
import usePDFToImage from "@/hooks/usePDFToImage";

const PDFConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    convertPDF,
    images,
    isConverting,
    error,
    reset,
    downloadImage,
    downloadAllImages,
  } = usePDFToImage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      reset();
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      reset();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    try {
      await convertPDF(selectedFile, {
        scale: 1.5,
        quality: 0.9,
        format: "image/jpeg",
      });
    } catch (err) {
      console.error("Conversion error:", err);
    }
  };

  const handleDownloadAll = () => {
    if (images.length > 0) {
      downloadAllImages("converted");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            <h1 className="text-text-light dark:text-text-dark tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-2">
              تبدیل PDF به عکس سریع و آسان
            </h1>
            <p className="text-text-light/80 dark:text-text-dark/80 text-sm sm:text-base md:text-lg font-normal leading-normal max-w-2xl mx-auto px-4">
              سرویس رایگان و امن ما فایل های PDF شما را به تصاویر با کیفیت بالا
              تبدیل می کند، بدون نیاز به نصب هیچ نرم افزاری.
            </p>
          </div>

          <div className="w-full max-w-3xl px-2">
            <div className="flex flex-col p-3 sm:p-4">
              <div
                className={`flex flex-col items-center gap-4 sm:gap-6 rounded-xl border-2 border-dashed px-4 sm:px-6 py-10 sm:py-14 bg-card-light dark:bg-card-dark shadow-sm cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border-light dark:border-border-dark hover:border-primary/50"
                }`}
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleUploadClick}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 text-primary mb-2">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl">
                      upload
                    </span>
                  </div>
                  <p className="text-text-light dark:text-text-dark text-base sm:text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                    {isDragging
                      ? "فایل را اینجا رها کنید"
                      : "فایل PDF خود را اینجا بکشید و رها کنید"}
                  </p>
                  <p className="text-text-light/80 dark:text-text-dark/80 text-sm font-normal leading-normal max-w-[480px] text-center">
                    یا
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 sm:h-12 px-4 sm:px-6 bg-primary text-white text-sm sm:text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined text-lg mr-2">
                    upload
                  </span>
                  <span className="truncate">آپلود PDF</span>
                </button>

                <p className="text-text-light/60 dark:text-text-dark/60 text-xs text-center mt-2">
                  فرمت قابل قبول: PDF • حداکثر حجم: 50MB
                </p>

                {selectedFile && (
                  <div className="text-center mt-2 p-3 bg-primary/5 rounded-lg w-full max-w-md">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-primary text-lg">
                        description
                      </span>
                      <p className="text-text-light dark:text-text-dark text-sm font-medium truncate max-w-[200px] sm:max-w-none">
                        {selectedFile.name}
                      </p>
                    </div>
                    <p className="text-text-light/60 dark:text-text-dark/60 text-xs">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedFile && !images.length && (
            <div
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center px-4"
              dir="rtl"
            >
              {!isConverting && (
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    reset();
                  }}
                  className="flex items-center justify-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-xl text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-600 transition-colors flex-1"
                >
                  <span className="material-symbols-outlined">close</span>
                  <span>لغو</span>
                </button>
              )}
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[140px] flex-1"
              >
                {isConverting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">
                      refresh
                    </span>
                    <span>در حال تبدیل...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined"></span>
                    <span>تبدیل به عکس</span>
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-3">
            <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5">error</span>
              <div className="flex-1">
                <p className="font-semibold">خطا در تبدیل فایل</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Download Section */}
        {images.length > 0 && (
          <section className="flex flex-col items-center gap-6 sm:gap-8 w-full p-4 sm:p-6 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm mx-2">
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-500 text-2xl">
                  check_circle
                </span>
                <div>
                  <h2 className="text-text-light dark:text-text-dark text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-[-0.015em]">
                    تبدیل با موفقیت انجام شد!
                  </h2>
                  <p className="text-text-light/60 dark:text-text-dark/60 text-xs sm:text-sm mt-1">
                    {images.length} صفحه تبدیل شده
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDownloadAll}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto min-w-[84px] cursor-pointer overflow-hidden rounded-xl h-10 sm:h-12 px-4 sm:px-6 bg-primary text-white text-sm sm:text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors order-2 sm:order-1"
                >
                  <span className="material-symbols-outlined">folder_zip</span>
                  <span className="truncate">دانلود همه ({images.length})</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedFile(null);
                    reset();
                  }}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 sm:py-3 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors order-1 sm:order-2 text-sm sm:text-base"
                >
                  <span className="material-symbols-outlined">restart_alt</span>
                  <span>تبدیل جدید</span>
                </button>
              </div>
            </div>

            <div className="w-full">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <p className="text-text-light/80 dark:text-text-dark/80 text-sm">
                  روی هر عکس کلیک کنید تا دانلود شود
                </p>
                <p className="text-text-light/60 dark:text-text-dark/60 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  کیفیت: بالا • فرمت: JPEG
                </p>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 w-full">
                {images.map((image) => (
                  <div
                    key={image.pageNumber}
                    className="relative group aspect-[3/4] rounded-lg overflow-hidden border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 shadow-sm transition-transform hover:scale-[1.02]"
                  >
                    <img
                      src={image.dataUrl}
                      alt={`Page ${image.pageNumber}`}
                      className="w-full h-full object-contain"
                    />

                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      صفحه {image.pageNumber}
                    </div>

                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(image);
                        }}
                        className="p-2 sm:p-3 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                        title="دانلود این صفحه"
                      >
                        <span className="material-symbols-outlined text-lg sm:text-xl">
                          download
                        </span>
                      </button>
                    </div>

                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // امکان پیش نمایش بزرگتر تصویر
                          window.open(image.dataUrl, "_blank");
                        }}
                        className="p-1.5 bg-black/50 text-white rounded backdrop-blur-sm hover:bg-black/70 transition-colors"
                        title="پیش نمایش بزرگ"
                      >
                        <span className="material-symbols-outlined text-sm">
                          open_in_new
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* اطلاعات اضافی برای دستگاه های کوچک */}
        <div className="mt-8 text-center px-4">
          <p className="text-text-light/60 dark:text-text-dark/60 text-xs">
            این سرویس به طور کامل در دستگاه های موبایل و تبلت پشتیبانی می شود
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFConverter;
