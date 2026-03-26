import Image from "next/image";

import Header from "./landing/Header";
import HeroSection from "./landing/HeroSection";
import AboutSection from "./landing/AboutSection";
import FeaturesSection from "./landing/FeaturesSection";
import ExperienceSection from "./landing/ExperienceSection";
import ResearchSection from "./landing/ResearchSection";
import WhoItsForSection from "./landing/WhoItsForSection";
import PurposeSection from "./landing/PurposeSection";
import CTASection from "./landing/CTASection";
import Footer from "./landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ExperienceSection />
      <ResearchSection />
      <WhoItsForSection />
      <PurposeSection />
      <CTASection />
      <Footer />
    </>
  );
}
