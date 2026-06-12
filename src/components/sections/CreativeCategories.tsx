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
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <Image src={category.image} alt={category.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-50" />
      </div>
      <div className="p-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">{category.title}</h3>
          <p className="text-white/30 text-sm mt-1 font-[family-name:var(--font-inter)]">{category.description}</p>
        </div>
        <div className="shrink-0 w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:bg-[#D7FF00]/10 transition-colors">
          <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#D7FF00] transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

export default function CreativeCategories() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-16 md:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.p className="text-white/25 text-xs tracking-wider uppercase font-[family-name:var(--font-space-grotesk)] font-medium mb-8" initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}>
          What will you create today?
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((c, i) => <CategoryCard key={c.title} category={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}
