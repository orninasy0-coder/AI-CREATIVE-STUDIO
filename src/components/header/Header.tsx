'use client';

import React, { useState, useEffect, useRef, useCallback, type ComponentType } from 'react';
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
  Volume2,
  Music,
  Headphones,
  Speaker,
  AudioLines,
  type LucideIcon,
} from 'lucide-react';
import {
  OpenAI,
  Flux,
  Midjourney,
  Google,
  Kling,
  DeepMind,
  Runway,
  ByteDance,
  Hunyuan,
  Recraft,
  Grok,
  Sora,
  ElevenLabs,
  Minimax,
  Hailuo,
  Luma,
  Pika,
  Stability,
  Ideogram,
  Suno,
  Udio,
  Civitai,
  HuggingFace,
  ComfyUI,
  Replicate,
  Doubao,
  CogVideo,
  Vidu,
  PixVerse,
} from '@lobehub/icons';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

// ─── Types ──────────────────────────────────────────────────────────────────

type BadgeType = 'TOP' | 'NEW' | 'OFF' | null;

// Icon can be either a Lucide icon or a lobehub icon
type IconComponent = LucideIcon | ComponentType<{ size?: number | string; color?: string }>;

interface MegaMenuItem {
  label: string;
  icon?: IconComponent;
  description?: string;
  badge?: BadgeType;
  isBrandIcon?: boolean; // true = lobehub brand icon (renders differently)
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
        { label: 'GPT Image 2', icon: OpenAI, description: '4K images with near-perfect text rendering', badge: 'NEW', isBrandIcon: true },
        { label: 'GPT Image 1.5', icon: OpenAI, description: 'True-color precision rendering', isBrandIcon: true },
        { label: 'Flux', icon: Flux, description: 'State-of-the-art image generation', badge: 'TOP', isBrandIcon: true },
        { label: 'Reve', icon: Sparkles, description: 'Advanced image editing model' },
        { label: 'Seedream Lite', icon: Doubao, description: 'Intelligent visual reasoning', isBrandIcon: true },
        { label: 'Seedream', icon: Doubao, description: 'Professional image generation', isBrandIcon: true },
        { label: 'Midjourney', icon: Midjourney, description: 'Creative AI image generation', badge: 'TOP', isBrandIcon: true },
        { label: 'Ideogram', icon: Ideogram, description: 'Text-in-image generation', badge: 'NEW', isBrandIcon: true },
        { label: 'Recraft', icon: Recraft, description: 'Photorealistic and expressive generation', badge: 'NEW', isBrandIcon: true },
        { label: 'Stability AI', icon: Stability, description: 'Stable Diffusion models', isBrandIcon: true },
        { label: 'Grok Imagine', icon: Grok, description: 'Versatile image styles by xAI', isBrandIcon: true },
        { label: 'Sora', icon: Sora, description: 'Cinematic stills from your imagination', isBrandIcon: true },
        { label: 'Civitai', icon: Civitai, description: 'Community models & checkpoints', isBrandIcon: true },
        { label: 'ComfyUI', icon: ComfyUI, description: 'Node-based image workflows', isBrandIcon: true },
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
        { label: 'Seedance 2.0', icon: ByteDance, description: 'Most advanced AI video model', badge: 'TOP', isBrandIcon: true },
        { label: 'Kling 3.0', icon: Kling, description: 'Cinematic videos with audio', badge: 'TOP', isBrandIcon: true },
        { label: 'Kling Motion', icon: Kling, description: 'Transfer motion from video to image', isBrandIcon: true },
        { label: 'Kling Edit', icon: Kling, description: 'Advanced video editing', isBrandIcon: true },
        { label: 'Sora 2', icon: Sora, description: "OpenAI's most advanced video model", badge: 'TOP', isBrandIcon: true },
        { label: 'Google Veo 3.1 Lite', icon: DeepMind, description: 'Fast video generation by Google', badge: 'NEW', isBrandIcon: true },
        { label: 'Google Veo 3.1', icon: DeepMind, description: 'Advanced AI video with sound', badge: 'TOP', isBrandIcon: true },
        { label: 'Runway Gen-3', icon: Runway, description: 'Hollywood-grade AI video', isBrandIcon: true },
        { label: 'Grok Video', icon: Grok, description: 'Cinematic videos with synchronized audio', badge: 'NEW', isBrandIcon: true },
        { label: 'Hunyuan Video', icon: Hunyuan, description: 'AI video generation by Tencent', badge: 'NEW', isBrandIcon: true },
        { label: 'Minimax Hailuo', icon: Hailuo, description: 'Fastest high-dynamic video', isBrandIcon: true },
        { label: 'Seedance Pro', icon: ByteDance, description: 'Pro-grade audio-visual sync', isBrandIcon: true },
        { label: 'Luma Dream Machine', icon: Luma, description: 'VFX and camera control', isBrandIcon: true },
        { label: 'CogVideoX', icon: CogVideo, description: 'Text-to-video generation', isBrandIcon: true },
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
        { label: 'Sound Effects', icon: Volume2, description: 'Generate custom sound effects' },
        { label: 'Music Generation', icon: Music, description: 'Create original music tracks' },
        { label: 'Podcast Editor', icon: Headphones, description: 'AI-powered podcast editing' },
      ],
    },
    {
      heading: 'MODELS',
      items: [
        { label: 'Eleven v3', icon: ElevenLabs, description: 'Expressive AI voice with emotion control', badge: 'TOP', isBrandIcon: true },
        { label: 'MiniMax Speech 2.8', icon: Minimax, description: 'Studio-quality text-to-speech', badge: 'TOP', isBrandIcon: true },
        { label: 'Seed Speech', icon: ByteDance, description: 'ByteDance multilingual text-to-speech', badge: 'NEW', isBrandIcon: true },
        { label: 'VibeVoice', icon: Sparkles, description: 'Long-form expressive voice synthesis', badge: 'NEW' },
        { label: 'Suno', icon: Suno, description: 'AI music and song generation', isBrandIcon: true },
        { label: 'Udio', icon: Udio, description: 'Professional audio mastering', isBrandIcon: true },
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
  { label: 'MCP & CLI', badge: 'NEW' },
  { label: 'Colab' },
  { label: 'Plugins', badge: 'NEW' },
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
    <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
      {IconComp && (
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors shrink-0">
          {item.isBrandIcon ? (
            <IconComp size={14} color="#fff" />
          ) : (
            <IconComp className="w-3.5 h-3.5 text-white/70 group-hover:text-[#D7FF00] transition-colors" size={14} />
          )}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-medium text-white group-hover:text-[#D7FF00] transition-colors">
            {item.label}
          </span>
          {item.badge && <Badge type={item.badge} />}
        </div>
        {item.description && (
          <p className="text-[11px] text-white/35 mt-0.5 leading-snug">
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
    <div className="flex gap-0">
      {data.columns.map((col, colIdx) => (
        <div
          key={col.heading}
          className={`flex-1 min-w-0 ${colIdx > 0 ? 'border-l border-white/5 pl-4' : 'pr-4'}`}
        >
          <h3 className="text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-2 px-2 font-[family-name:var(--font-space-grotesk)]">
            {col.heading}
          </h3>
          <div className="space-y-px">
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
                        item.isBrandIcon ? (
                          <item.icon size={14} color="#fff" />
                        ) : (
                          <item.icon className="w-4 h-4 text-white/50 shrink-0" size={14} />
                        )
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
  const hoverZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto px-4 lg:px-6 relative">
          {/* Logo Icon */}
          <div className="flex items-center shrink-0">
            <Image
              src="/images/logo-icon.png"
              alt="AI Creative Studio"
              width={36}
              height={36}
              style={{ width: '36px', height: '36px' }}
              className="object-contain"
              priority
            />
          </div>

          {/* Desktop Navigation + Mega Menu Hover Zone */}
          <div
            ref={hoverZoneRef}
            className="hidden lg:flex items-center gap-0.5 flex-1 justify-center"
            onMouseLeave={() => setActiveMenu(null)}
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                <button
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-sm text-white hover:text-[#D7FF00] transition-colors rounded-md whitespace-nowrap ${
                    activeMenu === item.label ? 'text-[#D7FF00]' : ''
                  }`}
                  onMouseEnter={() => {
                    if (item.hasMegaMenu) {
                      setActiveMenu(item.label);
                    } else {
                      setActiveMenu(null);
                    }
                  }}
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

                {/* Mega Menu Dropdown - inside each nav item */}
                <AnimatePresence>
                  {item.hasMegaMenu && activeMenu === item.label && MEGA_MENU_MAP[item.label] && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                    >
                      <div className="bg-[rgba(10,10,10,0.98)] backdrop-blur-2xl rounded-xl border border-white/5 shadow-2xl shadow-black/50 p-4 w-[720px] max-h-[50vh] overflow-y-auto mega-menu-scroll">
                        <MegaMenuPanel data={MEGA_MENU_MAP[item.label]} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="text-sm text-white hover:text-[#D7FF00] transition-colors hidden sm:block">
              Login
            </button>
            <button className="bg-[#D7FF00] text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#c5ee00] transition-colors whitespace-nowrap">
              Sign Up
            </button>
            <button
              className="lg:hidden text-white p-1.5 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Animated Right Background */}
          <div className="absolute right-0 top-0 h-full w-[300px] pointer-events-none overflow-hidden opacity-30">
            <div className="absolute inset-0 bg-gradient-to-l from-[#D7FF00]/10 via-transparent to-transparent" />
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(215,255,0,0.15) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute right-10 top-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </div>
        </div>
      </header>

      {/* Backdrop when mega menu is open */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 top-16 z-30 bg-black/40 backdrop-blur-sm"
            onMouseEnter={() => setActiveMenu(null)}
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
                src="/images/logo-icon.png"
                alt="AI Creative Studio"
                width={28}
                height={28}
                style={{ width: '28px', height: '28px' }}
                className="object-contain"
              />
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
              Sign Up
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
