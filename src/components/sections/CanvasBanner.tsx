'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus } from 'lucide-react';
import Image from 'next/image';

interface PreviewCard {
  image: string;
  title: string;
}

const previewCards: PreviewCard[] = [
  { image: '/images/ai-image-1.png', title: 'AI Image Generation' },
  { image: '/images/preset-1.png', title: 'Style Transfer' },
  { image: '/images/preset-2.png', title: 'Creative Remix' },
];

function PreviewCardItem({ card, index }: { card: PreviewCard; index: number }) {
  return (
    <motion.div
      className="group bg-[#111111] border border-white/5 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/30 hover:shadow-[0_0_30px_rgba(215,255,0,0.05)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
      </div>
      <div className="p-4 flex items-center justify-between">
        <span className="text-white text-sm font-medium font-[family-name:var(--font-space-grotesk)]">
          {card.title}
        </span>
        <button className="text-[#D7FF00] text-xs font-semibold font-[family-name:var(--font-space-grotesk)] hover:underline underline-offset-4 whitespace-nowrap">
          Try now →
        </button>
      </div>
    </motion.div>
  );
}

export default function CanvasBanner() {
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
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white leading-tight uppercase">
            ONE CANVAS<span className="text-[#D7FF00]">.</span> EVERY WORKFLOW<span className="text-[#D7FF00]">.</span>
          </h2>
          <button className="bg-white text-black font-semibold px-6 py-2.5 rounded-lg font-[family-name:var(--font-space-grotesk)] flex items-center gap-2 hover:bg-[#D7FF00] transition-colors duration-200 whitespace-nowrap shrink-0 ml-4">
            <Plus className="w-4 h-4" />
            Try Canvas
          </button>
        </motion.div>

        {/* Full-width banner image */}
        <motion.div
          className="relative w-full rounded-2xl overflow-hidden mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          <Image
            src="/images/canvas-banner.png"
            alt="Canvas - One workspace for every workflow"
            width={1400}
            height={700}
            className="w-full h-auto object-cover"
            priority
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>

        {/* Preview cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {previewCards.map((card, index) => (
            <PreviewCardItem key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
