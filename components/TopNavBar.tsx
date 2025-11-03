export default function TopNavBar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-4 sm:px-10 py-4">
      <div className="flex items-center gap-3 text-primary">
        <div className="size-6">
          <span className="material-symbols-outlined text-3xl">
            photo_library
          </span>
        </div>
        <h2 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em]">
          PDF به عکس
        </h2>
      </div>

      <nav className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a
            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors"
            href="#"
          >
            صفحه اصلی
          </a>
          <a
            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors"
            href="#"
          >
            ویژگی‌ها
          </a>
          <a
            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors"
            href="#"
          >
            سوالات متداول
          </a>
          <a
            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors"
            href="#"
          >
            تماس با ما
          </a>
        </div>
      </nav>

      <button className="md:hidden p-2">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}
