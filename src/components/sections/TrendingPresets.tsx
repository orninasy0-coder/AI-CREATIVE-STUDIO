'use client';

import React, { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const presets = [
  { name: 'Neon Fashion', image: '/images/preset-1.png' },
  { name: 'Geometric Art', image: '/images/preset-2.png' },
  { name: 'B&W Editorial', image: '/images/preset-3.png' },
  { name: 'Cyberpunk', gradient: 'bg-gradient-to-br from-purple-800 to-pink-800' },
  { name: 'Cinematic', gradient: 'bg-gradient-to-br from-amber-800 to-orange-800' },
  { name: 'Anime Style', gradient: 'bg-gradient-to-br from-blue-800 to-cyan-800' },
  { name: 'Watercolor', gradient: 'bg-gradient-to-br from-teal-800 to-emerald-800' },
  { name: 'Vintage Film', gradient: 'bg-gradient-to-br from-yellow-800 to-amber-900' },
];

function PresetCard({ preset, index }: { preset: typeof presets[0]; index: number }) {
  return (
    <motion.div
      className="min-w-0 shrink-0 grow-0 basis-[calc(50%-6px)] sm:basis-[calc(33.333%-6px)] md:basis-[calc(25%-6px)] lg:basis-[calc(20%-6px)]"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="bg-[#111] border border-white/[0.04] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/20 hover:scale-[1.02]">
        <div className="relative aspect-square w-full overflow-hidden">
          {preset.image ? (
            <Image src={preset.image} alt={preset.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 20vw" />
          ) : (
            <div className={`w-full h-full ${preset.gradient} flex items-center justify-center`}>
              <span className="text-white/60 text-xl font-bold font-[family-name:var(--font-space-grotesk)]">{preset.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="p-2.5">
          <h3 className="text-white/80 text-xs font-medium font-[family-name:var(--font-space-grotesk)] truncate">{preset.name}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrendingPresets() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', dragFree: true, containScroll: 'trimSnaps' });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section ref={ref} className="w-full bg-[#000] py-16 md:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.div className="flex items-end justify-between mb-8" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Viral Presets<span className="text-[#D7FF00]">.</span>
          </h2>
          <a href="#" className="text-[#D7FF00] text-sm font-[family-name:var(--font-space-grotesk)] font-medium hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1 shrink-0 ml-4">
            Explore all <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
        <motion.div className="relative" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 }}>
          <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 z-10 w-9 h-9 bg-white/[0.04] hover:bg-white/[0.08] rounded-full flex items-center justify-center border border-white/[0.06] backdrop-blur-sm transition-colors" aria-label="Prev">
            <ChevronLeft className="w-4 h-4 text-white/60" />
          </button>
          <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 z-10 w-9 h-9 bg-white/[0.04] hover:bg-white/[0.08] rounded-full flex items-center justify-center border border-white/[0.06] backdrop-blur-sm transition-colors" aria-label="Next">
            <ChevronRight className="w-4 h-4 text-white/60" />
          </button>
          <div className="overflow-hidden px-5" ref={emblaRef}>
            <div className="flex gap-3">
              {presets.map((p, i) => <PresetCard key={p.name} preset={p} index={i} />)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
