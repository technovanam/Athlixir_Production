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
import { Suspense } from 'react';
import { ChatLayout } from '../features/messaging/components/ChatLayout';

export default function Home() {
  return (
    <main className="h-screen w-full bg-black flex overflow-hidden font-sans">
      {/* Sidebar Placeholder Space - reserves 280px, hidden on mobile */}
      <div className="w-[280px] hidden lg:block bg-black shrink-0"></div>
      
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full min-h-0 bg-black overflow-hidden relative">
        {/* Top Header Placeholder Space - reserves 80px, hidden on mobile */}
        <div className="h-[80px] hidden md:block bg-black shrink-0 z-20"></div>
        
        {/* Chat Application Container */}
        <div className="flex-1 min-h-0 p-0 md:p-5 md:pt-4 md:pl-0 lg:pl-5 md:pb-5 overflow-hidden">
          <div className="w-full h-full md:rounded-2xl overflow-hidden shadow-2xl bg-[#0e0e11] flex border-0 md:border border-[#1a1a1c]">
            <Suspense fallback={<div className="flex-1 bg-[#0e0e11]" />}>
              <ChatLayout />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
