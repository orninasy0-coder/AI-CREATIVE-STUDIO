'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Brain, Infinity, Trophy, type LucideIcon } from 'lucide-react';

const features: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Faster Creation', description: 'Create content 10x faster with AI', icon: Zap },
  { title: 'Smarter Tools', description: 'Tools that understand your vision', icon: Brain },
  { title: 'Unlimited', description: '50+ AI models, 100+ tools', icon: Infinity },
  { title: 'Pro Quality', description: 'Studio-quality output', icon: Trophy },
];

export default function WhySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-16 md:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10"
          initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          Why AI Creative Studio
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} className="group bg-[#111] border border-white/[0.04] rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 hover:border-[#D7FF00]/20"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ y: -3 }}>
                <div className="w-12 h-12 rounded-xl bg-[#D7FF00]/[0.08] text-[#D7FF00] flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-semibold text-base mt-4 font-[family-name:var(--font-space-grotesk)]">{f.title}</h3>
                <p className="text-white/25 text-xs mt-2 font-[family-name:var(--font-inter)]">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
