'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const tags = [
  'Cinema Studio',
  'Visual Effects',
  'Soul ID',
  'Kling 2.1 Master',
  'Camera Controls',
  'Video',
  'Action Movements',
  'Commercial',
  'MiniMax Hailuo',
  'Community',
  'Wan 2.2 Image',
  'Text to Image',
  'Image to Video',
  'AI Avatar',
  'Style Transfer',
  'Creative Assistant',
  'Background Generator',
  'Product Placement',
  'Prompt Studio',
  'AI Editor',
  'AI Voice',
  'AI Writer',
  'Voice Cloning',
  'Lip Sync',
  'Sound Effects',
  'Music Generation',
  '3D Render',
  'Concept Art',
  'Storyboard',
  'Color Grade',
  'Motion Graphics',
  'VFX Compositing',
  'Green Screen',
  'Face Animation',
  'Character Design',
  'Scene Extension',
  'Video Remix',
  'Audio Mixing',
  'Subtitles',
  'Translation',
];

// Tags that get a subtle glow on hover
const glowTags = new Set([
  'Cinema Studio',
  'Kling 2.1 Master',
  'Text to Image',
  'Image to Video',
  'AI Avatar',
  'Voice Cloning',
  '3D Render',
  'Motion Graphics',
  'AI Editor',
  'Style Transfer',
]);

function FeatureChip({ tag, index }: { tag: string; index: number }) {
  const hasGlow = glowTags.has(tag);

  return (
    <motion.span
      className={`bg-white/5 border border-white/5 rounded-lg px-4 py-2 text-white text-sm cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-[#D7FF00]/30 font-[family-name:var(--font-inter)] select-none ${
        hasGlow ? 'hover:shadow-[0_0_20px_rgba(215,255,0,0.08)]' : ''
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{
        duration: 0.35,
        delay: index * 0.02,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{ scale: 1.05 }}
    >
      {tag}
    </motion.span>
  );
}

export default function ExploreFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="w-full bg-[#000000] py-20 md:py-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Title */}
        <motion.h2
          className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white uppercase mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Explore More AI Features
        </motion.h2>

        {/* Chips grid */}
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <FeatureChip key={tag} tag={tag} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
