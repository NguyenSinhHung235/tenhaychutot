import React, { useState } from 'react';
import { X, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { FeedbackRecord, LanguageMode } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName?: string;
  onSaveFeedback: (feedback: FeedbackRecord) => void;
  lang: LanguageMode;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetName = '',
  onSaveFeedback,
  lang,
}) => {
  const isEn = lang === 'en';
  const [name, setName] = useState(targetName);
  const [sender, setSender] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const record: FeedbackRecord = {
      id: `fb-${Date.now()}`,
      loai_phan_hoi: 'bao_sai_nghia',
      ten_lien_quan: name.trim() || targetName || 'Không nêu tên',
      ho_ten_nguoi_gui: sender.trim() || 'Người dùng ẩn danh',
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

    onSaveFeedback(record);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setContent('');
    }, 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-blue-100 dark:border-blue-900 text-slate-800 dark:text-slate-100">
        <button
          onClick={onClose}
          type="button"
          aria-label={isEn ? 'Close dialog' : 'Đóng hộp thoại'}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
              {isEn ? 'Feedback Recorded!' : 'Đã ghi nhận phản hồi!'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              {isEn
                ? 'Thank you for helping us refine and preserve the accuracy of pure Vietnamese naming.'
                : 'Chân thành cảm ơn bạn đã đóng góp để giúp dữ liệu tên thuần Việt luôn chuẩn mực và chính xác.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 id="report-modal-title" className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                {isEn ? 'Report Inaccurate Name Meaning' : 'Báo cáo tên sai nghĩa / Góp ý đính chính'}
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isEn
                ? 'Please specify why this name’s meaning is inaccurate or provide a credible reference source.'
                : 'Vui lòng cung cấp chi tiết điểm chưa chính xác hoặc nguồn đối chiếu (Từ điển Thiều Chửu, GS. Nguyễn Văn Khang...) để chúng tôi hiệu đính.'}
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isEn ? 'Target Name' : 'Tên cần đính chính'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Tên An, Bình..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Your Name / Title' : 'Họ tên của bạn'}
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Người đóng góp..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Email (Optional)' : 'Email (Tùy chọn)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isEn ? 'Detailed Correction & Source *' : 'Chi tiết sai sót & Nguồn tài liệu đối chiếu *'}
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Mô tả cụ thể chữ Hán, nghĩa gốc hoặc dẫn chứng ca dao, trang từ điển..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium cursor-pointer"
              >
                {isEn ? 'Cancel' : 'Hủy bỏ'}
              </button>
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center gap-2 shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isEn ? 'Submit Report' : 'Gửi báo cáo'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
