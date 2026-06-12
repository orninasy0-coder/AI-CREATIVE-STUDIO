'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Cpu, BarChart3, Monitor, Star, Atom, LayoutGrid } from 'lucide-react';
import {
  OpenAIIcon,
  FluxIcon,
  ByteDanceIcon,
  RecraftIcon,
  KlingIcon,
  GrokIcon,
  DeepMindIcon,
} from '@/components/icons/BrandIcons';

// ─── Types ──────────────────────────────────────────────────────────────────

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

// ─── Data ───────────────────────────────────────────────────────────────────

const features: FeatureCard[] = [
  {
    title: 'SUPERCOMPUTER',
    description: 'Agents, automation, skills, connectors, AI drive & more',
    badge: 'NEW',
    LucideIcon: Cpu,
    isSpecial: true,
  },
  {
    title: 'GPT Image 2',
    description: 'Generate high-quality visuals with near-perfect text rendering',
    category: 'Image',
    badge: 'NEW',
    Icon: OpenAIIcon,
  },
  {
    title: 'Seedance 2.0',
    description: 'Create high-quality videos in seconds',
    category: 'Video',
    badge: 'TRENDING',
    Icon: ByteDanceIcon,
  },
  {
    title: 'Marketing Studio',
    description: 'Launch full campaigns from one prompt',
    badge: 'TRENDING',
    LucideIcon: Monitor,
  },
  {
    title: 'MCP & CLI',
    description: 'Turn Claude into a creative engine',
    badge: 'NEW',
    LucideIcon: Star,
  },
  {
    title: 'Higgsfield Canvas',
    description: 'Generate stunning media with AI canvas',
    badge: 'NEW',
    LucideIcon: Atom,
  },
  {
    title: 'Cinema Studio 3.5',
    description: 'Create cinematic scenes effortlessly',
    LucideIcon: LayoutGrid,
  },
];

// ─── Badge ──────────────────────────────────────────────────────────────────

function Badge({ type }: { type: BadgeType }) {
  if (!type) return null;
  const classes =
    type === 'NEW'
      ? 'bg-[#D7FF00] text-black'
      : 'bg-[#FF3366] text-white';

  return (
    <span className={`${classes} text-[10px] font-bold px-2 py-0.5 rounded leading-none tracking-wider uppercase shrink-0`}>
      {type}
    </span>
  );
}

// ─── Special Card (SUPERCOMPUTER) ──────────────────────────────────────────

function SpecialCard({ card, index }: { card: FeatureCard; index: number }) {
  return (
    <motion.div
      className="group bg-[#1A1A1A] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-[#222222] relative flex flex-col justify-between min-h-[220px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Badge */}
      <div className="absolute top-5 right-5">
        <Badge type={card.badge} />
      </div>

      {/* Icon + Title */}
      <div>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 mb-4">
          {card.LucideIcon && <card.LucideIcon className="w-5 h-5 text-white" size={20} />}
        </div>
        <h3 className="text-white font-bold text-lg font-[family-name:var(--font-space-grotesk)]">
          {card.title}
        </h3>
        <p className="text-[#5C5C5C] text-sm mt-1.5 font-[family-name:var(--font-inter)] leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Mini brand icons row */}
      <div className="flex items-center gap-2 mt-5">
        <div className="w-7 h-7 rounded-full bg-[#FF3366]/20 flex items-center justify-center">
          <RecraftIcon size={14} color="#FF3366" />
        </div>
        <div className="w-7 h-7 rounded-full bg-[#D7FF00]/20 flex items-center justify-center">
          <FluxIcon size={14} color="#D7FF00" />
        </div>
        <div className="w-7 h-7 rounded-full bg-[#FF3366]/20 flex items-center justify-center">
          <KlingIcon size={14} color="#FF3366" />
        </div>
        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
          <GrokIcon size={14} color="#fff" />
        </div>
      </div>

      {/* Try now button */}
      <button className="mt-4 bg-white text-black text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5 hover:bg-white/90 transition-colors w-fit font-[family-name:var(--font-space-grotesk)]">
        Try now
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

// ─── Feature Card ──────────────────────────────────────────────────────────

function FeatureCard({ card, index }: { card: FeatureCard; index: number }) {
  return (
    <motion.div
      className="group bg-[#1A1A1A] rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-[#222222] relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Badge */}
      {card.badge && (
        <div className="absolute top-5 right-5">
          <Badge type={card.badge} />
        </div>
      )}

      {/* Icon */}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 mb-3">
        {card.Icon ? (
          <card.Icon size={20} color="#fff" />
        ) : card.LucideIcon ? (
          <card.LucideIcon className="w-5 h-5 text-white" size={20} />
        ) : null}
      </div>

      {/* Category */}
      {card.category && (
        <span className="text-[#5C5C5C] text-xs font-[family-name:var(--font-inter)] uppercase tracking-wider">
          {card.category}
        </span>
      )}

      {/* Title */}
      <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-space-grotesk)] mt-0.5">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-[#5C5C5C] text-xs mt-1 font-[family-name:var(--font-inter)] leading-relaxed">
        {card.description}
      </p>
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────

export default function AIModelsHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="w-full bg-[#000000] py-16 md:py-20">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-8"
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((card, index) =>
            card.isSpecial ? (
              <SpecialCard key={card.title} card={card} index={index} />
            ) : (
              <FeatureCard key={card.title} card={card} index={index} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
