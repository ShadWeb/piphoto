export default function HowItWorks() {
  const steps = [
    {
      number: "۱",
      title: "آپلود",
      description: "فایل PDF خود را انتخاب کنید.",
    },
    {
      number: "۲",
      title: "تبدیل",
      description: "منتظر بمانید تا پردازش شود.",
    },
    {
      number: "۳",
      title: "دانلود",
      description: "تصاویر خود را دریافت کنید.",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-8">
      <h2 className="text-text-light dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">
        روند کار چگونه است؟
      </h2>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
        {steps.map((step, index) => (
          <>
            <div
              key={index}
              className="flex flex-col items-center gap-2 text-center w-48"
            >
              <div className="flex items-center justify-center size-16 rounded-full bg-primary/20 text-primary text-xl font-bold">
                {step.number}
              </div>
              <h3 className="font-bold mt-2">{step.title}</h3>
              <p className="text-sm text-text-light/80 dark:text-text-dark/80">
                {step.description}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div className="w-16 h-px md:h-auto md:w-24 border-t-2 md:border-t-0 md:border-r-2 border-dashed border-border-light dark:border-border-dark my-4 md:my-0"></div>
            )}
          </>
        ))}
      </div>
    </section>
  );
}
