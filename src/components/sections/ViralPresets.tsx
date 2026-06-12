'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Upload, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface PresetItem {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  credits: string;
}

const categories = [
  'ALL',
  'BASEBALL GAME',
  'DRIFT RACING',
  'CGI BREAKDOWN',
  'FOOTBALL INVADER',
  'SUMMER HAZE',
  'KUNG FU HIT',
  'FILM NOIR',
  '3D RENDER',
  'STORM GIANT',
  'ZOMBIE DANCE',
  '2000\'S PAPARAZZI',
  'CANDY',
];

const presets: PresetItem[] = [
  { id: 'baseball', name: 'BASEBALL GAME', image: '/images/viral-baseball.png', category: 'BASEBALL GAME', description: 'Cinematic sports photography — dramatic stadium lighting, slow-motion action shots, ESPN-style overlays', credits: '28.50' },
  { id: 'drift', name: 'DRIFT RACING', image: '/images/viral-drift.png', category: 'DRIFT RACING', description: 'Tokyo night street racing — cars drift and donut around the character, low angles and 35mm film grain, blockbuster reveal', credits: '32.28' },
  { id: 'cgi', name: 'CGI BREAKDOWN', image: '/images/viral-cgi.png', category: 'CGI BREAKDOWN', description: '3D wireframe reveal — transition from mesh to photorealistic render, tech-inspired visual breakdown', credits: '35.00' },
  { id: 'football', name: 'FOOTBALL INVADER', image: '/images/viral-football.png', category: 'FOOTBALL INVADER', description: 'Surreal football meets sci-fi — alien elements invade the pitch, dramatic sky effects, epic scale', credits: '30.75' },
  { id: 'summer', name: 'SUMMER HAZE', image: '/images/viral-summer.png', category: 'SUMMER HAZE', description: 'Dreamy golden hour — warm haze, lens flares, soft pastel tones, nostalgic summer vibe', credits: '22.00' },
  { id: 'kungfu', name: 'KUNG FU HIT', image: '/images/viral-kungfu.png', category: 'KUNG FU HIT', description: 'Martial arts action freeze-frame — impact shockwaves, dynamic motion blur, cinematic fight choreography', credits: '29.50' },
  { id: 'filmnoir', name: 'FILM NOIR', image: '/images/viral-filmnoir.png', category: 'FILM NOIR', description: 'Classic noir detective — rain-slicked streets, venetian blind shadows, high contrast B&W, moody atmosphere', credits: '25.00' },
  { id: '3drender', name: '3D RENDER', image: '/images/viral-3drender.png', category: '3D RENDER', description: 'Glossy product visualization — studio lighting, reflective surfaces, clean 3D aesthetic', credits: '24.50' },
  { id: 'storm', name: 'STORM GIANT', image: '/images/viral-storm.png', category: 'STORM GIANT', description: 'Epic colossal figure — thunderstorm backdrop, lightning drama, godlike scale and presence', credits: '38.00' },
  { id: 'zombie', name: 'ZOMBIE DANCE', image: '/images/viral-zombie.png', category: 'ZOMBIE DANCE', description: 'Thriller-style zombie choreography — eerie green lighting, decaying glamour, viral TikTok energy', credits: '31.50' },
  { id: 'paparazzi', name: '2000\'S PAPARAZZI', image: '/images/viral-paparazzi.png', category: '2000\'S PAPARAZZI', description: 'Y2K celebrity flash photography — red carpet vibes, flash burn overlays, tabloid aesthetic', credits: '26.75' },
  { id: 'candy', name: 'CANDY', image: '/images/viral-candy.png', category: 'CANDY', description: 'Hyper-saturated candy land — pop art explosion, neon sweetness, Willy Wonka fever dream', credits: '27.00' },
];

type AspectRatio = '16:9' | '1:1' | '9:16';

function PresetCard({ preset, index, onClick }: { preset: PresetItem; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/[0.04] hover:border-[#D7FF00]/30 transition-all duration-300"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={onClick}
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={preset.image}
          alt={preset.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#D7FF00]/0 group-hover:bg-[#D7FF00]/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Sparkles className="w-5 h-5 text-[#D7FF00]" />
          </div>
        </div>
      </div>
      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
        <span className="text-white text-[11px] font-bold font-[family-name:var(--font-space-grotesk)] tracking-wider uppercase drop-shadow-lg">
          {preset.name}
        </span>
        <span className="text-white/40 text-[10px] font-medium font-[family-name:var(--font-space-grotesk)]">
          {preset.credits}
        </span>
      </div>
    </motion.div>
  );
}

function PresetModal({ preset, onClose }: { preset: PresetItem | null; onClose: () => void }) {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('16:9');

  if (!preset) return null;

  const aspectButtons: { ratio: AspectRatio; label: string; icon: string }[] = [
    { ratio: '16:9', label: '16:9', icon: '▢' },
    { ratio: '1:1', label: '1:1', icon: '▢' },
    { ratio: '9:16', label: '9:16', icon: '▭' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-md mx-4 bg-[#0A0A0A] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-5 pb-0">
            <div>
              <h3 className="text-white font-bold text-lg font-[family-name:var(--font-space-grotesk)] tracking-tight">
                {preset.name}
              </h3>
              <p className="text-white/35 text-xs mt-1.5 font-[family-name:var(--font-inter)] leading-relaxed max-w-[280px]">
                {preset.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>

          {/* Upload Area */}
          <div className="px-5 pt-4">
            <div className="border border-dashed border-white/[0.08] rounded-xl p-8 flex flex-col items-center justify-center hover:border-white/[0.15] transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white/[0.04] flex items-center justify-center mb-3 group-hover:bg-[#D7FF00]/10 transition-colors">
                <Upload className="w-5 h-5 text-white/30 group-hover:text-[#D7FF00] transition-colors" />
              </div>
              <p className="text-white/50 text-sm font-medium font-[family-name:var(--font-space-grotesk)]">
                Upload media
              </p>
              <p className="text-white/20 text-[11px] mt-1 font-[family-name:var(--font-inter)]">
                Drag & drop or click to upload
              </p>
            </div>
          </div>

          {/* Aspect Ratio Selection */}
          <div className="px-5 pt-4">
            <p className="text-white/25 text-[10px] font-semibold tracking-wider uppercase font-[family-name:var(--font-space-grotesk)] mb-2.5">
              Aspect Ratio
            </p>
            <div className="flex gap-2">
              {aspectButtons.map((btn) => (
                <button
                  key={btn.ratio}
                  onClick={() => setSelectedRatio(btn.ratio)}
                  className={`flex-1 flex flex-col items-center justify-center py-3 rounded-lg border transition-all duration-200 ${
                    selectedRatio === btn.ratio
                      ? 'border-[#D7FF00] bg-[#D7FF00]/5'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={`text-xs font-bold font-[family-name:var(--font-space-grotesk)] ${
                    selectedRatio === btn.ratio ? 'text-[#D7FF00]' : 'text-white/40'
                  }`}>
                    {btn.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="p-5">
            <button className="w-full bg-white text-black text-sm font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#D7FF00] transition-colors font-[family-name:var(--font-space-grotesk)]">
              <Sparkles className="w-4 h-4" />
              Generate {preset.credits}
            </button>
          </div>

          {/* Thumbnail preview */}
          <div className="px-5 pb-5">
            <div className="relative w-full h-16 rounded-lg overflow-hidden opacity-50">
              <Image src={preset.image} alt={preset.name} fill className="object-cover" sizes="400px" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ViralPresets() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedPreset, setSelectedPreset] = useState<PresetItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredPresets = activeCategory === 'ALL'
    ? presets
    : presets.filter(p => p.category === activeCategory);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  }, []);

  return (
    <section ref={ref} className="w-full bg-[#000] py-20 md:py-28">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            AI CREATIVE STUDIO<span className="text-[#D7FF00]">.</span>
          </h2>
          <p className="text-white/30 text-sm sm:text-base mt-3 font-[family-name:var(--font-inter)] leading-relaxed max-w-xl">
            Trending visual effects, from explosions to surreal transformations.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/[0.04] hover:bg-white/[0.08] rounded-full flex items-center justify-center border border-white/[0.06] backdrop-blur-sm transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-white/60" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/[0.04] hover:bg-white/[0.08] rounded-full flex items-center justify-center border border-white/[0.06] backdrop-blur-sm transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-white/60" />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto px-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 text-[11px] font-semibold tracking-wider uppercase rounded-lg border transition-all duration-200 font-[family-name:var(--font-space-grotesk)] ${
                  activeCategory === cat
                    ? 'bg-[#D7FF00] text-black border-[#D7FF00]'
                    : 'bg-white/[0.02] text-white/40 border-white/[0.06] hover:bg-white/[0.05] hover:text-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Preset Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filteredPresets.map((preset, i) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                index={i}
                onClick={() => setSelectedPreset(preset)}
              />
            ))}
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <button className="flex items-center gap-2 text-[#D7FF00] text-sm font-semibold font-[family-name:var(--font-space-grotesk)] hover:gap-3 transition-all">
            View all presets <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Preset Modal */}
      <AnimatePresence>
        {selectedPreset && (
          <PresetModal
            preset={selectedPreset}
            onClose={() => setSelectedPreset(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
