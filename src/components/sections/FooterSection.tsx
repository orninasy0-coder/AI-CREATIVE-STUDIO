'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Twitter, Github, MessageCircle, Youtube } from 'lucide-react';

const columns = [
  { title: 'Platform', links: ['Explore', 'Models', 'Tools', 'Canvas', 'Apps', 'API'] },
  { title: 'Image', links: ['Create Image', 'Cinematic Cameras', 'Moodboard', 'Face Swap', 'Image Upscale', 'Inpaint'] },
  { title: 'Video', links: ['Create Video', 'Cinema Studio', 'Lipsync Studio', 'Video Upscale', 'Edit Video', 'Mixed Media'] },
  { title: 'Audio', links: ['Voiceover', 'Change Voice', 'Translation'] },
  { title: 'Resources', links: ['Blog', 'Documentation', 'Tutorials', 'Community', 'Changelog'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
];

const socials = [
  { icon: Twitter, label: 'Twitter' },
  { icon: Github, label: 'GitHub' },
  { icon: MessageCircle, label: 'Discord' },
  { icon: Youtube, label: 'YouTube' },
];

export default function FooterSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <footer ref={ref} className="w-full bg-[#050505] border-t border-white/[0.04] py-14 mt-auto">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <Image src="/images/logo.png" alt="AI Creative Studio" width={140} height={36} className="h-8 w-auto" />
          <p className="text-white/20 text-xs mt-4 max-w-sm font-[family-name:var(--font-inter)] leading-relaxed">
            The all-in-one AI creative platform. Create stunning images, videos, and audio with the world&apos;s leading AI models.
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8" initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 }}>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white/50 font-semibold text-[10px] uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-white/20 text-xs hover:text-white/50 transition-colors font-[family-name:var(--font-inter)]">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
        <motion.div className="mt-14 pt-7 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.15 }}>
          <p className="text-white/15 text-xs font-[family-name:var(--font-inter)]">&copy; {new Date().getFullYear()} AI Creative Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socials.map((s) => { const Icon = s.icon; return <a key={s.label} href="#" aria-label={s.label} className="text-white/20 hover:text-white/50 transition-colors"><Icon className="w-4 h-4" /></a>; })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
