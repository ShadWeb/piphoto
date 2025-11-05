// // // components/PDFConverter.tsx
// // import { useState, useRef, useEffect } from "react";
// // import usePDFToImage from "@/hooks/usePDFToImage";
// // import Image from "next/image";

// // const PDFConverter = () => {
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [pageRange, setPageRange] = useState({ start: 1, end: 1 });
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const containerRef = useRef<HTMLDivElement>(null);

// //   const {
// //     loadPDF,
// //     convertSelectedPages,
// //     images,
// //     isConverting,
// //     error,
// //     totalPages,
// //     reset,
// //     downloadImage,
// //     downloadAllImages,
// //   } = usePDFToImage();

// //   // تنظیم ارتفاع داینامیک برای قرارگیری در یک اسکرین
// //   // useEffect(() => {
// //   //   const updateHeight = () => {
// //   //     if (containerRef.current) {
// //   //       containerRef.current.style.minHeight = `${window.innerHeight}px`;
// //   //     }
// //   //   };

// //   //   updateHeight();
// //   //   window.addEventListener("resize", updateHeight);

// //   //   return () => window.removeEventListener("resize", updateHeight);
// //   // }, []);

// //   const handleFileChange = async (
// //     event: React.ChangeEvent<HTMLInputElement>
// //   ) => {
// //     const file = event.target.files?.[0];
// //     if (file && file.type === "application/pdf") {
// //       setSelectedFile(file);
// //       reset();
// //       try {
// //         const pages = await loadPDF(file);
// //         setPageRange({ start: 1, end: pages });
// //       } catch (err) {
// //         console.error("Error loading PDF:", err);
// //       }
// //     }
// //   };

// //   const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
// //     event.preventDefault();
// //     setIsDragging(false);

// //     const file = event.dataTransfer.files[0];
// //     if (file && file.type === "application/pdf") {
// //       setSelectedFile(file);
// //       reset();
// //       try {
// //         const pages = await loadPDF(file);
// //         setPageRange({ start: 1, end: pages });
// //       } catch (err) {
// //         console.error("Error loading PDF:", err);
// //       }
// //     }
// //   };

// //   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
// //     event.preventDefault();
// //     setIsDragging(true);
// //   };

// //   const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
// //     event.preventDefault();
// //     setIsDragging(false);
// //   };

// //   const handleConvert = async () => {
// //     if (!selectedFile) return;

// //     // اعتبارسنجی محدوده صفحات
// //     if (
// //       pageRange.start < 1 ||
// //       pageRange.end > totalPages ||
// //       pageRange.start > pageRange.end
// //     ) {
// //       return;
// //     }

// //     try {
// //       await convertSelectedPages(
// //         {
// //           scale: 1.5,
// //           quality: 0.9,
// //           format: "image/jpeg",
// //         },
// //         pageRange
// //       );
// //     } catch (err) {
// //       console.error("Conversion error:", err);
// //     }
// //   };

// //   const handleDownloadAll = () => {
// //     if (images.length > 0) {
// //       downloadAllImages("converted");
// //     }
// //   };

// //   const handleUploadClick = () => {
// //     fileInputRef.current?.click();
// //   };

// //   const handleRemoveFile = () => {
// //     setSelectedFile(null);
// //     reset();
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = "";
// //     }
// //   };

// //   const handleRangeChange = (field: "start" | "end", value: string) => {
// //     const numValue = parseInt(value) || 1;
// //     setPageRange((prev) => {
// //       const newRange = { ...prev, [field]: numValue };

// //       // اطمینان از اینکه start از end بیشتر نباشد و بالعکس
// //       if (field === "start" && numValue > prev.end) {
// //         newRange.end = numValue;
// //       } else if (field === "end" && numValue < prev.start) {
// //         newRange.start = numValue;
// //       }

// //       // محدود کردن مقادیر به محدوده معتبر
// //       if (newRange.start < 1) newRange.start = 1;
// //       if (newRange.end > totalPages) newRange.end = totalPages;
// //       if (newRange.start > totalPages) newRange.start = totalPages;
// //       if (newRange.end < 1) newRange.end = 1;

// //       return newRange;
// //     });
// //   };

// //   // محاسبه تعداد صفحات انتخاب شده
// //   const selectedPagesCount = pageRange.end - pageRange.start + 1;

// //   // بررسی آیا محدوده صفحات معتبر است
// //   const isPageRangeValid =
// //     pageRange.start >= 1 &&
// //     pageRange.end <= totalPages &&
// //     pageRange.start <= pageRange.end &&
// //     selectedPagesCount > 0;

// //   return (
// //     <div
// //       ref={containerRef}
// //       className=" flex flex-col justify-center z-10  mb-8"
// //     >
// //       <div className=" mx-auto w-full py-4">
// //         {/* Hero Section - فشرده‌تر شده */}
// //         <section className="flex flex-col items-center text-center gap-4 sm:gap-6 mb-6 sm:mb-8">
// //           <div className="flex flex-col gap-2 sm:gap-3 w-full">
// //             <h1 className="text-text-light dark:text-text-dark tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight px-2">
// //               تبدیل پی دی اف به عکس
// //             </h1>
// //             <p className="text-text-light/80 dark:text-text-dark/80 text-xs sm:text-sm md:text-base font-normal leading-normal max-w-2xl mx-auto px-4">
// //               تبدیل پی دی اف به عکس با کیفیت و آنلاین رایگان بدون نرم افزار در
// //               ویندوز و یا گوشی اندروید امکان پذیر است. برنامه تبدیل PDF به عکس
// //               به صورت انلاین و با کیفیت بالا
// //             </p>
// //           </div>

// //           <div className="w-full max-w-3xl px-2">
// //             <div className="flex flex-col p-2 sm:p-3">
// //               {/* منطقه آپلود - فشرده‌تر */}
// //               <div
// //                 className={`flex flex-col items-center gap-3 sm:gap-4 rounded-xl border-2 border-dashed px-3 sm:px-4 py-6 sm:py-8 bg-card-light dark:bg-card-dark shadow-sm cursor-pointer transition-all duration-300 ${
// //                   isDragging
// //                     ? "border-primary bg-primary/5"
// //                     : "border-border-light dark:border-border-dark hover:border-primary/50"
// //                 } ${selectedFile ? "hidden" : ""}`}
// //                 onDrop={handleFileDrop}
// //                 onDragOver={handleDragOver}
// //                 onDragLeave={handleDragLeave}
// //                 onClick={handleUploadClick}
// //               >
// //                 <div className="flex flex-col items-center gap-2">
// //                   <div
// //                     className="flex items-center justify-center rounded-full bg-primary/10 text-primary
// //   w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-1"
// //                   >
// //                     <Image
// //                       src="/images/Frame121515.png"
// //                       alt="icon"
// //                       width={120}
// //                       height={120}
// //                       className="object-contain"
// //                     />
// //                   </div>

// //                   <p className="text-text-light dark:text-text-dark text-sm sm:text-base font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
// //                     {isDragging
// //                       ? "فایل را اینجا رها کنید"
// //                       : "فایل PDF خود را اینجا بکشید و رها کنید"}
// //                   </p>
// //                   <p className="text-text-light/80 dark:text-text-dark/80 text-xs font-normal leading-normal max-w-[480px] text-center">
// //                     یا
// //                   </p>
// //                 </div>

// //                 <input
// //                   ref={fileInputRef}
// //                   id="pdf-upload"
// //                   type="file"
// //                   accept=".pdf"
// //                   onChange={handleFileChange}
// //                   className="hidden"
// //                 />

// //                 <button className="flex min-w-[80px] max-w-[400px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 sm:h-10 px-3 sm:px-4 bg-primary text-white text-xs sm:text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
// //                   <span className="material-symbols-outlined text-base mr-1">
// //                     upload
// //                   </span>
// //                   <span className="truncate">آپلود PDF</span>
// //                 </button>

// //                 <p className="text-text-light/60 dark:text-text-dark/60 text-xs text-center mt-1">
// //                   فرمت قابل قبول: PDF • حداکثر حجم: 50MB
// //                 </p>
// //               </div>

// //               {/* نمایش فایل انتخاب شده با دکمه حذف */}
// //               {selectedFile && !images.length && (
// //                 <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-3 sm:p-4">
// //                   <div className="flex items-center justify-between mb-3">
// //                     <div className="flex items-center gap-2">
// //                       <span className="material-symbols-outlined text-primary text-lg">
// //                         description
// //                       </span>
// //                       <div>
// //                         <p className="text-text-light dark:text-text-dark text-sm font-medium truncate max-w-[200px] sm:max-w-none">
// //                           {selectedFile.name}
// //                         </p>
// //                         <p className="text-text-light/60 dark:text-text-dark/60 text-xs">
// //                           {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB •{" "}
// //                           {totalPages} صفحه
// //                         </p>
// //                       </div>
// //                     </div>

// //                     <button
// //                       onClick={handleRemoveFile}
// //                       className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
// //                       title="حذف فایل"
// //                     >
// //                       <span className="material-symbols-outlined text-lg">
// //                         delete
// //                       </span>
// //                     </button>
// //                   </div>

// //                   {/* انتخاب محدوده صفحات */}
// //                   <div className="bg-background-light dark:bg-background-dark rounded-lg p-3">
// //                     <h3 className="text-text-light dark:text-text-dark font-semibold mb-3 text-right text-sm">
// //                       انتخاب صفحات برای تبدیل
// //                     </h3>

// //                     <div className="flex flex-col gap-3">
// //                       <div className="flex items-center justify-between gap-2">
// //                         <div className="flex items-center gap-2">
// //                           <label className="text-text-light/80 dark:text-text-dark/80 text-xs whitespace-nowrap">
// //                             از صفحه:
// //                           </label>
// //                           <input
// //                             type="number"
// //                             min="1"
// //                             max={totalPages}
// //                             value={pageRange.start}
// //                             onChange={(e) =>
// //                               handleRangeChange("start", e.target.value)
// //                             }
// //                             className="w-16 px-2 py-1 border border-border-light dark:border-border-dark rounded text-center bg-background-light dark:bg-background-dark text-sm"
// //                           />
// //                         </div>

// //                         <div className="flex items-center gap-2">
// //                           <label className="text-text-light/80 dark:text-text-dark/80 text-xs whitespace-nowrap">
// //                             تا صفحه:
// //                           </label>
// //                           <input
// //                             type="number"
// //                             min="1"
// //                             max={totalPages}
// //                             value={pageRange.end}
// //                             onChange={(e) =>
// //                               handleRangeChange("end", e.target.value)
// //                             }
// //                             className="w-16 px-2 py-1 border border-border-light dark:border-border-dark rounded text-center bg-background-light dark:bg-background-dark text-sm"
// //                           />
// //                         </div>
// //                       </div>

// //                       <div className="flex items-center justify-between text-xs text-text-light/60 dark:text-text-dark/60">
// //                         <span>صفحه اول: 1</span>
// //                         <span>صفحه آخر: {totalPages}</span>
// //                       </div>

// //                       <div
// //                         className={`rounded-lg p-2 text-center text-sm ${
// //                           !isPageRangeValid
// //                             ? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
// //                             : "bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark"
// //                         }`}
// //                       >
// //                         {!isPageRangeValid ? (
// //                           <span>⚠️ محدوده صفحات نامعتبر است</span>
// //                         ) : pageRange.start === pageRange.end ? (
// //                           <span>صفحه {pageRange.start} انتخاب شده</span>
// //                         ) : (
// //                           <span>
// //                             صفحات {pageRange.start} تا {pageRange.end} انتخاب
// //                             شده (تعداد: {selectedPagesCount})
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* دکمه‌های عمل */}
// //                   <div
// //                     className="flex flex-col sm:flex-row gap-2 mt-4"
// //                     dir="rtl"
// //                   >
// //                     <button
// //                       onClick={handleRemoveFile}
// //                       className="flex items-center justify-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-600 transition-colors flex-1"
// //                     >
// //                       <span className="material-symbols-outlined text-lg">
// //                         close
// //                       </span>
// //                       <span>حذف فایل</span>
// //                     </button>

// //                     <button
// //                       onClick={handleConvert}
// //                       disabled={isConverting || !isPageRangeValid}
// //                       className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex-1 min-w-[140px]"
// //                     >
// //                       {isConverting ? (
// //                         <>
// //                           <span className="material-symbols-outlined animate-spin text-lg">
// //                             refresh
// //                           </span>
// //                           <span>در حال تبدیل...</span>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <span className="material-symbols-outlined text-lg">
// //                             image
// //                           </span>
// //                           <span>تبدیل به عکس</span>
// //                         </>
// //                       )}
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Error Message */}
// //         {error && (
// //           <div className="max-w-3xl mx-auto mb-4 sm:mb-6 px-3">
// //             <div className="text-red-500 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 flex items-start gap-2 text-sm">
// //               <span className="material-symbols-outlined mt-0.5">error</span>
// //               <div className="flex-1">
// //                 <p className="font-semibold">خطا در تبدیل فایل</p>
// //                 <p className="text-xs mt-1">{error}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Download Section - فشرده‌تر */}
// //         {images.length > 0 && (
// //           <section className="flex flex-col items-center gap-4 sm:gap-6 w-full p-3 sm:p-4 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm mx-2">
// //             <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
// //               <div className="flex items-center gap-2">
// //                 <span className="material-symbols-outlined text-green-500 text-xl">
// //                   check_circle
// //                 </span>
// //                 <div>
// //                   <h2 className="text-text-light dark:text-text-dark text-base sm:text-lg md:text-xl font-bold leading-tight">
// //                     تبدیل با موفقیت انجام شد!
// //                   </h2>
// //                   <p className="text-text-light/60 dark:text-text-dark/60 text-xs mt-1">
// //                     {images.length} صفحه تبدیل شده
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
// //                 <button
// //                   onClick={handleDownloadAll}
// //                   className="flex items-center bg-green-500 justify-center gap-2 w-full sm:w-auto cursor-pointer overflow-hidden rounded-lg h-9 sm:h-10 px-3 sm:px-4 text-white text-xs sm:text-sm font-bold hover:bg-green-600 transition-colors order-2 sm:order-1"
// //                 >
// //                   <span className="material-symbols-outlined text-lg">
// //                     folder_zip
// //                   </span>
// //                   <span className="truncate">دانلود همه ({images.length})</span>
// //                 </button>

// //                 <button
// //                   onClick={handleRemoveFile}
// //                   className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 py-2 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors order-1 sm:order-2 text-xs sm:text-sm"
// //                 >
// //                   <span className="material-symbols-outlined text-lg">
// //                     restart_alt
// //                   </span>
// //                   <span>تبدیل جدید</span>
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="w-full">
// //               <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
// //                 <p className="text-text-light/80 dark:text-text-dark/80 text-xs">
// //                   روی هر عکس کلیک کنید تا دانلود شود
// //                 </p>
// //                 <p className="text-text-light/60 dark:text-text-dark/60 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
// //                   کیفیت: بالا • فرمت: JPEG
// //                 </p>
// //               </div>

// //               {/* گرید تصاویر با سایز کوچک‌تر */}
// //               <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 w-full max-h-[300px] overflow-y-auto">
// //                 {images.map((image) => (
// //                   <div
// //                     key={image.pageNumber}
// //                     className="relative group aspect-[3/4] rounded-md overflow-hidden border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 shadow-sm transition-transform hover:scale-[1.02]"
// //                   >
// //                     <img
// //                       src={image.dataUrl}
// //                       alt={`Page ${image.pageNumber}`}
// //                       className="w-full h-full object-contain"
// //                     />

// //                     <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
// //                       {image.pageNumber}
// //                     </div>

// //                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           downloadImage(image);
// //                         }}
// //                         className="p-1.5 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
// //                         title="دانلود این صفحه"
// //                       >
// //                         <span className="material-symbols-outlined text-base">
// //                           download
// //                         </span>
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </section>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PDFConverter;
// // components/PDFConverter.tsx
// import { useState, useRef, useEffect } from "react";
// import usePDFToImage from "@/hooks/usePDFToImage";
// import Image from "next/image";

// type OutputFormat = "image/png" | "image/jpeg";

// const PDFConverter = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [pageRange, setPageRange] = useState({ start: 1, end: 1 });
//   const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const {
//     loadPDF,
//     convertSelectedPages,
//     images,
//     isConverting,
//     error,
//     totalPages,
//     reset,
//     downloadImage,
//     downloadAllImages,
//   } = usePDFToImage();

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file && file.type === "application/pdf") {
//       setSelectedFile(file);
//       reset();
//       try {
//         const pages = await loadPDF(file);
//         setPageRange({ start: 1, end: pages });
//       } catch (err) {
//         console.error("Error loading PDF:", err);
//       }
//     }
//   };

//   const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(false);

//     const file = event.dataTransfer.files[0];
//     if (file && file.type === "application/pdf") {
//       setSelectedFile(file);
//       reset();
//       try {
//         const pages = await loadPDF(file);
//         setPageRange({ start: 1, end: pages });
//       } catch (err) {
//         console.error("Error loading PDF:", err);
//       }
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(false);
//   };

//   const handleConvert = async () => {
//     if (!selectedFile) return;

//     // اعتبارسنجی محدوده صفحات
//     if (
//       pageRange.start < 1 ||
//       pageRange.end > totalPages ||
//       pageRange.start > pageRange.end
//     ) {
//       return;
//     }

//     try {
//       await convertSelectedPages(
//         {
//           scale: 1.5,
//           quality: 0.9,
//           format: outputFormat,
//         },
//         pageRange
//       );
//     } catch (err) {
//       console.error("Conversion error:", err);
//     }
//   };

//   const handleDownloadAll = () => {
//     if (images.length > 0 && selectedFile) {
//       // ایجاد نام فایل بر اساس نام PDF و اضافه کردن -photos
//       const originalName = selectedFile.name.replace(/\.pdf$/i, "");
//       const zipFileName = `${originalName}-photos`;
//       downloadAllImages(zipFileName);
//     }
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//     reset();
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleRangeChange = (field: "start" | "end", value: string) => {
//     const numValue = parseInt(value) || 1;
//     setPageRange((prev) => {
//       const newRange = { ...prev, [field]: numValue };

//       // اطمینان از اینکه start از end بیشتر نباشد و بالعکس
//       if (field === "start" && numValue > prev.end) {
//         newRange.end = numValue;
//       } else if (field === "end" && numValue < prev.start) {
//         newRange.start = numValue;
//       }

//       // محدود کردن مقادیر به محدوده معتبر
//       if (newRange.start < 1) newRange.start = 1;
//       if (newRange.end > totalPages) newRange.end = totalPages;
//       if (newRange.start > totalPages) newRange.start = totalPages;
//       if (newRange.end < 1) newRange.end = 1;

//       return newRange;
//     });
//   };

//   // محاسبه تعداد صفحات انتخاب شده
//   const selectedPagesCount = pageRange.end - pageRange.start + 1;

//   // بررسی آیا محدوده صفحات معتبر است
//   const isPageRangeValid =
//     pageRange.start >= 1 &&
//     pageRange.end <= totalPages &&
//     pageRange.start <= pageRange.end &&
//     selectedPagesCount > 0;

//   // گرفتن پسوند فایل برای نمایش
//   const getFileExtension = () => {
//     return outputFormat.split("/")[1].toUpperCase();
//   };

//   return (
//     <div ref={containerRef} className="flex flex-col justify-center z-10 mb-8">
//       <div className="mx-auto w-full py-4">
//         {/* Hero Section */}
//         <section className="flex flex-col md:flex-row items-center text-center gap-4 sm:gap-6 mb-6 sm:mb-8">
//           <div className="flex flex-col gap-2 sm:gap-3 w-full">
//             <h1 className="text-gray-200 dark:text-text-dark tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight px-2">
//               تبدیل پی دی اف به عکس
//             </h1>
//             <p className="text-white dark:text-text-dark/80 text-xs sm:text-sm md:text-base font-normal leading-normal max-w-2xl mx-auto px-4">
//               تبدیل پی دی اف به عکس با کیفیت و آنلاین رایگان بدون نرم افزار در
//               ویندوز و یا گوشی اندروید امکان پذیر است. برنامه تبدیل PDF به عکس
//               به صورت انلاین و با کیفیت بالا
//             </p>
//           </div>

//           <div className="w-full max-w-3xl px-2">
//             <div className="flex flex-col p-2 sm:p-3">
//               {/* منطقه آپلود */}
//               <div
//                 className={`flex flex-col items-center gap-3 sm:gap-4 rounded-xl border-2 border-dashed px-3 sm:px-4 py-6 sm:py-8 bg-card-light dark:bg-card-dark shadow-sm cursor-pointer transition-all duration-300 ${
//                   isDragging
//                     ? "border-primary bg-primary/5"
//                     : "border-border-light dark:border-border-dark hover:border-primary/50"
//                 } ${selectedFile ? "hidden" : ""}`}
//                 onDrop={handleFileDrop}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onClick={handleUploadClick}
//               >
//                 <div className="flex flex-col items-center gap-2">
//                   <div
//                     className="flex items-center justify-center rounded-full bg-primary/10 text-primary
//   w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-1"
//                   >
//                     <Image
//                       src="/images/Frame121515.png"
//                       alt="icon"
//                       width={120}
//                       height={120}
//                       className="object-contain"
//                     />
//                   </div>

//                   <p className="text-text-light dark:text-text-dark text-sm sm:text-base font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
//                     {isDragging
//                       ? "فایل را اینجا رها کنید"
//                       : "فایل PDF خود را اینجا بکشید و رها کنید"}
//                   </p>
//                   <p className="text-text-light/80 dark:text-text-dark/80 text-xs font-normal leading-normal max-w-[480px] text-center">
//                     یا
//                   </p>
//                 </div>

//                 <input
//                   ref={fileInputRef}
//                   id="pdf-upload"
//                   type="file"
//                   accept=".pdf"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />

//                 <button className="flex min-w-[80px] max-w-[400px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 sm:h-10 px-3 sm:px-4 bg-primary text-white text-xs sm:text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
//                   <span className="material-symbols-outlined text-base mr-1">
//                     upload
//                   </span>
//                   <span className="truncate">آپلود PDF</span>
//                 </button>

//                 <p className="text-text-light/60 dark:text-text-dark/60 text-xs text-center mt-1">
//                   فرمت قابل قبول: PDF • حداکثر حجم: 50MB
//                 </p>
//               </div>

//               {/* نمایش فایل انتخاب شده با دکمه حذف */}
//               {selectedFile && !images.length && (
//                 <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-3 sm:p-4">
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-2">
//                       <span className="material-symbols-outlined text-primary text-lg">
//                         description
//                       </span>
//                       <div>
//                         <p className="text-text-light dark:text-text-dark text-sm font-medium truncate max-w-[200px] sm:max-w-none">
//                           {selectedFile.name}
//                         </p>
//                         <p className="text-text-light/60 dark:text-text-dark/60 text-xs">
//                           {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB •{" "}
//                           {totalPages} صفحه
//                         </p>
//                       </div>
//                     </div>

//                     <button
//                       onClick={handleRemoveFile}
//                       className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                       title="حذف فایل"
//                     >
//                       <span className="material-symbols-outlined text-lg">
//                         delete
//                       </span>
//                     </button>
//                   </div>

//                   {/* انتخاب فرمت خروجی */}
//                   <div className="bg-background-light dark:bg-background-dark rounded-lg p-3 mb-3">
//                     <h3 className="text-text-light dark:text-text-dark font-semibold mb-3 text-right text-sm">
//                       فرمت خروجی
//                     </h3>

//                     <div className="flex gap-4 justify-center">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           value="image/jpeg"
//                           checked={outputFormat === "image/jpeg"}
//                           onChange={(e) =>
//                             setOutputFormat(e.target.value as OutputFormat)
//                           }
//                           className="text-primary focus:ring-primary"
//                         />
//                         <span className="text-text-light dark:text-text-dark text-sm">
//                           JPEG (با کیفیت)
//                         </span>
//                       </label>

//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           value="image/png"
//                           checked={outputFormat === "image/png"}
//                           onChange={(e) =>
//                             setOutputFormat(e.target.value as OutputFormat)
//                           }
//                           className="text-primary focus:ring-primary"
//                         />
//                         <span className="text-text-light dark:text-text-dark text-sm">
//                           PNG (شفاف)
//                         </span>
//                       </label>
//                     </div>
//                   </div>

//                   {/* انتخاب محدوده صفحات */}
//                   <div className="bg-background-light dark:bg-background-dark rounded-lg p-3">
//                     <h3 className="text-text-light dark:text-text-dark font-semibold mb-3 text-right text-sm">
//                       انتخاب صفحات برای تبدیل
//                     </h3>

//                     <div className="flex flex-col gap-3">
//                       <div className="flex items-center justify-between gap-2">
//                         <div className="flex items-center gap-2">
//                           <label className="text-text-light/80 dark:text-text-dark/80 text-xs whitespace-nowrap">
//                             از صفحه:
//                           </label>
//                           <input
//                             type="number"
//                             min="1"
//                             max={totalPages}
//                             value={pageRange.start}
//                             onChange={(e) =>
//                               handleRangeChange("start", e.target.value)
//                             }
//                             className="w-16 px-2 py-1 border border-border-light dark:border-border-dark rounded text-center bg-background-light dark:bg-background-dark text-sm"
//                           />
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <label className="text-text-light/80 dark:text-text-dark/80 text-xs whitespace-nowrap">
//                             تا صفحه:
//                           </label>
//                           <input
//                             type="number"
//                             min="1"
//                             max={totalPages}
//                             value={pageRange.end}
//                             onChange={(e) =>
//                               handleRangeChange("end", e.target.value)
//                             }
//                             className="w-16 px-2 py-1 border border-border-light dark:border-border-dark rounded text-center bg-background-light dark:bg-background-dark text-sm"
//                           />
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between text-xs text-text-light/60 dark:text-text-dark/60">
//                         <span>صفحه اول: 1</span>
//                         <span>صفحه آخر: {totalPages}</span>
//                       </div>

//                       <div
//                         className={`rounded-lg p-2 text-center text-sm ${
//                           !isPageRangeValid
//                             ? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
//                             : "bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark"
//                         }`}
//                       >
//                         {!isPageRangeValid ? (
//                           <span>⚠️ محدوده صفحات نامعتبر است</span>
//                         ) : pageRange.start === pageRange.end ? (
//                           <span>صفحه {pageRange.start} انتخاب شده</span>
//                         ) : (
//                           <span>
//                             صفحات {pageRange.start} تا {pageRange.end} انتخاب
//                             شده (تعداد: {selectedPagesCount})
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* دکمه‌های عمل */}
//                   <div
//                     className="flex flex-col sm:flex-row gap-2 mt-4"
//                     dir="rtl"
//                   >
//                     <button
//                       onClick={handleRemoveFile}
//                       className="flex items-center justify-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-600 transition-colors flex-1"
//                     >
//                       <span className="material-symbols-outlined text-lg">
//                         close
//                       </span>
//                       <span>حذف فایل</span>
//                     </button>

//                     <button
//                       onClick={handleConvert}
//                       disabled={isConverting || !isPageRangeValid}
//                       className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex-1 min-w-[140px]"
//                     >
//                       {isConverting ? (
//                         <>
//                           <span className="material-symbols-outlined animate-spin text-lg">
//                             refresh
//                           </span>
//                           <span>در حال تبدیل...</span>
//                         </>
//                       ) : (
//                         <>
//                           <span className="material-symbols-outlined text-lg">
//                             image
//                           </span>
//                           <span>تبدیل به عکس ({getFileExtension()})</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Error Message */}
//         {error && (
//           <div className="max-w-3xl mx-auto mb-4 sm:mb-6 px-3">
//             <div className="text-red-500 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 flex items-start gap-2 text-sm">
//               <span className="material-symbols-outlined mt-0.5">error</span>
//               <div className="flex-1">
//                 <p className="font-semibold">خطا در تبدیل فایل</p>
//                 <p className="text-xs mt-1">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Download Section */}
//         {images.length > 0 && (
//           <section className="flex flex-col items-center gap-4 sm:gap-6 w-full p-3 sm:p-4 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm mx-2">
//             <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
//               <div className="flex items-center gap-2">
//                 <span className="material-symbols-outlined text-green-500 text-xl">
//                   check_circle
//                 </span>
//                 <div>
//                   <h2 className="text-text-light dark:text-text-dark text-base sm:text-lg md:text-xl font-bold leading-tight">
//                     تبدیل با موفقیت انجام شد!
//                   </h2>
//                   <p className="text-text-light/60 dark:text-text-dark/60 text-xs mt-1">
//                     {images.length} صفحه تبدیل شده • فرمت: {getFileExtension()}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                 <button
//                   onClick={handleDownloadAll}
//                   className="flex items-center bg-green-500 justify-center gap-2 w-full sm:w-auto cursor-pointer overflow-hidden rounded-lg h-9 sm:h-10 px-3 sm:px-4 text-white text-xs sm:text-sm font-bold hover:bg-green-600 transition-colors order-2 sm:order-1"
//                 >
//                   <span className="material-symbols-outlined text-lg">
//                     folder_zip
//                   </span>
//                   <span className="truncate">دانلود همه ({images.length})</span>
//                 </button>

//                 <button
//                   onClick={handleRemoveFile}
//                   className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 py-2 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors order-1 sm:order-2 text-xs sm:text-sm"
//                 >
//                   <span className="material-symbols-outlined text-lg">
//                     restart_alt
//                   </span>
//                   <span>تبدیل جدید</span>
//                 </button>
//               </div>
//             </div>

//             <div className="w-full">
//               <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
//                 <p className="text-text-light/80 dark:text-text-dark/80 text-xs">
//                   روی هر عکس کلیک کنید تا دانلود شود
//                 </p>
//                 <p className="text-text-light/60 dark:text-text-dark/60 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
//                   کیفیت: بالا • فرمت: {getFileExtension()}
//                 </p>
//               </div>

//               {/* گرید تصاویر */}
//               <div className="grid grid-cols-2 p-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 w-full max-h-[300px] overflow-y-auto">
//                 {images.map((image) => (
//                   <div
//                     key={image.pageNumber}
//                     className="relative group aspect-[3/4] p rounded-md overflow-hidden border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 shadow-sm transition-transform hover:scale-[1.02]"
//                   >
//                     <img
//                       src={image.dataUrl}
//                       alt={`Page ${image.pageNumber}`}
//                       className="w-full h-full object-contain"
//                     />

//                     <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
//                       {image.pageNumber}
//                     </div>

//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           downloadImage(image);
//                         }}
//                         className="p-1.5 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
//                         title="دانلود این صفحه"
//                       >
//                         <span className="material-symbols-outlined text-base">
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
// components/PDFConverter.tsx
import { useState, useRef, useEffect } from "react";
import usePDFToImage from "@/hooks/usePDFToImage";
import Image from "next/image";

type OutputFormat = "image/png" | "image/jpeg";

const PDFConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pageRange, setPageRange] = useState({ start: 1, end: 1 });
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    loadPDF,
    convertSelectedPages,
    images,
    isConverting,
    error,
    totalPages,
    reset,
    downloadImage,
    downloadAllImages,
  } = usePDFToImage();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      reset();
      try {
        const pages = await loadPDF(file);
        setPageRange({ start: 1, end: pages });
      } catch (err) {
        console.error("Error loading PDF:", err);
      }
    }
  };

  const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      reset();
      try {
        const pages = await loadPDF(file);
        setPageRange({ start: 1, end: pages });
      } catch (err) {
        console.error("Error loading PDF:", err);
      }
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

    // اعتبارسنجی محدوده صفحات
    if (
      pageRange.start < 1 ||
      pageRange.end > totalPages ||
      pageRange.start > pageRange.end
    ) {
      return;
    }

    try {
      await convertSelectedPages(
        {
          scale: 1.5,
          quality: 0.9,
          format: outputFormat,
        },
        pageRange
      );
    } catch (err) {
      console.error("Conversion error:", err);
    }
  };

  const handleDownloadAll = () => {
    if (images.length > 0 && selectedFile) {
      // ایجاد نام فایل بر اساس نام PDF و اضافه کردن -photos
      const originalName = selectedFile.name.replace(/\.pdf$/i, "");
      const zipFileName = `${originalName}-photos`;
      downloadAllImages(zipFileName);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRangeChange = (field: "start" | "end", value: string) => {
    const numValue = parseInt(value) || 1;
    setPageRange((prev) => {
      const newRange = { ...prev, [field]: numValue };

      // اطمینان از اینکه start از end بیشتر نباشد و بالعکس
      if (field === "start" && numValue > prev.end) {
        newRange.end = numValue;
      } else if (field === "end" && numValue < prev.start) {
        newRange.start = numValue;
      }

      // محدود کردن مقادیر به محدوده معتبر
      if (newRange.start < 1) newRange.start = 1;
      if (newRange.end > totalPages) newRange.end = totalPages;
      if (newRange.start > totalPages) newRange.start = totalPages;
      if (newRange.end < 1) newRange.end = 1;

      return newRange;
    });
  };

  // محاسبه تعداد صفحات انتخاب شده
  const selectedPagesCount = pageRange.end - pageRange.start + 1;

  // بررسی آیا محدوده صفحات معتبر است
  const isPageRangeValid =
    pageRange.start >= 1 &&
    pageRange.end <= totalPages &&
    pageRange.start <= pageRange.end &&
    selectedPagesCount > 0;

  // گرفتن پسوند فایل برای نمایش
  const getFileExtension = () => {
    return outputFormat.split("/")[1].toUpperCase();
  };

  return (
    <div ref={containerRef} className="flex flex-col justify-center z-10 mb-8">
      <div className="mx-auto w-full py-4">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center text-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="flex flex-col gap-2 sm:gap-3 w-full">
            <h1 className="text-white tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight px-2 drop-shadow-lg">
              تبدیل پی دی اف به عکس
            </h1>
            <p className="text-white/90 text-xs sm:text-sm md:text-base font-normal leading-normal max-w-2xl mx-auto px-4 backdrop-blur-sm bg-white/10 rounded-lg py-2">
              تبدیل پی دی اف به عکس با کیفیت و آنلاین رایگان بدون نرم افزار در
              ویندوز و یا گوشی اندروید امکان پذیر است. برنامه تبدیل PDF به عکس
              به صورت انلاین و با کیفیت بالا
            </p>
          </div>

          <div className="w-full max-w-3xl px-2">
            <div className="flex flex-col p-2 sm:p-3">
              {/* منطقه آپلود */}
              <div
                className={`flex flex-col items-center gap-3 sm:gap-4 rounded-xl border-2 border-dashed px-3 sm:px-4 py-6 sm:py-8 backdrop-blur-md bg-white/10 shadow-lg cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? "border-white/80 bg-white/20"
                    : "border-white/30 hover:border-white/50"
                } ${selectedFile ? "hidden" : ""}`}
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleUploadClick}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="flex items-center justify-center rounded-full bg-white/20 text-white 
  w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-1 backdrop-blur-sm"
                  >
                    <Image
                      src="/images/Frame121515.png"
                      alt="icon"
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>

                  <p className="text-white text-sm sm:text-base font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center drop-shadow">
                    {isDragging
                      ? "فایل را اینجا رها کنید"
                      : "فایل PDF خود را اینجا بکشید و رها کنید"}
                  </p>
                  <p className="text-white/80 text-xs font-normal leading-normal max-w-[480px] text-center">
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

                <button className="flex min-w-[80px] bg-primary max-w-[400px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 sm:h-10 px-3 sm:px-4  backdrop-blur-md text-white text-xs sm:text-sm font-bold leading-normal tracking-[0.015em] hover:bg-white/30 transition-all border border-white/30 shadow-sm">
                  <span className="material-symbols-outlined text-base mr-1">
                    upload
                  </span>
                  <span className="truncate">آپلود PDF</span>
                </button>

                <p className="text-white/60 text-xs text-center mt-1">
                  فرمت قابل قبول: PDF • حداکثر حجم: 50MB
                </p>
              </div>

              {/* نمایش فایل انتخاب شده با دکمه حذف */}
              {selectedFile && !images.length && (
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-white text-lg">
                        description
                      </span>
                      <div>
                        <p className="text-white text-sm font-medium truncate max-w-[200px] sm:max-w-none drop-shadow">
                          {selectedFile.name}
                        </p>
                        <p className="text-white text-xs">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                          {totalPages} صفحه
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleRemoveFile}
                      className="p-2 text-white/80 hover:bg-red/20 bg-red-600/80 flex items-center justify-center rounded-lg transition-all backdrop-blur-sm"
                      title="حذف فایل"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>

                  {/* انتخاب فرمت خروجی */}
                  <div className="backdrop-blur-sm bg-white/80 rounded-lg p-3 mb-3 border border-white/10">
                    <h3 className="text-black font-semibold mb-3 text-right text-sm drop-shadow">
                      فرمت خروجی
                    </h3>

                    <div className="flex gap-4 justify-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="image/jpeg"
                          checked={outputFormat === "image/jpeg"}
                          onChange={(e) =>
                            setOutputFormat(e.target.value as OutputFormat)
                          }
                          className="text-black focus:ring-white bg-white/20 border-white/30"
                        />
                        <span className="text-black text-sm drop-shadow">
                          JPEG (با کیفیت)
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="image/png"
                          checked={outputFormat === "image/png"}
                          onChange={(e) =>
                            setOutputFormat(e.target.value as OutputFormat)
                          }
                          className="text-black focus:ring-white bg-white/20 border-white/30"
                        />
                        <span className="text-black text-sm drop-shadow">
                          PNG (شفاف)
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* انتخاب محدوده صفحات */}
                  <div className="backdrop-blur-sm bg-white/80 rounded-lg p-3 border border-white/10">
                    <h3 className="text-black font-semibold mb-3 text-right text-sm drop-shadow">
                      انتخاب صفحات برای تبدیل
                    </h3>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <label className="text-black/80 text-xs whitespace-nowrap drop-shadow">
                            از صفحه:
                          </label>
                          <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={pageRange.start}
                            onChange={(e) =>
                              handleRangeChange("start", e.target.value)
                            }
                            className="w-16 px-2 py-1 border border-white/30 rounded text-center bg-white/20 backdrop-blur-sm text-black text-sm placeholder-white/50"
                            placeholder="1"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-black/80 text-xs whitespace-nowrap drop-shadow">
                            تا صفحه:
                          </label>
                          <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={pageRange.end}
                            onChange={(e) =>
                              handleRangeChange("end", e.target.value)
                            }
                            className="w-16 px-2 py-1 border border-white/30 rounded text-center bg-white/20 backdrop-blur-sm text-black text-sm placeholder-white/50"
                            placeholder={totalPages.toString()}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-black">
                        <span>صفحه اول: 1</span>
                        <span>صفحه آخر: {totalPages}</span>
                      </div>

                      <div
                        className={`rounded-lg p-2 text-center text-sm backdrop-blur-sm ${
                          !isPageRangeValid
                            ? "bg-red-400/30 text-black border border-red-400/50"
                            : "bg-white/10 text-black border border-white/20"
                        }`}
                      >
                        {!isPageRangeValid ? (
                          <span>⚠️ محدوده صفحات نامعتبر است</span>
                        ) : pageRange.start === pageRange.end ? (
                          <span>صفحه {pageRange.start} انتخاب شده</span>
                        ) : (
                          <span>
                            صفحات {pageRange.start} تا {pageRange.end} انتخاب
                            شده (تعداد: {selectedPagesCount})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* دکمه‌های عمل */}
                  <div
                    className="flex flex-col sm:flex-row gap-2 mt-4"
                    dir="rtl"
                  >
                    <button
                      onClick={handleRemoveFile}
                      className="flex items-center justify-center gap-2 bg-red-600/80 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/30 transition-all border border-white/30 shadow-sm flex-1"
                    >
                      <span className="material-symbols-outlined text-lg">
                        close
                      </span>
                      <span>حذف فایل</span>
                    </button>

                    <button
                      onClick={handleConvert}
                      disabled={isConverting || !isPageRangeValid}
                      className="flex items-center justify-center gap-2 bg-primary backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/40 transition-all border border-white/40 shadow-sm disabled:bg-white/10 disabled:cursor-not-allowed flex-1 min-w-[140px]"
                    >
                      {isConverting ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-lg">
                            refresh
                          </span>
                          <span>در حال تبدیل...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-lg">
                            image
                          </span>
                          <span>تبدیل به عکس ({getFileExtension()})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-4 sm:mb-6 px-3">
            <div className="text-white p-3 bg-red-400/30 backdrop-blur-md rounded-xl border border-red-400/50 flex items-start gap-2 text-sm">
              <span className="material-symbols-outlined mt-0.5">error</span>
              <div className="flex-1">
                <p className="font-semibold">خطا در تبدیل فایل</p>
                <p className="text-xs mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Download Section */}
        {images.length > 0 && (
          <section className="flex flex-col items-center gap-4 sm:gap-6 w-full p-3 sm:p-4 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 shadow-lg mx-2">
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-300 text-xl">
                  check_circle
                </span>
                <div>
                  <h2 className="text-white text-base sm:text-lg md:text-xl font-bold leading-tight drop-shadow">
                    تبدیل با موفقیت انجام شد!
                  </h2>
                  <p className="text-white/90 text-xs mt-1">
                    {images.length} صفحه تبدیل شده • فرمت: {getFileExtension()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDownloadAll}
                  className="flex items-center bg-green-500/80 backdrop-blur-md justify-center gap-2 w-full sm:w-auto cursor-pointer overflow-hidden rounded-lg h-9 sm:h-10 px-3 sm:px-4 text-white text-xs sm:text-sm font-bold hover:bg-green-500 transition-all border border-green-400/50 shadow-sm order-2 sm:order-1"
                >
                  <span className="material-symbols-outlined text-lg">
                    folder_zip
                  </span>
                  <span className="truncate">دانلود همه ({images.length})</span>
                </button>

                <button
                  onClick={handleRemoveFile}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 py-2 border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm order-1 sm:order-2 text-xs sm:text-sm"
                >
                  <span className="material-symbols-outlined text-lg">
                    restart_alt
                  </span>
                  <span>تبدیل جدید</span>
                </button>
              </div>
            </div>

            <div className="w-full">
              <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                <p className="text-white/80 text-xs">
                  روی هر عکس کلیک کنید تا دانلود شود
                </p>
                <p className="text-white/60 text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded border border-white/20">
                  کیفیت: بالا • فرمت: {getFileExtension()}
                </p>
              </div>

              {/* گرید تصاویر */}
              <div className="grid bg-white/80 p-4 rounded-2xl grid-cols-2  xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 w-full max-h-[300px] overflow-y-auto">
                {images.map((image) => (
                  <div
                    key={image.pageNumber}
                    className="relative group aspect-[3/4] rounded-md overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <img
                      src={image.dataUrl}
                      alt={`Page ${image.pageNumber}`}
                      className="w-full h-full object-contain"
                    />

                    <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded backdrop-blur-sm">
                      {image.pageNumber}
                    </div>

                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(image);
                        }}
                        className="p-1.5 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                        title="دانلود این صفحه"
                      >
                        <span className="material-symbols-outlined text-base">
                          download
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PDFConverter;
