//components/DownloadSection.tsx

export default function DownloadSection() {
  const images = [
    {
      id: 1,
      alt: "صفحه ۱",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoJWrrKRsk2xrGtw1aEgqQhRP0Q_xMYje4Zqynpu4HKTz42dkTZFHhtHXxKgAsIJhm4UxAAgTRTO52nak6IyJjSBvnFB7AVGBn4G7pTskHUHp4kPf8MILyzKVcFFa9wGLAC0B7x_pxxL-4x1eWyGRV-reWP9V1gmphvZP7VGpzUgUF9SHuztz0T5BK3BnDaHAqxoeu42eSjw6sfn5w_SVH4OziWmyYxY4hFG0sY8-Wo1xtMCToTK-DdsrKDtipC_sAfPFKB0jzi5I",
    },
    {
      id: 2,
      alt: "صفحه ۲",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwp6iJtiPpmq2CR5KKbeJz1uEtt7uDvFPffz7GeOSdyIvS7gjxdehAR3Jum2DjzM_lE5gTGr5edRtx7oHMqUdXOFajuk_hRMDAThGBhsIJKg_ZEeBP4QRfI4BI6IPIEhgn1-35MTO2rysBeqcx9uzduBr_IG0GehAFgfJzJ10MgHTwUZKa7OZwvHPyyuiclqdnni0-4BIkMRWK3I88CmxPqYfKnf9k92ARpppttQR_NXSa6u3cCrw-iYllxU_n4mDQI0FYr2dMBts",
    },
    {
      id: 3,
      alt: "صفحه ۳",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKC-KfTwPWcLdqcQDUO9gNSQcK0kHbcZwiIZ69XhcjN2SvqgJ5EIdsuoiLeqX395KC3XKGNt3NnLN4Q2WP1jjLf-6phXHWDJPxwXugRaCLqM127-EZP0IXZNbElvOyrS8ieiCsJpO9N9X3Sb4O5FXsw3bt1UcPPdfMJAyC8SyR6mMqR9SGMEeah4IwOm1mZ0xc9oDLosaBbIUv9-QWr6vgYr4DfkPqlRXZP1UkVvfnim86tuOJZ4vbvBp8d9ylkl4K9QYNEmqqRPY",
    },
    {
      id: 4,
      alt: "صفحه ۴",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvWf5JzXk6vV_GK7G3J4fzvPqRlH10P9tq5ZtblinAzBneu5cbb9FF8r_gFrdMSSc8fSOA7nrdwSfUwW6fc87DqZLIkYCXyf7RYmqqRPo0d2NNaHzP7G0sfakeTdsfV5rE4ScfsBeYNElfJXyYTuO-QJ5TwgvjXZA7tdjOFBhjgAFxadeBru-5NUaGFKsrfxMgJdlDuec0oEjtgCtgHOTmImxhINvtz0GzMEPaLvQEl2TLp_6h6YkR2f0piSmqCkL5ueL2E5AQFDk",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-8 w-full p-6 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-text-light dark:text-text-dark text-xl md:text-2xl font-bold leading-tight tracking-[-0.015em]">
          تبدیل با موفقیت انجام شد!
        </h2>
        <button className="flex w-full md:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors gap-2">
          <span className="material-symbols-outlined">folder_zip</span>
          <span className="truncate">دانلود همه به صورت ZIP</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group aspect-square rounded-lg overflow-hidden border border-border-light dark:border-border-dark"
          >
            <img
              alt={image.alt}
              className="w-full h-full object-cover"
              src={image.src}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-3 bg-white/20 text-white rounded-full backdrop-blur-sm">
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
