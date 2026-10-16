export type GenderType = 'nam' | 'nu' | 'unisex';
export type RegionType = 'Bắc' | 'Trung' | 'Nam' | 'Toàn quốc' | 'Bac' | 'ToanQuoc';
export type StyleType = 'truyen_thong' | 'hien_dai' | 'thien_nhien' | 'tri_tue' | 'moc_mac';

export interface VietnameseName {
  id: string;
  ten: string; // Tên chính (ví dụ: "An", "Bình", "Trúc", "Minh Triết")
  gioi_tinh: GenderType;
  vung_mien: RegionType;
  so_am_tiet: number; // 1 hoặc 2
  nghia_thuan_viet: string; // Ý nghĩa thuần Việt, biểu tượng
  nghia_han_viet: string | null; // Chữ Hán, phiên âm và giải thích bộ thủ
  nguon_goc: string; // Nguồn gốc (Dân gian, Ca dao, Từ điển Hán-Việt, v.v.)
  canh_bao: string | null; // Cảnh báo phạm huý, nói lái, trùng tên xấu
  do_pho_bien: number; // 1-5 sao
  dem_phu_hop?: string[]; // Gợi ý tên đệm đẹp phối thanh bằng trắc
  thanh_dieu?: string; // Thanh bằng hay trắc
  phong_thuy_ngu_hanh?: string; // Mệnh / Ngũ hành tham khảo theo truyền thống
  ca_dao_dien_tich?: string; // Trích dẫn thơ văn, ca dao
  isAiGenerated?: boolean; // Đánh dấu nếu được sinh bởi Gemini AI
  do_tin_cay?: 'Cao (Đã kiểm chứng)' | 'Gợi ý – chưa kiểm chứng' | 'Trung bình';
  phap_ly_ghi_chu?: string; // Phù hợp Điều 26 Bộ luật Dân sự 2015
}

export interface SearchCriteria {
  gioi_tinh: GenderType;
  vung_mien: RegionType;
  phong_cach: StyleType;
  so_am_tiet: number; // 1, 2, hoặc 0 (tất cả)
  ky_tu_bat_dau: string; // 'A', 'B', hoặc '' (bất kỳ)
  ho_gia_dinh: string; // Họ cha/mẹ, ví dụ "Nguyễn", "Trần"
  tranh_nguoi_noi_tieng: boolean;
  tranh_pham_huy: boolean;
  tranh_tu_noi_lai: boolean;
  mong_uoc_rieng: string; // Lời nhắn nhủ, mong muốn tính cách con
}

export interface FeedbackRecord {
  id: string;
  loai_phan_hoi: 'bao_sai_nghia' | 'dong_gop_ten' | 'gop_y_tinh_nang' | 'khac';
  ten_lien_quan?: string;
  ho_ten_nguoi_gui: string;
  email?: string;
  noi_dung: string;
  thoi_gian: string;
  trang_thai: 'da_ghi_nhan' | 'dang_xu_ly';
}

export type ScreenName = 
  | 'home' 
  | 'criteria' 
  | 'suggestions' 
  | 'detail' 
  | 'favorites' 
  | 'about' 
  | 'references' 
  | 'feedback';

export type LanguageMode = 'vi' | 'en';
