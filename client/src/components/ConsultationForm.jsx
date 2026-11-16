import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Sparkles, AlertCircle, ArrowRight, ShieldCheck, Heart, Briefcase, DollarSign, Activity } from 'lucide-react';

const SAMPLE_CONCERNS = {
  en: [
    { label: "Career promotion delayed & job insecurity", cat: "career", desc: "I have been working hard for 4 years but getting bypassed for promotions. Experiencing sudden career obstacles." },
    { label: "Delayed marriage & relationship friction", cat: "marriage", desc: "Looking for marriage proposals for 2 years with repeated delays and compatibility rejections. Want Mangal dosh remedy." },
    { label: "Persistent health fatigue & unexplained anxiety", cat: "health", desc: "Suffering from constant weakness, restless sleep, and unexplained fears for the past 6 months." },
    { label: "Severe business debt & blocked cash flow", cat: "finance", desc: "Our family retail business has huge pending receivables and loans mounting up. Need Lakshmi & Kuber blessings." }
  ],
  hi: [
    { label: "करियर में बार-बार बाधाएं व प्रमोशन में देरी", cat: "career", desc: "4 साल से लगातार मेहनत के बाद भी नौकरी में रुकावटें आ रही हैं और पदोन्नति नहीं मिल रही है।" },
    { label: "विवाह में अत्यधिक विलंब व मांगलिक प्रभाव", cat: "marriage", desc: "विवाह के रिश्ते बार-बार अंतिम समय पर टूट जाते हैं। कुंडली में मंगल दोष की शांति के उपाय चाहिए।" },
    { label: "निरंतर अस्वस्थता, मानसिक तनाव व बेचैनी", cat: "health", desc: "पिछले 6 महीने से लगातार अकारण कमजोरी, सिरदर्द और अज्ञात भय बना रहता है।" },
    { label: "व्यापार में भारी कर्ज व रुके हुए पैसे की समस्या", cat: "finance", desc: "दुकान/व्यवसाय में धन का प्रवाह रुक गया है और कर्ज बढ़ता जा रहा है। धन लाभ हेतु उपाय बताएं।" }
  ]
};

export default function ConsultationForm({ onSubmit, loading, language }) {
  const [formData, setFormData] = useState({
    name: '',
    dob: '1996-08-15',
    tob: '14:30',
    pob: 'Varanasi, UP',
    concernCategory: 'career',
    concernDescription: ''
  });

  const concernsList = [
    { id: 'career', label: language === 'hi' ? 'करियर व नौकरी' : 'Career & Business', icon: Briefcase, color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/40' },
    { id: 'marriage', label: language === 'hi' ? 'विवाह व संबंध' : 'Marriage & Love', icon: Heart, color: 'from-rose-500/20 to-pink-500/20 border-rose-500/40' },
    { id: 'health', label: language === 'hi' ? 'स्वास्थ्य व दीर्घायु' : 'Health & Vitality', icon: Activity, color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40' },
    { id: 'finance', label: language === 'hi' ? 'धन, कर्ज व समृद्धि' : 'Finance & Debt', icon: DollarSign, color: 'from-amber-500/20 to-yellow-500/20 border-amber-500/40' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, language });
  };

  const applySample = (sample) => {
    setFormData(prev => ({
      ...prev,
      concernCategory: sample.cat,
      concernDescription: sample.desc
    }));
  };

  return (
    <div className="bg-[#121A2B] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'वैदिक कुंडली एवं उपाय विश्लेषण' : 'Vedic Remedy Prescription Engine'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          {language === 'hi' ? 'अपनी जन्म कुंडली का विवरण दर्ज करें' : 'Enter Birth Details & Life Concern'}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
          {language === 'hi'
            ? 'हमारा एआई मॉडल आपकी जन्मतिथि और समस्या के अनुसार केवल रेमेडी सेतु के प्रमाणित कैटलॉग (रत्न, रुद्राक्ष, पूजा) से सटीक उपाय सुझाएगा।'
            : 'Gemini AI evaluates planetary doshas and prescribes remedies exclusively from the official Remedy Setu 20-item catalogue.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Row 1: Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              {language === 'hi' ? 'पूरा नाम' : 'Full Name'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={language === 'hi' ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              {language === 'hi' ? 'जन्म तिथि' : 'Date of Birth (DOB)'} *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              {language === 'hi' ? 'जन्म समय' : 'Time of Birth (TOB)'}
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="time"
                value={formData.tob}
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Place of Birth */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              {language === 'hi' ? 'जन्म स्थान (शहर/राज्य)' : 'Place of Birth (POB)'} *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={formData.pob}
                onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                placeholder={language === 'hi' ? 'उदा. दिल्ली / जयपुर' : 'e.g. Varanasi, UP'}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

        </div>

        {/* Concern Category Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
            {language === 'hi' ? 'प्रमुख जीवन चिंता / विषय चुनें' : 'Select Primary Life Concern'} *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {concernsList.map((item) => {
              const Icon = item.icon;
              const isSelected = formData.concernCategory === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, concernCategory: item.id })}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-500/20 to-amber-600/10 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/30'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="text-sm font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Question / Concern Description */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              {language === 'hi' ? 'अपनी समस्या विस्तार से लिखें' : 'Describe your Situation / Query'} *
            </label>
            <span className="text-xs text-slate-500">
              {language === 'hi' ? 'नीचे दिए उदाहरणों पर क्लिक कर सकते हैं' : 'Click sample prompts below for quick test'}
            </span>
          </div>
          <textarea
            required
            rows={3}
            value={formData.concernDescription}
            onChange={(e) => setFormData({ ...formData, concernDescription: e.target.value })}
            placeholder={
              language === 'hi'
                ? 'उदा. पिछले 3 सालों से नौकरी में कोई तरक्की नहीं मिल रही है। क्या कोई विशिष्ट रत्न या रुद्राक्ष मुझे पहनना चाहिए?'
                : 'e.g. Experiencing extreme financial delay and job transfer disputes. What remedies will help mitigate Shani/Rahu doshas?'
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />

          {/* Quick Clickable Samples */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs text-slate-500 self-center">
              {language === 'hi' ? 'त्वरित उदाहरण:' : 'Quick Prompts:'}
            </span>
            {(language === 'hi' ? SAMPLE_CONCERNS.hi : SAMPLE_CONCERNS.en).map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applySample(sample)}
                className="text-xs bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700/60 rounded-full px-3 py-1 transition-colors text-left"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalogue Guardrail Transparency Callout */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/20 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-emerald-400">
              {language === 'hi' ? '100% प्रामाणिक कैटलॉग गारंटी: ' : 'Anti-Hallucination Guardrail: '}
            </span>
            {language === 'hi'
              ? 'एआई मॉडल को सख्त निर्देश दिए गए हैं कि वह केवल रेमेडी सेतु के 20 प्रमाणित उत्पादों (नीलम, पुखराज, 7 मुखी रुद्राक्ष, महामृत्युंजय जाप आदि) में से ही उपाय चुने। कोई भी काल्पनिक वस्तु या मूल्य अनुशंसित नहीं किया जाएगा।'
              : 'The Gemini model is strictly constrained to recommend exclusively from Remedy Setu\'s 20 authentic SKUs (Certified Ceylon Neelam, Pukhraj, Nepali Rudrakshas, Ujjain Pujas) with exact prices.'}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>{language === 'hi' ? 'कुंडली व कैटलॉग का विश्लेषण जारी...' : 'Analyzing Kundali & Grounding in Catalogue...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>{language === 'hi' ? 'सटीक वैदिक उपाय प्राप्त करें' : 'Generate AI Remedy Prescription'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
