'use client';

import React, { Suspense, lazy } from 'react';
import Header from '@/components/header/Header';
import HeroSection from '@/components/sections/HeroSection';
import TrustedModelsBar from '@/components/sections/TrustedModelsBar';
import AIModelsHub from '@/components/sections/AIModelsHub';
import CreativeCategories from '@/components/sections/CreativeCategories';

// Lazy load below-the-fold sections for performance
const TrendingPresets = lazy(() => import('@/components/sections/TrendingPresets'));
const GPTImageGallery = lazy(() => import('@/components/sections/GPTImageGallery'));
const CanvasBanner = lazy(() => import('@/components/sections/CanvasBanner'));
const MarketingStudio = lazy(() => import('@/components/sections/MarketingStudio'));
const SeedanceSection = lazy(() => import('@/components/sections/SeedanceSection'));
const PhotodumpSection = lazy(() => import('@/components/sections/PhotodumpSection'));
const ExploreFeatures = lazy(() => import('@/components/sections/ExploreFeatures'));
const AITools = lazy(() => import('@/components/sections/AITools'));
const WhySection = lazy(() => import('@/components/sections/WhySection'));
const PricingSection = lazy(() => import('@/components/sections/PricingSection'));
const CTASection = lazy(() => import('@/components/sections/CTASection'));
const FooterSection = lazy(() => import('@/components/sections/FooterSection'));

function SectionSkeleton() {
  return <div className="min-h-[200px]" />;
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustedModelsBar />
        <AIModelsHub />
        <CreativeCategories />
        <Suspense fallback={<SectionSkeleton />}>
          <TrendingPresets />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <GPTImageGallery />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CanvasBanner />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <MarketingStudio />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <SeedanceSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <PhotodumpSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ExploreFeatures />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AITools />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <WhySection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CTASection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <FooterSection />
      </Suspense>
    </div>
  );
}
