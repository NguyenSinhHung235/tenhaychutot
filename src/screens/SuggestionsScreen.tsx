import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  MapPin, 
  BookOpen, 
  ShieldAlert, 
  ShieldCheck, 
  Sliders, 
  Volume2, 
  ArrowRight, 
  Filter, 
  RotateCcw,
  Check,
  Star,
  Info
} from 'lucide-react';
import { VietnameseName, SearchCriteria, LanguageMode, ScreenName } from '../types';
import { translations } from '../i18n/translations';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { LegalNoticeBanner } from '../components/LegalNoticeBanner';

interface SuggestionsScreenProps {
  names: VietnameseName[];
  criteria: SearchCriteria;
  onNavigate: (screen: ScreenName) => void;
  onSelectName: (name: VietnameseName) => void;
  favorites: VietnameseName[];
  onToggleFavorite: (name: VietnameseName) => void;
  onGenerateAiNames: () => Promise<void>;
  isGeneratingAi: boolean;
  language: LanguageMode;
  onOpenReportModal: (name: string) => void;
}

export const SuggestionsScreen: React.FC<SuggestionsScreenProps> = ({
  names,
  criteria,
  onNavigate,
  onSelectName,
  favorites,
  onToggleFavorite,
  onGenerateAiNames,
  isGeneratingAi,
  language,
  onOpenReportModal,
}) => {
  const t = translations[language];
  const isEn = language === 'en';

  const [syllableFilter, setSyllableFilter] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(10);

  // Filter names based on local UI toggles
  const filteredNames = names.filter((item) => {
    if (syllableFilter > 0 && item.so_am_tiet !== syllableFilter) {
      return false;
    }
    if (onlyVerified && item.do_tin_cay !== 'Cao (Đã kiểm chứng)') {
      return false;
    }
    return true;
  });

  const displayedList = filteredNames.slice(0, displayCount);

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Quick stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.suggestions.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold">
              {filteredNames.length} {t.suggestions.countSuffix}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isEn
              ? 'Results combine verified linguistic corpus with Gemini AI generation.'
              : 'Kết hợp kho từ điển ngôn ngữ học đối chiếu và mô hình Gemini AI sáng tạo theo tiêu chí.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('criteria')}
            className="min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>{isEn ? 'Edit Criteria' : 'Đổi tiêu chí'}</span>
          </button>

          {/* Gemini AI Generate Button */}
          <button
            type="button"
            disabled={isGeneratingAi}
            onClick={onGenerateAiNames}
            className={`min-h-[44px] px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
              isGeneratingAi
                ? 'bg-blue-400 text-white cursor-not-allowed opacity-80'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-blue-500/25'
            }`}
          >
            <Sparkles className={`w-4 h-4 text-amber-300 ${isGeneratingAi ? 'animate-spin' : ''}`} />
            <span>{isGeneratingAi ? t.suggestions.btnAiGenerating : t.suggestions.btnAiGenerate}</span>
          </button>
        </div>
      </div>

      {/* Filters strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {isEn ? 'Filter by:' : 'Lọc nhanh:'}
          </span>
          <div className="flex items-center gap-1">
            {[
              { val: 0, label: t.suggestions.filterAll },
              { val: 1, label: t.suggestions.filter1 },
              { val: 2, label: t.suggestions.filter2 },
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setSyllableFilter(f.val)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  syllableFilter === f.val
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyVerified}
            onChange={(e) => setOnlyVerified(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 border-slate-300"
          />
          <span>{t.suggestions.verifiedOnly}</span>
        </label>
      </div>

      {/* Names Grid */}
      {displayedList.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Info className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
            {t.suggestions.emptyTitle}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {t.suggestions.emptySub}
          </p>
          <div className="pt-2">
            <button
              onClick={onGenerateAiNames}
              className="min-h-[44px] px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
            >
              {t.suggestions.btnAiGenerate}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayedList.map((item) => {
            const isFav = favorites.some((f) => f.id === item.id);
            return (
              <article
                key={item.id}
                onClick={() => {
                  onSelectName(item);
                  onNavigate('detail');
                }}
                className="group relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Name + Badges + Favorite */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-blue-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.ten}
                        </span>
                        {item.isAiGenerated && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-indigo-500" />
                            <span>Gemini AI</span>
                          </span>
                        )}
                      </div>

                      {item.nghia_han_viet && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {item.nghia_han_viet}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(item);
                        }}
                        aria-label={isFav ? 'Bỏ lưu yêu thích' : 'Lưu tên này vào yêu thích'}
                        className={`p-2 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ${
                          isFav
                            ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400'
                            : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Pure Vietnamese meaning */}
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
                    {item.nghia_thuan_viet}
                  </p>

                  {/* Middle name suggestion */}
                  {item.dem_phu_hop && item.dem_phu_hop.length > 0 && (
                    <div className="mb-3 p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 text-xs text-blue-900 dark:text-blue-200">
                      <span className="font-semibold">{isEn ? 'Pairings: ' : 'Gợi ý ghép họ đệm: '}</span>
                      <span>{item.dem_phu_hop.slice(0, 3).join(' • ')}</span>
                    </div>
                  )}

                  {/* Warnings or Cautions */}
                  {item.canh_bao && (
                    <div className="mb-3 flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-300 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{item.canh_bao}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Card Actions & Meta */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-medium">
                      {item.vung_mien}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-medium">
                      {item.so_am_tiet} {isEn ? 'syllable' : 'âm tiết'}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{item.do_tin_cay || 'Đã kiểm chứng'}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <AudioPlayerButton
                      textToRead={`${item.ten}. ${item.nghia_thuan_viet}`}
                      size="sm"
                      label={isEn ? 'Listen' : 'Nghe'}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onSelectName(item);
                        onNavigate('detail');
                      }}
                      className="min-h-[38px] px-3 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <span>{isEn ? 'Detail' : 'Chi tiết'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {filteredNames.length > displayCount && (
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => setDisplayCount((prev) => prev + 10)}
            className="min-h-[46px] px-8 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 text-sm font-semibold shadow-xs transition-all cursor-pointer"
          >
            {t.suggestions.loadMore} ({filteredNames.length - displayCount} {isEn ? 'more names' : 'tên còn lại'})
          </button>
        </div>
      )}

      {/* Mandatory Statutory Notice */}
      <LegalNoticeBanner lang={language} />
    </div>
  );
};
