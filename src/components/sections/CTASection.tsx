'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-24"
      style={{
        background: 'linear-gradient(to bottom, #000000, #0A0A0A)',
      }}
    >
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo with glow */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Radial gradient glow behind logo */}
            <div
              className="absolute inset-0 -m-16 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(215,255,0,0.15) 0%, rgba(215,255,0,0.05) 40%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <Image
              src="/images/logo-icon.png"
              alt="AI Creative Studio"
              width={80}
              height={80}
              style={{ width: 'auto', height: '80px' }}
              className="relative z-10"
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-white mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          >
            Ready To Create Beyond Limits?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-[#5C5C5C] text-lg mt-4 font-[family-name:var(--font-inter)] max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          >
            Join thousands of creators and start creating stunning content with AI
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="bg-[#D7FF00] text-black font-semibold px-10 py-4 rounded-lg hover:bg-[#c5ee00] transition-colors duration-300 text-lg mt-8 font-[family-name:var(--font-inter)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
