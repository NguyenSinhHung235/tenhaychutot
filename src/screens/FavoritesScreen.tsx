import React, { useState } from 'react';
import { 
  Heart, 
  Trash2, 
  Printer, 
  Share2, 
  Check, 
  ArrowRight, 
  Columns, 
  BookOpen, 
  Music, 
  Save, 
  AlertCircle 
} from 'lucide-react';
import { VietnameseName, LanguageMode, ScreenName } from '../types';
import { translations } from '../i18n/translations';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { LegalNoticeBanner } from '../components/LegalNoticeBanner';

interface FavoritesScreenProps {
  favorites: VietnameseName[];
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
  onSelectName: (name: VietnameseName) => void;
  onNavigate: (screen: ScreenName) => void;
  favoriteNotes: Record<string, string>;
  onSaveNote: (id: string, note: string) => void;
  language: LanguageMode;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favorites,
  onRemoveFavorite,
  onClearAll,
  onSelectName,
  onNavigate,
  favoriteNotes,
  onSaveNote,
  language,
}) => {
  const t = translations[language];
  const isEn = language === 'en';

  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({ ...favoriteNotes });

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((item) => item !== id));
    } else {
      if (selectedForCompare.length >= 3) {
        alert(isEn ? 'You can compare at most 3 names at a time.' : 'Bạn có thể so sánh tối đa 3 tên cùng lúc.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    if (favorites.length === 0) return;
    const lines = favorites.map(
      (f, idx) => `${idx + 1}. ${f.ten} (${f.vung_mien}) - ${f.nghia_thuan_viet}`
    );
    const text = `DANH SÁCH TÊN THUẦN VIỆT YÊU THÍCH:\n${lines.join('\n')}\n\nNguồn: Trợ lý Đặt tên thuần Việt (Tên Việt - Hồn Việt)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveLocalNote = (id: string) => {
    onSaveNote(id, editingNotes[id] || '');
  };

  const comparedNames = favorites.filter((f) => selectedForCompare.includes(f.id));

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.favorites.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">
              {favorites.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.favorites.subtitle}
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopy}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? t.favorites.copiedSuccess : t.favorites.btnShare}</span>
            </button>

            <button
              onClick={handlePrint}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{t.favorites.btnPrint}</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm(isEn ? 'Clear all saved favorite names?' : 'Bạn có chắc muốn xóa toàn bộ danh sách yêu thích?')) {
                  onClearAll();
                }
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isEn ? 'Clear All' : 'Xóa hết'}</span>
            </button>
          </div>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white">
            {t.favorites.emptyTitle}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {t.favorites.emptySub}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('suggestions')}
              className="min-h-[44px] px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-md cursor-pointer"
            >
              {isEn ? 'Explore Names Now' : 'Khám phá kho tên ngay'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Compare Toolbar */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-blue-900 dark:text-blue-200 font-medium">
              <Columns className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>
                {isEn
                  ? `Select 2 or 3 names to compare (${selectedForCompare.length}/3 selected)`
                  : `Chọn 2 hoặc 3 tên để so sánh đồng thời (${selectedForCompare.length}/3 đã chọn)`}
              </span>
            </div>

            {selectedForCompare.length > 0 && (
              <button
                onClick={() => setSelectedForCompare([])}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {isEn ? 'Clear Selection' : 'Bỏ chọn so sánh'}
              </button>
            )}
          </div>

          {/* Side-by-side comparison matrix when names selected */}
          {comparedNames.length >= 2 && (
            <section className="p-6 rounded-3xl bg-white dark:bg-slate-800 border-2 border-blue-500/80 shadow-lg space-y-4">
              <div className="flex items-center gap-2">
                <Columns className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  {t.favorites.compareTitle}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-sm">
                      <th className="py-3 px-3 font-semibold text-slate-500 w-1/4">Tiêu chí so sánh</th>
                      {comparedNames.map((item) => (
                        <th key={item.id} className="py-3 px-3 font-serif text-xl font-bold text-blue-900 dark:text-blue-300">
                          {item.ten}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm divide-y divide-slate-100 dark:divide-slate-700">
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-400">Ý nghĩa thuần Việt</td>
                      {comparedNames.map((item) => (
                        <td key={item.id} className="py-3 px-3 leading-relaxed">{item.nghia_thuan_viet}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-400">Nghĩa Hán – Việt</td>
                      {comparedNames.map((item) => (
                        <td key={item.id} className="py-3 px-3 font-medium text-blue-700 dark:text-blue-300">{item.nghia_han_viet || 'Thuần Nôm'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-400">Thanh điệu ngữ âm</td>
                      {comparedNames.map((item) => (
                        <td key={item.id} className="py-3 px-3">{item.thanh_dieu || 'Bằng/Trắc'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-400">Gợi ý họ đệm</td>
                      {comparedNames.map((item) => (
                        <td key={item.id} className="py-3 px-3">{item.dem_phu_hop?.slice(0, 2).join(', ') || 'Đang cập nhật'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-400">Vùng miền & Âm tiết</td>
                      {comparedNames.map((item) => (
                        <td key={item.id} className="py-3 px-3">{item.vung_mien} • {item.so_am_tiet} âm tiết</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* List of Favorite Name Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {favorites.map((item) => {
              const isComparing = selectedForCompare.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border transition-all space-y-4 ${
                    isComparing
                      ? 'border-blue-600 ring-2 ring-blue-500/30'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-blue-900 dark:text-white">
                          {item.ten}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium">
                          {item.vung_mien}
                        </span>
                      </div>
                      {item.nghia_han_viet && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                          {item.nghia_han_viet}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleCompare(item.id)}
                        className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                          isComparing
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {isComparing ? (isEn ? 'Selected' : 'Đang so sánh') : (isEn ? 'Compare' : 'So sánh')}
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveFavorite(item.id)}
                        aria-label="Xóa tên khỏi yêu thích"
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.nghia_thuan_viet}
                  </p>

                  {/* Notes input */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {isEn ? 'Family Notes:' : 'Ghi chú của gia đình (lưu trên máy):'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingNotes[item.id] !== undefined ? editingNotes[item.id] : (favoriteNotes[item.id] || '')}
                        onChange={(e) =>
                          setEditingNotes({
                            ...editingNotes,
                            [item.id]: e.target.value,
                          })
                        }
                        placeholder={t.favorites.notesPlaceholder}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveLocalNote(item.id)}
                        className="min-h-[36px] px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Save' : 'Lưu'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
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
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isEn ? 'Full Detail 360°' : 'Xem giải nghĩa 360°'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mandatory Statutory Notice */}
      <LegalNoticeBanner lang={language} />
    </div>
  );
};
