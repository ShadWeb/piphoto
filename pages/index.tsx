import PDFConverter from "@/components/PDFConverter";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Layout from "../components/Layout";
import HowItWorks from "../components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";

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
      <PDFConverter />
      <FeaturesSection />
      <HowItWorks />
    </Layout>
  );
}
