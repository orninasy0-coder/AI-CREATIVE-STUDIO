'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const stackCards = [
  { type: 'gradient', gradient: 'from-rose-900/50 to-pink-900/50', rotation: -5, offsetX: -24, offsetY: -8 },
  { type: 'gradient', gradient: 'from-sky-900/50 to-indigo-900/50', rotation: -2.5, offsetX: -12, offsetY: -4 },
  { type: 'image', src: '/images/photodump-1.png', rotation: 0, offsetX: 0, offsetY: 0 },
  { type: 'gradient', gradient: 'from-amber-900/50 to-orange-900/50', rotation: 2.5, offsetX: 12, offsetY: -4 },
  { type: 'gradient', gradient: 'from-emerald-900/50 to-teal-900/50', rotation: 5, offsetX: 24, offsetY: -8 },
];

export default function PhotodumpSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section ref={ref} className="w-full bg-[#000] py-16 md:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.div className="flex items-end justify-between mb-12" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Different scenes. Same star<span className="text-[#D7FF00]">.</span>
          </h2>
          <button className="bg-white text-black font-semibold px-5 py-2 rounded-lg text-sm font-[family-name:var(--font-space-grotesk)] hover:bg-[#D7FF00] transition-colors whitespace-nowrap shrink-0 ml-4">
            Try Photodump
          </button>
        </motion.div>
        <motion.div className="flex justify-center items-center py-8" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}>
          <div className="relative" style={{ width: '320px', height: '400px' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {stackCards.map((card, i) => {
              const spread = isHovered ? 2.2 : 1;
              return (
                <motion.div key={i} className="absolute bg-[#111] border border-white/[0.04] rounded-xl overflow-hidden w-48 h-64 md:w-64 md:h-80"
                  style={{ left: '50%', top: '50%', transform: `translate(-50%, -50%) rotate(${card.rotation}deg) translateX(${card.offsetX * spread}px) translateY(${card.offsetY * spread}px)`, zIndex: i === 2 ? 10 : i < 2 ? i + 1 : 10 - i, transition: 'transform 0.4s cubic-bezier(0.25, 0.4, 0.25, 1)' }}
                  initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}>
                  {card.type === 'image' && card.src ? (
                    <div className="relative w-full h-full"><Image src={card.src} alt="Photodump" fill className="object-cover" sizes="256px" /></div>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${card.gradient}`} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <motion.p className="text-center max-w-lg mx-auto mt-6 text-white/30 text-sm font-[family-name:var(--font-inter)] leading-relaxed"
          initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.6 }}>
          Place a single subject across multiple scenes and styles in seconds. Upload one photo, choose your looks, and generate a full creative set.
        </motion.p>
      </div>
    </section>
  );
}
