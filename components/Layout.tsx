import Head from "next/head";
import TopNavBar from "./TopNavBar";
import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <div className="bg-background-light dark:bg-background-dark ">
      <Head>
        <title>PDF به عکس - تبدیل سریع و آسان</title>
        <meta
          name="description"
          content="تبدیل پی دی اف به عکس با کیفیت و آنلاین رایگان بدون نرم افزار در ویندوز و یا گوشی اندروید امکان پذیر است. برنامه تبدیل PDF به عکس به صورت انلاین و با کیفیت بالا "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </Head>
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center py-5 sm:px-10 lg:px-40">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="relative">
                <TopNavBar />
              </div>
              <main className="flex flex-col gap-16 md:gap-24  px-4">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
