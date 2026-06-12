'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const galleryItems = [
  { src: '/images/gallery-1.png', alt: 'AI Art 1', w: 768, h: 1344 },
  { src: '/images/preset-1.png', alt: 'AI Art 2', w: 1024, h: 1024 },
  { src: '/images/gallery-2.png', alt: 'AI Art 3', w: 768, h: 1344 },
  { src: '/images/preset-2.png', alt: 'AI Art 4', w: 1024, h: 1024 },
  { src: '/images/gallery-3.png', alt: 'AI Art 5', w: 768, h: 1344 },
  { src: '/images/preset-3.png', alt: 'AI Art 6', w: 1024, h: 1024 },
  { src: '/images/gallery-4.png', alt: 'AI Art 7', w: 768, h: 1344 },
  { src: '/images/preset-4.png', alt: 'AI Art 8', w: 1024, h: 1024 },
];

function GalleryCard({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  return (
    <motion.div
      className="group bg-[#111] border border-white/[0.04] rounded-xl overflow-hidden mb-3 break-inside-avoid cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/20"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="relative w-full overflow-hidden">
        <Image src={item.src} alt={item.alt} width={item.w} height={item.h} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

export default function GPTImageGallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-20 md:py-28">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div className="mb-10 md:mb-12" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            AI Images with near-perfect<br className="hidden sm:block" /> text rendering<span className="text-[#D7FF00]">.</span>
          </h2>
        </motion.div>
        <motion.div className="columns-2 md:columns-3 lg:columns-4 gap-3" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 }}>
          {galleryItems.map((item, i) => <GalleryCard key={item.src} item={item} index={i} />)}
        </motion.div>
      </div>
    </section>
  );
}
