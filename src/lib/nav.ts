export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    children: [
      { label: "Tổng quan", href: "/dashboard" },
      { label: "Chỉ số hoạt động", href: "/dashboard/chi-so" },
      { label: "Cảnh báo", href: "/dashboard/canh-bao" },
    ],
  },
  {
    label: "Mô hình AI",
    href: "/ai-model",
    children: [
      { label: "Danh sách mô hình", href: "/ai-model/danh-sach" },
      { label: "Đào tạo mới", href: "/ai-model/dao-tao" },
      { label: "Fine-tuning", href: "/ai-model/fine-tuning" },
      { label: "Đánh giá mô hình", href: "/ai-model/danh-gia" },
    ],
  },
  {
    label: "Quản trị hệ thống",
    href: "/quan-tri",
    children: [
      { label: "Đối tác", href: "/quan-tri/doi-tac" },
      { label: "Người dùng", href: "/quan-tri/nguoi-dung" },
      { label: "Phân quyền", href: "/quan-tri/phan-quyen" },
    ],
  },
  {
    label: "Danh mục hệ thống",
    href: "/danh-muc",
    children: [
      { label: "Nhóm dữ liệu", href: "/danh-muc/nhom-du-lieu" },
      { label: "Loại mô hình", href: "/danh-muc/loai-mo-hinh" },
      { label: "Thư viện mẫu", href: "/danh-muc/thu-vien-mau" },
    ],
  },
  {
    label: "Tích hợp hệ thống",
    href: "/tich-hop",
    children: [
      { label: "API Keys", href: "/tich-hop/api-keys" },
      { label: "Webhooks", href: "/tich-hop/webhook" },
      { label: "Nhật ký giao dịch", href: "/tich-hop/transaction" },
    ],
  },
];
