import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Printer, Share2, MessageSquare, ChevronRight, ExternalLink } from 'lucide-react';

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
        return { label: language === 'hi' ? 'रत्न (Ratna)' : 'Certified Gemstone', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'rudraksha':
        return { label: language === 'hi' ? 'रुद्राक्ष (Rudraksha)' : 'Sacred Rudraksha', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'puja':
        return { label: language === 'hi' ? 'वैदिक पूजा (Puja)' : 'Sacred Temple Puja', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      default:
        return { label: cat, color: 'bg-stone-100 text-slate-700 border-stone-200' };
    }
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative">
      
      {/* Top Banner: Authentic Astrological Prescription */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">📜</span>
            <h3 className="font-serif font-bold text-2xl text-slate-900">
              {language === 'hi' ? 'वैदिक उपाय परामर्श पत्र' : 'Personalized Vedic Remedy Prescription'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? `जातक: ${seeker?.name || 'साधक'} | जन्म तिथि: ${seeker?.dob} | विषय: ${seeker?.concernCategory}`
              : `Prepared for: ${seeker?.name || 'Seeker'} | DOB: ${seeker?.dob} | Focus: ${seeker?.concernCategory}`}
          </p>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'प्रिंट करें' : 'Print'}</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? (language === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (language === 'hi' ? 'शेयर करें' : 'Share')}</span>
          </button>
        </div>
      </div>

      {/* Astrological Analysis Overview Box */}
      <div className="my-6 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{language === 'hi' ? 'ग्रह स्थिति एवं दोष विश्लेषण' : 'Astrological Alignment & Dosha Assessment'}</span>
        </h4>
        <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
          {astrologicalAnalysis?.summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-amber-200/60 text-xs">
          <div>
            <span className="text-slate-500">{language === 'hi' ? 'प्रमुख ग्रह प्रभाव: ' : 'Primary Planetary Force: '}</span>
            <span className="text-slate-900 font-bold">{astrologicalAnalysis?.keyPlanetaryInfluence || 'Planetary Transit'}</span>
          </div>
          <div>
            <span className="text-slate-500">{language === 'hi' ? 'पहचाना गया दोष / असंतुलन: ' : 'Identified Imbalance / Dosha: '}</span>
            <span className="text-rose-700 font-bold">{astrologicalAnalysis?.doshaDetected || 'Planetary Affliction'}</span>
          </div>
        </div>
      </div>

      {/* Recommended Remedy Products */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-xl text-slate-900">
            {language === 'hi' ? 'प्रमाणित रेमेडी सेतु उपाय (कैटलॉग से)' : 'Prescribed Remedies (From Remedy Setu Catalogue)'}
          </h4>
          <span className="text-xs text-emerald-800 flex items-center space-x-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{recommendations?.length} {language === 'hi' ? 'उत्पाद अनुशंसित' : 'Verified Products'}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {recommendations?.map((item, idx) => {
            const badge = getCategoryBadge(item.category);
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200 hover:border-amber-400 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-md flex flex-col md:flex-row gap-5"
              >
                {/* Product Thumbnail */}
                <div className="w-full md:w-44 h-40 md:h-auto rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 relative group">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>

                {/* Product Info & Why It Works */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-lg text-slate-900 group-hover:text-amber-700">
                          {item.name}
                        </h5>
                        <p className="text-xs text-slate-500 mt-0.5">
                          SKU: <span className="font-mono text-slate-700 font-semibold">{item.sku}</span> {item.rulingPlanet && `• ${item.rulingPlanet}`}
                        </p>
                      </div>

                      {/* Price Tag */}
                      <div className="text-left sm:text-right flex-shrink-0 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-xl">
                        <span className="text-[11px] text-amber-800 font-medium block">{language === 'hi' ? 'मूल्य' : 'B2B/Direct Price'}</span>
                        <span className="text-lg font-black text-amber-900">₹{item.price.toLocaleString('en-IN')}</span>
                        <span className="text-[11px] text-slate-500 ml-1">/ {item.unit}</span>
                      </div>
                    </div>

                    {/* AI Explanation in simple language */}
                    <div className="mt-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                        {language === 'hi' ? 'यह उपाय क्यों आवश्यक है:' : 'Why this Remedy Works:'}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>

                    {/* How to wear / perform */}
                    {item.howToWearOrPerform && (
                      <p className="text-xs text-slate-600 mt-2 flex items-center space-x-1.5">
                        <span className="text-amber-800 font-bold">{language === 'hi' ? 'विधि:' : 'Method:'}</span>
                        <span>{item.howToWearOrPerform}</span>
                      </p>
                    )}
                  </div>

                  {/* Order / Inquire CTA Button */}
                  <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProduct && onSelectProduct(item)}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center space-x-1"
                    >
                      <span>{language === 'hi' ? 'उत्पाद विवरण एवं प्रमाणन देखें' : 'View Specifications & Lab Certificate'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/919999999999?text=${encodeURIComponent(`Namaste Remedy Setu Team, I want to order/inquire for [SKU: ${item.sku}] - ${item.name} (Price: Rs ${item.price} ${item.unit}) from my AI Consultation.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-sm"
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
        <div className="mt-8 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-center">
          <p className="font-serif italic text-amber-900 text-sm sm:text-base">
            "{spiritualAdvice}"
          </p>
          <span className="text-[11px] text-slate-500 block mt-1 font-medium">
            — Remedy Setu Vedic Guidance Council
          </span>
        </div>
      )}

      {/* Bottom Footer Callout for Video Walkthrough */}
      <div className="mt-6 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Engine: <strong className="text-slate-800">{aiModelUsed || 'Gemini 1.5 Flash'}</strong></span>
          <span className="text-stone-300">|</span>
          <span className="text-emerald-700 font-semibold">100% Catalogue Grounded</span>
        </div>

        <button
          onClick={onOpenChat}
          className="text-amber-700 hover:text-amber-900 font-semibold flex items-center space-x-1"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{language === 'hi' ? 'इस रिपोर्ट के बारे में AI से और पूछें' : 'Ask AI follow-up questions about this reading'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
