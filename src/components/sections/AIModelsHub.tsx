'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Cpu, Monitor, Star, Atom, LayoutGrid, Sparkles } from 'lucide-react';
import {
  OpenAIIcon, FluxIcon, ByteDanceIcon, RecraftIcon, KlingIcon, GrokIcon, DeepMindIcon,
} from '@/components/icons/BrandIcons';

type BadgeType = 'NEW' | 'TRENDING' | 'TOP' | null;
type CategoryType = 'Image' | 'Video' | null;

interface FeatureCard {
  title: string;
  description: string;
  category?: CategoryType;
  badge?: BadgeType;
  Icon?: React.ComponentType<{ size?: number | string; color?: string; className?: string; style?: React.CSSProperties }>;
  LucideIcon?: React.ComponentType<{ size?: number | string; className?: string }>;
  isSpecial?: boolean;
  isImageCard?: boolean;
  image?: string;
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

const imageCards: FeatureCard[] = [
  {
    title: 'CANVAS',
    description: 'Design, edit, and compose with AI-powered canvas tools',
    badge: 'NEW',
    LucideIcon: Atom,
    isImageCard: true,
    image: '/images/canvas-banner.png',
  },
  {
    title: 'GPT IMAGE 2',
    description: 'Near-perfect text rendering & photorealistic generation',
    badge: 'TOP',
    Icon: OpenAIIcon,
    isImageCard: true,
    image: '/images/ai-image-1.png',
  },
  {
    title: 'SEEDANCE 2.0',
    description: 'Most advanced AI video — high quality in seconds',
    badge: 'TRENDING',
    Icon: ByteDanceIcon,
    isImageCard: true,
    image: '/images/seedance-1.png',
  },
];

function Badge({ type }: { type: BadgeType }) {
  if (!type) return null;
  const cls = type === 'NEW' ? 'bg-[#D7FF00] text-black' : type === 'TOP' ? 'bg-[#FF3366] text-white' : 'bg-[#FF3366] text-white';
  return <span className={`${cls} text-[9px] font-bold px-2 py-0.5 rounded leading-none tracking-wider uppercase shrink-0`}>{type}</span>;
}

function SpecialCard({ card, index }: { card: FeatureCard; index: number }) {
  return (
    <motion.div
      className="group bg-[#111] rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:bg-[#181818] relative flex flex-col justify-between min-h-[240px] border border-white/[0.04] sm:col-span-2"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="absolute top-6 right-6"><Badge type={card.badge} /></div>
      <div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.04] mb-5">
          {card.LucideIcon && <card.LucideIcon className="w-6 h-6 text-[#D7FF00]" size={24} />}
        </div>
        <h3 className="text-white font-bold text-lg font-[family-name:var(--font-space-grotesk)]">{card.title}</h3>
        <p className="text-white/30 text-sm mt-2 font-[family-name:var(--font-inter)] leading-relaxed">{card.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <div className="w-8 h-8 rounded-full bg-[#FF3366]/10 flex items-center justify-center"><RecraftIcon size={12} color="#FF3366" /></div>
        <div className="w-8 h-8 rounded-full bg-[#D7FF00]/10 flex items-center justify-center"><FluxIcon size={12} color="#D7FF00" /></div>
        <div className="w-8 h-8 rounded-full bg-[#FF3366]/10 flex items-center justify-center"><KlingIcon size={12} color="#FF3366" /></div>
        <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center"><GrokIcon size={12} color="#fff" /></div>
      </div>
      <button className="mt-5 bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#D7FF00] transition-colors w-fit font-[family-name:var(--font-space-grotesk)]">
        Try now <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

function FeatureCardComponent({ card, index }: { card: FeatureCard; index: number }) {
  return (
    <motion.div
      className="group bg-[#111] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-[#181818] relative border border-white/[0.04]"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -4 }}
    >
      {card.badge && <div className="absolute top-5 right-5"><Badge type={card.badge} /></div>}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.04] mb-4">
        {card.Icon ? <card.Icon size={18} color="rgba(255,255,255,0.7)" /> : card.LucideIcon ? <card.LucideIcon className="w-[18px] h-[18px] text-white/60" size={18} /> : null}
      </div>
      {card.category && <span className="text-white/20 text-[10px] font-[family-name:var(--font-inter)] uppercase tracking-wider">{card.category}</span>}
      <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-space-grotesk)] mt-1">{card.title}</h3>
      <p className="text-white/25 text-xs mt-2 font-[family-name:var(--font-inter)] leading-relaxed">{card.description}</p>
    </motion.div>
  );
}

function ImageCardComponent({ card, index }: { card: FeatureCard; index: number }) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border border-white/[0.04] hover:border-[#D7FF00]/20"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Image background */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        {card.image ? (
          <Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 mb-2">
          {card.Icon ? (
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.08] backdrop-blur-sm">
              <card.Icon size={14} color="#D7FF00" />
            </div>
          ) : card.LucideIcon ? (
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.08] backdrop-blur-sm">
              <card.LucideIcon className="w-4 h-4 text-[#D7FF00]" size={14} />
            </div>
          ) : null}
          {card.badge && <Badge type={card.badge} />}
        </div>
        <h3 className="text-white font-bold text-base font-[family-name:var(--font-space-grotesk)] tracking-tight">{card.title}</h3>
        <p className="text-white/40 text-xs mt-1 font-[family-name:var(--font-inter)] leading-relaxed">{card.description}</p>
        <button className="mt-3 flex items-center gap-1.5 text-[#D7FF00] text-xs font-semibold font-[family-name:var(--font-space-grotesk)] hover:gap-2.5 transition-all">
          Try now <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}

export default function AIModelsHub() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="w-full bg-[#000] py-20 md:py-28">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div className="flex items-end justify-between mb-10 md:mb-12" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            All leading AI models.<br />One platform<span className="text-[#D7FF00]">.</span>
          </h2>
          <a href="#" className="text-[#D7FF00] text-sm font-[family-name:var(--font-space-grotesk)] font-medium hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1 shrink-0 ml-4">
            View all models <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((card, i) => card.isSpecial ? <SpecialCard key={card.title} card={card} index={i} /> : <FeatureCardComponent key={card.title} card={card} index={i} />)}
        </div>

        {/* Featured Image Cards */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {imageCards.map((card, i) => <ImageCardComponent key={card.title} card={card} index={i} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
