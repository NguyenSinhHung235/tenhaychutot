import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  MapPin, 
  Volume2, 
  BookOpen, 
  Check, 
  Compass
} from 'lucide-react';
import { DongSonDrumSvg, LotusSvg, LacBirdSvg } from '../components/BrandingLogo';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { LegalNoticeBanner } from '../components/LegalNoticeBanner';
import { VietnameseName, LanguageMode, ScreenName } from '../types';
import { translations } from '../i18n/translations';

interface HomeScreenProps {
  onNavigate: (screen: ScreenName) => void;
  featuredNames: VietnameseName[];
  onSelectName: (name: VietnameseName) => void;
  favorites: VietnameseName[];
  onToggleFavorite: (name: VietnameseName) => void;
  language: LanguageMode;
  onQuickSearch: (query: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  featuredNames,
  onSelectName,
  favorites,
  onToggleFavorite,
  language,
  onQuickSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[language];
  const isEn = language === 'en';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onQuickSearch(searchQuery.trim());
      onNavigate('suggestions');
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-sky-700 text-white p-6 sm:p-10 md:p-14 shadow-xl border border-blue-700/50">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-2 right-4 text-white/5 pointer-events-none select-none">
          <DongSonDrumSvg size={380} />
        </div>
        <div className="absolute -bottom-10 -left-10 text-white/5 pointer-events-none select-none">
          <LacBirdSvg size={260} />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-sky-200">
            <LotusSvg size={18} className="text-pink-300" />
            <span>{t.home.freeBadge}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-xs">
            {t.home.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl font-light">
            {t.home.heroSub}
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('criteria')}
              className="min-h-[48px] px-6 py-3 rounded-2xl bg-white text-blue-900 hover:bg-sky-50 font-bold text-base shadow-lg shadow-blue-950/20 flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>{t.home.btnStart}</span>
              <ArrowRight className="w-5 h-5 text-blue-700" />
            </button>

            <button
              onClick={() => onNavigate('references')}
              className="min-h-[48px] px-5 py-3 rounded-2xl bg-blue-700/60 hover:bg-blue-700 border border-blue-400/40 text-white font-medium text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Scale className="w-4 h-4 text-sky-300" />
              <span>{isEn ? 'Linguistic & Legal Basis' : 'Xem Nguồn tham khảo & Pháp lý'}</span>
            </button>
          </div>

          {/* Quick search bar */}
          <form onSubmit={handleSearchSubmit} className="pt-4 max-w-xl">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.home.quickSearchPlaceholder}
                className="w-full pl-11 pr-28 py-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-sm md:text-base focus:ring-4 focus:ring-sky-400/50 focus:outline-none shadow-md"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-2 min-h-[38px] px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-semibold transition-all cursor-pointer"
              >
                {isEn ? 'Search' : 'Tra cứu'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Pure Names Today */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-8 bg-blue-600 rounded-full" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t.home.featuredTitle}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('suggestions')}
            className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isEn ? 'View all names' : 'Xem tất cả kho tên'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredNames.slice(0, 6).map((item) => {
            const isFav = favorites.some((f) => f.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectName(item);
                  onNavigate('detail');
                }}
                className="group relative rounded-2xl p-5 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="font-serif text-2xl font-bold text-blue-900 dark:text-blue-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.ten}
                      </span>
                      {item.nghia_han_viet && (
                        <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.nghia_han_viet.split('–')[0]}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(item);
                        }}
                        aria-label={isFav ? 'Bỏ lưu yêu thích' : 'Lưu tên này vào yêu thích'}
                        className={`p-2 rounded-xl transition-all min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer ${
                          isFav
                            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                            : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {item.nghia_thuan_viet}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-medium">
                    <MapPin className="w-3 h-3" />
                    {item.vung_mien}
                  </span>

                  <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-0.5">
                    {isEn ? 'Detail' : 'Chi tiết'} &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 Regions Cultural Nuances */}
      <section className="rounded-3xl p-6 sm:p-8 bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isEn ? 'Three Cultural Regions' : 'Bản đồ Văn hóa Đặt tên 3 Miền'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {t.home.regionsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* North */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-serif font-bold text-base">
              Bắc
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              {isEn ? 'North Vietnam' : 'Miền Bắc (Kinh kỳ & Đạo Nho)'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.home.northDesc} Ưa chuộng các tên mang phong thái nho nhã, trọng thanh bằng trắc như An, Triết, Bách, Thùy Chi, Diệp...
            </p>
          </div>

          {/* Central */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-serif font-bold text-base">
              Trung
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              {isEn ? 'Central Vietnam' : 'Miền Trung (Sông núi & Trọng nghĩa)'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.home.centralDesc} Tên thường gắn với biểu tượng núi non, sông biển vững chãi: Sơn, Lam Giang, Nhân, Sen, Nghĩa, Trọng...
            </p>
          </div>

          {/* South */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-serif font-bold text-base">
              Nam
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              {isEn ? 'South Vietnam' : 'Miền Nam (Phóng khoáng & Chân chất)'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.home.southDesc} Gợi sự tươi sáng, may mắn và cởi mở của vùng đất phương Nam trù phú: Mai, Khôi, Thanh Nhã, Phúc, Đăng...
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/60 border border-blue-200 dark:border-blue-900 flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 text-white shadow-md">
          <DongSonDrumSvg size={50} />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-blue-950 dark:text-white">
            {t.home.philosophyTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {t.home.philosophyBody}
          </p>
        </div>
      </section>

      {/* Mandatory Statutory Notice */}
      <LegalNoticeBanner lang={language} />
    </div>
  );
};
