import PDFConverter from "@/components/PDFConverter";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Layout from "../components/Layout";
import HowItWorks from "../components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import BackToTopButton from "@/components/BackToTopButton/BackToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <Layout>
      {/* تصویر پس‌زمینه یا بنر */}
      <div className="absolute w-full top-0 min-h-[780px] mb-2 left-0 right-0 overflow-hidden">
        {/* <img
          src="/images/foxpiphotostanding.png"
          alt="foxpiphoto"
          className="absolute bottom-0 w-150 h-150 right-14 z-10"
        /> */}
        <Image
          src="/images/Gemini_Generated_Image_bisgabbisgabbisg 2.png"
          alt="Background"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* سکشن‌های صفحه */}
      <section className="relative  z-10">
        <PDFConverter />
        <div className="md:hidden -mt-30">
          <img
            src="/images/foxpiphotositting.png"
            alt="foxpiphoto"
            className=""
          />
        </div>
        <FeaturesSection />
        <HowItWorks />
      </section>

      <BackToTopButton />
    </Layout>
  );
}
