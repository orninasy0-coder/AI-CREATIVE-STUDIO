'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  badge?: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$14',
    priceSuffix: '/month',
    features: [
      '20 AI generations/day',
      '5 AI models',
      'Basic editing tools',
      '720p export',
      'Email support',
    ],
    buttonText: 'Start Free Trial',
  },
  {
    name: 'Pro',
    price: '$29',
    priceSuffix: '/month',
    features: [
      'Unlimited generations',
      '50+ AI models',
      'Advanced editing tools',
      '4K export',
      'Priority support',
      'Canvas workflows',
      'Marketing Studio',
      'Cinema Studio',
    ],
    buttonText: 'Start Free Trial',
    highlighted: true,
    badge: 'Best Value',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Everything in Pro',
      'Custom AI models',
      'Dedicated support',
      'API access',
      'SLA guarantee',
      'Team management',
      'SSO integration',
      'Custom integrations',
    ],
    buttonText: 'Contact Sales',
  },
];

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  return (
    <motion.div
      className={`relative rounded-2xl p-8 transition-all duration-300 hover:border-[#D7FF00]/30 ${
        plan.highlighted
          ? 'bg-[#111111] border-2 border-[#D7FF00]/50 scale-[1.02] shadow-[0_0_60px_rgba(215,255,0,0.1)]'
          : 'bg-[#111111] border border-white/5'
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {/* Best Value Badge */}
      {plan.badge && (
        <div className="absolute top-4 right-4 bg-[#D7FF00] text-black text-xs font-bold px-3 py-1 rounded-full">
          {plan.badge}
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-white font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
          {plan.price}
        </span>
        {plan.priceSuffix && (
          <span className="text-[#5C5C5C] font-[family-name:var(--font-inter)]">
            {plan.priceSuffix}
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="mt-8 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className={`w-4 h-4 shrink-0 ${plan.highlighted ? 'text-[#D7FF00]' : 'text-[#D7FF00]'}`} />
            <span className="text-[#ABABAB] text-sm font-[family-name:var(--font-inter)]">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <motion.button
        className={`w-full mt-8 py-3 rounded-lg font-semibold text-sm transition-colors duration-300 font-[family-name:var(--font-inter)] ${
          plan.highlighted
            ? 'bg-[#D7FF00] text-black hover:bg-[#c5ee00]'
            : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {plan.buttonText}
      </motion.button>
    </motion.div>
  );
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="w-full bg-[#000000] py-20 md:py-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Title */}
        <motion.h2
          className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Transparent. Flexible.
        </motion.h2>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
