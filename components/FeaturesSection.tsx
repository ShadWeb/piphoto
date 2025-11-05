export default function FeaturesSection() {
  const features = [
    {
      images: "Frame 121518.png",
      title: "تبدیل پی دی اف به عکس با کیفیت آنلاین",
      description:
        "تبدیل پی دی اف به عکس با کیفیت آنلاین، به‌سادگی و در چند ثانیه! همین حالا عکس‌ها و فایل‌های خودت رو سریع به PDF یا برعکس تبدیل کن.",
    },
    {
      images: "Frame 121517.png",
      title: "تبدیل PDF به عکس رایگان",
      description:
        "شما می‌توانید به راحتی تبدیل PDF به عکس رایگان انجام دهید. فقط فایل PDF خود را آپلود کنید و در چند ثانیه تصاویر با کیفیت بالا و آماده استفاده دریافت کنید.",
    },
    {
      images: "Frame 121516.png",
      title: "برنامه تبدیل پی دی اف به jpeg , png",
      description:
        "با برنامه تبدیل پی‌دی‌اف به JPEG و PNG، فایل‌های خود را سریع، آسان و با کیفیت به تصاویر تبدیل کنید،  بدون نصب نرم‌افزار و تنها در چند ثانیه!",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-8 mt-10 z-10">
      <h2 className="md:text-gray-200 text-black dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">
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
                <img src={`images/${feature.images}`} alt={feature.title} />
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
