import React, { useState } from 'react';
import { 
  Home, 
  Sliders, 
  Sparkles, 
  BookOpen, 
  Heart, 
  Info, 
  ScrollText, 
  MessageSquareQuote, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Eye, 
  Type, 
  Globe
} from 'lucide-react';
import { AppBrandBadge } from './BrandingLogo';
import { ScreenName, LanguageMode } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  favoritesCount: number;
  language: LanguageMode;
  onToggleLanguage: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isLargeText: boolean;
  onToggleLargeText: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onNavigate,
  favoritesCount,
  language,
  onToggleLanguage,
  isDarkMode,
  onToggleDarkMode,
  isLargeText,
  onToggleLargeText,
  isHighContrast,
  onToggleHighContrast,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const navItems: { id: ScreenName; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: t.nav.home, icon: <Home className="w-4 h-4" /> },
    { id: 'criteria', label: t.nav.criteria, icon: <Sliders className="w-4 h-4" /> },
    { id: 'suggestions', label: t.nav.suggestions, icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'detail', label: t.nav.detail, icon: <BookOpen className="w-4 h-4" /> },
    { id: 'favorites', label: t.nav.favorites, icon: <Heart className="w-4 h-4 text-rose-500" />, badge: favoritesCount },
    { id: 'about', label: t.nav.about, icon: <Info className="w-4 h-4" /> },
    { id: 'references', label: t.nav.references, icon: <ScrollText className="w-4 h-4" /> },
    { id: 'feedback', label: t.nav.feedback, icon: <MessageSquareQuote className="w-4 h-4" /> },
  ];

  const handleNavClick = (screen: ScreenName) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-blue-100 dark:border-blue-900/60 shadow-xs transition-colors">
      {/* Top accessibility bar */}
      <div className="bg-blue-900 text-blue-100 text-xs py-1.5 px-4 hidden md:flex items-center justify-between border-b border-blue-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sky-300">Triết lý:</span>
          <span>"Tên Việt – Hồn Việt" • Công cụ phi lợi nhuận • 100% Miễn phí & Không quảng cáo</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Large text toggle */}
          <button
            onClick={onToggleLargeText}
            aria-label={isLargeText ? 'Bật cỡ chữ bình thường' : 'Bật chế độ chữ lớn cho người cao tuổi'}
            className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-colors ${
              isLargeText ? 'bg-amber-400 text-slate-950 font-bold' : 'hover:bg-blue-800 text-blue-200'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>{isLargeText ? 'Chữ chuẩn (A)' : 'Chữ lớn (A+)'}</span>
          </button>

          {/* High contrast toggle */}
          <button
            onClick={onToggleHighContrast}
            aria-label={isHighContrast ? 'Tắt tương phản cao' : 'Bật tương phản cao cho người khiếm thị'}
            className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-colors ${
              isHighContrast ? 'bg-amber-400 text-slate-950 font-bold' : 'hover:bg-blue-800 text-blue-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isHighContrast ? 'Tương phản chuẩn' : 'Tương phản cao'}</span>
          </button>

          {/* Dark mode */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Chuyển chế độ sáng/tối"
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-blue-800 text-blue-200 cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{isDarkMode ? 'Sáng' : 'Tối'}</span>
          </button>

          {/* Language toggle */}
          <button
            onClick={onToggleLanguage}
            aria-label="Chuyển ngôn ngữ"
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-blue-800 text-sky-200 font-semibold cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 md:h-18 flex items-center justify-between gap-2">
        <AppBrandBadge onClick={() => handleNavClick('home')} />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Menu chính">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile quick actions & hamburger */}
        <div className="flex lg:hidden items-center gap-1.5">
          <button
            onClick={onToggleLanguage}
            aria-label="Chuyển ngôn ngữ"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            {language === 'vi' ? 'VI' : 'EN'}
          </button>

          <button
            onClick={onToggleLargeText}
            aria-label="Cỡ chữ lớn"
            className={`p-2 rounded-xl text-xs font-bold border min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ${
              isLargeText 
                ? 'bg-amber-400 text-slate-900 border-amber-500 font-black' 
                : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            A+
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu các màn hình'}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-rose-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={onToggleDarkMode}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 min-h-[44px]"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              <span>{isDarkMode ? 'Giao diện Sáng' : 'Giao diện Tối'}</span>
            </button>

            <button
              onClick={onToggleHighContrast}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold min-h-[44px] ${
                isHighContrast
                  ? 'bg-amber-400 text-slate-950 border-amber-500 font-bold'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Tương phản cao</span>
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white text-blue-700' : 'bg-rose-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
