'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  { title: 'AI Images', description: 'Create stunning visuals from text or ideas', image: '/images/ai-image-1.png' },
  { title: 'AI Video', description: 'Turn ideas into cinematic videos', image: '/images/ai-video-thumb.png' },
  { title: 'AI Audio', description: 'Generate voiceovers, music & sound effects', image: '/images/ai-audio-thumb.png' },
  { title: 'AI Design', description: 'Design posters, banners, and brand assets', image: '/images/ai-design-thumb.png' },
];

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  return (
    <motion.div
      className="group bg-[#111] border border-white/[0.04] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/20"
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <Image src={category.image} alt={category.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />
      </div>
      <div className="p-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">{category.title}</h3>
          <p className="text-white/30 text-sm mt-1.5 font-[family-name:var(--font-inter)] leading-relaxed">{category.description}</p>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:bg-[#D7FF00]/10 transition-colors mt-1">
          <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#D7FF00] transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

export default function CreativeCategories() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-20 md:py-28">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div
          className="mb-10 md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/20 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-space-grotesk)] font-medium mb-4">
            What will you create today?
          </p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Explore Creative Categories<span className="text-[#D7FF00]">.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {categories.map((c, i) => <CategoryCard key={c.title} category={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}
