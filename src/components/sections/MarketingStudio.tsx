'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const galleryItems = [
  { src: '/images/marketing-1.png', alt: 'Marketing 1' },
  { src: '/images/marketing-2.png', alt: 'Marketing 2' },
  { src: '/images/marketing-3.png', alt: 'Marketing 3' },
  { src: '/images/marketing-4.png', alt: 'Marketing 4' },
  { src: '/images/marketing-5.png', alt: 'Marketing 5' },
  { src: '/images/marketing-6.png', alt: 'Marketing 6' },
];

export default function MarketingStudio() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-20 md:py-28">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div className="mb-10 md:mb-12" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            See what creators and brands are making<span className="text-[#D7FF00]">.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div key={i} className="group bg-[#111] border border-white/[0.04] rounded-xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/20"
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }} whileHover={{ y: -4 }}>
              <div className="relative w-full h-full">
                <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
