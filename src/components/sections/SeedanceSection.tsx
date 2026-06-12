'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface VideoItem {
  type: 'image' | 'gradient';
  src?: string;
  gradient?: string;
  alt: string;
  duration: string;
}

const videoItems: VideoItem[] = [
  { type: 'image', src: '/images/seedance-1.png', alt: 'Seedance video 1', duration: '0:15' },
  { type: 'image', src: '/images/seedance-2.png', alt: 'Seedance video 2', duration: '0:30' },
  { type: 'gradient', gradient: 'from-violet-900 to-indigo-900', alt: 'Seedance video 3', duration: '0:22' },
  { type: 'gradient', gradient: 'from-rose-900 to-red-900', alt: 'Seedance video 4', duration: '0:45' },
  { type: 'gradient', gradient: 'from-sky-900 to-blue-900', alt: 'Seedance video 5', duration: '0:18' },
  { type: 'gradient', gradient: 'from-lime-900 to-green-900', alt: 'Seedance video 6', duration: '0:35' },
];

function VideoCard({ item, index, isInView }: { item: VideoItem; index: number; isInView: boolean }) {
  return (
    <motion.div
      className="group relative bg-[#111111] border border-white/5 rounded-xl overflow-hidden aspect-video cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/20"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
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

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:bg-black/70 group-hover:border-white/20"
          whileHover={{ scale: 1.1 }}
        >
          <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" fill="white" />
        </motion.div>
      </div>

      {/* Duration label */}
      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-[family-name:var(--font-inter)] px-2 py-1 rounded-md">
        {item.duration}
      </div>
    </motion.div>
  );
}

export default function SeedanceSection() {
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
            Browse premium AI video generations from the community.
          </h2>
          <a
            href="#"
            className="text-[#D7FF00] text-sm font-[family-name:var(--font-inter)] hover:underline underline-offset-4 whitespace-nowrap shrink-0 ml-4"
          >
            View all Seedance 2.0 →
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoItems.map((item, index) => (
            <VideoCard key={index} item={item} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
