'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const modelNames = [
  'GPT',
  'Flux',
  'Midjourney',
  'Imagen',
  'Kling',
  'Veo',
  'Runway',
  'Seedance',
  'Wan',
  'Hunyuan',
];

export default function TrustedModelsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0A0A0A] py-8 overflow-hidden"
    >
      <motion.div
        className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="flex items-center gap-6">
          {/* Title */}
          <span className="text-[#5C5C5C] text-sm font-[family-name:var(--font-inter)] whitespace-nowrap shrink-0">
            Trusted by
          </span>

          {/* Separator */}
          <div className="w-px h-6 bg-white/10 shrink-0" />

          {/* Marquee Container */}
          <div className="flex-1 overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

            {/* Scrolling track - duplicated for seamless loop */}
            <div className="flex animate-marquee">
              {modelNames.map((name, index) => (
                <React.Fragment key={`a-${name}`}>
                  <div className="bg-white/5 border border-white/5 rounded-lg px-6 py-3 shrink-0 flex items-center gap-3">
                    <span className="text-white text-sm font-medium font-[family-name:var(--font-space-grotesk)]">
                      {name}
                    </span>
                  </div>
                  {index < modelNames.length - 1 && (
                    <div className="w-px h-4 bg-white/5 mx-3 shrink-0 self-center" />
                  )}
                </React.Fragment>
              ))}
              {/* Duplicate for seamless loop */}
              {modelNames.map((name, index) => (
                <React.Fragment key={`b-${name}`}>
                  <div className="bg-white/5 border border-white/5 rounded-lg px-6 py-3 shrink-0 flex items-center gap-3">
                    <span className="text-white text-sm font-medium font-[family-name:var(--font-space-grotesk)]">
                      {name}
                    </span>
                  </div>
                  {index < modelNames.length - 1 && (
                    <div className="w-px h-4 bg-white/5 mx-3 shrink-0 self-center" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
