'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  OpenAI,
  Flux,
  Midjourney,
  Google,
  Kling,
  DeepMind,
  Runway,
  ByteDance,
  Hunyuan,
  Recraft,
  Grok,
  Sora,
  ElevenLabs,
  Minimax,
  Stability,
  Luma,
  Pika,
  Hailuo,
  Ideogram,
  ComfyUI,
  type IconType,
} from '@lobehub/icons';

// ─── Model Data ──────────────────────────────────────────────────────────────

interface ModelItem {
  name: string;
  Icon: IconType;
}

const models: ModelItem[] = [
  { name: 'GPT', Icon: OpenAI },
  { name: 'Flux', Icon: Flux },
  { name: 'Midjourney', Icon: Midjourney },
  { name: 'Gemini', Icon: Google },
  { name: 'Kling', Icon: Kling },
  { name: 'Veo', Icon: DeepMind },
  { name: 'Runway', Icon: Runway },
  { name: 'Seedance', Icon: ByteDance },
  { name: 'Sora', Icon: Sora },
  { name: 'Hunyuan', Icon: Hunyuan },
  { name: 'Recraft', Icon: Recraft },
  { name: 'Grok', Icon: Grok },
  { name: 'Stability', Icon: Stability },
  { name: 'ElevenLabs', Icon: ElevenLabs },
  { name: 'Minimax', Icon: Minimax },
  { name: 'Luma', Icon: Luma },
  { name: 'Pika', Icon: Pika },
  { name: 'Hailuo', Icon: Hailuo },
  { name: 'Ideogram', Icon: Ideogram },
  { name: 'ComfyUI', Icon: ComfyUI },
];

// ─── Component ───────────────────────────────────────────────────────────────

function ModelChip({ model }: { model: ModelItem }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-lg px-5 py-2.5 shrink-0 flex items-center gap-2.5 hover:border-white/10 transition-colors">
      <model.Icon size={18} color="#fff" />
      <span className="text-white text-sm font-medium font-[family-name:var(--font-space-grotesk)]">
        {model.name}
      </span>
    </div>
  );
}

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
              {models.map((model, index) => (
                <React.Fragment key={`a-${model.name}`}>
                  <ModelChip model={model} />
                  {index < models.length - 1 && (
                    <div className="w-px h-4 bg-white/5 mx-2 shrink-0 self-center" />
                  )}
                </React.Fragment>
              ))}
              {/* Duplicate for seamless loop */}
              {models.map((model, index) => (
                <React.Fragment key={`b-${model.name}`}>
                  <ModelChip model={model} />
                  {index < models.length - 1 && (
                    <div className="w-px h-4 bg-white/5 mx-2 shrink-0 self-center" />
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
