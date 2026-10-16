import React from 'react';
import { 
  Info, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  User, 
  Scale, 
  Award, 
  CheckCircle2, 
  BookMarked 
} from 'lucide-react';
import { LanguageMode } from '../types';
import { translations } from '../i18n/translations';
import { DongSonDrumSvg, LotusSvg, LacBirdSvg } from '../components/BrandingLogo';
import { LegalNoticeBanner } from '../components/LegalNoticeBanner';

interface AboutScreenProps {
  language: LanguageMode;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ language }) => {
  const t = translations[language];
  const isEn = language === 'en';

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-xs font-semibold">
          <Info className="w-3.5 h-3.5" />
          <span>{isEn ? 'About the Project' : 'Giới thiệu dự án'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          {t.about.title}
        </h1>
        <p className="text-base text-blue-700 dark:text-blue-300 font-serif font-semibold italic">
          "Tên Việt – Hồn Việt"
        </p>
      </div>

      {/* RÀNG BUỘC BẮT BUỘC SỐ 1: BẢNG THÔNG TIN THỰC TẬP SINH & ĐƠN VỊ ĐÀO TẠO */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white shadow-xl border border-blue-700">
        <div className="absolute top-2 right-2 text-white/5 pointer-events-none select-none">
          <DongSonDrumSvg size={280} />
        </div>

        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-amber-300" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {t.about.internshipInfoTitle}
            </h2>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-blue-50 text-sm sm:text-base leading-relaxed space-y-3">
            <p className="font-semibold text-amber-200 text-base sm:text-lg">
              Sản phẩm thực tập của Nguyễn Sinh Hùng, mã sinh viên PH70147, Nhóm 2, Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-blue-100 border-t border-white/10">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-sky-300" />
                <span><strong>Họ và tên:</strong> Nguyễn Sinh Hùng</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-300" />
                <span><strong>Mã sinh viên:</strong> PH70147 (Nhóm 2)</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-300" />
                <span><strong>Cơ sở đào tạo:</strong> Trường Cao đẳng FPT Polytechnic</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-300" />
                <span><strong>Đơn vị tiếp nhận thực tập:</strong> IMTA TECH (Đợt 15)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sứ mệnh & Bối cảnh xã hội */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5">
          <LotusSvg size={24} className="text-blue-600 dark:text-blue-400" />
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t.about.missionTitle}
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white mb-0.5">
                {isEn ? 'Preserving Vietnamese Linguistic Identity' : 'Gìn giữ sự trong sáng của tiếng Việt'}
              </strong>
              <span>{t.about.missionP1}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white mb-0.5">
                {isEn ? 'Generational Understanding & Cultural Pride' : 'Giúp thế hệ trẻ hiểu rõ nguồn cội tên mình'}
              </strong>
              <span>{t.about.missionP2}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white mb-0.5">
                {isEn ? 'Absolute Privacy & Zero Child Data Collection' : 'Bảo vệ quyền riêng tư & Không thu thập dữ liệu trẻ em'}
              </strong>
              <span>{t.about.missionP3}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center">
          {t.about.coreValuesTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: t.about.v1,
              desc: 'Ứng dụng hoàn toàn phi lợi nhuận, không thu phí, không đặt bất kỳ quảng cáo hay nội dung thương mại nào.',
              icon: <Heart className="w-5 h-5 text-rose-500" />
            },
            {
              title: t.about.v2,
              desc: 'Tôn trọng sâu sắc ngữ âm, thổ nhưỡng và tâm thức của người dân 3 miền Bắc – Trung – Nam.',
              icon: <LacBirdSvg size={24} className="text-blue-600 dark:text-blue-400" />
            },
            {
              title: t.about.v3,
              desc: 'Tên người không chỉ là ký hiệu hành chính mà là di sản gia đình, là lời chúc phúc thiêng liêng gửi gắm tương lai con trẻ.',
              icon: <LotusSvg size={22} className="text-pink-500" />
            },
            {
              title: t.about.v4,
              desc: 'Toàn bộ giải nghĩa đều có dẫn nguồn từ các bộ từ điển chuẩn mực (Thiều Chửu, Hoàng Phê) và sách khảo cứu của GS. Nguyễn Văn Khang.',
              icon: <BookMarked className="w-5 h-5 text-blue-600" />
            }
          ].map((val, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2"
            >
              <div className="flex items-center gap-2">
                {val.icon}
                <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                  {val.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mandatory Statutory Notice */}
      <LegalNoticeBanner lang={language} />
    </div>
  );
};
