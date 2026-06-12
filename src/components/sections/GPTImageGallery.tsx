'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface GalleryItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const galleryItems: GalleryItem[] = [
  { src: '/images/gallery-1.png', alt: 'AI Generated Art 1', width: 768, height: 1344 },
  { src: '/images/preset-1.png', alt: 'AI Generated Art 2', width: 1024, height: 1024 },
  { src: '/images/gallery-2.png', alt: 'AI Generated Art 3', width: 768, height: 1344 },
  { src: '/images/preset-2.png', alt: 'AI Generated Art 4', width: 1024, height: 1024 },
  { src: '/images/gallery-3.png', alt: 'AI Generated Art 5', width: 768, height: 1344 },
  { src: '/images/preset-3.png', alt: 'AI Generated Art 6', width: 1024, height: 1024 },
  { src: '/images/gallery-4.png', alt: 'AI Generated Art 7', width: 768, height: 1344 },
];

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const aspectRatio = item.width / item.height;
  const isTall = aspectRatio < 0.8;

  return (
    <motion.div
      className="group bg-[#111111] border border-white/5 rounded-xl overflow-hidden mb-4 break-inside-avoid cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/30 hover:shadow-[0_0_30px_rgba(215,255,0,0.08)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <div className="relative w-full overflow-hidden">
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

export default function GPTImageGallery() {
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
            AI Images with near-perfect
            <br className="hidden sm:block" />
            text rendering<span className="text-[#D7FF00]">.</span>
          </h2>
          <a
            href="#"
            className="text-[#D7FF00] text-sm font-[family-name:var(--font-space-grotesk)] font-medium hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1 shrink-0 ml-4"
          >
            View all GPT images
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Masonry gallery using CSS columns */}
        <motion.div
          className="columns-2 md:columns-3 lg:columns-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {galleryItems.map((item, index) => (
            <GalleryCard key={item.src} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
