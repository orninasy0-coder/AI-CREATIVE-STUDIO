'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Brain, Infinity, Trophy, type LucideIcon } from 'lucide-react';

const features: { title: string; description: string; icon: LucideIcon; stat: string }[] = [
  { title: 'Faster Creation', description: 'Create content 10x faster with AI-powered tools and workflows', icon: Zap, stat: '10x' },
  { title: 'Smarter Tools', description: 'Tools that understand your creative vision and enhance it', icon: Brain, stat: 'AI' },
  { title: 'Unlimited Models', description: '50+ AI models and 100+ creative tools at your fingertips', icon: Infinity, stat: '50+' },
  { title: 'Pro Quality', description: 'Studio-quality output that meets professional standards', icon: Trophy, stat: '4K' },
];

export default function WhySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-20 md:py-28">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10 md:mb-12"
          initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          Why AI Creative Studio<span className="text-[#D7FF00]">.</span>
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} className="group bg-[#111] border border-white/[0.04] rounded-2xl p-7 text-center cursor-pointer transition-all duration-200 hover:border-[#D7FF00]/20"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ y: -4 }}>
                <div className="w-14 h-14 rounded-xl bg-[#D7FF00]/[0.08] text-[#D7FF00] flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-[#D7FF00] text-2xl font-bold mt-4 font-[family-name:var(--font-space-grotesk)]">{f.stat}</div>
                <h3 className="text-white font-semibold text-base mt-2 font-[family-name:var(--font-space-grotesk)]">{f.title}</h3>
                <p className="text-white/25 text-xs mt-2 font-[family-name:var(--font-inter)] leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
