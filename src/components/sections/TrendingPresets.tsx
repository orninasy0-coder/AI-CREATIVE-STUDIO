'use client';

import React, { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

interface Preset {
  name: string;
  image?: string;
  gradient?: string;
}

const presets: Preset[] = [
  { name: 'Neon Fashion', image: '/images/preset-1.png' },
  { name: 'Geometric Art', image: '/images/preset-2.png' },
  { name: 'B&W Editorial', image: '/images/preset-3.png' },
  { name: 'Cyberpunk', gradient: 'bg-gradient-to-br from-purple-600 to-pink-600' },
  { name: 'Cinematic', gradient: 'bg-gradient-to-br from-amber-600 to-orange-600' },
  { name: 'Anime Style', gradient: 'bg-gradient-to-br from-blue-600 to-cyan-600' },
  { name: 'Watercolor', gradient: 'bg-gradient-to-br from-teal-600 to-emerald-600' },
  { name: 'Vintage Film', gradient: 'bg-gradient-to-br from-yellow-600 to-amber-700' },
];

function PresetCard({ preset, index }: { preset: Preset; index: number }) {
  return (
    <motion.div
      className="group min-w-0 shrink-0 grow-0 basis-[calc(50%-8px)] sm:basis-[calc(33.333%-8px)] md:basis-[calc(25%-8px)] lg:basis-[calc(20%-8px)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/30 hover:shadow-[0_0_30px_rgba(215,255,0,0.05)] hover:scale-[1.02]">
        {/* Image area - square aspect ratio */}
        <div className="relative aspect-square w-full overflow-hidden">
          {preset.image ? (
            <Image
              src={preset.image}
              alt={preset.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          ) : (
            <div
              className={`w-full h-full ${preset.gradient} flex items-center justify-center`}
            >
              <span className="text-white/80 text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
                {preset.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Preset name */}
        <div className="p-3">
          <h3 className="text-white text-sm font-medium font-[family-name:var(--font-space-grotesk)] truncate">
            {preset.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrendingPresets() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section ref={sectionRef} className="w-full bg-[#000000] py-20 md:py-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white leading-tight">
            Ready-to-use Viral Presets<span className="text-[#D7FF00]">.</span>
          </h2>
          <a
            href="#"
            className="text-[#D7FF00] text-sm font-[family-name:var(--font-space-grotesk)] font-medium hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1 shrink-0 ml-4"
          >
            Explore all presets
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Carousel with navigation */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {/* Left arrow */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/5 backdrop-blur-sm"
            aria-label="Previous presets"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Right arrow */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/5 backdrop-blur-sm"
            aria-label="Next presets"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Embla carousel container */}
          <div className="overflow-hidden px-6" ref={emblaRef}>
            <div className="flex gap-4">
              {presets.map((preset, index) => (
                <PresetCard key={preset.name} preset={preset} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
