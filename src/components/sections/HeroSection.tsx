'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wrench, Infinity, Play } from 'lucide-react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count}{suffix}</span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
};

const stats = [
  { label: 'Models', value: 50, suffix: '+', icon: Cpu },
  { label: 'Tools', value: 100, suffix: '+', icon: Wrench },
  { label: 'Possibilities', labelPrefix: 'Unlimited ', icon: Infinity },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen bg-[#000] overflow-hidden flex items-center pt-16">
      {/* Video Right - 55% on desktop */}
      <div className="absolute right-0 top-0 h-full w-0 md:w-[55%] overflow-hidden pointer-events-none">
        <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) saturate(1.4)' }}>
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(215,255,0,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-0">
        <motion.div className="max-w-2xl" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-1.5 text-[#D7FF00] text-[11px] font-semibold tracking-wider uppercase font-[family-name:var(--font-space-grotesk)]">
              Next Generation AI Creative Platform
            </span>
          </motion.div>

          <motion.h1
            className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[1.05] mt-6 md:mt-8"
            variants={fadeInUp}
          >
            Create Beyond<br />Limits<span className="text-[#D7FF00]">.</span>
          </motion.h1>

          <motion.p
            className="text-white/40 text-base sm:text-lg md:text-xl mt-5 md:mt-6 max-w-lg leading-relaxed font-[family-name:var(--font-inter)]"
            variants={fadeInUp}
          >
            Generate images, videos, audio, campaigns and content using the world&apos;s most advanced AI models.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 mt-8 md:mt-10" variants={fadeInUp}>
            <button className="bg-[#D7FF00] text-black font-semibold px-8 py-3.5 rounded-xl hover:bg-[#c5ee00] transition-colors text-sm font-[family-name:var(--font-space-grotesk)] shadow-[0_0_30px_rgba(215,255,0,0.15)]">
              Start Creating
            </button>
            <button className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white/80 font-semibold px-8 py-3.5 rounded-xl hover:bg-white/[0.08] transition-colors text-sm font-[family-name:var(--font-space-grotesk)]">
              <Play className="w-4 h-4" /> Watch Demo
            </button>
          </motion.div>

          <motion.div className="flex flex-wrap gap-8 mt-10 md:mt-12" variants={fadeInUp}>
            {stats.map((stat) => {
              const IconComp = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2">
                  <IconComp className="w-4 h-4 text-[#D7FF00]/50" />
                  <span className="text-sm text-white/35 font-[family-name:var(--font-inter)]">
                    {stat.labelPrefix || ''}{stat.value ? <AnimatedCounter target={stat.value} suffix={stat.suffix} /> : 'Unlimited'} {stat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade - smooth transition to models bar */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#000] to-transparent pointer-events-none z-10" />
    </section>
  );
}
