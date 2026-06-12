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
    <div className="shrink-0 flex items-center gap-2 px-3 py-1.5">
      <model.Icon size={16} color="#fff" />
      <span className="text-white/70 text-sm font-medium font-[family-name:var(--font-space-grotesk)]">
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
      className="w-full bg-[#000000] py-2 overflow-hidden"
    >
      <motion.div
        className="max-w-[1400px] mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="flex items-center">
          {/* Marquee Container */}
          <div className="flex-1 overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />

            {/* Scrolling track - duplicated for seamless loop */}
            <div className="flex animate-marquee">
              {models.map((model) => (
                <ModelChip key={`a-${model.name}`} model={model} />
              ))}
              {/* Duplicate for seamless loop */}
              {models.map((model) => (
                <ModelChip key={`b-${model.name}`} model={model} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
