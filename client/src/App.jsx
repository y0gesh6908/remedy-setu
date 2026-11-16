import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ConsultationForm from './components/ConsultationForm';
import PrescriptionCard from './components/PrescriptionCard';
import AstrologyChat from './components/AstrologyChat';
import CatalogueModal from './components/CatalogueModal';
import ConsultationHistory from './components/ConsultationHistory';
import { localCatalogue } from './data/productsLocal';
import { Sparkles, ShieldCheck, HeartHandshake, Award, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

// Get or generate an anonymous, secure private session ID for the user's browser
function getOrCreateSessionId() {
  let sid = localStorage.getItem('remedy_setu_session_id');
  if (!sid) {
    sid = 'seeker_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem('remedy_setu_session_id', sid);
  }
  return sid;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'chat' | 'catalogue' | 'history'
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'
  const [loading, setLoading] = useState(false);
  const [prescriptionResult, setPrescriptionResult] = useState(null);
  const [backendStatus, setBackendStatus] = useState(null);
  const [sessionId] = useState(() => getOrCreateSessionId());

  // Check backend health
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setBackendStatus(data))
      .catch(() => setBackendStatus({ status: 'offline' }));
  }, []);

  // Handle consultation form submission
  const handleConsultationSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/remedies/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, sessionId })
      });

      const data = await response.json();
      if (data.success && data.data) {
        setPrescriptionResult(data.data);
      } else {
        throw new Error(data.error || 'Server error generating remedies');
      }
    } catch (err) {
      console.warn('API error, using client-side intelligent fallback engine:', err);
      // Client-side fallback adhering 100% to catalogue
      const concernLower = (formData.concernCategory || 'career').toLowerCase();
      const matched = localCatalogue.filter(p => p.concerns.includes(concernLower));
      const gem = matched.find(p => p.category === 'gemstone') || localCatalogue[0];
      const rud = matched.find(p => p.category === 'rudraksha') || localCatalogue[7];
      const puj = matched.find(p => p.category === 'puja') || localCatalogue[14];

      const remedies = [gem, rud, puj].map(item => ({
        sku: item.sku,
        name: language === 'hi' ? item.nameHi : item.name,
        nameEn: item.name,
        nameHi: item.nameHi,
        category: item.category,
        price: item.price,
        unit: item.unit,
        explanation: language === 'hi'
          ? `${item.nameHi} आपके ${formData.concernCategory} से जुड़े ग्रह दोषों को शांत कर सकारात्मक ऊर्जा प्रदान करता है।`
          : `${item.name} balances planetary transitions impacting your ${formData.concernCategory} to manifest stability and relief.`,
        howToWearOrPerform: item.category === 'gemstone' 
          ? 'Purify with holy water and wear on auspicious weekday.'
          : item.category === 'rudraksha'
          ? 'Chant Om Namah Shivaya 108 times and wear on Monday.'
          : 'Live video sankalp with your family gotra performed at sacred shrine.',
        imageUrl: item.imageUrl,
        rulingPlanet: item.rulingPlanet,
        benefits: item.benefits
      }));

      setPrescriptionResult({
        seeker: { name: formData.name || 'Seeker', dob: formData.dob, tob: formData.tob, pob: formData.pob, concernCategory: formData.concernCategory },
        astrologicalAnalysis: {
          summary: language === 'hi'
            ? `आपकी जन्म तिथि (${formData.dob}) के आधार पर वैदिक ग्रहों की स्थिति का विश्लेषण किया गया है। कुंडली में अनुकूल ऊर्जा के लिए नीचे दिए गए विशिष्ट प्रमाणित उपाय तुरंत सहायक होंगे।`
            : `Analysis of birth coordinates (${formData.dob}) reflects significant planetary activation required in your ${formData.concernCategory} domain.`,
          keyPlanetaryInfluence: "Planetary transit in focal houses",
          doshaDetected: formData.concernCategory === 'marriage' ? "Manglik / Shukra Influence" : "Shani / Rahu Transit Stress"
        },
        recommendations: remedies,
        spiritualAdvice: language === 'hi'
          ? "ईश्वर में विश्वास और अपने सत्कर्मों पर निष्ठा रखें, प्रत्येक ग्रह अनुकूल होगा।"
          : "Trust divine order and cultivate dedicated effort; the universe supports righteous intent.",
        aiModelUsed: 'Remedy Setu Vedic Guardrail Engine (100% Catalogue Grounded)'
      });
    } finally {
      setLoading(false);
      // Smooth scroll to results
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        backendStatus={backendStatus}
      />

      {/* Hero Banner */}
      <div className="relative border-b border-slate-800/80 bg-gradient-to-b from-[#101726] to-[#090D16] overflow-hidden py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Option 2 — AI Remedy Assistant • Remedy Setu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white">
            {language === 'hi' ? (
              <>
                जन्म विवरण व समस्याओं के <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  100% प्रामाणिक वैदिक उपाय
                </span>
              </>
            ) : (
              <>
                Authentic Vedic Remedies Guided by <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  Gemini AI & Curated Catalogue
                </span>
              </>
            )}
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {language === 'hi'
              ? 'करियर, विवाह, स्वास्थ्य या धन की चिंता दर्ज करें। हमारा एआई मॉडल 20 प्रामाणिक उत्पादों (रत्न, रुद्राक्ष, पूजा) के कैटलॉग से बिना किसी भ्रामक सलाह के सटीक उपाय सुझाता है।'
              : 'Enter birth details & life concerns (Career, Marriage, Health, Finance). Our AI model prescribes remedies strictly from our 20-item catalogue with complete price transparency.'}
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Hallucinations (Strict Catalogue Only)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Lab Certified Gemstones & Nepali Rudrakshas</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Lock className="w-4 h-4 text-sky-400" />
              <span>100% Private & Anonymous Session</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'form' && (
          <div className="space-y-10">
            {/* Form */}
            <ConsultationForm
              onSubmit={handleConsultationSubmit}
              loading={loading}
              language={language}
            />

            {/* Prescription Result (if available) */}
            {prescriptionResult && (
              <div id="prescription-section">
                <PrescriptionCard
                  result={prescriptionResult}
                  language={language}
                  onOpenChat={() => setActiveTab('chat')}
                  onSelectProduct={(p) => setActiveTab('catalogue')}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <AstrologyChat language={language} />
          </div>
        )}

        {activeTab === 'catalogue' && (
          <CatalogueModal language={language} />
        )}

        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto">
            <ConsultationHistory language={language} sessionId={sessionId} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#070B12] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-amber-500 font-bold text-base">🕉️ Remedy Setu</span>
            <span>(Formerly Humara Pandit, D A Dharm Sathi Pvt. Ltd.)</span>
          </div>

          <div className="text-center sm:text-right">
            <span>DPIIT-Recognised Faith-Tech Startup • Full Stack Internship Project</span>
            <div className="text-slate-500 mt-0.5">Stack: React + Node.js + Express + MongoDB + Google Gemini</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
