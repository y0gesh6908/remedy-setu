import React from 'react';
import { Compass, MessageSquareText, BookOpen, History, Languages, ShieldCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, language, setLanguage, backendStatus }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('form')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white font-serif font-black text-2xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              🕉️
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-slate-900">
                  Remedy Setu
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/70">
                  AI Astrologer
                </span>
              </div>
              <p className="text-[11px] text-slate-500 tracking-wide font-medium">
                {language === 'hi' ? '10,000+ ज्योतिषियों का विश्वसनीय मंच' : 'Faith-Tech Remedy Infrastructure'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200/60">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'form'
                  ? 'bg-white text-slate-900 font-semibold shadow-sm border border-stone-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Compass className={`w-4 h-4 ${activeTab === 'form' ? 'text-amber-600' : 'text-slate-500'}`} />
              <span>{language === 'hi' ? 'उपाय फॉर्म' : 'Remedy Finder'}</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-white text-slate-900 font-semibold shadow-sm border border-stone-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <MessageSquareText className={`w-4 h-4 ${activeTab === 'chat' ? 'text-amber-600' : 'text-slate-500'}`} />
              <span>{language === 'hi' ? 'AI ज्योतिषी चैट' : 'AI Assistant Chat'}</span>
            </button>

            <button
              onClick={() => setActiveTab('catalogue')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'catalogue'
                  ? 'bg-white text-slate-900 font-semibold shadow-sm border border-stone-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'catalogue' ? 'text-amber-600' : 'text-slate-500'}`} />
              <span>{language === 'hi' ? 'कैटलॉग (20)' : 'Product Catalogue'}</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-white text-slate-900 font-semibold shadow-sm border border-stone-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <History className={`w-4 h-4 ${activeTab === 'history' ? 'text-amber-600' : 'text-slate-500'}`} />
              <span>{language === 'hi' ? 'परामर्श इतिहास' : 'History'}</span>
            </button>
          </nav>

          {/* Controls: Language Toggle & Guardrail */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-slate-700 text-xs sm:text-sm font-medium transition-colors shadow-sm"
              title="Toggle Hindi / English"
            >
              <Languages className="w-4 h-4 text-amber-600" />
              <span className="font-semibold text-slate-800">{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Guardrail badge pill */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Catalogue Guardrail: Active</span>
            </div>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 space-x-2 border-t border-stone-200/70">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'form' ? 'bg-amber-500 text-white shadow-sm' : 'bg-stone-100 text-slate-600'
            }`}
          >
            {language === 'hi' ? 'उपाय फॉर्म' : 'Remedy Finder'}
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'chat' ? 'bg-amber-500 text-white shadow-sm' : 'bg-stone-100 text-slate-600'
            }`}
          >
            {language === 'hi' ? 'AI चैट' : 'AI Chat'}
          </button>
          <button
            onClick={() => setActiveTab('catalogue')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'catalogue' ? 'bg-amber-500 text-white shadow-sm' : 'bg-stone-100 text-slate-600'
            }`}
          >
            {language === 'hi' ? 'कैटलॉग' : 'Catalogue'}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'history' ? 'bg-amber-500 text-white shadow-sm' : 'bg-stone-100 text-slate-600'
            }`}
          >
            {language === 'hi' ? 'इतिहास' : 'History'}
          </button>
        </div>

      </div>
    </header>
  );
}
