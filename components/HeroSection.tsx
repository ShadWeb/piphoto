//components/HeroSection.tsx

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-text-light dark:text-text-dark tracking-tight text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          تبدیل PDF به عکس سریع و آسان
        </h1>
        <p className="text-text-light/80 dark:text-text-dark/80 text-base md:text-lg font-normal leading-normal max-w-2xl mx-auto">
          سرویس رایگان و امن ما فایل های PDF شما را به تصاویر با کیفیت بالا
          تبدیل می کند، بدون نیاز به نصب هیچ نرم افزاری.
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <div className="flex flex-col p-4">
          <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-border-light dark:border-border-dark px-6 py-14 bg-card-light dark:bg-card-dark shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <p className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                فایل PDF خود را اینجا بکشید و رها کنید
              </p>
              <p className="text-text-light/80 dark:text-text-dark/80 text-sm font-normal leading-normal max-w-[480px] text-center">
                یا
              </p>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
              <span className="truncate">آپلود PDF</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
