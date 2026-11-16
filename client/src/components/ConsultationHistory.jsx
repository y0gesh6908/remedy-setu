import React, { useEffect, useState } from 'react';
import { History, RefreshCw, Calendar, Tag, ShieldCheck, User, Lock, Trash2 } from 'lucide-react';

export default function ConsultationHistory({ language, sessionId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/remedies/history?sessionId=${encodeURIComponent(sessionId)}`);
      const data = await res.json();
      if (data.success && data.data) {
        setHistory(data.data);
      }
    } catch (err) {
      console.warn('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [sessionId]);

  const clearLocalHistory = () => {
    // Generate a fresh session ID
    const newSid = 'seeker_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem('remedy_setu_session_id', newSid);
    window.location.reload();
  };

  return (
    <div className="bg-[#121A2B] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {language === 'hi' ? 'मेरा व्यक्तिगत परामर्श इतिहास' : 'My Personal Consultations'}
            </h2>
            <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Lock className="w-3 h-3" />
              <span>{language === 'hi' ? 'निजी एवं सुरक्षित' : 'Private to you'}</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'hi'
              ? 'गोपनीयता नीति: केवल आप ही इस ब्राउज़र पर अपने परामर्श देख सकते हैं। अन्य आगंतुकों को आपका डेटा कभी नहीं दिखता।'
              : 'Privacy Policy: Only you can view your consultations on this device. Other visitors will never see your records.'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={fetchHistory}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{language === 'hi' ? 'ताज़ा करें' : 'Refresh'}</span>
          </button>
          <button
            onClick={clearLocalHistory}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-medium"
            title="Start fresh new private session"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'सत्र साफ करें' : 'New Session'}</span>
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
            <Lock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="font-semibold text-slate-300">
              {language === 'hi' ? 'इस डिवाइस पर अभी कोई परामर्श दर्ज नहीं है' : 'No past consultations on this device yet'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'hi'
                ? 'उपाय फॉर्म भरें और अपनी कुंडली के अनुसार उपाय प्राप्त करें।'
                : 'Submit the Remedy Finder form to get personalized remedies and save them here.'}
            </p>
          </div>
        ) : (
          history.map((record, idx) => (
            <div
              key={record._id || idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white text-sm">{record.userName}</span>
                  <span className="text-xs text-slate-400">({record.dob} • {record.pob})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 capitalize">
                    {record.concernCategory}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Astrological analysis brief */}
              {record.astrologicalAnalysis?.summary && (
                <p className="text-xs text-slate-300 italic mb-3">
                  "{record.astrologicalAnalysis.summary}"
                </p>
              )}

              {/* Recommended remedies chips */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                {record.recommendations?.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                  >
                    <span className="font-mono text-amber-400 text-[10px]">{r.sku}</span>
                    <span className="font-medium text-white">{r.name}</span>
                    <span className="text-emerald-400 font-semibold">₹{r.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
