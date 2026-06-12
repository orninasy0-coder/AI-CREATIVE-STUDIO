'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const tags = [
  'Cinema Studio', 'Visual Effects', 'Soul ID', 'Kling 2.1 Master', 'Camera Controls', 'Video',
  'Action Movements', 'Commercial', 'MiniMax Hailuo', 'Community', 'Wan 2.2 Image', 'Text to Image',
  'Image to Video', 'AI Avatar', 'Style Transfer', 'Creative Assistant', 'Background Generator',
  'Product Placement', 'Prompt Studio', 'AI Editor', 'AI Voice', 'AI Writer', 'Voice Cloning',
  'Lip Sync', 'Sound Effects', 'Music Generation', '3D Render', 'Concept Art', 'Storyboard',
  'Color Grade', 'Motion Graphics', 'VFX Compositing', 'Green Screen', 'Face Animation',
  'Character Design', 'Scene Extension', 'Video Remix', 'Audio Mixing', 'Subtitles', 'Translation',
];

const glowTags = new Set(['Cinema Studio', 'Kling 2.1 Master', 'Text to Image', 'Image to Video', 'AI Avatar', 'Voice Cloning', '3D Render', 'Motion Graphics']);

export default function ExploreFeatures() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-20 md:py-28">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase mb-10 md:mb-12"
          initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          Explore More AI Features
        </motion.h2>
        <div className="flex flex-wrap gap-2.5">
          {tags.map((tag, i) => (
            <motion.span key={tag}
              className={`bg-white/[0.03] border border-white/[0.04] rounded-lg px-4 py-2 text-white/50 text-xs cursor-pointer transition-all duration-200 hover:bg-white/[0.06] hover:border-[#D7FF00]/20 hover:text-white/80 font-[family-name:var(--font-inter)] ${glowTags.has(tag) ? 'hover:shadow-[0_0_15px_rgba(215,255,0,0.06)]' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.015 }} whileHover={{ scale: 1.05 }}>
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
