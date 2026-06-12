'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Cpu, Monitor, Star, Atom, LayoutGrid } from 'lucide-react';
import {
  OpenAIIcon, FluxIcon, ByteDanceIcon, RecraftIcon, KlingIcon, GrokIcon, DeepMindIcon,
} from '@/components/icons/BrandIcons';

type BadgeType = 'NEW' | 'TRENDING' | null;
type CategoryType = 'Image' | 'Video' | null;

interface FeatureCard {
  title: string;
  description: string;
  category?: CategoryType;
  badge?: BadgeType;
  Icon?: React.ComponentType<{ size?: number | string; color?: string; className?: string; style?: React.CSSProperties }>;
  LucideIcon?: React.ComponentType<{ size?: number | string; className?: string }>;
  isSpecial?: boolean;
}

const features: FeatureCard[] = [
  {
    title: 'SUPERCOMPUTER',
    description: 'Agents, automation, skills, connectors & more',
    badge: 'NEW',
    LucideIcon: Cpu,
    isSpecial: true,
  },
  { title: 'GPT Image 2', description: 'Near-perfect text rendering', category: 'Image', badge: 'NEW', Icon: OpenAIIcon },
  { title: 'Seedance 2.0', description: 'High-quality videos in seconds', category: 'Video', badge: 'TRENDING', Icon: ByteDanceIcon },
  { title: 'Marketing Studio', description: 'Full campaigns from one prompt', badge: 'TRENDING', LucideIcon: Monitor },
  { title: 'MCP & CLI', description: 'Turn Claude into a creative engine', badge: 'NEW', LucideIcon: Star },
  { title: 'Canvas', description: 'Stunning media with AI canvas', badge: 'NEW', LucideIcon: Atom },
  { title: 'Kling 3.0', description: 'Cinematic videos with audio', category: 'Video', badge: 'TRENDING', Icon: KlingIcon },
  { title: 'Cinema Studio', description: 'Cinematic scenes effortlessly', LucideIcon: LayoutGrid },
];

function Badge({ type }: { type: BadgeType }) {
  if (!type) return null;
  const cls = type === 'NEW' ? 'bg-[#D7FF00] text-black' : 'bg-[#FF3366] text-white';
  return <span className={`${cls} text-[9px] font-bold px-1.5 py-0.5 rounded leading-none tracking-wider uppercase shrink-0`}>{type}</span>;
}

function SpecialCard({ card, index }: { card: FeatureCard; index: number }) {
  return (
    <motion.div
      className="group bg-[#111] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-[#181818] relative flex flex-col justify-between min-h-[220px] border border-white/[0.04]"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="absolute top-5 right-5"><Badge type={card.badge} /></div>
      <div>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.04] mb-4">
          {card.LucideIcon && <card.LucideIcon className="w-5 h-5 text-[#D7FF00]" size={20} />}
        </div>
        <h3 className="text-white font-bold text-base font-[family-name:var(--font-space-grotesk)]">{card.title}</h3>
        <p className="text-white/30 text-sm mt-1.5 font-[family-name:var(--font-inter)] leading-relaxed">{card.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <div className="w-6 h-6 rounded-full bg-[#FF3366]/10 flex items-center justify-center"><RecraftIcon size={11} color="#FF3366" /></div>
        <div className="w-6 h-6 rounded-full bg-[#D7FF00]/10 flex items-center justify-center"><FluxIcon size={11} color="#D7FF00" /></div>
        <div className="w-6 h-6 rounded-full bg-[#FF3366]/10 flex items-center justify-center"><KlingIcon size={11} color="#FF3366" /></div>
        <div className="w-6 h-6 rounded-full bg-white/[0.04] flex items-center justify-center"><GrokIcon size={11} color="#fff" /></div>
      </div>
      <button className="mt-4 bg-white text-black text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5 hover:bg-white/90 transition-colors w-fit font-[family-name:var(--font-space-grotesk)]">
        Try now <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

function FeatureCardComponent({ card, index }: { card: FeatureCard; index: number }) {
  return (
    <motion.div
      className="group bg-[#111] rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-[#181818] relative border border-white/[0.04]"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {card.badge && <div className="absolute top-4 right-4"><Badge type={card.badge} /></div>}
      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.04] mb-3">
        {card.Icon ? <card.Icon size={18} color="rgba(255,255,255,0.7)" /> : card.LucideIcon ? <card.LucideIcon className="w-[18px] h-[18px] text-white/60" size={18} /> : null}
      </div>
      {card.category && <span className="text-white/20 text-[10px] font-[family-name:var(--font-inter)] uppercase tracking-wider">{card.category}</span>}
      <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-space-grotesk)] mt-0.5">{card.title}</h3>
      <p className="text-white/25 text-xs mt-1 font-[family-name:var(--font-inter)] leading-relaxed">{card.description}</p>
    </motion.div>
  );
}

export default function AIModelsHub() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="w-full bg-[#000] py-16 md:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.div className="flex items-end justify-between mb-8" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            All leading AI models.<br />One platform<span className="text-[#D7FF00]">.</span>
          </h2>
          <a href="#" className="text-[#D7FF00] text-sm font-[family-name:var(--font-space-grotesk)] font-medium hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1 shrink-0 ml-4">
            View all models <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((card, i) => card.isSpecial ? <SpecialCard key={card.title} card={card} index={i} /> : <FeatureCardComponent key={card.title} card={card} index={i} />)}
        </div>
      </div>
    </section>
  );
}
