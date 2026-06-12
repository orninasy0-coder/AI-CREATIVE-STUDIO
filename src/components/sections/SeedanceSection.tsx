'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';

const videoItems = [
  { src: '/images/seedance-1.png', alt: 'Video 1', duration: '0:15' },
  { src: '/images/seedance-2.png', alt: 'Video 2', duration: '0:30' },
  { src: '/images/seedance-3.png', alt: 'Video 3', duration: '0:22' },
  { src: '/images/seedance-4.png', alt: 'Video 4', duration: '0:45' },
  { src: '/images/seedance-5.png', alt: 'Video 5', duration: '0:18' },
  { src: '/images/seedance-6.png', alt: 'Video 6', duration: '0:35' },
];

export default function SeedanceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-20 md:py-28">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div className="mb-10 md:mb-12" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Premium AI video generations<span className="text-[#D7FF00]">.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoItems.map((item, i) => (
            <motion.div key={i} className="group relative bg-[#111] border border-white/[0.04] rounded-xl overflow-hidden aspect-video cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/20"
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}>
              <div className="relative w-full h-full">
                <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:bg-black/60 group-hover:scale-110 transition-all">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] px-2 py-1 rounded font-mono">{item.duration}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
