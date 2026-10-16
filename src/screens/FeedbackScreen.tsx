import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  PlusCircle, 
  Sliders, 
  Trash2 
} from 'lucide-react';
import { FeedbackRecord, LanguageMode } from '../types';
import { translations } from '../i18n/translations';
import { LegalNoticeBanner } from '../components/LegalNoticeBanner';

interface FeedbackScreenProps {
  feedbacks: FeedbackRecord[];
  onAddFeedback: (record: FeedbackRecord) => void;
  onClearFeedbackHistory: () => void;
  language: LanguageMode;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  feedbacks,
  onAddFeedback,
  onClearFeedbackHistory,
  language,
}) => {
  const t = translations[language];
  const isEn = language === 'en';

  const [formType, setFormType] = useState<FeedbackRecord['loai_phan_hoi']>('bao_sai_nghia');
  const [targetName, setTargetName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newRecord: FeedbackRecord = {
      id: `fb-${Date.now()}`,
      loai_phan_hoi: formType,
      ten_lien_quan: targetName.trim() || undefined,
      ho_ten_nguoi_gui: senderName.trim() || (isEn ? 'Anonymous Contributor' : 'Đồng bào đóng góp'),
      email: email.trim() || undefined,
      noi_dung: content.trim(),
      thoi_gian: new Date().toLocaleDateString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      trang_thai: 'da_ghi_nhan'
    };

    onAddFeedback(newRecord);
    setIsSuccess(true);
    setContent('');
    setTargetName('');
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-xs font-semibold">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>{isEn ? 'Feedback & Corrections' : 'Góp ý & Báo tên sai nghĩa'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          {t.feedback.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {t.feedback.subtitle}
        </p>
      </div>

      {/* Main Feedback Form Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        {isSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center gap-3 animate-in fade-in duration-300">
            <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-600" />
            <p className="text-sm font-semibold">
              {t.feedback.sentSuccess}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form Type Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {t.feedback.formType}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'bao_sai_nghia', label: t.feedback.typeReportWrong, icon: <AlertTriangle className="w-4 h-4 text-amber-500" /> },
                { id: 'dong_gop_ten', label: t.feedback.typeContribute, icon: <PlusCircle className="w-4 h-4 text-blue-500" /> },
                { id: 'gop_y_tinh_nang', label: t.feedback.typeFeature, icon: <Sliders className="w-4 h-4 text-indigo-500" /> },
                { id: 'khac', label: t.feedback.typeOther, icon: <MessageSquareQuote className="w-4 h-4 text-slate-500" /> },
              ].map((opt) => {
                const selected = formType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormType(opt.id as any)}
                    className={`min-h-[46px] p-3 rounded-xl border text-left flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      selected
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Related Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              {t.feedback.nameRelated}
            </label>
            <input
              type="text"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              placeholder={t.feedback.nameRelatedPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Sender Info (Privacy respectful, optional email) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                {t.feedback.senderName}
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={isEn ? 'Your name...' : 'Họ tên hoặc danh xưng...'}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                {t.feedback.senderEmail}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Content Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              {t.feedback.content} *
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t.feedback.contentPlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="min-h-[48px] px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.feedback.btnSend}</span>
            </button>
          </div>
        </form>
      </section>

      {/* Local Feedback History */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>{t.feedback.historyTitle}</span>
          </h2>
          {feedbacks.length > 0 && (
            <button
              type="button"
              onClick={onClearFeedbackHistory}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isEn ? 'Clear history' : 'Xóa lịch sử'}</span>
            </button>
          )}
        </div>

        {feedbacks.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-slate-500 text-sm">
            {t.feedback.noHistory}
          </div>
        ) : (
          <div className="space-y-3">
            {feedbacks.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-700 dark:text-blue-300">
                      {item.ho_ten_nguoi_gui}
                    </span>
                    {item.ten_lien_quan && (
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium">
                        Tên: {item.ten_lien_quan}
                      </span>
                    )}
                  </div>
                  <span>{item.thoi_gian}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {item.noi_dung}
                </p>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Đã ghi nhận vào hệ thống cục bộ của thiết bị</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mandatory Statutory Notice */}
      <LegalNoticeBanner lang={language} />
    </div>
  );
};
