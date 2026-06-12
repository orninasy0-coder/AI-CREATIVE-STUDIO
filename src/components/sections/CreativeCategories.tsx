'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Category {
  title: string;
  description: string;
  image: string;
}

const categories: Category[] = [
  {
    title: 'AI Images',
    description: 'Create stunning visuals from text or ideas',
    image: '/images/ai-image-1.png',
  },
  {
    title: 'AI Video',
    description: 'Turn ideas into cinematic videos',
    image: '/images/ai-video-thumb.png',
  },
  {
    title: 'AI Audio',
    description: 'Generate voiceovers, music & sound effects',
    image: '/images/ai-audio-thumb.png',
  },
  {
    title: 'AI Design',
    description: 'Design posters, banners, and brand assets',
    image: '/images/ai-design-thumb.png',
  },
];

function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  return (
    <motion.div
      className="group bg-[#111111] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 hover:border-[#D7FF00]/30"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Image Thumbnail - 16:9 aspect ratio */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Subtle gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-xl font-[family-name:var(--font-space-grotesk)]">
            {category.title}
          </h3>
          <p className="text-[#5C5C5C] text-sm mt-1 font-[family-name:var(--font-inter)] leading-relaxed">
            {category.description}
          </p>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#D7FF00]/10 group-hover:border-[#D7FF00]/20 transition-colors duration-300">
          <ArrowUpRight className="w-4 h-4 text-[#5C5C5C] group-hover:text-[#D7FF00] transition-colors duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

export default function CreativeCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#000000] py-20 md:py-24"
    >
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Section Label */}
        <motion.p
          className="text-[#5C5C5C] text-sm tracking-wider uppercase font-[family-name:var(--font-space-grotesk)] font-medium mb-10"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        >
          What will you create today?
        </motion.p>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
