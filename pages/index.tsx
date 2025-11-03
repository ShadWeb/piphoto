import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import DownloadSection from "../components/DownloadSection";
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
      <HeroSection />
      <DownloadSection />
      <FeaturesSection />
      <HowItWorks />
    </Layout>
  );
}
