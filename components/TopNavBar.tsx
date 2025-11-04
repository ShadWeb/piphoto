import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TopNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "صفحه اصلی", href: "#" },
    { label: "ویژگی‌ها", href: "#" },
    { label: "سوالات متداول", href: "#" },
    { label: "تماس با ما", href: "#" },
  ];

  return (
    <>
      <header className="flex items-center bg-white rounded justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-4 sm:px-10 py-4 dark:bg-gray-900 relative z-50">
        <div className="flex items-center gap-3 text-primary">
          {/* <div className="size-6">
            <span className="material-symbols-outlined text-3xl">
              photo_library
            </span>
          </div> */}
          <h2 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em]">
            <Image
              alt=""
              src={"/images/piphoto.png"}
              height={100}
              width={100}
            />
          </h2>
        </div>

        <nav className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors duration-200"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <button
          className="md:hidden p-2 text-text-light dark:text-text-dark hover:text-primary transition-colors"
          onClick={toggleMobileMenu}
          aria-label="منوی موبایل"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/90 bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
        fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex flex-col p-6 pt-20">
          <div className="flex items-center justify-center gap-3 mb-8 pb-4 border-b border-border-light dark:border-border-dark">
            <h2 className="text-text-light dark:text-text-dark text-xl font-bold">
              <Image
                alt=""
                src={"/images/piphoto.png"}
                height={200}
                width={200}
              />
            </h2>
          </div>

          <nav className="flex flex-col space-y-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                className="text-text-light dark:text-text-dark text-lg font-medium py-2 hover:text-primary transition-colors duration-200 border-b border-border-light dark:border-border-dark last:border-b-0"
                href={item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <button
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              بستن منو
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
