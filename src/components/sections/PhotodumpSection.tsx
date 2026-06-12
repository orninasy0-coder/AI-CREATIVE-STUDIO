'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface StackCard {
  type: 'image' | 'gradient';
  src?: string;
  gradient?: string;
  alt: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

const stackCards: StackCard[] = [
  {
    type: 'gradient',
    gradient: 'from-rose-900 to-pink-900',
    alt: 'Photodump scene 1',
    rotation: -5,
    offsetX: -24,
    offsetY: -8,
  },
  {
    type: 'gradient',
    gradient: 'from-sky-900 to-indigo-900',
    alt: 'Photodump scene 2',
    rotation: -2.5,
    offsetX: -12,
    offsetY: -4,
  },
  {
    type: 'image',
    src: '/images/photodump-1.png',
    alt: 'Photodump main scene',
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
  },
  {
    type: 'gradient',
    gradient: 'from-amber-900 to-orange-900',
    alt: 'Photodump scene 4',
    rotation: 2.5,
    offsetX: 12,
    offsetY: -4,
  },
  {
    type: 'gradient',
    gradient: 'from-emerald-900 to-teal-900',
    alt: 'Photodump scene 5',
    rotation: 5,
    offsetX: 24,
    offsetY: -8,
  },
];

export default function PhotodumpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section ref={sectionRef} className="w-full bg-[#000000] py-20 md:py-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white leading-tight">
            Different scenes. Same star.
          </h2>
          <button className="bg-white text-black font-semibold px-6 py-2.5 rounded-lg font-[family-name:var(--font-space-grotesk)] hover:bg-[#D7FF00] transition-colors duration-200 whitespace-nowrap shrink-0 ml-4">
            Try Photodump
          </button>
        </motion.div>

        {/* Stack visual */}
        <motion.div
          className="flex justify-center items-center py-10 md:py-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div
            className="relative"
            style={{ width: '320px', height: '400px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {stackCards.map((card, index) => {
              const spreadFactor = isHovered ? 2.2 : 1;
              const currentOffsetX = card.offsetX * spreadFactor;
              const currentOffsetY = card.offsetY * spreadFactor;

              return (
                <motion.div
                  key={index}
                  className="absolute bg-[#111111] border border-white/5 rounded-xl overflow-hidden w-48 h-64 md:w-64 md:h-80"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${card.rotation}deg) translateX(${currentOffsetX}px) translateY(${currentOffsetY}px)`,
                    zIndex: index === 2 ? 10 : index < 2 ? index + 1 : 10 - index,
                    transition: 'transform 0.4s cubic-bezier(0.25, 0.4, 0.25, 1)',
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 60 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0, scale: 0.8, y: 60 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                >
                  {card.type === 'image' && card.src ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 192px, 256px"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${card.gradient}`}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Description text */}
        <motion.div
          className="text-center max-w-2xl mx-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p className="text-white/60 font-[family-name:var(--font-inter)] text-base md:text-lg leading-relaxed">
            Photodump lets you place a single subject across multiple scenes and styles in seconds.
            Upload one photo, choose your looks, and generate a full creative set — perfect for
            campaigns, lookbooks, and social content.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
