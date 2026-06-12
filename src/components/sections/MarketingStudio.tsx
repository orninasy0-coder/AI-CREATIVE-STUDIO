'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface GalleryItem {
  type: 'image' | 'gradient';
  src?: string;
  gradient?: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  { type: 'image', src: '/images/marketing-1.png', alt: 'Marketing creative 1' },
  { type: 'image', src: '/images/marketing-2.png', alt: 'Marketing creative 2' },
  { type: 'gradient', gradient: 'from-purple-900 to-pink-900', alt: 'Marketing creative 3' },
  { type: 'gradient', gradient: 'from-blue-900 to-teal-900', alt: 'Marketing creative 4' },
  { type: 'gradient', gradient: 'from-amber-900 to-orange-900', alt: 'Marketing creative 5' },
  { type: 'gradient', gradient: 'from-emerald-900 to-cyan-900', alt: 'Marketing creative 6' },
];

export default function MarketingStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

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
            See what creators and brands are making with Marketing Studio.
          </h2>
          <a
            href="#"
            className="text-[#D7FF00] text-sm font-[family-name:var(--font-inter)] hover:underline underline-offset-4 whitespace-nowrap shrink-0 ml-4"
          >
            View all Marketing Studio →
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className="group bg-[#111111] border border-white/5 rounded-xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/20"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.08,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              whileHover={{ scale: 1.02 }}
            >
              {item.type === 'image' && item.src ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
