'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const plans = [
  {
    name: 'Starter', price: '$14', suffix: '/month', highlighted: false,
    features: ['20 AI generations/day', '5 AI models', 'Basic editing tools', '720p export', 'Email support'],
    btn: 'Start Free Trial',
  },
  {
    name: 'Pro', price: '$29', suffix: '/month', highlighted: true, badge: 'Best Value',
    features: ['Unlimited generations', '50+ AI models', 'Advanced editing', '4K export', 'Priority support', 'Canvas workflows', 'Marketing Studio', 'Cinema Studio'],
    btn: 'Start Free Trial',
  },
  {
    name: 'Enterprise', price: 'Custom', suffix: '', highlighted: false,
    features: ['Everything in Pro', 'Custom AI models', 'Dedicated support', 'API access', 'SLA guarantee', 'Team management', 'SSO integration', 'Custom integrations'],
    btn: 'Contact Sales',
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="w-full bg-[#000] py-20 md:py-28">
      <div className="px-5 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div
          className="mb-10 md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Transparent. Flexible<span className="text-[#D7FF00]">.</span>
          </h2>
          <p className="text-white/30 text-sm mt-3 font-[family-name:var(--font-inter)]">Choose the plan that fits your creative needs</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}>
              <Card className={`bg-[#111] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#D7FF00]/20 ${
                plan.highlighted ? 'border-2 border-[#D7FF00]/40 shadow-[0_0_40px_rgba(215,255,0,0.06)]' : 'border border-white/[0.04]'
              }`}>
                <CardContent className="p-7">
                  {plan.badge && <div className="inline-block bg-[#D7FF00] text-black text-[10px] font-bold px-3 py-1 rounded-full mb-4">{plan.badge}</div>}
                  <h3 className="text-white font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">{plan.price}</span>
                    {plan.suffix && <span className="text-white/25 text-sm">{plan.suffix}</span>}
                  </div>
                  <ul className="mt-7 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <Check className="w-4 h-4 shrink-0 text-[#D7FF00]" />
                        <span className="text-white/50 text-sm font-[family-name:var(--font-inter)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full mt-7 py-3 rounded-xl font-semibold text-sm transition-colors font-[family-name:var(--font-inter)] ${
                    plan.highlighted ? 'bg-[#D7FF00] text-black hover:bg-[#c5ee00] shadow-[0_0_20px_rgba(215,255,0,0.15)]' : 'bg-white/[0.04] border border-white/[0.06] text-white/80 hover:bg-white/[0.08]'
                  }`}>
                    {plan.btn}
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
