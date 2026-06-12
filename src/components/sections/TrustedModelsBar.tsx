'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  OpenAIIcon, FluxIcon, MidjourneyIcon, GoogleIcon, KlingIcon,
  DeepMindIcon, RunwayIcon, ByteDanceIcon, HunyuanIcon, RecraftIcon,
  GrokIcon, SoraIcon, ElevenLabsIcon, MinimaxIcon, StabilityIcon,
  LumaIcon, PikaIcon, HailuoIcon, IdeogramIcon, ComfyUIIcon,
} from '@/components/icons/BrandIcons';

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

function ModelChip({ model }: { model: ModelItem }) {
  return (
    <div className="shrink-0 flex items-center gap-2 px-3 py-1.5">
      <model.Icon size={14} color="rgba(255,255,255,0.5)" />
      <span className="text-white/40 text-xs font-medium font-[family-name:var(--font-space-grotesk)] tracking-wide">
        {model.name}
      </span>
    </div>
  );
}

export default function TrustedModelsBar() {
  return (
    <section className="w-full bg-[#000] py-1 overflow-hidden -mt-4">
      <motion.div
        className="max-w-[1400px] mx-auto"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center">
          <div className="flex-1 overflow-hidden relative max-w-[1400px]">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#000] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#000] to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee">
              {models.map((m) => <ModelChip key={`a-${m.name}`} model={m} />)}
              {models.map((m) => <ModelChip key={`b-${m.name}`} model={m} />)}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
