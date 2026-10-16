import React from 'react';
import { Scale, Info, ShieldCheck } from 'lucide-react';
import { LEGAL_DISCLAIMER_VI, LEGAL_DISCLAIMER_EN } from '../data/references';
import { LanguageMode } from '../types';

interface LegalNoticeBannerProps {
  lang: LanguageMode;
  compact?: boolean;
  className?: string;
}

export const LegalNoticeBanner: React.FC<LegalNoticeBannerProps> = ({
  lang,
  compact = false,
  className = '',
}) => {
  const isEn = lang === 'en';

  if (compact) {
    return (
      <div className={`flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 text-xs text-blue-900 dark:text-blue-200 ${className}`}>
        <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">
            {isEn ? 'Statutory Basis:' : 'Căn cứ pháp lý:'}
          </span>{' '}
          {isEn
            ? 'Complies with Article 26 of the Civil Code 2015 & Circular 04/2020/TT-BTP on naming Vietnamese citizens. For reference only.'
            : 'Tuân thủ Điều 26 Bộ luật Dân sự số 91/2015/QH13 và Thông tư 04/2020/TT-BTP về quyền có họ tên bằng tiếng Việt. Thông tin mang tính tham khảo, không thay thế văn bản pháp luật.'}
        </div>
      </div>
    );
  }

  return (
    <aside
      aria-label="Căn cứ pháp lý và lưu ý miễn trừ"
      className={`p-4 md:p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/80 to-indigo-50/90 dark:from-slate-900/90 dark:via-blue-950/50 dark:to-slate-900/90 border border-blue-200/90 dark:border-blue-800/80 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-semibold mb-2">
        <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h4 className="font-serif text-base">
          {isEn ? 'Statutory Framework & Legal Notice' : 'Căn cứ Pháp lý & Khung Quy định Đặt tên'}
        </h4>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-medium">
          {isEn ? 'Civil Code 2015' : 'Điều 26 BLDS 2015'}
        </span>
      </div>

      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {isEn
          ? 'According to Article 26 of the Civil Code 2015 and Circular 04/2020/TT-BTP of the Ministry of Justice, Vietnamese citizens’ names must be in Vietnamese or other recognized ethnic languages of Vietnam, preserving cultural identity and fine traditions.'
          : 'Căn cứ Khoản 3 Điều 26 Bộ luật Dân sự số 91/2015/QH13 và Điều 6 Thông tư số 04/2020/TT-BTP của Bộ Tư pháp: Tên của công dân Việt Nam phải bằng tiếng Việt hoặc tiếng dân tộc khác của Việt Nam; phù hợp với việc giữ gìn bản sắc dân tộc, tập quán, truyền thống tốt đẹp của dân tộc.'}
      </p>

      <div className="mt-3 pt-3 border-t border-blue-200/60 dark:border-blue-800/50 flex items-start gap-2 text-[11px] md:text-xs text-slate-600 dark:text-slate-400">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="italic">
          {isEn ? LEGAL_DISCLAIMER_EN : LEGAL_DISCLAIMER_VI}
        </p>
      </div>
    </aside>
  );
};
