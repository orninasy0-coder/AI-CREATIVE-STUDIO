'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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

// ─── Particle Component ──────────────────────────────────────────────────────

function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/20 hero-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
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

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.4 },
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
  return (
    <section className="relative w-full h-screen min-h-[700px] bg-[#000000] overflow-hidden flex items-center">
      {/* ── Grid Pattern Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Dark Gradient Overlay (bottom to top) ── */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      {/* ── Radial Glow (left) ── */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(215,255,0,0.04)_0%,transparent_70%)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 pt-20 md:pt-0">
        {/* ── Left Column ── */}
        <motion.div
          className="flex-1 min-w-0 flex flex-col items-start"
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
            className="text-[#5C5C5C] text-lg mt-6 max-w-md leading-relaxed font-[family-name:var(--font-inter)]"
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
                  <IconComp className="w-4 h-4 text-[#5C5C5C]" />
                  <span className="text-sm text-[#5C5C5C] font-[family-name:var(--font-inter)]">
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

        {/* ── Right Column ── */}
        <motion.div
          className="flex-1 min-w-0 relative w-full md:w-auto flex items-center justify-center"
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full max-w-[580px] aspect-square">
            {/* Radial gradient overlays for depth */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_40%,rgba(215,255,0,0.06)_0%,transparent_50%)] pointer-events-none z-10" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_60%,rgba(215,255,0,0.04)_0%,transparent_50%)] pointer-events-none z-10" />

            {/* Particles */}
            <Particles />

            {/* Hero Scene Image */}
            <div className="relative w-full h-full">
              <Image
                src="/images/hero-scene.png"
                alt="AI Creative Studio - Cinematic Scene"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating Logo Icon with Glow */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="animate-float">
                <div className="relative">
                  {/* Glow ring */}
                  <div className="absolute inset-0 -m-4 rounded-full bg-[radial-gradient(circle,rgba(215,255,0,0.2)_0%,transparent_70%)] animate-pulse-glow" />
                  <Image
                    src="/images/logo-icon.png"
                    alt="AI Creative Studio"
                    width={80}
                    height={80}
                    style={{ width: 'auto', height: '80px' }}
                    className="relative z-10 object-contain drop-shadow-[0_0_30px_rgba(215,255,0,0.3)]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none z-10" />
    </section>
  );
}
