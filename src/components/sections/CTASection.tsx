'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full py-16 md:py-24" style={{ background: 'linear-gradient(to bottom, #000, #050505)' }}>
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div className="relative" initial={{ opacity: 0, scale: 0.85 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5 }}>
            <div className="absolute inset-0 -m-12 rounded-full" style={{ background: 'radial-gradient(circle, rgba(215,255,0,0.1) 0%, transparent 60%)', filter: 'blur(20px)' }} />
            <Image src="/images/logo-icon.png" alt="AI Creative Studio" width={64} height={64} className="relative z-10" />
          </motion.div>
          <motion.h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-6"
            initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
            Ready To Create Beyond Limits?
          </motion.h2>
          <motion.p className="text-white/30 text-base mt-3 font-[family-name:var(--font-inter)] max-w-md"
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 }}>
            Join thousands of creators and start creating stunning content with AI
          </motion.p>
          <motion.button className="bg-[#D7FF00] text-black font-semibold px-8 py-3.5 rounded-lg hover:bg-[#c5ee00] transition-colors text-base mt-7 font-[family-name:var(--font-space-grotesk)]"
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Get Started Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
