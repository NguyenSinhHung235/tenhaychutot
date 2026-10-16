import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Volume2, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  Scale, 
  BookOpen, 
  Sparkles, 
  Share2, 
  Check, 
  MapPin, 
  Music, 
  Layers, 
  Feather,
  Search
} from 'lucide-react';
import { VietnameseName, LanguageMode, ScreenName } from '../types';
import { translations } from '../i18n/translations';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { LegalNoticeBanner } from '../components/LegalNoticeBanner';
import { DongSonDrumSvg, LotusSvg } from '../components/BrandingLogo';

interface NameDetailScreenProps {
  name: VietnameseName | null;
  onBack: () => void;
  favorites: VietnameseName[];
  onToggleFavorite: (name: VietnameseName) => void;
  language: LanguageMode;
  onOpenReportModal: (name: string) => void;
  onAnalyzeCustomName: (customName: string) => Promise<void>;
  isAnalyzing: boolean;
}

export const NameDetailScreen: React.FC<NameDetailScreenProps> = ({
  name,
  onBack,
  favorites,
  onToggleFavorite,
  language,
  onOpenReportModal,
  onAnalyzeCustomName,
  isAnalyzing,
}) => {
  const t = translations[language];
  const isEn = language === 'en';

  const [customInput, setCustomInput] = useState('');
  const [copied, setCopied] = useState(false);

  if (!name) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white">
          {isEn ? 'No name selected yet' : 'Chưa chọn tên để xem chi tiết'}
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          {isEn
            ? 'Please choose a name from the suggestion list or use the search tool below.'
            : 'Vui lòng chọn một tên từ màn hình gợi ý hoặc nhập tên con để giải nghĩa chi tiết.'}
        </p>
        <button
          onClick={onBack}
          className="min-h-[44px] px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm cursor-pointer"
        >
          {t.detail.backToList}
        </button>
      </div>
    );
  }

  const isFav = favorites.some((f) => f.id === name.id);

  const fullTextToRead = `Tên ${name.ten}. Ý nghĩa thuần Việt: ${name.nghia_thuan_viet}. ${
    name.nghia_han_viet ? `Nghĩa Hán Việt: ${name.nghia_han_viet}.` : ''
  } ${name.thanh_dieu ? `Thanh điệu: ${name.thanh_dieu}.` : ''}`;

  const handleCopy = () => {
    const text = `Tên thuần Việt: ${name.ten}\nÝ nghĩa: ${name.nghia_thuan_viet}\nNguồn gốc: ${name.nguon_goc}\nTrích từ Trợ lý Đặt tên thuần Việt (Tên Việt - Hồn Việt)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onAnalyzeCustomName(customInput.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Navigation & Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.detail.backToList}</span>
        </button>

        <div className="flex items-center gap-2">
          <AudioPlayerButton
            textToRead={fullTextToRead}
            size="md"
            label={t.detail.btnListen}
          />

          <button
            onClick={() => onToggleFavorite(name)}
            className={`min-h-[44px] px-4 py-2 rounded-xl border font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              isFav
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 text-rose-600 dark:text-rose-400'
                : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
            <span>{isFav ? (isEn ? 'Favorited' : 'Đã yêu thích') : t.detail.btnFavorite}</span>
          </button>

          <button
            onClick={handleCopy}
            className="min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm flex items-center gap-1.5 cursor-pointer"
            title="Sao chép thông tin tên"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? (isEn ? 'Copied' : 'Đã chép') : (isEn ? 'Share' : 'Chia sẻ')}</span>
          </button>

          <button
            onClick={() => onOpenReportModal(name.ten)}
            className="min-h-[44px] px-3.5 py-2 rounded-xl border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Báo cáo tên sai nghĩa"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden sm:inline">{isEn ? 'Report' : 'Báo sai'}</span>
          </button>
        </div>
      </div>

      {/* Main Hero Header Card */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white shadow-xl border border-blue-700">
        <div className="absolute top-0 right-0 text-white/5 pointer-events-none select-none">
          <DongSonDrumSvg size={300} />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-sky-200">
              {name.vung_mien} • {name.so_am_tiet} {isEn ? 'syllable' : 'âm tiết'}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-xs font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{name.do_tin_cay || 'Đã kiểm chứng'}</span>
            </span>
            {name.isAiGenerated && (
              <span className="px-3 py-1 rounded-full bg-indigo-500/40 text-indigo-200 text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Gemini AI Khảo luận</span>
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-sm">
            {name.ten}
          </h1>

          {name.nghia_han_viet && (
            <p className="font-serif text-lg sm:text-xl text-blue-200 font-medium">
              {name.nghia_han_viet}
            </p>
          )}

          <p className="text-base sm:text-lg text-blue-100 leading-relaxed font-light">
            {name.nghia_thuan_viet}
          </p>
        </div>
      </section>

      {/* 360 Degree Breakdown Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Ý nghĩa thuần Việt & Văn hóa */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-blue-800 dark:text-blue-300">
            <LotusSvg size={22} className="text-blue-600 dark:text-blue-400" />
            <h3 className="font-serif text-lg font-bold">
              {t.detail.pureVietnameseMeaning}
            </h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {name.nghia_thuan_viet}
          </p>
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? 'Corpus Source: ' : 'Nguồn tư liệu đối chiếu: '}
            </span>
            <span>{name.nguon_goc}</span>
          </div>
        </div>

        {/* 2. Nghĩa Hán Việt & Bộ thủ */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-blue-800 dark:text-blue-300">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-serif text-lg font-bold">
              {t.detail.hanVietMeaning}
            </h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {name.nghia_han_viet || 'Tên Nôm thuần Việt, gắn với đời sống bình dị và ca dao dân ca.'}
          </p>
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isEn ? 'Dictionary Reference: ' : 'Căn cứ từ điển: '}
            </span>
            <span>Từ điển Hán – Việt (Thiều Chửu, Nguyễn Quang Hồng).</span>
          </div>
        </div>

        {/* 3. Ngữ âm & Thanh điệu 3 miền */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-blue-800 dark:text-blue-300">
            <Music className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-serif text-lg font-bold">
              {t.detail.phoneticsTone}
            </h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {name.thanh_dieu || 'Thanh âm hài hòa khi kết hợp cùng họ cha mẹ.'}
          </p>
          <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <p>• <strong>Miền Bắc:</strong> Phát âm phân biệt rõ thanh hỏi – ngã, âm vang tinh tế.</p>
            <p>• <strong>Miền Trung:</strong> Âm trầm ấm, phát âm đằm thắm, gắn kết tình cảm.</p>
            <p>• <strong>Miền Nam:</strong> Âm điệu cởi mở, vui tươi, đọc liền mạch mượt mà.</p>
          </div>
        </div>

        {/* 4. Gợi ý đệm ghép họ & tên */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-blue-800 dark:text-blue-300">
            <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-serif text-lg font-bold">
              {t.detail.appropriateMiddleNames}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isEn
              ? 'Harmonious multi-syllable combinations pairing traditional Vietnamese surnames:'
              : 'Các tổ hợp 3-4 âm tiết chuẩn mực, cân đối bằng trắc khi ghép họ cha mẹ:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(name.dem_phu_hop || [
              `Nguyễn Thanh ${name.ten}`,
              `Trần Hoàng ${name.ten}`,
              `Lê Minh ${name.ten}`,
              `Phạm Tuệ ${name.ten}`
            ]).map((pair, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 text-xs sm:text-sm font-semibold"
              >
                {pair}
              </span>
            ))}
          </div>
        </div>

        {/* 5. Ca dao, Tục ngữ & Văn học */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-blue-800 dark:text-blue-300">
            <Feather className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-serif text-lg font-bold">
              {t.detail.literatureCitation}
            </h3>
          </div>
          <blockquote className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border-l-4 border-amber-400 text-xs sm:text-sm italic text-slate-700 dark:text-slate-300">
            "{name.ca_dao_dien_tich || 'Hồn cốt dân tộc ngàn năm đọng lại trong thanh âm trong sáng của tiếng Việt.'}"
          </blockquote>
        </div>

        {/* 6. Cảnh báo phạm huý & Tránh nghĩa xấu */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif text-lg font-bold">
              {t.detail.culturalCaution}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {name.canh_bao || (isEn ? 'Safe: No adverse taboo or negative spoonerism detected.' : 'An toàn: Không phạm các huý kỵ lịch sử triều Nguyễn, không dễ bị nói lái thành nghĩa xấu.')}
          </p>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            * Theo khảo luận "Tên người Việt Nam" (GS. Nguyễn Văn Khang), tục kiêng huý ngày nay được hiểu là tôn trọng truyền thống gia tộc và tổ tiên.
          </div>
        </div>
      </div>

      {/* Tra cứu phân tích tên tự nhập */}
      <section className="p-6 rounded-3xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {isEn ? 'Analyze Any Custom Name with Gemini AI' : 'Muốn phân tích một tên khác của bạn?'}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {isEn
            ? 'Enter any Vietnamese name to receive a 360-degree cultural and linguistic breakdown.'
            : 'Nhập bất kỳ họ tên nào (ví dụ: "Minh Khang", "Trần Ánh Dương", "Võ Hoài An"...) để Gemini phân tích tự dạng Hán Việt, thanh điệu và đối chiếu pháp lý.'}
        </p>
        <form onSubmit={handleCustomSubmit} className="flex gap-2 max-w-xl">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={isEn ? 'Enter custom name...' : 'Nhập tên cần phân tích...'}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 text-black placeholder:text-slate-500 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isAnalyzing}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isAnalyzing ? (isEn ? 'Analyzing...' : 'Đang tra cứu...') : (isEn ? 'Analyze' : 'Phân tích')}</span>
          </button>
        </form>
      </section>

      {/* Mandatory Statutory Notice */}
      <LegalNoticeBanner lang={language} />
    </div>
  );
};
