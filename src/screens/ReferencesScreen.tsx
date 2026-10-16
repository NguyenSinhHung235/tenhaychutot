import React, { useState } from 'react';
import { 
  ScrollText, 
  Book, 
  Scale, 
  Globe, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  AlertCircle,
  Search
} from 'lucide-react';
import { OFFICIAL_REFERENCES, LEGAL_DISCLAIMER_VI, LEGAL_DISCLAIMER_EN } from '../data/references';
import { LanguageMode } from '../types';
import { translations } from '../i18n/translations';
import { LegalNoticeBanner } from '../components/LegalNoticeBanner';

interface ReferencesScreenProps {
  language: LanguageMode;
}

export const ReferencesScreen: React.FC<ReferencesScreenProps> = ({ language }) => {
  const t = translations[language];
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'all' | 'phap_luat' | 'tu_dien' | 'sach'>('all');
  const [filterQuery, setFilterQuery] = useState('');

  const filteredReferences = OFFICIAL_REFERENCES.filter((item) => {
    if (activeTab !== 'all' && item.category !== activeTab) {
      return false;
    }
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.authorOrIssuer.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-xs font-semibold">
          <ScrollText className="w-3.5 h-3.5" />
          <span>{isEn ? 'Linguistic & Legal Bibliography' : 'Thư mục Nguồn & Văn bản pháp quy'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          {t.references.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {t.references.subtitle}
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="flex flex-wrap items-center gap-1 w-full sm:w-auto">
          {[
            { id: 'all', label: isEn ? 'All Sources' : 'Tất cả (9 nguồn)' },
            { id: 'phap_luat', label: isEn ? 'Legal Acts' : 'Văn bản Pháp luật' },
            { id: 'tu_dien', label: isEn ? 'Dictionaries' : 'Từ điển Hán – Việt / Nôm' },
            { id: 'sach', label: isEn ? 'Monographs' : 'Sách chuyên khảo' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={isEn ? 'Filter sources...' : 'Tìm nguồn tham khảo...'}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
        </div>
      </div>

      {/* References List */}
      <div className="space-y-4">
        {filteredReferences.map((ref) => {
          const isLegal = ref.category === 'phap_luat';
          return (
            <article
              key={ref.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isLegal
                  ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isLegal
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {ref.category === 'phap_luat'
                        ? 'VĂN BẢN PHÁP LUẬT'
                        : ref.category === 'tu_dien'
                        ? 'TỪ ĐIỂN CHUẨN MỰC'
                        : ref.category === 'sach'
                        ? 'SÁCH CHUYÊN KHẢO'
                        : 'CƠ SỞ DỮ LIỆU'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Năm ban hành / XB: {ref.year}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {ref.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-blue-800 dark:text-blue-300">
                    {ref.authorOrIssuer} • {ref.publisherOrOrg}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 shrink-0 bg-slate-100 dark:bg-slate-700/60 px-3 py-1 rounded-xl">
                  <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{t.references.accessDateLabel} <strong>{ref.accessDate}</strong></span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                {ref.description}
              </p>

              {/* Legal articles breakdown if present */}
              {ref.legalArticles && ref.legalArticles.length > 0 && (
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-blue-800/60 space-y-2 mt-3">
                  <span className="block font-serif font-bold text-xs text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-blue-600" />
                    <span>{t.references.articlesTitle}</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {ref.legalArticles.map((art, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                        <span>{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {ref.url && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 mt-3 flex items-center justify-end">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>{t.references.viewSourceLink}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Mandatory Statutory Notice */}
      <LegalNoticeBanner lang={language} />
    </div>
  );
};
