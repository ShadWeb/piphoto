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

  const scrollToFooter = (e) => {
    e.preventDefault();
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    closeMobileMenu();
  };

  const navItems = [{ label: "تماس با ما", href: "#footer" }];

  return (
    <>
      <header className="flex items-center bg-white rounded justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-4 sm:px-10 py-4 dark:bg-gray-900 relative z-50">
        <div className="flex items-center gap-3 text-primary">
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
              <button
                key={item.label}
                className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary transition-colors duration-200"
                onClick={scrollToFooter}
              >
                {item.label}
              </button>
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 
          bg-white/30 dark:bg-gray-800/30 
          backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] 
          border border-white/20 dark:border-gray-700/30 
          transform transition-transform duration-300 ease-in-out 
          z-50 md:hidden rounded-l-2xl
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col p-6 pt-20 text-white dark:text-gray-100">
          <div className="flex items-center justify-center gap-3 mb-8 pb-4 border-b border-white/20 dark:border-gray-600/30">
            <h2 className="text-xl font-bold">
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
              <button
                key={index}
                className="text-lg font-medium py-2 hover:text-primary transition-colors duration-200 border-b border-white/20 dark:border-gray-700/30 last:border-b-0 text-right"
                onClick={scrollToFooter}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <button
              className="w-full bg-primary/90 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
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
