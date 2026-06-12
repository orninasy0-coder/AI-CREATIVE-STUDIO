'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  OpenAIIcon,
  FluxIcon,
  MidjourneyIcon,
  GoogleIcon,
  KlingIcon,
  DeepMindIcon,
  RunwayIcon,
  ByteDanceIcon,
  HunyuanIcon,
  RecraftIcon,
  GrokIcon,
  SoraIcon,
  ElevenLabsIcon,
  MinimaxIcon,
  StabilityIcon,
  LumaIcon,
  PikaIcon,
  HailuoIcon,
  IdeogramIcon,
  ComfyUIIcon,
} from '@/components/icons/BrandIcons';

// ─── Model Data ──────────────────────────────────────────────────────────────

interface ModelItem {
  name: string;
  Icon: React.ComponentType<{ size?: number | string; color?: string; className?: string; style?: React.CSSProperties }>;
}

const models: ModelItem[] = [
  { name: 'GPT', Icon: OpenAIIcon },
  { name: 'Flux', Icon: FluxIcon },
  { name: 'Midjourney', Icon: MidjourneyIcon },
  { name: 'Gemini', Icon: GoogleIcon },
  { name: 'Kling', Icon: KlingIcon },
  { name: 'Veo', Icon: DeepMindIcon },
  { name: 'Runway', Icon: RunwayIcon },
  { name: 'Seedance', Icon: ByteDanceIcon },
  { name: 'Sora', Icon: SoraIcon },
  { name: 'Hunyuan', Icon: HunyuanIcon },
  { name: 'Recraft', Icon: RecraftIcon },
  { name: 'Grok', Icon: GrokIcon },
  { name: 'Stability', Icon: StabilityIcon },
  { name: 'ElevenLabs', Icon: ElevenLabsIcon },
  { name: 'Minimax', Icon: MinimaxIcon },
  { name: 'Luma', Icon: LumaIcon },
  { name: 'Pika', Icon: PikaIcon },
  { name: 'Hailuo', Icon: HailuoIcon },
  { name: 'Ideogram', Icon: IdeogramIcon },
  { name: 'ComfyUI', Icon: ComfyUIIcon },
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
