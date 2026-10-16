import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  MapPin, 
  UserCheck, 
  ShieldAlert, 
  Sliders, 
  Type, 
  HeartHandshake, 
  Check 
} from 'lucide-react';
import { SearchCriteria, LanguageMode, GenderType, RegionType, StyleType, ScreenName } from '../types';
import { translations } from '../i18n/translations';
import { LegalNoticeBanner } from '../components/LegalNoticeBanner';

interface CriteriaScreenProps {
  criteria: SearchCriteria;
  onChangeCriteria: (updated: SearchCriteria) => void;
  onSubmit: () => void;
  onReset: () => void;
  language: LanguageMode;
}

export const CriteriaScreen: React.FC<CriteriaScreenProps> = ({
  criteria,
  onChangeCriteria,
  onSubmit,
  onReset,
  language,
}) => {
  const t = translations[language];
  const isEn = language === 'en';

  const updateField = <K extends keyof SearchCriteria>(key: K, value: SearchCriteria[K]) => {
    onChangeCriteria({
      ...criteria,
      [key]: value,
    });
  };

  const alphabetList = [
    '', 'A', 'B', 'C', 'D', 'Đ', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'Q', 'S', 'T', 'U', 'V', 'X', 'Y'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-xs font-semibold">
          <Sliders className="w-3.5 h-3.5" />
          <span>{isEn ? 'Step 1: Set Preferences' : 'Bước 1: Chọn tiêu chí ý nghĩa'}</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          {t.criteria.title}
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {t.criteria.subtitle}
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Giới tính */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
            <span>{t.criteria.genderLabel}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'nam', label: t.criteria.genderBoy, icon: '👦', desc: 'Mạnh mẽ, khí phách, chí hướng' },
              { id: 'nu', label: t.criteria.genderGirl, icon: '👧', desc: 'Dịu dàng, nết na, thanh tao' },
              { id: 'unisex', label: t.criteria.genderUnisex, icon: '🌱', desc: 'Hài hòa, cát tường, bình an' },
            ].map((g) => {
              const selected = criteria.gioi_tinh === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => updateField('gioi_tinh', g.id as GenderType)}
                  className={`min-h-[52px] p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selected
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="text-2xl">{g.icon}</span>
                  <div>
                    <span className="block font-semibold text-sm text-slate-900 dark:text-white">
                      {g.label}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {g.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Vùng miền */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
            <span>{t.criteria.regionLabel}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'Toàn quốc', label: t.criteria.regionAll, desc: 'Phổ biến cả nước' },
              { id: 'Bắc', label: t.criteria.regionNorth, desc: 'Nho nhã, kinh kỳ' },
              { id: 'Trung', label: t.criteria.regionCentral, desc: 'Trầm ấm, kiên định' },
              { id: 'Nam', label: t.criteria.regionSouth, desc: 'Phóng khoáng, tươi vui' },
            ].map((r) => {
              const selected = criteria.vung_mien === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => updateField('vung_mien', r.id as RegionType)}
                  className={`min-h-[50px] p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selected
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="block font-semibold text-sm text-slate-900 dark:text-white">
                    {r.label}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {r.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Phong cách */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
            <span>{t.criteria.styleLabel}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'truyen_thong', label: t.criteria.styleTraditional, desc: 'Thanh lịch, đạo nghĩa, hiếu kính' },
              { id: 'hien_dai', label: t.criteria.styleModern, desc: 'Khai phóng, năng động, tươi mới' },
              { id: 'thien_nhien', label: t.criteria.styleNature, desc: 'Hoa cỏ, sông núi, mây trời' },
              { id: 'tri_tue', label: t.criteria.styleWisdom, desc: 'Sáng suốt, uyên bác, thông tuệ' },
              { id: 'moc_mac', label: t.criteria.styleRustic, desc: 'Chân chất, thuần Nôm dân gian' },
            ].map((s) => {
              const selected = criteria.phong_cach === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => updateField('phong_cach', s.id as StyleType)}
                  className={`min-h-[50px] p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selected
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="block font-semibold text-sm text-slate-900 dark:text-white">
                    {s.label}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {s.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4 & 5. Số âm tiết & Ký tự bắt đầu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Số âm tiết */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
            <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-sans font-bold">4</span>
              <span>{t.criteria.syllableLabel}</span>
            </h2>
            <div className="space-y-2">
              {[
                { val: 0, label: t.criteria.syllableAll },
                { val: 1, label: t.criteria.syllable1 },
                { val: 2, label: t.criteria.syllable2 },
              ].map((syl) => {
                const selected = criteria.so_am_tiet === syl.val;
                return (
                  <button
                    key={syl.val}
                    type="button"
                    onClick={() => updateField('so_am_tiet', syl.val)}
                    className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between text-sm font-medium transition-all cursor-pointer ${
                      selected
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{syl.label}</span>
                    {selected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Ký tự bắt đầu */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
            <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-sans font-bold">5</span>
              <span>{t.criteria.firstLetterLabel}</span>
            </h2>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1">
              {alphabetList.map((ch) => {
                const isAll = ch === '';
                const selected = criteria.ky_tu_bat_dau === ch;
                return (
                  <button
                    key={ch || 'all'}
                    type="button"
                    onClick={() => updateField('ky_tu_bat_dau', ch)}
                    className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-blue-400'
                    }`}
                  >
                    {isAll ? (isEn ? 'All (A-Y)' : 'Tất cả (A-Y)') : ch}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* 6. Họ của gia đình */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-sans font-bold">6</span>
            <span>{t.criteria.familySurnameLabel}</span>
          </h2>
          <div className="max-w-md">
            <input
              type="text"
              value={criteria.ho_gia_dinh}
              onChange={(e) => updateField('ho_gia_dinh', e.target.value)}
              placeholder={t.criteria.familySurnamePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              {isEn
                ? 'Inputting the family surname helps the algorithm compose harmonious middle names.'
                : 'Nhập họ cha hoặc mẹ để thuật toán gợi ý cấu trúc họ + đệm ghép 3-4 âm tiết hài hòa thanh bằng trắc.'}
            </p>
          </div>
        </section>

        {/* 7. Tiêu chí kiêng kỵ văn hóa */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-sans font-bold">7</span>
            <span>{t.criteria.avoidLabel}</span>
          </h2>
          <div className="space-y-2.5">
            {[
              { key: 'tranh_nguoi_noi_tieng', label: t.criteria.avoidCelebrity },
              { key: 'tranh_pham_huy', label: t.criteria.avoidTaboo },
              { key: 'tranh_tu_noi_lai', label: t.criteria.avoidSpoonerism },
            ].map((item) => {
              const checked = Boolean(criteria[item.key as keyof SearchCriteria]);
              return (
                <label
                  key={item.key}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 cursor-pointer min-h-[46px]"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => updateField(item.key as any, e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                  />
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200 select-none">
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* 8. Mong muốn riêng của cha mẹ (AI Prompting) */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-sans font-bold">8</span>
            <span>{t.criteria.wishLabel}</span>
          </h2>
          <textarea
            rows={3}
            value={criteria.mong_uoc_rieng}
            onChange={(e) => updateField('mong_uoc_rieng', e.target.value)}
            placeholder={t.criteria.wishPlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />
        </section>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>{t.criteria.btnSubmit}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto min-h-[50px] px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.criteria.btnReset}</span>
          </button>
        </div>

        <LegalNoticeBanner lang={language} compact />
      </div>
    </div>
  );
};
