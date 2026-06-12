'use client';

import React, { useState, useEffect, useCallback, type ComponentType } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Film, LayoutGrid, User, Sparkles, Image as ImageIcon,
  Sun, Paintbrush, Maximize, Smile, Users, Pen, Shirt,
  Video, Clapperboard, Scissors, MousePointerClick, TrendingUp,
  Mic, RefreshCw, Languages, Menu, ChevronDown, Volume2, Music,
  Cpu, Terminal, Webhook, Puzzle, Code2, Play, Wind,
  type LucideIcon,
} from 'lucide-react';
import {
  OpenAIIcon, FluxIcon, MidjourneyIcon, KlingIcon, DeepMindIcon,
  RunwayIcon, ByteDanceIcon, HunyuanIcon, RecraftIcon, GrokIcon,
  SoraIcon, ElevenLabsIcon, MinimaxIcon, HailuoIcon, LumaIcon,
  StabilityIcon, IdeogramIcon, SunoIcon, UdioIcon, CivitaiIcon,
  ComfyUIIcon, DoubaoIcon, CogVideoIcon,
} from '@/components/icons/BrandIcons';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet';

// ─── Types ──────────────────────────────────────────────────────────────────

type BadgeType = 'TOP' | 'NEW' | 'OFF' | 'SOON' | null;
type IconComponent = LucideIcon | ComponentType<{ size?: number | string; color?: string; className?: string; style?: React.CSSProperties }>;

interface MegaMenuItem {
  label: string;
  icon?: IconComponent;
  description?: string;
  badge?: BadgeType;
  isBrandIcon?: boolean;
}

interface MegaMenuColumn {
  heading: string;
  items: MegaMenuItem[];
}

interface MegaMenuData {
  columns: MegaMenuColumn[];
}

// ─── Mega Menu Data ─────────────────────────────────────────────────────────

const IMAGE_MEGA_MENU: MegaMenuData = {
  columns: [
    {
      heading: 'FEATURES',
      items: [
        { label: 'Create Image', icon: Camera, description: 'Generate AI images', badge: 'TOP' },
        { label: 'Cinematic Cameras', icon: Film, description: 'Camera controls for image gen', badge: 'TOP' },
        { label: 'Moodboard', icon: LayoutGrid, description: 'Focus your references' },
        { label: 'Soul ID Character', icon: User, description: 'Create unique character' },
        { label: 'AI Influencer', icon: Sparkles, description: 'Manage your AI influencer' },
        { label: 'Photodump', icon: ImageIcon, description: 'Generate Your Aesthetic', badge: 'NEW' },
        { label: 'Relight', icon: Sun, description: 'Adjust lighting & color' },
        { label: 'Inpaint', icon: Paintbrush, description: 'Select area, describe change' },
        { label: 'Image Upscale', icon: Maximize, description: 'Enhance image quality' },
        { label: 'Face Swap', icon: Smile, description: 'Realistic Face Swaps' },
        { label: 'Character Swap', icon: Users, description: 'Realistic Character Swaps' },
        { label: 'Draw to Edit', icon: Pen, description: 'From sketch to picture' },
        { label: 'Fashion Factory', icon: Shirt, description: 'Create fashion sets' },
      ],
    },
    {
      heading: 'MODELS',
      items: [
        { label: 'GPT Image 2', icon: OpenAIIcon, description: 'Near-perfect text rendering', badge: 'NEW', isBrandIcon: true },
        { label: 'Flux', icon: FluxIcon, description: 'State-of-the-art generation', badge: 'TOP', isBrandIcon: true },
        { label: 'Midjourney', icon: MidjourneyIcon, description: 'Creative AI image gen', badge: 'TOP', isBrandIcon: true },
        { label: 'Ideogram', icon: IdeogramIcon, description: 'Text-in-image generation', badge: 'NEW', isBrandIcon: true },
        { label: 'Recraft', icon: RecraftIcon, description: 'Photorealistic generation', badge: 'NEW', isBrandIcon: true },
        { label: 'Stability AI', icon: StabilityIcon, description: 'Stable Diffusion models', isBrandIcon: true },
        { label: 'Grok Imagine', icon: GrokIcon, description: 'Versatile styles by xAI', isBrandIcon: true },
        { label: 'Civitai', icon: CivitaiIcon, description: 'Community models', isBrandIcon: true },
        { label: 'ComfyUI', icon: ComfyUIIcon, description: 'Node-based workflows', isBrandIcon: true },
      ],
    },
  ],
};

const VIDEO_MEGA_MENU: MegaMenuData = {
  columns: [
    {
      heading: 'FEATURES',
      items: [
        { label: 'Create Video', icon: Video, description: 'From text or image', badge: 'TOP' },
        { label: 'Cinema Studio', icon: Clapperboard, description: 'AI director for videos', badge: 'TOP' },
        { label: 'Edit Video', icon: Scissors, description: 'Edit scenes & shots' },
        { label: 'Click to Ad', icon: MousePointerClick, description: 'URLs into video ads' },
        { label: 'Lipsync Studio', icon: Mic, description: 'Perfect lip sync' },
        { label: 'Video Upscale', icon: Maximize, description: 'Enhance up to 4K' },
        { label: 'Animate', icon: Play, description: 'Animate images & characters' },
        { label: 'Vibe Motion', icon: Wind, description: 'Professional motion graphics' },
      ],
    },
    {
      heading: 'MODELS',
      items: [
        { label: 'Seedance 2.0', icon: ByteDanceIcon, description: 'Most advanced video AI', badge: 'TOP', isBrandIcon: true },
        { label: 'Kling 3.0', icon: KlingIcon, description: 'Cinematic with audio', badge: 'TOP', isBrandIcon: true },
        { label: 'Sora 2', icon: SoraIcon, description: "OpenAI's video model", badge: 'TOP', isBrandIcon: true },
        { label: 'Veo 3.1', icon: DeepMindIcon, description: 'Google video with sound', badge: 'NEW', isBrandIcon: true },
        { label: 'Runway Gen-3', icon: RunwayIcon, description: 'Hollywood-grade video', isBrandIcon: true },
        { label: 'Hunyuan Video', icon: HunyuanIcon, description: 'Tencent AI video', badge: 'NEW', isBrandIcon: true },
        { label: 'Luma Dream', icon: LumaIcon, description: 'VFX & camera control', isBrandIcon: true },
        { label: 'CogVideoX', icon: CogVideoIcon, description: 'Text-to-video gen', isBrandIcon: true },
      ],
    },
  ],
};

const AUDIO_MEGA_MENU: MegaMenuData = {
  columns: [
    {
      heading: 'FEATURES',
      items: [
        { label: 'Voiceover', icon: Mic, description: 'Natural speech from text' },
        { label: 'Change Voice', icon: RefreshCw, description: 'Swap voices' },
        { label: 'Translation', icon: Languages, description: 'Any language' },
        { label: 'Sound Effects', icon: Volume2, description: 'Custom sound FX' },
        { label: 'Music Generation', icon: Music, description: 'Original music tracks' },
      ],
    },
    {
      heading: 'MODELS',
      items: [
        { label: 'Eleven v3', icon: ElevenLabsIcon, description: 'Expressive AI voice', badge: 'TOP', isBrandIcon: true },
        { label: 'MiniMax Speech', icon: MinimaxIcon, description: 'Studio-quality TTS', badge: 'TOP', isBrandIcon: true },
        { label: 'Suno', icon: SunoIcon, description: 'AI music generation', isBrandIcon: true },
        { label: 'Udio', icon: UdioIcon, description: 'Professional audio', isBrandIcon: true },
      ],
    },
  ],
};

const PLUGINS_MEGA_MENU: MegaMenuData = {
  columns: [
    {
      heading: 'INTEGRATIONS',
      items: [
        { label: 'Supercomputer', icon: Cpu, description: 'Agents, automation & skills', badge: 'NEW' },
        { label: 'MCP & CLI', icon: Terminal, description: 'Claude creative engine', badge: 'NEW' },
        { label: 'Webhooks', icon: Webhook, description: 'Connect any service' },
        { label: 'API Access', icon: Code2, description: 'Full REST API' },
      ],
    },
    {
      heading: 'COMING SOON',
      items: [
        { label: 'Photoshop', icon: Puzzle, description: 'AI inside Adobe Photoshop', badge: 'SOON' },
        { label: 'Figma', icon: Puzzle, description: 'AI inside Figma', badge: 'SOON' },
        { label: 'Premiere Pro', icon: Puzzle, description: 'AI inside Premiere', badge: 'SOON' },
        { label: 'After Effects', icon: Puzzle, description: 'AI inside After Effects', badge: 'SOON' },
        { label: 'Blender', icon: Puzzle, description: 'AI inside Blender', badge: 'SOON' },
        { label: 'VS Code', icon: Code2, description: 'AI in your editor', badge: 'SOON' },
      ],
    },
  ],
};

const MEGA_MENU_MAP: Record<string, MegaMenuData> = {
  Image: IMAGE_MEGA_MENU,
  Video: VIDEO_MEGA_MENU,
  Audio: AUDIO_MEGA_MENU,
  Plugins: PLUGINS_MEGA_MENU,
};

// ─── Nav Structure ──────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  hasMegaMenu?: boolean;
  badge?: BadgeType;
  badgeText?: string;
  separator?: boolean;
  showGridIcon?: boolean;
}

const LEFT_NAV: NavItem[] = [
  { label: 'Image', hasMegaMenu: true },
  { label: 'Video', hasMegaMenu: true },
  { label: 'Audio', hasMegaMenu: true },
  { label: 'Supercomputer', badge: 'NEW', separator: true, showGridIcon: true },
  { label: 'MCP & CLI', badge: 'NEW' },
  { label: 'Plugins', badge: 'SOON', badgeText: 'SOON', hasMegaMenu: true, separator: true },
  { label: 'Marketing Studio', separator: true },
  { label: 'Cinema Studio' },
  { label: 'Canvas', separator: true },
];

// ─── Badge ──────────────────────────────────────────────────────────────────

function NavBadge({ type, text }: { type: BadgeType; text?: string }) {
  if (!type) return null;
  const style =
    type === 'TOP' ? 'bg-[#FF3366] text-white' :
    type === 'NEW' ? 'bg-[#D7FF00] text-black' :
    type === 'SOON' ? 'bg-white/10 text-white/60 border border-white/10' :
    'bg-[#FF3366] text-white';

  return (
    <span className={`${style} text-[9px] font-bold px-1.5 py-0.5 rounded leading-none tracking-wider uppercase ml-1.5`}>
      {text || type}
    </span>
  );
}

// ─── Grid Dots Icon ─────────────────────────────────────────────────────────

function GridDotsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mr-1">
      <rect x="1" y="1" width="5" height="5" rx="1.5" fill="#D7FF00" />
      <rect x="8" y="1" width="5" height="5" rx="1.5" fill="#D7FF00" opacity="0.6" />
      <rect x="1" y="8" width="5" height="5" rx="1.5" fill="#D7FF00" opacity="0.6" />
      <rect x="8" y="8" width="5" height="5" rx="1.5" fill="#D7FF00" opacity="0.3" />
    </svg>
  );
}

// ─── Mega Menu Components ───────────────────────────────────────────────────

function MegaMenuItemRow({ item }: { item: MegaMenuItem }) {
  const IconComp = item.icon;
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
      {IconComp && (
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors shrink-0">
          {item.isBrandIcon ? (
            <IconComp size={16} color="#fff" />
          ) : (
            <IconComp className="w-4 h-4 text-white/50 group-hover:text-[#D7FF00] transition-colors" size={16} />
          )}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-white/90 group-hover:text-[#D7FF00] transition-colors">
            {item.label}
          </span>
          {item.badge && <NavBadge type={item.badge} />}
        </div>
        {item.description && (
          <p className="text-[11px] text-white/30 mt-0.5 leading-snug">{item.description}</p>
        )}
      </div>
    </div>
  );
}

function MegaMenuPanel({ data }: { data: MegaMenuData }) {
  return (
    <div className="flex gap-0">
      {data.columns.map((col, i) => (
        <div key={col.heading} className={`flex-1 min-w-0 ${i > 0 ? 'border-l border-white/[0.06] pl-6' : 'pr-6'}`}>
          <h3 className="text-[10px] font-semibold tracking-[0.15em] text-white/25 uppercase mb-3 px-3 font-[family-name:var(--font-space-grotesk)]">
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

// ─── Mobile Menu ────────────────────────────────────────────────────────────

function MobileAccordion({ label, data, isOpen, onToggle, badge, badgeText }: {
  label: string; data: MegaMenuData; isOpen: boolean; onToggle: () => void; badge?: BadgeType; badgeText?: string;
}) {
  return (
    <div>
      <button onClick={onToggle} className="flex items-center justify-between w-full py-3.5 text-sm font-medium text-white/80 hover:text-[#D7FF00] transition-colors">
        <span className="flex items-center gap-2">
          {label}
          {badge && <NavBadge type={badge} text={badgeText} />}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            {data.columns.map((col) => (
              <div key={col.heading} className="mb-3">
                <h4 className="text-[9px] font-semibold tracking-[0.15em] text-white/25 uppercase mb-1.5 px-3">{col.heading}</h4>
                {col.items.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer">
                    {item.icon && (item.isBrandIcon ? <item.icon size={14} color="#fff" /> : <item.icon className="w-4 h-4 text-white/40" size={14} />)}
                    <span className="text-sm text-white/70">{item.label}</span>
                    {item.badge && <NavBadge type={item.badge} />}
                  </div>
                ))}
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1280) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleMobile = useCallback((label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  }, []);

  const allNavItems = [...LEFT_NAV, { label: 'Pricing', badge: 'OFF' as BadgeType, badgeText: '30% OFF', separator: true }];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[rgba(0,0,0,0.92)] backdrop-blur-2xl border-b border-white/[0.06]' : 'bg-transparent'
        }`}
        style={{ height: 64 }}
      >
        <div className="flex items-center h-full max-w-[1440px] mx-auto px-5 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0 mr-8">
            <Image src="/images/logo-icon.png" alt="AI Creative Studio" width={34} height={34} className="object-contain" priority />
          </a>

          {/* Desktop Left Nav */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 min-w-0" onMouseLeave={() => setActiveMenu(null)}>
            {LEFT_NAV.map((item) => (
              <div key={item.label} className="relative flex items-center">
                {item.separator && <div className="w-px h-4 bg-white/[0.08] mx-3" />}
                <button
                  className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-white/60 hover:text-white transition-colors rounded-lg whitespace-nowrap ${
                    activeMenu === item.label ? 'text-white bg-white/[0.04]' : ''
                  }`}
                  onMouseEnter={() => setActiveMenu(item.hasMegaMenu ? item.label : null)}
                >
                  {item.showGridIcon && <GridDotsIcon />}
                  <span>{item.label}</span>
                  {item.hasMegaMenu && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} />
                  )}
                  {item.badge && <NavBadge type={item.badge} text={item.badgeText} />}
                </button>

                <AnimatePresence>
                  {item.hasMegaMenu && activeMenu === item.label && MEGA_MENU_MAP[item.label] && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-0 pt-3 z-50"
                    >
                      <div className="bg-[rgba(10,10,10,0.98)] backdrop-blur-3xl rounded-2xl border border-white/[0.06] shadow-2xl shadow-black/60 p-6 w-[720px] max-h-[55vh] overflow-y-auto mega-menu-scroll">
                        <MegaMenuPanel data={MEGA_MENU_MAP[item.label]} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop Right: Pricing + Actions */}
          <div className="hidden xl:flex items-center gap-3 shrink-0 ml-4">
            <button className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-white/60 hover:text-white transition-colors rounded-lg whitespace-nowrap">
              Pricing
              <NavBadge type="OFF" text="30% OFF" />
            </button>
            <div className="w-px h-4 bg-white/[0.08]" />
            <button className="text-[13px] font-medium text-white/50 hover:text-white transition-colors px-3 py-2">
              Login
            </button>
            <button className="bg-[#D7FF00] text-black text-[13px] font-semibold px-5 py-2 rounded-lg hover:bg-[#c5ee00] transition-colors whitespace-nowrap">
              Sign Up
            </button>
          </div>

          {/* Mobile/Tablet Actions */}
          <div className="flex items-center gap-3 xl:hidden ml-auto">
            <button className="bg-[#D7FF00] text-black text-[13px] font-semibold px-4 py-2 rounded-lg">Sign Up</button>
            <button className="text-white p-2 hover:bg-white/5 rounded-lg" onClick={() => setMobileOpen(true)} aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}
            className="fixed inset-0 top-16 z-30 bg-black/50 backdrop-blur-sm"
            onMouseEnter={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="bg-[#0A0A0A] border-white/[0.06] text-white w-[320px] sm:w-[360px] p-0">
          <SheetHeader className="p-5 border-b border-white/[0.06]">
            <SheetTitle className="flex items-center gap-2.5 text-white">
              <Image src="/images/logo-icon.png" alt="AI Creative Studio" width={26} height={26} className="object-contain" />
              <span className="text-sm font-[family-name:var(--font-space-grotesk)]">AI Creative Studio</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto mega-menu-scroll p-5 space-y-0.5">
            {allNavItems.map((item) =>
              item.hasMegaMenu && MEGA_MENU_MAP[item.label] ? (
                <MobileAccordion
                  key={item.label} label={item.label} data={MEGA_MENU_MAP[item.label]}
                  isOpen={mobileExpanded === item.label} onToggle={() => toggleMobile(item.label)}
                  badge={item.badge} badgeText={item.badgeText}
                />
              ) : (
                <div key={item.label} className="flex items-center justify-between py-3.5">
                  <span className="text-sm font-medium text-white/80">{item.label}</span>
                  {item.badge && <NavBadge type={item.badge} text={item.badgeText} />}
                </div>
              )
            )}
          </div>
          <div className="border-t border-white/[0.06] p-5 space-y-3">
            <button className="w-full text-sm text-white/70 py-3 text-left hover:text-white">Login</button>
            <button className="w-full bg-[#D7FF00] text-black text-sm font-semibold py-3 rounded-lg">Sign Up</button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
