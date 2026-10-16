export interface ReferenceItem {
  id: string;
  category: 'sach' | 'tu_dien' | 'phap_luat' | 'website';
  title: string;
  authorOrIssuer: string;
  publisherOrOrg: string;
  year: string;
  accessDate: string;
  description: string;
  url?: string;
  legalArticles?: string[];
}

export const OFFICIAL_REFERENCES: ReferenceItem[] = [
  {
    id: 'ref-01',
    category: 'tu_dien',
    title: 'Từ điển Hán – Việt (ấn bản có chữ Hán và bộ thủ)',
    authorOrIssuer: 'Thiều Chửu (Nguyễn Hữu Kha)',
    publisherOrOrg: 'Nhà xuất bản Thanh Niên, Hà Nội',
    year: '1942 (Tái bản 2018)',
    accessDate: '16/10/2026',
    description: 'Từ điển tiêu chuẩn để tra cứu nguyên nghĩa, tự dạng chữ Hán, gốc từ âm Hán – Việt cho các tên người truyền thống.',
    url: 'https://thieuchuu.com'
  },
  {
    id: 'ref-02',
    category: 'tu_dien',
    title: 'Từ điển tiếng Việt (ấn bản có hiệu đính)',
    authorOrIssuer: 'GS. Hoàng Phê (Chủ biên)',
    publisherOrOrg: 'Viện Ngôn ngữ học Việt Nam, NXB Đà Nẵng',
    year: '2021',
    accessDate: '16/10/2026',
    description: 'Cơ sở chuẩn mực giải nghĩa từ thuần Việt, từ ngữ dân gian, các sắc thái biểu cảm và thanh điệu ngữ âm tiếng Việt.'
  },
  {
    id: 'ref-03',
    category: 'sach',
    title: 'Tên người Việt Nam (Khảo luận ngôn ngữ học và văn hóa học)',
    authorOrIssuer: 'GS. Nguyễn Văn Khang',
    publisherOrOrg: 'Nhà xuất bản Văn hóa Thông tin, Hà Nội',
    year: '2005',
    accessDate: '16/10/2026',
    description: 'Nghiên cứu khoa học toàn diện về cấu trúc Họ – Tên đệm – Tên chính, quy luật ngữ âm bằng trắc, phong tục kiêng huý 3 miền.'
  },
  {
    id: 'ref-04',
    category: 'tu_dien',
    title: 'Từ điển chữ Nôm dẫn giải',
    authorOrIssuer: 'GS. Nguyễn Quang Hồng (Chủ biên)',
    publisherOrOrg: 'Nhà xuất bản Khoa học Xã hội, Hà Nội',
    year: '2014',
    accessDate: '16/10/2026',
    description: 'Nguồn tư liệu quý giá đối chiếu các từ thuần Nôm mộc mạc như Sen, Lúa, Mây, Nắng, Sương trong văn hóa Đại Việt.'
  },
  {
    id: 'ref-05',
    category: 'sach',
    title: 'Kho tàng Ca dao người Việt (Trọn bộ 4 tập)',
    authorOrIssuer: 'Nguyễn Xuân Kính, Phan Đăng Nhật (Chủ biên)',
    publisherOrOrg: 'Nhà xuất bản Văn hóa Thông tin',
    year: '2001',
    accessDate: '16/10/2026',
    description: 'Tuyển tập hàng ngàn câu ca dao, dân ca 3 miền Bắc – Trung – Nam làm ngữ cảnh trích dẫn văn hóa và hồn cốt dân tộc.'
  },
  {
    id: 'ref-06',
    category: 'phap_luat',
    title: 'Bộ luật Dân sự số 91/2015/QH13',
    authorOrIssuer: 'Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    publisherOrOrg: 'Ban hành ngày 24/11/2015, có hiệu lực ngày 01/01/2017',
    year: '2015',
    accessDate: '16/10/2026',
    description: 'Quy định pháp lý tối cao về Quyền nhân thân đối với Họ, Chữ đệm và Tên của công dân Việt Nam.',
    legalArticles: [
      'Điều 26: Quyền có họ, tên — Cá nhân có quyền có họ, tên. Họ, tên của một người được xác định theo họ, tên khai sinh của người đó.',
      'Khoản 3 Điều 26: Tên của công dân Việt Nam phải bằng tiếng Việt hoặc tiếng dân tộc khác của Việt Nam; không đặt tên bằng số, bằng một ký tự mà không phải là chữ.',
      'Khoản 1 Điều 26: Việc đặt tên bị hạn chế trong trường hợp xâm phạm đến quyền, lợi ích hợp pháp của người khác hoặc trái với các nguyên tắc cơ bản của pháp luật dân sự.'
    ],
    url: 'https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=96404'
  },
  {
    id: 'ref-07',
    category: 'phap_luat',
    title: 'Luật Hộ tịch số 60/2014/QH13',
    authorOrIssuer: 'Quốc hội nước CHXHCN Việt Nam',
    publisherOrOrg: 'Ban hành ngày 20/11/2014, có hiệu lực ngày 01/01/2016',
    year: '2014',
    accessDate: '16/10/2026',
    description: 'Quy định về thủ tục đăng ký khai sinh, đặt họ tên cho trẻ em, quyền xác định dân tộc và thẩm quyền của cơ quan hộ tịch.',
    legalArticles: [
      'Điều 14: Nội dung đăng ký khai sinh bao gồm Họ, chữ đệm và tên của người được đăng ký khai sinh.',
      'Điều 15: Trách nhiệm đăng ký khai sinh trong thời hạn 60 ngày kể từ ngày sinh con.'
    ],
    url: 'https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=68641'
  },
  {
    id: 'ref-08',
    category: 'phap_luat',
    title: 'Thông tư số 04/2020/TT-BTP',
    authorOrIssuer: 'Bộ Tư pháp nước CHXHCN Việt Nam',
    publisherOrOrg: 'Ban hành ngày 28/05/2020, có hiệu lực ngày 16/07/2020',
    year: '2020',
    accessDate: '16/10/2026',
    description: 'Quy định chi tiết thi hành một số điều của Luật Hộ tịch và Nghị định 123/2015/NĐ-CP về đăng ký khai sinh.',
    legalArticles: [
      'Điều 6: Việc đặt tên cho trẻ em phải phù hợp với pháp luật và yêu cầu giữ gìn bản sắc dân tộc, tập quán, truyền thống văn hóa tốt đẹp của Việt Nam; không đặt tên quá dài, khó sử dụng.'
    ],
    url: 'https://moj.gov.vn'
  },
  {
    id: 'ref-09',
    category: 'website',
    title: 'Cổng thông tin điện tử Bộ Tư pháp (Hệ thống Văn bản QPPL)',
    authorOrIssuer: 'Bộ Tư pháp Việt Nam',
    publisherOrOrg: 'Bộ Tư pháp (moj.gov.vn)',
    year: '2026',
    accessDate: '16/10/2026',
    description: 'Cơ sở dữ liệu pháp luật chính thức quốc gia phục vụ tra cứu quy định hộ tịch và quyền dân sự.',
    url: 'https://moj.gov.vn'
  }
];

export const LEGAL_DISCLAIMER_VI = 
  'Lưu ý quan trọng: Thông tin tra cứu, giải nghĩa và gợi ý đặt tên trong ứng dụng chỉ mang tính chất tham khảo về văn hóa, lịch sử và ngôn ngữ học; không thay thế cho các văn bản pháp luật chính thức hoặc quyết định của cơ quan đăng ký hộ tịch có thẩm quyền theo quy định của pháp luật Việt Nam.';

export const LEGAL_DISCLAIMER_EN = 
  'Important Notice: The research, naming suggestions, and etymological explanations provided in this application are for cultural, historical, and linguistic reference only; they do not replace official legal documents or decisions made by competent civil registry authorities under Vietnamese Law.';
