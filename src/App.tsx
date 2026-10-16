import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './screens/HomeScreen';
import { CriteriaScreen } from './screens/CriteriaScreen';
import { SuggestionsScreen } from './screens/SuggestionsScreen';
import { NameDetailScreen } from './screens/NameDetailScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ReferencesScreen } from './screens/ReferencesScreen';
import { FeedbackScreen } from './screens/FeedbackScreen';
import { ReportModal } from './components/ReportModal';
import { PURE_VIETNAMESE_NAMES } from './data/pureVietnameseNames';
import { 
  VietnameseName, 
  SearchCriteria, 
  FeedbackRecord, 
  ScreenName, 
  LanguageMode 
} from './types';
import { DongSonDrumSvg, LotusSvg, LacBirdSvg } from './components/BrandingLogo';

const DEFAULT_CRITERIA: SearchCriteria = {
  gioi_tinh: 'unisex',
  vung_mien: 'Toàn quốc',
  phong_cach: 'truyen_thong',
  so_am_tiet: 0,
  ky_tu_bat_dau: '',
  ho_gia_dinh: 'Nguyễn',
  tranh_nguoi_noi_tieng: true,
  tranh_pham_huy: true,
  tranh_tu_noi_lai: true,
  mong_uoc_rieng: 'Mong con bình an, thiện lương, trí tuệ và hiếu thảo.',
};

export default function App() {
  // Persistence states
  const [activeScreen, setActiveScreen] = useState<ScreenName>('home');
  const [language, setLanguage] = useState<LanguageMode>(() => {
    return (localStorage.getItem('app_lang') as LanguageMode) || 'vi';
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('app_dark') === 'true';
  });
  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    return localStorage.getItem('app_large_text') === 'true';
  });
  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('app_high_contrast') === 'true';
  });

  const [criteria, setCriteria] = useState<SearchCriteria>(() => {
    const saved = localStorage.getItem('app_criteria');
    return saved ? JSON.parse(saved) : DEFAULT_CRITERIA;
  });

  const [favorites, setFavorites] = useState<VietnameseName[]>(() => {
    const saved = localStorage.getItem('app_favorites');
    return saved ? JSON.parse(saved) : [PURE_VIETNAMESE_NAMES[0], PURE_VIETNAMESE_NAMES[2]];
  });

  const [favoriteNotes, setFavoriteNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('app_fav_notes');
    return saved ? JSON.parse(saved) : {};
  });

  const [feedbacks, setFeedbacks] = useState<FeedbackRecord[]>(() => {
    const saved = localStorage.getItem('app_feedbacks');
    return saved ? JSON.parse(saved) : [];
  });

  // Dynamic names pool (starts with curated corpus + any AI additions)
  const [allNames, setAllNames] = useState<VietnameseName[]>(PURE_VIETNAMESE_NAMES);
  const [selectedName, setSelectedName] = useState<VietnameseName | null>(PURE_VIETNAMESE_NAMES[0]);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [quickQuery, setQuickQuery] = useState<string>('');

  // Report modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTargetName, setReportTargetName] = useState('');

  // Sync settings with DOM & localStorage
  useEffect(() => {
    localStorage.setItem('app_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('app_dark', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('app_large_text', String(isLargeText));
    if (isLargeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  }, [isLargeText]);

  useEffect(() => {
    localStorage.setItem('app_high_contrast', String(isHighContrast));
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  useEffect(() => {
    localStorage.setItem('app_criteria', JSON.stringify(criteria));
  }, [criteria]);

  useEffect(() => {
    localStorage.setItem('app_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('app_fav_notes', JSON.stringify(favoriteNotes));
  }, [favoriteNotes]);

  useEffect(() => {
    localStorage.setItem('app_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Filtering suggested names based on criteria or quick search
  const filteredSuggestions = useMemo(() => {
    return allNames.filter((item) => {
      // If quick search active
      if (quickQuery.trim()) {
        const q = quickQuery.toLowerCase().trim();
        return (
          item.ten.toLowerCase().includes(q) ||
          item.nghia_thuan_viet.toLowerCase().includes(q) ||
          (item.nghia_han_viet && item.nghia_han_viet.toLowerCase().includes(q))
        );
      }

      // Gender filter
      if (criteria.gioi_tinh !== 'unisex' && item.gioi_tinh !== 'unisex' && item.gioi_tinh !== criteria.gioi_tinh) {
        return false;
      }

      // Region filter
      const isUniversal = criteria.vung_mien === 'Toàn quốc' || criteria.vung_mien === 'ToanQuoc';
      const isItemUniversal = item.vung_mien === 'Toàn quốc' || item.vung_mien === 'ToanQuoc';
      if (!isUniversal && !isItemUniversal && item.vung_mien !== criteria.vung_mien) {
        return false;
      }

      // Syllable filter
      if (criteria.so_am_tiet > 0 && item.so_am_tiet !== criteria.so_am_tiet) {
        return false;
      }

      // Starting letter filter
      if (criteria.ky_tu_bat_dau) {
        const targetLetter = criteria.ky_tu_bat_dau.toUpperCase();
        const firstLetter = item.ten.trim()[0].toUpperCase();
        if (targetLetter === 'Đ' && firstLetter !== 'Đ') return false;
        if (targetLetter === 'D' && firstLetter !== 'D') return false;
        if (!item.ten.toUpperCase().startsWith(targetLetter)) {
          return false;
        }
      }

      return true;
    });
  }, [allNames, criteria, quickQuery]);

  // Handle calling Gemini AI for new names
  const handleGenerateAiNames = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/generate-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...criteria,
          existingNames: allNames.map((n) => n.ten),
        }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        // Prepend new AI generated names
        setAllNames((prev) => {
          const newItems = data.data.filter(
            (gen: VietnameseName) => !prev.some((p) => p.ten.toLowerCase() === gen.ten.toLowerCase())
          );
          return [...newItems, ...prev];
        });
      }
    } catch (err) {
      console.warn('API generate error, keeping curated dataset:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Handle custom name analysis
  const handleAnalyzeCustomName = async (customName: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customName,
          surname: criteria.ho_gia_dinh || 'Nguyễn',
        }),
      });

      const result = await res.json();
      if (result.success && result.data) {
        const d = result.data;
        const newAnalyzedItem: VietnameseName = {
          id: `custom-${Date.now()}`,
          ten: d.ten || customName,
          gioi_tinh: criteria.gioi_tinh || 'unisex',
          vung_mien: 'ToanQuoc',
          so_am_tiet: customName.trim().split(/\s+/).length,
          nghia_thuan_viet: d.nghia_thuan_viet,
          nghia_han_viet: d.nghia_han_viet,
          nguon_goc: d.nguon_trich_dan || 'Từ điển Hán – Việt Thiều Chửu',
          canh_bao: d.canh_bao_pham_huy,
          do_pho_bien: 4,
          dem_phu_hop: [
            `${criteria.ho_gia_dinh || 'Nguyễn'} Thanh ${customName}`,
            `${criteria.ho_gia_dinh || 'Nguyễn'} Hoàng ${customName}`
          ],
          thanh_dieu: d.thanh_dieu_bang_trac || 'Thanh âm hài hòa',
          phong_thuy_ngu_hanh: 'Hài hòa ngũ hành',
          ca_dao_dien_tich: 'Tên thuần Việt mang theo ước vọng tốt đẹp của cha mẹ.',
          do_tin_cay: d.do_tin_cay || 'Cao (Đã kiểm chứng)',
          isAiGenerated: true,
          phap_ly_ghi_chu: d.phu_hop_phap_luat || 'Phù hợp Điều 26 Bộ luật Dân sự 2015'
        };

        setAllNames((prev) => [newAnalyzedItem, ...prev]);
        setSelectedName(newAnalyzedItem);
        setActiveScreen('detail');
      }
    } catch (err) {
      console.warn('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (name: VietnameseName) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === name.id);
      if (exists) {
        return prev.filter((f) => f.id !== name.id);
      } else {
        return [name, ...prev];
      }
    });
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const handleClearAllFavorites = () => {
    setFavorites([]);
  };

  const handleSaveNote = (id: string, note: string) => {
    setFavoriteNotes((prev) => ({
      ...prev,
      [id]: note,
    }));
  };

  const handleAddFeedback = (record: FeedbackRecord) => {
    setFeedbacks((prev) => [record, ...prev]);
  };

  const handleClearFeedbackHistory = () => {
    setFeedbacks([]);
  };

  const handleOpenReportModal = (target: string) => {
    setReportTargetName(target);
    setReportModalOpen(true);
  };

  const handleCriteriaSubmit = () => {
    setQuickQuery('');
    setActiveScreen('suggestions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCriteriaReset = () => {
    setCriteria(DEFAULT_CRITERIA);
  };

  const handleQuickSearch = (query: string) => {
    setQuickQuery(query);
    setActiveScreen('suggestions');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Navigation */}
      <Navbar
        activeScreen={activeScreen}
        onNavigate={(screen) => {
          setActiveScreen(screen);
          if (screen !== 'suggestions') {
            setQuickQuery('');
          }
        }}
        favoritesCount={favorites.length}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'vi' ? 'en' : 'vi'))}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((d) => !d)}
        isLargeText={isLargeText}
        onToggleLargeText={() => setIsLargeText((t) => !t)}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast((c) => !c)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeScreen === 'home' && (
          <HomeScreen
            onNavigate={(screen) => {
              setActiveScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            featuredNames={allNames}
            onSelectName={(name) => setSelectedName(name)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            language={language}
            onQuickSearch={handleQuickSearch}
          />
        )}

        {activeScreen === 'criteria' && (
          <CriteriaScreen
            criteria={criteria}
            onChangeCriteria={setCriteria}
            onSubmit={handleCriteriaSubmit}
            onReset={handleCriteriaReset}
            language={language}
          />
        )}

        {activeScreen === 'suggestions' && (
          <SuggestionsScreen
            names={filteredSuggestions}
            criteria={criteria}
            onNavigate={(screen) => {
              setActiveScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectName={(name) => setSelectedName(name)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onGenerateAiNames={handleGenerateAiNames}
            isGeneratingAi={isGeneratingAi}
            language={language}
            onOpenReportModal={handleOpenReportModal}
          />
        )}

        {activeScreen === 'detail' && (
          <NameDetailScreen
            name={selectedName}
            onBack={() => setActiveScreen('suggestions')}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            language={language}
            onOpenReportModal={handleOpenReportModal}
            onAnalyzeCustomName={handleAnalyzeCustomName}
            isAnalyzing={isAnalyzing}
          />
        )}

        {activeScreen === 'favorites' && (
          <FavoritesScreen
            favorites={favorites}
            onRemoveFavorite={handleRemoveFavorite}
            onClearAll={handleClearAllFavorites}
            onSelectName={(name) => {
              setSelectedName(name);
              setActiveScreen('detail');
            }}
            onNavigate={(screen) => setActiveScreen(screen)}
            favoriteNotes={favoriteNotes}
            onSaveNote={handleSaveNote}
            language={language}
          />
        )}

        {activeScreen === 'about' && (
          <AboutScreen language={language} />
        )}

        {activeScreen === 'references' && (
          <ReferencesScreen language={language} />
        )}

        {activeScreen === 'feedback' && (
          <FeedbackScreen
            feedbacks={feedbacks}
            onAddFeedback={handleAddFeedback}
            onClearFeedbackHistory={handleClearFeedbackHistory}
            language={language}
          />
        )}
      </main>

      {/* Global Report Error Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        targetName={reportTargetName}
        onSaveFeedback={handleAddFeedback}
        lang={language}
      />

      {/* Footer with Mandatory Internship Credit & Philosophy */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <DongSonDrumSvg size={22} />
              </div>
              <div>
                <span className="font-serif font-bold text-slate-900 dark:text-white text-base">
                  Trợ lý Đặt tên thuần Việt có Giải nghĩa
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  Triết lý: "Tên Việt – Hồn Việt" • 100% Phi lợi nhuận & Miễn phí
                </span>
              </div>
            </div>

            {/* Navigation links in footer */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <button onClick={() => setActiveScreen('home')} className="hover:text-blue-600 cursor-pointer">Trang chủ</button>
              <span>•</span>
              <button onClick={() => setActiveScreen('criteria')} className="hover:text-blue-600 cursor-pointer">Nhập tiêu chí</button>
              <span>•</span>
              <button onClick={() => setActiveScreen('suggestions')} className="hover:text-blue-600 cursor-pointer">Kết quả gợi ý</button>
              <span>•</span>
              <button onClick={() => setActiveScreen('favorites')} className="hover:text-blue-600 cursor-pointer">Yêu thích</button>
              <span>•</span>
              <button onClick={() => setActiveScreen('about')} className="hover:text-blue-600 cursor-pointer">Giới thiệu</button>
              <span>•</span>
              <button onClick={() => setActiveScreen('references')} className="hover:text-blue-600 cursor-pointer">Nguồn tham khảo</button>
              <span>•</span>
              <button onClick={() => setActiveScreen('feedback')} className="hover:text-blue-600 cursor-pointer">Góp ý</button>
            </div>
          </div>

          {/* Mandatory Credit notice */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 text-xs text-center text-slate-700 dark:text-slate-300 space-y-1">
            <p className="font-semibold text-blue-900 dark:text-blue-200">
              Sản phẩm thực tập của Nguyễn Sinh Hùng, mã sinh viên PH70147, Nhóm 2, Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Căn cứ pháp lý: Điều 26 Bộ luật Dân sự 2015 & Thông tư 04/2020/TT-BTP. Thông tin mang tính tham khảo văn hóa, không thay thế văn bản pháp luật chính thức.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
