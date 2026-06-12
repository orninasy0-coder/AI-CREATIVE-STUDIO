'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Twitter, Github, MessageCircle, Youtube } from 'lucide-react';

interface FooterColumn {
  title: string;
  links: string[];
}

const columns: FooterColumn[] = [
  {
    title: 'Platform',
    links: ['Explore', 'Models', 'Tools', 'Canvas', 'Apps', 'API'],
  },
  {
    title: 'Image',
    links: [
      'Create Image',
      'Cinematic Cameras',
      'Moodboard',
      'Face Swap',
      'Image Upscale',
      'Inpaint',
    ],
  },
  {
    title: 'Video',
    links: [
      'Create Video',
      'Cinema Studio',
      'Lipsync Studio',
      'Video Upscale',
      'Edit Video',
      'Mixed Media',
    ],
  },
  {
    title: 'Audio',
    links: ['Voiceover', 'Change Voice', 'Translation'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Documentation', 'Tutorials', 'Community', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
];

const socialLinks = [
  { icon: Twitter, label: 'Twitter' },
  { icon: Github, label: 'GitHub' },
  { icon: MessageCircle, label: 'Discord' },
  { icon: Youtube, label: 'YouTube' },
];

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <footer ref={sectionRef} className="w-full bg-[#0A0A0A] py-16">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Top: Logo + Brand Description */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Image
            src="/images/logo.png"
            alt="AI Creative Studio"
            width={160}
            height={40}
            style={{ width: 'auto', height: '40px' }}
          />
          <p className="text-[#5C5C5C] text-sm mt-4 max-w-md font-[family-name:var(--font-inter)] leading-relaxed">
            The all-in-one AI creative platform. Create stunning images, videos, and audio with the
            world&apos;s leading AI models.
          </p>
        </motion.div>

        {/* Columns Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#5C5C5C] text-sm hover:text-white transition-colors duration-200 font-[family-name:var(--font-inter)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[#5C5C5C] text-sm font-[family-name:var(--font-inter)]">
            © {new Date().getFullYear()} AI Creative Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-[#5C5C5C] hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
