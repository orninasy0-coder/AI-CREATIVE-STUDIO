'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ImageIcon,
  Video,
  Film,
  Maximize,
  User,
  Mic,
  Pen,
  MessageSquare,
  Package,
  Image,
  Palette,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface AITool {
  name: string;
  icon: LucideIcon;
}

const tools: AITool[] = [
  { name: 'Text to Image', icon: ImageIcon },
  { name: 'Image to Video', icon: Video },
  { name: 'Text to Video', icon: Film },
  { name: 'Video Upscale', icon: Maximize },
  { name: 'AI Avatar', icon: User },
  { name: 'AI Voice', icon: Mic },
  { name: 'AI Editor', icon: Pen },
  { name: 'Prompt Studio', icon: MessageSquare },
  { name: 'Product Placement', icon: Package },
  { name: 'Background Generator', icon: Image },
  { name: 'Style Transfer', icon: Palette },
  { name: 'Creative Assistant', icon: Sparkles },
];

function ToolCard({ tool, index }: { tool: AITool; index: number }) {
  const Icon = tool.icon;

  return (
    <motion.div
      className="group bg-[#111111] border border-white/5 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/30 hover:bg-[#111111]/80"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{ y: -2 }}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-[#D7FF00]/10 text-[#D7FF00] flex items-center justify-center mb-4">
        <Icon className="w-5 h-5" />
      </div>

      {/* Tool name */}
      <h3 className="text-white font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
        {tool.name}
      </h3>
    </motion.div>
  );
}

export default function AITools() {
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
            Everything you need to create
          </h2>
          <a
            href="#"
            className="text-[#D7FF00] text-sm font-[family-name:var(--font-space-grotesk)] font-medium hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1 shrink-0 ml-4"
          >
            View all tools
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, index) => (
            <ToolCard key={tool.name} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
