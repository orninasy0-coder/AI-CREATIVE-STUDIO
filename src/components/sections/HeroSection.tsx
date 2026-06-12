'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wrench, Infinity, Play } from 'lucide-react';

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// ─── Stats Data ──────────────────────────────────────────────────────────────

const stats = [
  { label: 'Models', value: 50, suffix: '+', icon: Cpu },
  { label: 'Tools', value: 100, suffix: '+', icon: Wrench },
  { label: 'Possibilities', labelPrefix: 'Unlimited ', icon: Infinity },
];

// ─── Hero Section ────────────────────────────────────────────────────────────

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] bg-[#000000] overflow-hidden flex items-center">
      {/* ── Dark base background ── */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* ── Grid Pattern Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Video on the right side ── */}
      <div className="absolute right-0 top-0 h-full w-[55%] overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.5) saturate(1.2)' }}
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Gradient fade from left to right over video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        {/* Gradient fade from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* ── Radial Glow (left) ── */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(215,255,0,0.06)_0%,transparent_70%)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[#D7FF00] text-xs font-semibold tracking-wider uppercase font-[family-name:var(--font-space-grotesk)]">
              Next Generation AI Creative Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mt-6"
            variants={fadeInUp}
          >
            Create Beyond
            <br />
            Limits<span className="text-[#D7FF00]">.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-[#EAEAEA] text-lg mt-6 max-w-md leading-relaxed font-[family-name:var(--font-inter)]"
            variants={fadeInUp}
          >
            Generate images, videos, audio, campaigns and content using the
            world&apos;s most advanced AI models.
          </motion.p>

          {/* Buttons */}
          <motion.div className="flex flex-wrap gap-4 mt-8" variants={fadeInUp}>
            <button className="bg-[#D7FF00] text-black font-semibold px-8 py-3.5 rounded-lg hover:bg-[#c5ee00] transition-colors duration-200 text-sm font-[family-name:var(--font-space-grotesk)] tracking-wide">
              Start Creating
            </button>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors duration-200 text-sm font-[family-name:var(--font-space-grotesk)] tracking-wide">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div className="flex flex-wrap gap-8 mt-12" variants={fadeInUp}>
            {stats.map((stat) => {
              const IconComp = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2">
                  <IconComp className="w-4 h-4 text-[#D7FF00]/60" />
                  <span className="text-sm text-white/60 font-[family-name:var(--font-inter)]">
                    {stat.labelPrefix || ''}
                    {stat.value ? (
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    ) : (
                      'Unlimited'
                    )}{' '}
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none z-10" />
    </section>
  );
}
