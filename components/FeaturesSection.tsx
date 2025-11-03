export default function FeaturesSection() {
  const features = [
    {
      icon: "bolt",
      title: "سریع و کارآمد",
      description: "فایل‌های شما در چند ثانیه پردازش و آماده‌ی دانلود می‌شوند.",
    },
    {
      icon: "verified",
      title: "کیفیت بالا",
      description:
        "تصاویر خروجی با بالاترین کیفیت ممکن و بدون افت وضوح ایجاد می‌شوند.",
    },
    {
      icon: "touch_app",
      title: "استفاده آسان",
      description:
        "تنها با چند کلیک ساده، فایل خود را آپلود و تصاویر را دریافت کنید.",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-8">
      <h2 className="text-text-light dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">
        چرا ما را انتخاب کنید؟
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm"
          >
            <div className="p-3 rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-4xl">
                {feature.icon}
              </span>
            </div>
            <h3 className="text-lg font-bold">{feature.title}</h3>
            <p className="text-sm text-text-light/80 dark:text-text-dark/80">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
