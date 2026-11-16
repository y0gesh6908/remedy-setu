import React, { useState } from 'react';
import { Search, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { localCatalogue } from '../data/productsLocal';

export default function CatalogueModal({ language }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedConcern, setSelectedConcern] = useState('all');

  const filteredProducts = localCatalogue.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesConcern = selectedConcern === 'all' || item.concerns.includes(selectedConcern);
    const s = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(s) ||
      item.nameHi.toLowerCase().includes(s) ||
      item.sku.toLowerCase().includes(s) ||
      item.rulingPlanet.toLowerCase().includes(s) ||
      item.description.toLowerCase().includes(s);

    return matchesCategory && matchesConcern && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Catalogue Header */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'hi' ? '100% प्रामाणिक वैदिक भंडार' : 'Remedy Setu Master Product Catalogue'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              {language === 'hi' ? 'रेमेडी सेतु उत्पाद कैटलॉग (20 उत्पाद)' : 'Official Remedy Catalogue (20 Items)'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {language === 'hi'
                ? 'हमारे एआई मॉडल को केवल इन्हीं 20 उत्पादों (रत्न, रुद्राक्ष व पूजा) की अनुशंसा करने की सख्त अनुमति है।'
                : 'The AI assistant is hard-bounded to suggest exclusively from these 20 products with fixed tiered pricing.'}
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'hi' ? 'उत्पाद खोजें...' : 'Search product or planet...'}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-stone-200 text-xs">
          <span className="text-slate-600 font-semibold mr-1">{language === 'hi' ? 'श्रेणी:' : 'Category:'}</span>
          {[
            { id: 'all', label: language === 'hi' ? 'सभी (20)' : 'All (20)' },
            { id: 'gemstone', label: language === 'hi' ? 'रत्न (7)' : 'Gemstones (7)' },
            { id: 'rudraksha', label: language === 'hi' ? 'रुद्राक्ष (7)' : 'Rudraksha (7)' },
            { id: 'puja', label: language === 'hi' ? 'वैदिक पूजा (6)' : 'Puja Services (6)' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-white font-bold shadow-sm'
                  : 'bg-stone-100 text-slate-700 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <span className="text-slate-600 font-semibold ml-3 mr-1">{language === 'hi' ? 'विषय:' : 'Concern:'}</span>
          {[
            { id: 'all', label: language === 'hi' ? 'सभी' : 'All' },
            { id: 'career', label: language === 'hi' ? 'करियर' : 'Career' },
            { id: 'marriage', label: language === 'hi' ? 'विवाह' : 'Marriage' },
            { id: 'health', label: language === 'hi' ? 'स्वास्थ्य' : 'Health' },
            { id: 'finance', label: language === 'hi' ? 'धन' : 'Finance' }
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedConcern(c.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedConcern === c.id
                  ? 'bg-amber-500 text-white font-bold shadow-sm'
                  : 'bg-stone-100 text-slate-700 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.sku}
            className="bg-white border border-stone-200/90 hover:border-amber-400 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden bg-stone-100 relative">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/95 text-amber-900 border border-stone-200 shadow-sm">
                  {p.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/95 text-slate-700 border border-stone-200 shadow-sm font-semibold">
                  {p.sku}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 hover:text-amber-700 mb-1">
                  {language === 'hi' ? p.nameHi : p.name}
                </h3>

                <p className="text-xs text-amber-800 font-semibold mb-3">
                  🪐 {p.rulingPlanet}
                </p>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {language === 'hi' ? p.descriptionHi : p.description}
                </p>

                {/* Key Benefits */}
                <div className="space-y-1 mb-4">
                  {p.benefits.slice(0, 2).map((b, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">{language === 'hi' ? 'मूल्य' : 'Bulk / Retail Price'}</span>
                  <span className="text-lg font-black text-amber-900">₹{p.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-500 ml-1">/ {p.unit}</span>
                </div>

                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hello Remedy Setu, I am interested in [SKU: ${p.sku}] - ${p.name} (Rs ${p.price} / ${p.unit}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center space-x-1 transition-colors shadow-sm"
                >
                  <span>{language === 'hi' ? 'पूछताछ' : 'Inquire'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
