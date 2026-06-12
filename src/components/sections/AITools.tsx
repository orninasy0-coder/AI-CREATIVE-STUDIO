'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ImageIcon, Video, Film, Maximize, User, Mic, Pen, MessageSquare, Package, Image, Palette, Sparkles, type LucideIcon } from 'lucide-react';

interface AITool { name: string; icon: LucideIcon; description: string }
const tools: AITool[] = [
  { name: 'Text to Image', icon: ImageIcon, description: 'Generate images from text prompts' },
  { name: 'Image to Video', icon: Video, description: 'Animate static images into video' },
  { name: 'Text to Video', icon: Film, description: 'Create video from text descriptions' },
  { name: 'Video Upscale', icon: Maximize, description: 'Enhance video quality up to 4K' },
  { name: 'AI Avatar', icon: User, description: 'Create and customize AI avatars' },
  { name: 'AI Voice', icon: Mic, description: 'Generate natural speech from text' },
  { name: 'AI Editor', icon: Pen, description: 'Edit and enhance content with AI' },
  { name: 'Prompt Studio', icon: MessageSquare, description: 'Craft perfect AI prompts' },
  { name: 'Product Placement', icon: Package, description: 'Place products in AI scenes' },
  { name: 'Background Generator', icon: Image, description: 'Generate custom backgrounds' },
  { name: 'Style Transfer', icon: Palette, description: 'Apply artistic styles to images' },
  { name: 'Creative Assistant', icon: Sparkles, description: 'AI-powered creative help' },
];

export default function AITools() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-20 md:py-28">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div className="flex items-end justify-between mb-10 md:mb-12" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Everything you need<span className="text-[#D7FF00]">.</span>
          </h2>
          <a href="#" className="text-[#D7FF00] text-sm font-[family-name:var(--font-space-grotesk)] font-medium hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1 shrink-0 ml-4">
            View all tools <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.name} className="group bg-[#111] border border-white/[0.04] rounded-xl p-5 cursor-pointer transition-all duration-200 hover:border-[#D7FF00]/20 hover:bg-[#151515]"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }} whileHover={{ y: -4 }}>
                <div className="w-10 h-10 rounded-xl bg-[#D7FF00]/[0.08] text-[#D7FF00] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-white/80 font-semibold text-sm font-[family-name:var(--font-space-grotesk)]">{tool.name}</h3>
                <p className="text-white/20 text-xs mt-1.5 font-[family-name:var(--font-inter)] leading-relaxed">{tool.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
