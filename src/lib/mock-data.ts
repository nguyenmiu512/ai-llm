// Shared mock data for all pages

export const companies = Array.from({ length: 30 }, (_, i) => ({
  id: `DN${String(i + 1).padStart(4, "0")}`,
  name: [
    "Công ty CP Nông sản Việt",
    "TNHH Thực phẩm Sạch",
    "HTX Nông nghiệp Xanh",
    "Công ty TNHH Rau củ Miền Bắc",
    "Trang trại Hữu Cơ Việt",
    "Công ty CP Thủy sản Sạch",
    "HTX Cà phê Tây Nguyên",
  ][i % 7],
  type: ["Công ty CP", "TNHH", "HTX", "Doanh nghiệp tư nhân"][i % 4],
  province: ["Hà Nội", "TP.HCM", "Đà Nẵng", "Cần Thơ", "Lâm Đồng", "Nghệ An", "Bình Dương"][i % 7],
  status: ["active", "pending", "inactive"][i % 3],
  taxCode: `010${i + 1}00000${i + 1}`,
  phone: `0912${String(i + 1).padStart(6, "0")}`,
  products: 5 + i * 2,
  createdAt: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, "0")}`,
}));

export const products = Array.from({ length: 40 }, (_, i) => ({
  id: `SP${String(i + 1).padStart(5, "0")}`,
  name: [
    "Gạo ST25",
    "Cà phê Robusta",
    "Chè Thái Nguyên",
    "Cá tra phi lê",
    "Tôm thẻ chân trắng",
    "Xoài cát Hòa Lộc",
    "Thanh long ruột đỏ",
    "Mít Thái",
  ][i % 8],
  category: ["Nông sản", "Thủy sản", "Thực phẩm chế biến", "Đồ uống"][i % 4],
  unit: ["kg", "tấn", "thùng", "lốc"][i % 4],
  company: companies[i % companies.length].name,
  status: ["active", "pending", "inactive"][i % 3],
  batchCount: Math.floor(3 + i * 0.8),
  createdAt: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, "0")}`,
}));

export const certifications = Array.from({ length: 20 }, (_, i) => ({
  id: `CN${String(i + 1).padStart(4, "0")}`,
  name: ["VietGAP", "GlobalGAP", "HACCP", "ISO 22000", "Organic", "ASC"][i % 6],
  entity: companies[i % companies.length].name,
  type: ["Sản xuất", "Chế biến", "Vận chuyển"][i % 3],
  issuedAt: `2024-0${(i % 9) + 1}-15`,
  expiresAt: `2026-0${(i % 9) + 1}-15`,
  status: ["valid", "expiring", "expired"][i % 3],
  issuer: ["Cục BVTV", "SGS Việt Nam", "Bureau Veritas"][i % 3],
}));

export const alerts = Array.from({ length: 20 }, (_, i) => ({
  id: `CB${String(i + 1).padStart(4, "0")}`,
  title: [
    "Chứng nhận sắp hết hạn",
    "Phát hiện sản phẩm không rõ nguồn gốc",
    "Doanh nghiệp chưa cập nhật hồ sơ",
    "Sự kiện chuỗi cung ứng bất thường",
    "Lô hàng vi phạm quy định",
  ][i % 5],
  entity: companies[i % companies.length].name,
  level: ["high", "medium", "low"][i % 3],
  status: ["open", "processing", "resolved"][i % 3],
  createdAt: `2026-03-0${(i % 8) + 1}`,
}));

export const users = Array.from({ length: 15 }, (_, i) => ({
  id: `US${String(i + 1).padStart(4, "0")}`,
  name: ["Nguyễn Văn An", "Trần Thị Bình", "Lê Minh Cường", "Phạm Thị Dung", "Hoàng Văn Em"][i % 5],
  email: `user${i + 1}@tracechain.vn`,
  role: ["Quản trị viên", "Kiểm định viên", "Nhân viên", "Giám sát viên"][i % 4],
  department: ["Ban CNTT", "Ban Kiểm định", "Ban Quản lý", "Ban Giám sát"][i % 4],
  status: ["active", "inactive"][i % 2],
  lastLogin: `2026-03-0${(i % 8) + 1} ${8 + (i % 10)}:${String(i % 60).padStart(2, "0")}`,
}));

export const chains = Array.from({ length: 15 }, (_, i) => ({
  id: `CCU${String(i + 1).padStart(4, "0")}`,
  name: `Chuỗi ${["Gạo", "Cà phê", "Chè", "Cá tra", "Tôm"][i % 5]} ${String.fromCharCode(65 + i)}`,
  product: products[i % products.length].name,
  nodes: 3 + (i % 6),
  events: 12 + i * 3,
  status: ["active", "paused", "completed"][i % 3],
  startDate: `2024-0${(i % 9) + 1}-01`,
}));

export const batches = Array.from({ length: 25 }, (_, i) => ({
  id: `LH${String(i + 1).padStart(5, "0")}`,
  product: products[i % products.length].name,
  company: companies[i % companies.length].name,
  quantity: `${(10 + i * 5)} kg`,
  status: ["in-transit", "warehouse", "delivered", "recalled"][i % 4],
  productionDate: `2025-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
  expiryDate: `2026-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
}));
