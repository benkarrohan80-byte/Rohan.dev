import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Smartphone, 
  Headphones, 
  ArrowRight, 
  MessageCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Star,
  Award,
  Globe
} from 'lucide-react';

interface PricingOfferProps {
  onSelectPlan?: (planName: string, price: string) => void;
}

export default function PricingOffer({ onSelectPlan }: PricingOfferProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChoosePlan = (planName: string, price: string) => {
    // Dispatch custom event to auto-fill form in Contact component
    window.dispatchEvent(
      new CustomEvent('select-pricing-plan', {
        detail: { planName, price }
      })
    );

    if (onSelectPlan) {
      onSelectPlan(planName, price);
    }

    // Smooth scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = (plan: string) => {
    const text = encodeURIComponent(`Hello Rohan! I want to get a website created (${plan}). Please share details.`);
    window.open(`https://wa.me/918317246684?text=${text}`, '_blank');
  };

  const plans = [
    {
      id: 'starter',
      name: 'Complete Website Package',
      price: '₹2,599',
      originalPrice: '₹6,999',
      badge: '🔥 Limited Time Offer',
      popular: false,
      showLimitedTimeTag: true,
      tagline: 'Complete Web Solution for Shops, Local Businesses, Clinics & Institutes',
      features: [
        '1 - 5 High Quality Professional Pages',
        '100% Mobile, Tablet & Laptop Responsive',
        'Direct WhatsApp Instant Chat & Order Button',
        'Online Lead Contact Form with Admin Dashboard',
        'Reliable 10 - 12 Days Delivery',
        'Google Search Engine (SEO) Setup',
        'Custom Domain & High Speed Hosting Setup Assistance',
        '1 Month Free Technical Support & Maintenance'
      ],
      buttonText: 'Book Plan @ ₹2,599',
      buttonBg: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl shadow-indigo-500/25'
    },
    {
      id: 'fast-track',
      name: 'Complete Website Package',
      price: '₹4,999',
      originalPrice: '₹7,599',
      badge: '',
      popular: false,
      showLimitedTimeTag: false,
      tagline: 'Complete Web Solution for Shops, Local Businesses, Clinics & Institutes',
      features: [
        '1 - 5 High Quality Professional Pages',
        '100% Mobile, Tablet & Laptop Responsive',
        'Direct WhatsApp Instant Chat & Order Button',
        'Online Lead Contact Form with Admin Dashboard',
        'Reliable 5 - 6 Days Delivery',
        'Google Search Engine (SEO) Setup',
        'Custom Domain & High Speed Hosting Setup Assistance',
        '3 Months Free Technical Support & Maintenance'
      ],
      buttonText: 'Book Plan @ ₹4,999',
      buttonBg: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl shadow-indigo-500/25'
    }
  ];

  const faqs = [
    {
      q: 'What is the difference between the ₹2,599 and ₹4,999 packages?',
      a: 'The ₹2,599 package includes full website creation with 10-12 days delivery and 1 month free support. The ₹4,999 package provides priority fast delivery in 5-6 days and 3 months of free technical support & maintenance.'
    },
    {
      q: 'How long does it take to build the website?',
      a: 'With the ₹4,999 plan, your website is delivered in 5-6 days! With the ₹2,599 plan, delivery takes 10-12 days.'
    },
    {
      q: 'What about Domain and Hosting?',
      a: 'If you already have a domain or hosting, we will configure it directly. If not, we will assist you in securing the best and most affordable domain and hosting.'
    },
    {
      q: 'What is the payment process?',
      a: 'You can start the project with a 50% advance payment, and pay the remaining 50% after reviewing and verifying the completed website via UPI / GPay / PhonePe.'
    }
  ];

  return (
    <section id="pricing" className="py-20 relative bg-slate-50/70 dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/60">
      {/* Anchor point for #offers */}
      <div id="offers" className="absolute -top-24 left-0" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold mb-4 shadow-sm"
          >
            <Sparkles size={16} className="text-amber-500 animate-pulse" />
            <span>Special Offer • Website Starts @ ₹2,599 Only!</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            Bring Your Business Online{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              At Affordable Pricing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300"
          >
            Get a fast, 100% mobile-responsive, and professional website for your shop, clinic, or brand. Receive direct customer inquiries straight to your phone!
          </motion.p>
        </div>

        {/* Highlight Stats / Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-xs">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Zap size={22} />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">10-12 Days Delivery</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Quality Turnaround</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-xs">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Smartphone size={22} />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">100% Responsive</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Mobile & Laptop Ready</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Globe size={22} />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">Google SEO Ready</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Search Engine Friendly</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-xs">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Headphones size={22} />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">Free Support</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">1 Month Maintenance</div>
            </div>
          </div>
        </div>

        {/* Pricing Cards (Featured Offers) */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-white dark:bg-slate-900 border-2 border-indigo-500 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-500/5 lg:-translate-y-2'
                  : 'bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Popular / Special Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-max max-w-[95%]">
                  <span className={`px-3.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm uppercase whitespace-nowrap block text-center ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-indigo-100 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Plan Title & Tagline */}
                <div className="mt-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="my-6 pb-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2 min-h-[52px]">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-base text-slate-400 line-through font-semibold">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  {plan.showLimitedTimeTag ? (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 whitespace-nowrap shrink-0">
                      Limited Time Offer
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 pointer-events-none select-none whitespace-nowrap shrink-0" aria-hidden="true">
                      Limited Time Offer
                    </span>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 min-h-[28px]">
                      <CheckCircle2 size={18} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleChoosePlan(plan.name, plan.price)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${plan.buttonBg}`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => openWhatsApp(plan.name)}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>Ask on WhatsApp</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick WhatsApp Direct Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 mb-20 shadow-2xl relative overflow-hidden border border-slate-800"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800/60 inline-block mb-3">
                💬 Instant Discussion
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Have Questions? Chat Directly on WhatsApp!
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
                Message now to get design samples and customized solutions tailored to your requirements. Free consultation!
              </p>
            </div>

            <button
              onClick={() => openWhatsApp('Custom Requirements')}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 flex items-center gap-2 text-sm whitespace-nowrap cursor-pointer active:scale-95"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </motion.div>

        {/* Frequently Asked Questions (FAQ) Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2">
              <HelpCircle size={14} />
              <span>Got Questions?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp size={18} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
