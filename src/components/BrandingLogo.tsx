import React from 'react';

export const DongSonDrumSvg: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    aria-label="Biểu tượng Trống đồng Đông Sơn"
  >
    {/* Vòng ngoài cùng */}
    <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="43" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    
    {/* Vòng chim Lạc bay ngược chiều kim đồng hồ */}
    <circle cx="50" cy="50" r="37" stroke="currentColor" strokeWidth="1.5" />
    {/* 4 Chim Lạc tượng trưng 4 hướng */}
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      {/* Chim trên */}
      <path d="M50 14 C46 14 42 17 38 16 C34 15 30 18 32 20 C36 19 40 22 46 20 Z" fill="currentColor" fillOpacity="0.3" />
      {/* Chim dưới */}
      <path d="M50 86 C54 86 58 83 62 84 C66 85 70 82 68 80 C64 81 60 78 54 80 Z" fill="currentColor" fillOpacity="0.3" />
      {/* Chim trái */}
      <path d="M14 50 C14 54 17 58 16 62 C15 66 18 70 20 68 C19 64 22 60 20 54 Z" fill="currentColor" fillOpacity="0.3" />
      {/* Chim phải */}
      <path d="M86 50 C86 46 83 42 84 38 C85 34 82 30 80 32 C81 36 78 40 80 46 Z" fill="currentColor" fillOpacity="0.3" />
    </g>

    {/* Vòng văn răng cưa / hình học */}
    <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
    <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="1.2" />

    {/* Tâm mặt trời 12 hoặc 14 tia sáng rực rỡ */}
    <circle cx="50" cy="50" r="8" fill="currentColor" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
      <polygon
        key={deg}
        points="48.5,32 51.5,32 50,42"
        fill="currentColor"
        transform={`rotate(${deg} 50 50)`}
      />
    ))}
  </svg>
);

export const LotusSvg: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    aria-label="Biểu tượng Hoa Sen Việt Nam"
  >
    {/* Cánh sen trung tâm */}
    <path
      d="M32 8 C30 18 25 32 32 46 C39 32 34 18 32 8 Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    {/* Cánh sen hai bên lớp trong */}
    <path
      d="M32 20 C24 24 16 34 22 45 C28 42 30 36 32 28 Z"
      fill="currentColor"
      fillOpacity="0.75"
    />
    <path
      d="M32 20 C40 24 48 34 42 45 C36 42 34 36 32 28 Z"
      fill="currentColor"
      fillOpacity="0.75"
    />
    {/* Cánh sen xòe ngoài */}
    <path
      d="M26 36 C16 37 8 45 16 52 C24 51 28 44 26 36 Z"
      fill="currentColor"
      fillOpacity="0.55"
    />
    <path
      d="M38 36 C48 37 56 45 48 52 C40 51 36 44 38 36 Z"
      fill="currentColor"
      fillOpacity="0.55"
    />
    {/* Gốc búp sen */}
    <path
      d="M20 52 C26 56 38 56 44 52 C38 54 26 54 20 52 Z"
      fill="currentColor"
    />
  </svg>
);

export const LacBirdSvg: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
    aria-label="Biểu tượng Chim Lạc cổ xưa"
  >
    {/* Mỏ dài đặc trưng chim Lạc */}
    <path
      d="M96 22 L70 26 C64 24 58 20 52 22 L38 12 C34 14 36 22 42 26 L22 28 C12 28 6 34 2 42 C12 40 20 42 26 44 L50 36 C56 38 64 36 72 32 L96 22 Z"
      fill="currentColor"
      fillOpacity="0.85"
    />
    {/* Mào lông xòe phía sau đầu */}
    <path
      d="M68 23 C72 17 80 15 86 16 C82 19 76 21 72 23 Z"
      fill="currentColor"
    />
    {/* Mắt chim Lạc */}
    <circle cx="76" cy="24" r="1.8" fill="#ffffff" />
  </svg>
);

export const AppBrandBadge: React.FC<{
  isDark?: boolean;
  compact?: boolean;
  onClick?: () => void;
}> = ({ compact = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer group transition-transform duration-200 active:scale-95 ${
        compact ? '' : 'py-1'
      }`}
      role="button"
      tabIndex={0}
      aria-label="Về trang chủ Trợ lý Đặt tên thuần Việt"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20 ring-2 ring-white/50 group-hover:shadow-blue-500/30 transition-all">
        <DongSonDrumSvg size={30} className="text-white group-hover:rotate-45 transition-transform duration-700 ease-out" />
        <div className="absolute -bottom-1 -right-1 bg-white text-blue-700 rounded-full p-0.5 shadow-sm">
          <LotusSvg size={14} className="text-blue-700" />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-blue-950 dark:text-white leading-none">
          TenHayChuTot
        </span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide mt-0.5">
          Hồn Việt - Thuần Việt
        </span>
      </div>
    </div>
  );
};
