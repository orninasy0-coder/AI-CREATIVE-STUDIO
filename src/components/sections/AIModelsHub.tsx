'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
} from '@/components/icons/BrandIcons';

// ─── Model Data ──────────────────────────────────────────────────────────────

interface AIModel {
  name: string;
  provider: string;
  Icon: React.ComponentType<{ size?: number | string; color?: string; className?: string; style?: React.CSSProperties }>;
}

const models: AIModel[] = [
  { name: 'GPT Image', provider: 'OpenAI', Icon: OpenAIIcon },
  { name: 'Flux', provider: 'Black Forest Labs', Icon: FluxIcon },
  { name: 'Midjourney', provider: 'Midjourney', Icon: MidjourneyIcon },
  { name: 'Imagen', provider: 'Google', Icon: GoogleIcon },
  { name: 'Kling', provider: 'Kuaishou', Icon: KlingIcon },
  { name: 'Veo', provider: 'Google DeepMind', Icon: DeepMindIcon },
  { name: 'Runway', provider: 'Runway', Icon: RunwayIcon },
  { name: 'Seedance', provider: 'ByteDance', Icon: ByteDanceIcon },
  { name: 'Wan', provider: 'Alibaba', Icon: HunyuanIcon },
  { name: 'Hunyuan', provider: 'Tencent', Icon: HunyuanIcon },
];

// ─── Model Card ──────────────────────────────────────────────────────────────

function ModelCard({ model, index }: { model: AIModel; index: number }) {
  return (
    <motion.div
      className="group bg-[#111111] border border-white/5 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/30 hover:shadow-[0_0_30px_rgba(215,255,0,0.05)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Brand icon - white/black mono */}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-white/5 border border-white/10">
        <model.Icon size={22} color="#fff" />
      </div>

      {/* Model name */}
      <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-space-grotesk)]">
        {model.name}
      </h3>

      {/* Provider */}
      <p className="text-[#5C5C5C] text-xs mt-1 font-[family-name:var(--font-inter)]">
        by {model.provider}
      </p>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function AIModelsHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="w-full bg-[#000000] py-20 md:py-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white leading-tight">
            All leading AI models.
            <br />
            One platform<span className="text-[#D7FF00]">.</span>
          </h2>
          <a
            href="#"
            className="text-[#D7FF00] text-sm font-[family-name:var(--font-space-grotesk)] font-medium hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1 shrink-0 ml-4"
          >
            View all models
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {models.map((model, index) => (
            <ModelCard key={model.name} model={model} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
