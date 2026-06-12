'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ImageIcon, Video, Film, Maximize, User, Mic, Pen, MessageSquare, Package, Image, Palette, Sparkles, type LucideIcon } from 'lucide-react';

interface AITool { name: string; icon: LucideIcon }
const tools: AITool[] = [
  { name: 'Text to Image', icon: ImageIcon }, { name: 'Image to Video', icon: Video },
  { name: 'Text to Video', icon: Film }, { name: 'Video Upscale', icon: Maximize },
  { name: 'AI Avatar', icon: User }, { name: 'AI Voice', icon: Mic },
  { name: 'AI Editor', icon: Pen }, { name: 'Prompt Studio', icon: MessageSquare },
  { name: 'Product Placement', icon: Package }, { name: 'Background Generator', icon: Image },
  { name: 'Style Transfer', icon: Palette }, { name: 'Creative Assistant', icon: Sparkles },
];

export default function AITools() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-16 md:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.div className="flex items-end justify-between mb-8" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Everything you need<span className="text-[#D7FF00]">.</span>
          </h2>
          <a href="#" className="text-[#D7FF00] text-sm font-[family-name:var(--font-space-grotesk)] font-medium hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1 shrink-0 ml-4">
            View all tools <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.name} className="group bg-[#111] border border-white/[0.04] rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-[#D7FF00]/20 hover:bg-[#151515]"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }} whileHover={{ y: -2 }}>
                <div className="w-8 h-8 rounded-lg bg-[#D7FF00]/[0.08] text-[#D7FF00] flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-white/80 font-semibold text-sm font-[family-name:var(--font-space-grotesk)]">{tool.name}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
