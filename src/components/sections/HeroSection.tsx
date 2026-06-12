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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
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
    <section className="relative w-full min-h-[85vh] bg-[#000] overflow-hidden flex items-center pt-14">
      {/* Video Right */}
      <div className="absolute right-0 top-0 h-full w-[50%] overflow-hidden pointer-events-none">
        <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ filter: 'brightness(0.4) saturate(1.3)' }}>
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(215,255,0,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-xl" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center bg-white/[0.04] border border-white/[0.08] rounded-full px-3.5 py-1 text-[#D7FF00] text-[11px] font-semibold tracking-wider uppercase font-[family-name:var(--font-space-grotesk)]">
              Next Generation AI Creative Platform
            </span>
          </motion.div>

          <motion.h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mt-5" variants={fadeInUp}>
            Create Beyond<br />Limits<span className="text-[#D7FF00]">.</span>
          </motion.h1>

          <motion.p className="text-white/50 text-base sm:text-lg mt-5 max-w-md leading-relaxed font-[family-name:var(--font-inter)]" variants={fadeInUp}>
            Generate images, videos, audio, campaigns and content using the world&apos;s most advanced AI models.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 mt-7" variants={fadeInUp}>
            <button className="bg-[#D7FF00] text-black font-semibold px-7 py-3 rounded-lg hover:bg-[#c5ee00] transition-colors text-sm font-[family-name:var(--font-space-grotesk)]">
              Start Creating
            </button>
            <button className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white/80 font-semibold px-7 py-3 rounded-lg hover:bg-white/[0.08] transition-colors text-sm font-[family-name:var(--font-space-grotesk)]">
              <Play className="w-3.5 h-3.5" /> Watch Demo
            </button>
          </motion.div>

          <motion.div className="flex flex-wrap gap-6 mt-9" variants={fadeInUp}>
            {stats.map((stat) => {
              const IconComp = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-1.5">
                  <IconComp className="w-3.5 h-3.5 text-[#D7FF00]/50" />
                  <span className="text-xs text-white/40 font-[family-name:var(--font-inter)]">
                    {stat.labelPrefix || ''}{stat.value ? <AnimatedCounter target={stat.value} suffix={stat.suffix} /> : 'Unlimited'} {stat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade - no gap before models bar */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#000] to-transparent pointer-events-none z-10" />
    </section>
  );
}
