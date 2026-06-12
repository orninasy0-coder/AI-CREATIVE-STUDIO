'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Film,
  LayoutGrid,
  User,
  Sparkles,
  Image as ImageIcon,
  Sun,
  Paintbrush,
  Maximize,
  Smile,
  Users,
  Pen,
  Shirt,
  Video,
  Clapperboard,
  Layers,
  Scissors,
  MousePointerClick,
  TrendingUp,
  Mic,
  Pencil,
  Play,
  Wind,
  RefreshCw,
  Languages,
  Menu,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

// ─── Types ──────────────────────────────────────────────────────────────────

type BadgeType = 'TOP' | 'NEW' | 'OFF' | null;

interface MegaMenuItem {
  label: string;
  icon?: LucideIcon;
  description?: string;
  badge?: BadgeType;
}

interface MegaMenuColumn {
  heading: string;
  items: MegaMenuItem[];
}

interface MegaMenuData {
  columns: MegaMenuColumn[];
}

// ─── Data ───────────────────────────────────────────────────────────────────

const IMAGE_MEGA_MENU: MegaMenuData = {
  columns: [
    {
      heading: 'FEATURES',
      items: [
        { label: 'Create Image', icon: Camera, description: 'Generate AI images', badge: 'TOP' },
        { label: 'Cinematic Cameras', icon: Film, description: 'Image generation with camera controls', badge: 'TOP' },
        { label: 'Moodboard', icon: LayoutGrid, description: 'Turn your references into a focused moodboard' },
        { label: 'Soul ID Character', icon: User, description: 'Create unique character' },
        { label: 'AI Influencer', icon: Sparkles, description: 'Create and manage your AI influencer' },
        { label: 'Photodump', icon: ImageIcon, description: 'Generate Your Aesthetic', badge: 'NEW' },
        { label: 'Relight', icon: Sun, description: 'Adjust lighting position, color, and brightness' },
        { label: 'Inpaint', icon: Paintbrush, description: 'Select an area, describe the change' },
        { label: 'Image Upscale', icon: Maximize, description: 'Enhance image quality' },
        { label: 'Face Swap', icon: Smile, description: 'Create Realistic Face Swaps' },
        { label: 'Character Swap', icon: Users, description: 'Create Realistic Character Swaps' },
        { label: 'Draw to Edit', icon: Pen, description: 'From sketch to picture' },
        { label: 'Fashion Factory', icon: Shirt, description: 'Create fashion sets' },
      ],
    },
    {
      heading: 'MODELS',
      items: [
        { label: 'GPT Image 2', description: '4K images with near-perfect text rendering', badge: 'NEW' },
        { label: 'GPT Image 1.5', description: 'True-color precision rendering' },
        { label: 'Flux', description: 'State-of-the-art image generation', badge: 'TOP' },
        { label: 'Reve', description: 'Advanced image editing model' },
        { label: 'Seedream Lite', description: 'Intelligent visual reasoning' },
        { label: 'Seedream', description: 'Professional image generation' },
        { label: 'Nano Banana', description: 'Pro quality at flash speed', badge: 'NEW' },
        { label: 'Nano Banana Pro', description: 'Best 4K image model ever', badge: 'TOP' },
        { label: 'Topaz', description: 'High-resolution upscaler' },
        { label: 'Recraft', description: 'Photorealistic and expressive generation', badge: 'NEW' },
        { label: 'Z-Image', description: 'Instant lifelike portraits' },
        { label: 'Grok Imagine', description: 'Versatile image styles by xAI' },
        { label: 'Soul Cinema', description: 'Cinematic stills from your imagination' },
        { label: 'Soul 2.0', description: 'Next gen soul model' },
        { label: 'Popcorn', description: 'Storyboard, edit, create' },
      ],
    },
  ],
};

const VIDEO_MEGA_MENU: MegaMenuData = {
  columns: [
    {
      heading: 'FEATURES',
      items: [
        { label: 'Create Video', icon: Video, description: 'Generate AI videos from text or image', badge: 'TOP' },
        { label: 'Cinema Studio', icon: Clapperboard, description: 'Cinematic videos with AI director', badge: 'TOP' },
        { label: 'Mixed Media', icon: Layers, description: 'Create mixed media video projects' },
        { label: 'Edit Video', icon: Scissors, description: 'Edit scenes, shots, elements' },
        { label: 'Click to Ad', icon: MousePointerClick, description: 'Turn product URLs into video ads' },
        { label: 'Sora Trends', icon: TrendingUp, description: 'Turn ideas into viral videos', badge: 'TOP' },
        { label: 'Lipsync Studio', icon: Mic, description: 'Create talking clips with perfect lip sync' },
        { label: 'Draw to Video', icon: Pen, description: 'Sketch turns into a cinema' },
        { label: 'Sketch to Video', icon: Pencil, description: 'From sketch to video with Sora 2' },
        { label: 'UGC Factory', icon: Users, description: 'Build UGC videos with AI avatars' },
        { label: 'Video Upscale', icon: Maximize, description: 'Enhance video quality up to 4K' },
        { label: 'Animate', icon: Play, description: 'Animate images and characters' },
        { label: 'Vibe Motion', icon: Wind, description: 'Create professional motion graphics' },
        { label: 'Recast Studio', icon: RefreshCw, description: 'Swap characters in videos' },
      ],
    },
    {
      heading: 'MODELS',
      items: [
        { label: 'Seedance 2.0', description: 'Most advanced AI video model', badge: 'TOP' },
        { label: 'Kling 3.0', description: 'Cinematic videos with audio', badge: 'TOP' },
        { label: 'Kling Motion Control', description: 'Transfer motion from video to image' },
        { label: 'Kling Edit', description: 'Advanced video editing' },
        { label: 'Sora 2', description: "OpenAI's most advanced video model", badge: 'TOP' },
        { label: 'Google Veo 3.1 Lite', description: 'Fast video generation by Google', badge: 'NEW' },
        { label: 'Google Veo 3.1', description: 'Advanced AI video with sound', badge: 'TOP' },
        { label: 'HappyHorse', description: "Alibaba's #1 ranked video and audio model" },
        { label: 'Grok Imagine Video', description: 'Cinematic videos with synchronized audio', badge: 'NEW' },
        { label: 'Wan 2.7', description: 'AI video with first and last frame control', badge: 'NEW' },
        { label: 'Minimax Hailuo', description: 'Fastest high-dynamic video' },
        { label: 'Seedance Pro', description: 'Pro-grade audio-visual sync' },
        { label: 'AI DOP', description: 'VFX and camera control' },
      ],
    },
  ],
};

const AUDIO_MEGA_MENU: MegaMenuData = {
  columns: [
    {
      heading: 'FEATURES',
      items: [
        { label: 'Voiceover', icon: Mic, description: 'Generate natural speech from text' },
        { label: 'Change Voice', icon: RefreshCw, description: 'Swap voices in any audio or video' },
        { label: 'Translation', icon: Languages, description: 'Translate speech in any language' },
      ],
    },
    {
      heading: 'MODELS',
      items: [
        { label: 'Eleven v3', description: 'Expressive AI voice with emotion control', badge: 'TOP' },
        { label: 'MiniMax Speech 2.8', description: 'Studio-quality text-to-speech', badge: 'TOP' },
        { label: 'Seed Speech', description: 'ByteDance multilingual text-to-speech', badge: 'NEW' },
        { label: 'VibeVoice', description: 'Long-form expressive voice synthesis', badge: 'NEW' },
      ],
    },
  ],
};

const MEGA_MENU_MAP: Record<string, MegaMenuData> = {
  Image: IMAGE_MEGA_MENU,
  Video: VIDEO_MEGA_MENU,
  Audio: AUDIO_MEGA_MENU,
};

interface NavItem {
  label: string;
  hasMegaMenu?: boolean;
  badge?: BadgeType;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Explore' },
  { label: 'Image', hasMegaMenu: true },
  { label: 'Video', hasMegaMenu: true },
  { label: 'Audio', hasMegaMenu: true },
  { label: 'Supercomputer', badge: 'NEW' },
  { label: 'Models' },
  { label: 'Tools' },
  { label: 'Marketing Studio' },
  { label: 'Cinema Studio' },
  { label: 'AI Influencer' },
  { label: 'Canvas' },
  { label: 'Apps' },
  { label: 'Pricing', badge: 'OFF' },
];

// ─── Badge Component ────────────────────────────────────────────────────────

function Badge({ type }: { type: BadgeType }) {
  if (!type) return null;
  const classes =
    type === 'TOP'
      ? 'bg-[#FF3366] text-white'
      : type === 'NEW'
        ? 'bg-[#D7FF00] text-black'
        : 'bg-[#FF3366] text-white';

  return (
    <span
      className={`${classes} text-[9px] font-bold px-1.5 py-0.5 rounded leading-none tracking-wider uppercase shrink-0`}
    >
      {type}
    </span>
  );
}

// ─── Mega Menu Item ─────────────────────────────────────────────────────────

function MegaMenuItemRow({ item }: { item: MegaMenuItem }) {
  const IconComp = item.icon;
  return (
    <div className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
      {IconComp && (
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors shrink-0 mt-0.5">
          <IconComp className="w-4 h-4 text-white/70 group-hover:text-[#D7FF00] transition-colors" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white group-hover:text-[#D7FF00] transition-colors">
            {item.label}
          </span>
          {item.badge && <Badge type={item.badge} />}
        </div>
        {item.description && (
          <p className="text-xs text-white/40 mt-0.5 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Mega Menu Panel ────────────────────────────────────────────────────────

function MegaMenuPanel({ data }: { data: MegaMenuData }) {
  return (
    <div className="flex gap-0 mega-menu-scroll">
      {data.columns.map((col, colIdx) => (
        <div
          key={col.heading}
          className={`flex-1 min-w-0 ${colIdx > 0 ? 'border-l border-white/5 pl-6' : 'pr-6'}`}
        >
          <h3 className="text-[11px] font-semibold tracking-widest text-white/30 uppercase mb-3 px-3 font-[family-name:var(--font-space-grotesk)]">
            {col.heading}
          </h3>
          <div className="space-y-0.5">
            {col.items.map((item) => (
              <MegaMenuItemRow key={item.label} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Mobile Accordion Item ──────────────────────────────────────────────────

function MobileMegaMenuSection({ label, data, isOpen, onToggle }: { label: string; data: MegaMenuData; isOpen: boolean; onToggle: () => void }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3 text-sm font-medium text-white hover:text-[#D7FF00] transition-colors"
      >
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {data.columns.map((col) => (
              <div key={col.heading} className="mb-4">
                <h4 className="text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-2 px-3 font-[family-name:var(--font-space-grotesk)]">
                  {col.heading}
                </h4>
                <div className="space-y-0.5">
                  {col.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      {item.icon && (
                        <item.icon className="w-4 h-4 text-white/50 shrink-0" />
                      )}
                      <span className="text-sm text-white/80">{item.label}</span>
                      {item.badge && <Badge type={item.badge} />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Header ────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openMegaMenu = useCallback((label: string) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setActiveMenu(label);
  }, []);

  const closeMegaMenu = useCallback(() => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  const cancelCloseMegaMenu = useCallback(() => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
  }, []);

  const handleMobileToggle = useCallback((label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
        style={{ height: 64 }}
      >
        <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/images/logo.png"
              alt="AI Creative Studio"
              width={32}
              height={32}
              style={{ width: 'auto', height: '32px' }}
              className="object-contain"
            />
            <span className="text-sm font-semibold tracking-wide text-white font-[family-name:var(--font-space-grotesk)] hidden sm:inline">
              AI CREATIVE STUDIO
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  if (item.hasMegaMenu) {
                    openMegaMenu(item.label);
                  }
                }}
                onMouseLeave={() => {
                  if (item.hasMegaMenu) {
                    closeMegaMenu();
                  }
                }}
              >
                <button
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-sm text-white hover:text-[#D7FF00] transition-colors rounded-md whitespace-nowrap ${
                    activeMenu === item.label ? 'text-[#D7FF00]' : ''
                  }`}
                >
                  {item.label}
                  {item.hasMegaMenu && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                  {item.badge && <Badge type={item.badge} />}
                </button>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="text-sm text-white hover:text-[#D7FF00] transition-colors hidden sm:block">
              Login
            </button>
            <button className="bg-[#D7FF00] text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#c5ee00] transition-colors whitespace-nowrap">
              Get Started
            </button>
            <button
              className="lg:hidden text-white p-1.5 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Mega Menu Dropdown */}
      <AnimatePresence>
        {activeMenu && MEGA_MENU_MAP[activeMenu] && (
          <motion.div
            ref={megaMenuRef}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40"
            onMouseEnter={cancelCloseMegaMenu}
            onMouseLeave={closeMegaMenu}
          >
            <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
              <div className="bg-[rgba(10,10,10,0.98)] backdrop-blur-2xl rounded-xl border border-white/5 shadow-2xl shadow-black/50 p-6">
                <MegaMenuPanel data={MEGA_MENU_MAP[activeMenu]} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop when mega menu is open (desktop) */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-30 bg-black/40 backdrop-blur-sm"
            onMouseEnter={closeMegaMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sheet Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="bg-[#0A0A0A] border-white/5 text-white w-[320px] sm:w-[380px] p-0"
        >
          <SheetHeader className="p-4 border-b border-white/5">
            <SheetTitle className="flex items-center gap-2.5 text-white">
              <Image
                src="/images/logo.png"
                alt="AI Creative Studio"
                width={28}
                height={28}
                style={{ width: 'auto', height: '28px' }}
                className="object-contain"
              />
              <span className="text-sm font-semibold tracking-wide font-[family-name:var(--font-space-grotesk)]">
                AI CREATIVE STUDIO
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto mega-menu-scroll p-4 space-y-0.5">
            {NAV_ITEMS.map((item) =>
              item.hasMegaMenu && MEGA_MENU_MAP[item.label] ? (
                <MobileMegaMenuSection
                  key={item.label}
                  label={item.label}
                  data={MEGA_MENU_MAP[item.label]}
                  isOpen={mobileExpanded === item.label}
                  onToggle={() => handleMobileToggle(item.label)}
                />
              ) : (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 px-0"
                >
                  <span className="text-sm font-medium text-white hover:text-[#D7FF00] transition-colors cursor-pointer">
                    {item.label}
                  </span>
                  {item.badge && <Badge type={item.badge} />}
                </div>
              )
            )}
          </div>

          <div className="border-t border-white/5 p-4 space-y-3">
            <button className="w-full text-sm text-white hover:text-[#D7FF00] transition-colors py-2.5 text-left">
              Login
            </button>
            <button className="w-full bg-[#D7FF00] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#c5ee00] transition-colors">
              Get Started
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
