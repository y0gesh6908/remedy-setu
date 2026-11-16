import React from 'react';
import { Sparkles, Languages, BookOpen, MessageSquareText, History, Compass, ShieldCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, language, setLanguage, backendStatus }) {
  return (
    <header className="sticky top-0 z-40 bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('form')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-serif font-black text-2xl shadow-lg shadow-amber-500/20">
              🕉️
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-xl sm:text-2xl tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  Remedy Setu
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  AI Astrologer
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wider">
                {language === 'hi' ? '10,000+ ज्योतिषियों का विश्वसनीय मंच' : 'Faith-Tech Remedy Infrastructure'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'form'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{language === 'hi' ? 'उपाय फॉर्म' : 'Remedy Finder'}</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquareText className="w-4 h-4" />
              <span>{language === 'hi' ? 'AI ज्योतिषी चैट' : 'AI Assistant Chat'}</span>
            </button>

            <button
              onClick={() => setActiveTab('catalogue')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'catalogue'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'hi' ? 'कैटलॉग (20)' : 'Product Catalogue'}</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>{language === 'hi' ? 'परामर्श इतिहास' : 'History'}</span>
            </button>
          </nav>

          {/* Controls: Language Toggle & Status */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs sm:text-sm font-medium transition-colors"
              title="Toggle Hindi / English"
            >
              <Languages className="w-4 h-4" />
              <span className="font-semibold">{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Guardrail badge pill */}
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Catalogue Guardrail: Active</span>
            </div>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
              activeTab === 'form' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            {language === 'hi' ? 'उपाय फॉर्म' : 'Remedy Finder'}
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
              activeTab === 'chat' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            {language === 'hi' ? 'AI चैट' : 'AI Chat'}
          </button>
          <button
            onClick={() => setActiveTab('catalogue')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
              activeTab === 'catalogue' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            {language === 'hi' ? 'कैटलॉग' : 'Catalogue'}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
              activeTab === 'history' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            {language === 'hi' ? 'इतिहास' : 'History'}
          </button>
        </div>

      </div>
    </header>
  );
}
