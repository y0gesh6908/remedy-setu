import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

const SUGGESTED_PROMPTS = {
  en: [
    "What gemstone mitigates Saturn Sade Sati?",
    "Explain the benefits of 7 Mukhi Mahalaxmi Rudraksha",
    "Where is Mangal Dosh Shanti Puja performed?",
    "Do you have Emerald (Panna) for business growth?"
  ],
  hi: [
    "शनि की साढ़े साती के लिए कौन सा नीलम या पूजा सही है?",
    "व्यापार में धन वृद्धि के लिए 7 मुखी रुद्राक्ष का महत्व बताएं",
    "उज्जैन में मंगल दोष पूजा कैसे की जाती है?",
    "बुध ग्रह को मजबूत करने के लिए पन्ना रत्न का मूल्य क्या है?"
  ]
};

export default function AstrologyChat({ language, sessionId }) {
  const getInitialMessage = () => ([
    {
      sender: 'assistant',
      text: language === 'hi'
        ? 'नमस्ते! मैं रेमेडी सेतु का एआई सहायक हूँ। मैं आपको प्रमाणित रत्न, नेपाली रुद्राक्ष और तीर्थ पूजा अनुष्ठानों के बारे में प्रामाणिक सलाह दे सकता हूँ। आप क्या जानना चाहते हैं?'
        : 'Namaste! I am the Remedy Setu AI Remedy Assistant. I can guide you on authentic certified gemstones, Nepali rudrakshas, and temple puja rituals strictly from our catalogue. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('remedy_setu_chat_messages');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return getInitialMessage();
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // When sessionId resets, clear the chat messages back to initial
  useEffect(() => {
    try {
      const saved = localStorage.getItem('remedy_setu_chat_messages');
      if (!saved) {
        setMessages(getInitialMessage());
      }
    } catch (e) {}
  }, [sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    try {
      localStorage.setItem('remedy_setu_chat_messages', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query || query.trim() === '' || loading) return;

    const userMessage = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/remedies/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          chatHistory: messages.slice(-6),
          language,
          sessionId
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'assistant',
            text: data.data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error(data.error || 'Failed to get AI response');
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: language === 'hi'
            ? 'क्षमा करें, सर्वर से संपर्क नहीं हो पाया। कृपया सुनिश्चित करें कि बैकएंड चालू है।'
            : 'Unable to reach backend assistant service. Please verify server is running.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem('remedy_setu_chat_messages');
    setMessages(getInitialMessage());
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-3xl h-[680px] flex flex-col shadow-sm overflow-hidden relative">
      
      {/* Chat Header */}
      <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50/80 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold shadow-sm shadow-amber-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif font-bold text-slate-900 text-base">
                {language === 'hi' ? 'रेमेडी सेतु AI ज्योतिषी' : 'Remedy Setu AI Assistant'}
              </h3>
              <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Online</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {language === 'hi' ? 'केवल कैटलॉग उत्पादों से उत्तर देता है' : 'Strictly bounded by 20-item Remedy Setu catalogue'}
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-stone-200/60 transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FDFBF9]">
        {messages.map((msg, index) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={index}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-amber-700 border border-stone-200 shadow-sm'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-amber-500 text-white font-medium shadow-sm'
                    : 'bg-white text-slate-800 border border-stone-200/90 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    isUser ? 'text-amber-100' : 'text-slate-400'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white text-amber-600 border border-stone-200 shadow-sm flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl px-4 py-3 text-xs text-slate-500 shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
              <span>{language === 'hi' ? 'कैटलॉग जांच व उत्तर तैयार हो रहा है...' : 'Checking catalogue & formulating answer...'}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested quick chips */}
      <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap">
          {language === 'hi' ? 'सुझाव:' : 'Try:'}
        </span>
        {(language === 'hi' ? SUGGESTED_PROMPTS.hi : SUGGESTED_PROMPTS.en).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-xs bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 rounded-full px-3 py-1 whitespace-nowrap transition-colors border border-stone-200/90 shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="p-4 border-t border-stone-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'नीलम, रुद्राक्ष या पूजा के बारे में प्रश्न पूछें...'
                : 'Ask about gemstones, rudraksha, or puja rituals from catalogue...'
            }
            className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-12 h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-sm shadow-amber-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

    </div>
  );
}
