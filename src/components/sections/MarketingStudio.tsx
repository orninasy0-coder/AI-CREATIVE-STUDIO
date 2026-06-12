'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const galleryItems = [
  { type: 'image' as const, src: '/images/marketing-1.png', alt: 'Marketing 1' },
  { type: 'image' as const, src: '/images/marketing-2.png', alt: 'Marketing 2' },
  { type: 'gradient' as const, gradient: 'from-purple-900/60 to-pink-900/60', alt: 'Marketing 3' },
  { type: 'gradient' as const, gradient: 'from-blue-900/60 to-teal-900/60', alt: 'Marketing 4' },
  { type: 'gradient' as const, gradient: 'from-amber-900/60 to-orange-900/60', alt: 'Marketing 5' },
  { type: 'gradient' as const, gradient: 'from-emerald-900/60 to-cyan-900/60', alt: 'Marketing 6' },
];

export default function MarketingStudio() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-16 md:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.div className="flex items-end justify-between mb-8" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            See what creators and brands are making<span className="text-[#D7FF00]">.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {galleryItems.map((item, i) => (
            <motion.div key={i} className="group bg-[#111] border border-white/[0.04] rounded-xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/20"
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: 0.08 + i * 0.06 }} whileHover={{ scale: 1.01 }}>
              {item.type === 'image' && item.src ? (
                <div className="relative w-full h-full">
                  <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                </div>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${item.gradient}`} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
