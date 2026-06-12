'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Brain, Infinity, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface WhyFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: WhyFeature[] = [
  {
    title: 'Faster Creation',
    description: 'Create content 10x faster with AI-powered tools and workflows',
    icon: Zap,
  },
  {
    title: 'Smarter Tools',
    description: 'Intelligent tools that understand your creative vision',
    icon: Brain,
  },
  {
    title: 'Unlimited Possibilities',
    description: 'Access 50+ AI models and 100+ creative tools',
    icon: Infinity,
  },
  {
    title: 'Professional Quality',
    description: 'Studio-quality output for any creative project',
    icon: Trophy,
  },
];

function WhyCard({ feature, index }: { feature: WhyFeature; index: number }) {
  const Icon = feature.icon;

  return (
    <motion.div
      className="group bg-[#111111] border border-white/5 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-[#D7FF00]/30 hover:shadow-[0_0_30px_rgba(215,255,0,0.05)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{ y: -4 }}
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-[#D7FF00]/10 text-[#D7FF00] flex items-center justify-center mx-auto">
        <Icon className="w-8 h-8" />
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-xl mt-6 font-[family-name:var(--font-space-grotesk)]">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-[#5C5C5C] text-sm mt-3 font-[family-name:var(--font-inter)] leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="w-full bg-[#000000] py-20 md:py-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Title */}
        <motion.h2
          className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Why AI Creative Studio
        </motion.h2>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <WhyCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
