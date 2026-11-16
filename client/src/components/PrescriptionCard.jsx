import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Tag, ExternalLink, Printer, Share2, MessageSquare, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

export default function PrescriptionCard({ result, language, onOpenChat, onSelectProduct }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const { seeker, astrologicalAnalysis, recommendations, spiritualAdvice, aiModelUsed } = result;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'gemstone':
        return { label: language === 'hi' ? 'रत्न (Ratna)' : 'Certified Gemstone', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      case 'rudraksha':
        return { label: language === 'hi' ? 'रुद्राक्ष (Rudraksha)' : 'Sacred Rudraksha', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'puja':
        return { label: language === 'hi' ? 'वैदिक पूजा (Puja)' : 'Sacred Temple Puja', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
      default:
        return { label: cat, color: 'bg-slate-500/10 text-slate-300 border-slate-500/30' };
    }
  };

  return (
    <div className="bg-[#101726] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
      
      {/* Top Banner: Authentic Astrological Prescription */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">📜</span>
            <h3 className="font-serif font-bold text-2xl text-amber-300">
              {language === 'hi' ? 'वैदिक उपाय परामर्श पत्र' : 'Personalized Vedic Remedy Prescription'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'hi'
              ? `जातक: ${seeker?.name || 'साधक'} | जन्म तिथि: ${seeker?.dob} | विषय: ${seeker?.concernCategory}`
              : `Prepared for: ${seeker?.name || 'Seeker'} | DOB: ${seeker?.dob} | Focus: ${seeker?.concernCategory}`}
          </p>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'प्रिंट करें' : 'Print'}</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? (language === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (language === 'hi' ? 'शेयर करें' : 'Share')}</span>
          </button>
        </div>
      </div>

      {/* Astrological Analysis Overview Box */}
      <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900 border border-amber-500/20">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'ग्रह स्थिति एवं दोष विश्लेषण' : 'Astrological Alignment & Dosha Assessment'}</span>
        </h4>
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
          {astrologicalAnalysis?.summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400">{language === 'hi' ? 'प्रमुख ग्रह प्रभाव: ' : 'Primary Planetary Force: '}</span>
            <span className="text-amber-300 font-semibold">{astrologicalAnalysis?.keyPlanetaryInfluence || 'Planetary Transit'}</span>
          </div>
          <div>
            <span className="text-slate-400">{language === 'hi' ? 'पहचाना गया दोष / असंतुलन: ' : 'Identified Imbalance / Dosha: '}</span>
            <span className="text-rose-300 font-semibold">{astrologicalAnalysis?.doshaDetected || 'Planetary Affliction'}</span>
          </div>
        </div>
      </div>

      {/* Recommended Remedy Products */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-xl text-white">
            {language === 'hi' ? 'प्रमाणित रेमेडी सेतु उपाय (कैटलॉग से)' : 'Prescribed Remedies (From Remedy Setu Catalogue)'}
          </h4>
          <span className="text-xs text-emerald-400 flex items-center space-x-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{recommendations?.length} {language === 'hi' ? 'उत्पाद अनुशंसित' : 'Verified Products'}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {recommendations?.map((item, idx) => {
            const badge = getCategoryBadge(item.category);
            return (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col md:flex-row gap-5"
              >
                {/* Product Thumbnail */}
                <div className="w-full md:w-44 h-40 md:h-auto rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 relative group">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>

                {/* Product Info & Why It Works */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-lg text-white group-hover:text-amber-300">
                          {item.name}
                        </h5>
                        <p className="text-xs text-slate-400 mt-0.5">
                          SKU: <span className="font-mono text-amber-400/90">{item.sku}</span> {item.rulingPlanet && `• ${item.rulingPlanet}`}
                        </p>
                      </div>

                      {/* Price Tag */}
                      <div className="text-left sm:text-right flex-shrink-0 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                        <span className="text-xs text-slate-400 block">{language === 'hi' ? 'मूल्य' : 'B2B/Direct Price'}</span>
                        <span className="text-lg font-bold text-amber-300">₹{item.price.toLocaleString('en-IN')}</span>
                        <span className="text-[11px] text-slate-400 ml-1">/ {item.unit}</span>
                      </div>
                    </div>

                    {/* AI Explanation in simple language */}
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider block mb-1">
                        {language === 'hi' ? 'यह उपाय क्यों आवश्यक है:' : 'Why this Remedy Works:'}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>

                    {/* How to wear / perform */}
                    {item.howToWearOrPerform && (
                      <p className="text-xs text-slate-400 mt-2 flex items-center space-x-1.5">
                        <span className="text-amber-400 font-semibold">{language === 'hi' ? 'विधि:' : 'Method:'}</span>
                        <span>{item.howToWearOrPerform}</span>
                      </p>
                    )}
                  </div>

                  {/* Order / Inquire CTA Button */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProduct && onSelectProduct(item)}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                    >
                      <span>{language === 'hi' ? 'उत्पाद विवरण एवं प्रमाणन देखें' : 'View Specifications & Lab Certificate'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/919999999999?text=${encodeURIComponent(`Namaste Remedy Setu Team, I want to order/inquire for [SKU: ${item.sku}] - ${item.name} (Price: Rs ${item.price} ${item.unit}) from my AI Consultation.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-md"
                    >
                      <span>{language === 'hi' ? 'ऑर्डर / पूछताछ करें' : 'Order / Inquire Now'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spiritual Advice Quote */}
      {spiritualAdvice && (
        <div className="mt-8 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center">
          <p className="font-serif italic text-amber-200/90 text-sm sm:text-base">
            "{spiritualAdvice}"
          </p>
          <span className="text-[11px] text-slate-400 block mt-1">
            — Remedy Setu Vedic Guidance Council
          </span>
        </div>
      )}

      {/* Bottom Footer Callout for Video Walkthrough */}
      <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Engine: <strong className="text-slate-300">{aiModelUsed || 'Gemini 1.5 Flash'}</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-medium">100% Catalogue Grounded</span>
        </div>

        <button
          onClick={onOpenChat}
          className="text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{language === 'hi' ? 'इस रिपोर्ट के बारे में AI से और पूछें' : 'Ask AI follow-up questions about this reading'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
