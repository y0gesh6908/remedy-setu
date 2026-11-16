import React, { useEffect, useState } from 'react';
import { History, RefreshCw, Calendar, Tag, ShieldCheck, User } from 'lucide-react';

export default function ConsultationHistory({ language }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/remedies/history');
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
  }, []);

  return (
    <div className="bg-[#121A2B] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {language === 'hi' ? 'हालिया परामर्श इतिहास (MongoDB)' : 'Recent AI Consultations (MongoDB)'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'hi'
              ? 'प्रत्येक जातक का परामर्श और अनुशंसित उपाय डेटाबेस में सुरक्षित संग्रहित होते हैं।'
              : 'Consultation records, dosha assessments, and catalogue-grounded remedies saved in database.'}
          </p>
        </div>

        <button
          onClick={fetchHistory}
          disabled={loading}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{language === 'hi' ? 'ताज़ा करें' : 'Refresh'}</span>
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            {language === 'hi'
              ? 'अभी तक कोई पिछला परामर्श नहीं है। उपाय फॉर्म से नया परामर्श जनरेट करें।'
              : 'No consultation records found yet. Submit the Remedy Finder form to record one.'}
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
