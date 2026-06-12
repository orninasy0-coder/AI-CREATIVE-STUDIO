'use client';

import Header from '@/components/header/Header';
import HeroSection from '@/components/sections/HeroSection';
import TrustedModelsBar from '@/components/sections/TrustedModelsBar';
import AIModelsHub from '@/components/sections/AIModelsHub';
import ViralPresets from '@/components/sections/ViralPresets';
import GPTImageGallery from '@/components/sections/GPTImageGallery';
import CanvasBanner from '@/components/sections/CanvasBanner';
import MarketingStudio from '@/components/sections/MarketingStudio';
import SeedanceSection from '@/components/sections/SeedanceSection';
import PhotodumpSection from '@/components/sections/PhotodumpSection';
import ExploreFeatures from '@/components/sections/ExploreFeatures';
import AITools from '@/components/sections/AITools';
import WhySection from '@/components/sections/WhySection';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import FooterSection from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustedModelsBar />
        <AIModelsHub />
        <ViralPresets />
        <GPTImageGallery />
        <CanvasBanner />
        <MarketingStudio />
        <SeedanceSection />
        <PhotodumpSection />
        <ExploreFeatures />
        <AITools />
        <WhySection />
        <PricingSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  );
}
