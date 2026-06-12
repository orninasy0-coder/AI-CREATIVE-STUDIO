'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus } from 'lucide-react';
import Image from 'next/image';

const previewCards = [
  { image: '/images/ai-image-1.png', title: 'AI Image Generation' },
  { image: '/images/preset-1.png', title: 'Style Transfer' },
  { image: '/images/preset-2.png', title: 'Creative Remix' },
];

export default function CanvasBanner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-16 md:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.div className="flex items-end justify-between mb-8" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight uppercase">
            ONE CANVAS<span className="text-[#D7FF00]">.</span> EVERY WORKFLOW<span className="text-[#D7FF00]">.</span>
          </h2>
          <button className="bg-white text-black font-semibold px-5 py-2 rounded-lg text-sm font-[family-name:var(--font-space-grotesk)] flex items-center gap-2 hover:bg-[#D7FF00] transition-colors whitespace-nowrap shrink-0 ml-4">
            <Plus className="w-4 h-4" /> Try Canvas
          </button>
        </motion.div>
        <motion.div className="relative w-full rounded-2xl overflow-hidden mb-5" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 }}>
          <Image src="/images/canvas-banner.png" alt="Canvas workspace" width={1400} height={700} className="w-full h-auto object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {previewCards.map((card, i) => (
            <motion.div key={card.title} className="group bg-[#111] border border-white/[0.04] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/20"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}>
              <div className="relative h-28 sm:h-32 overflow-hidden">
                <Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-white/80 text-xs font-medium font-[family-name:var(--font-space-grotesk)]">{card.title}</span>
                <span className="text-[#D7FF00] text-[10px] font-semibold hover:underline">Try now →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
