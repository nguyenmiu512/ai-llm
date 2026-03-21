"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { Plus, Search } from "lucide-react";

const allData: Record<string, unknown>[] = [
  { soHoSo: "TCB-2025-00234", tenSanPham: "Nước uống tinh khiết Aqua Pure 500ml", donViCongBo: "Công ty TNHH Nước uống Ánh Dương", ngayNop: "05/01/2025", ngayHetHan: "05/01/2028", nhomNganhHang: "Nước uống đóng chai", phuongXa: "P. Bình Long", trangThai: "Đã xác nhận" },
  { soHoSo: "TCB-2025-00241", tenSanPham: "Bánh quy bơ thơm hộp 400g", donViCongBo: "Nhà máy bánh kẹo Hương Sen", ngayNop: "07/01/2025", ngayHetHan: "07/01/2028", nhomNganhHang: "Bánh kẹo", phuongXa: "P. Tân Thành", trangThai: "Đã xác nhận" },
  { soHoSo: "TCB-2025-00258", tenSanPham: "Nước mắm cá cơm 40 độ đạm chai 500ml", donViCongBo: "Cơ sở sản xuất nước mắm Phú Quốc", ngayNop: "10/01/2025", ngayHetHan: "10/01/2028", nhomNganhHang: "Gia vị", phuongXa: "P. Nguyễn Kiệm", trangThai: "Đang xử lý" },
  { soHoSo: "TCB-2025-00267", tenSanPham: "Sữa chua uống hương dâu 180ml", donViCongBo: "Công ty CP Sữa Việt Nam", ngayNop: "12/01/2025", ngayHetHan: "12/01/2028", nhomNganhHang: "Sản phẩm từ sữa", phuongXa: "P. Đa Kao", trangThai: "Đã xác nhận" },
  { soHoSo: "TCB-2025-00289", tenSanPham: "Xúc xích heo tiệt trùng 1kg", donViCongBo: "Công ty CP Thực phẩm Đông Lạnh Mê Kông", ngayNop: "15/01/2025", ngayHetHan: "15/01/2028", nhomNganhHang: "Thịt chế biến", phuongXa: "P. Tân Bình", trangThai: "Đã tiếp nhận" },
  { soHoSo: "TCB-2025-00312", tenSanPham: "Mì ăn liền vị bò gầm 75g", donViCongBo: "Công ty Cổ phần Mì Hảo Hảo", ngayNop: "18/01/2025", ngayHetHan: "18/01/2028", nhomNganhHang: "Mì, cháo, phở ăn liền", phuongXa: "P. Bến Thành", trangThai: "Đã xác nhận" },
  { soHoSo: "TCB-2025-00334", tenSanPham: "Tương ớt sa tế 250g", donViCongBo: "Cơ sở sản xuất Gia vị Bà Ngoại", ngayNop: "20/01/2025", ngayHetHan: "01/04/2026", nhomNganhHang: "Gia vị", phuongXa: "P. Cô Giang", trangThai: "Đang xử lý" },
  { soHoSo: "TCB-2025-00356", tenSanPham: "Trà xanh Matcha latte bột hòa tan 200g", donViCongBo: "Công ty TNHH Thực phẩm Sài Gòn Xanh", ngayNop: "22/01/2025", ngayHetHan: "22/01/2028", nhomNganhHang: "Đồ uống", phuongXa: "P. Nguyễn Văn Linh", trangThai: "Đã tiếp nhận" },
  { soHoSo: "TCB-2025-00378", tenSanPham: "Dầu ăn thực vật Neptune 1 lít", donViCongBo: "Công ty CP Dầu ăn Việt Nam", ngayNop: "25/01/2025", ngayHetHan: "25/01/2028", nhomNganhHang: "Dầu ăn", phuongXa: "P. Tân Định", trangThai: "Đã xác nhận" },
  { soHoSo: "TCB-2025-00401", tenSanPham: "Bánh phồng tôm Sa Giang 200g", donViCongBo: "Xí nghiệp Chế biến Thực phẩm Đồng Tháp", ngayNop: "28/01/2025", ngayHetHan: "08/04/2026", nhomNganhHang: "Bánh kẹo", phuongXa: "P. Bình Tân", trangThai: "Từ chối" },
  { soHoSo: "TCB-2025-00423", tenSanPham: "Nước tương đậu nành 350ml", donViCongBo: "Công ty TNHH Chinsu Masan", ngayNop: "01/02/2025", ngayHetHan: "01/02/2028", nhomNganhHang: "Gia vị", phuongXa: "P. Bến Nghé", trangThai: "Đã xác nhận" },
  { soHoSo: "TCB-2025-00445", tenSanPham: "Trà sữa túi lọc vị oolong 25 gói", donViCongBo: "Chuỗi Cà phê Sáng Việt", ngayNop: "05/02/2025", ngayHetHan: "05/02/2028", nhomNganhHang: "Đồ uống", phuongXa: "P. Đinh Tiên Hoàng", trangThai: "Đang xử lý" },
  { soHoSo: "TCB-2025-00467", tenSanPham: "Đường cát trắng 1kg", donViCongBo: "Công ty CP Đường Biên Hòa", ngayNop: "08/02/2025", ngayHetHan: "08/02/2028", nhomNganhHang: "Đường", phuongXa: "P. An Bình", trangThai: "Đã xác nhận" },
  { soHoSo: "TCB-2025-00489", tenSanPham: "Cháo ăn liền hương vị cá hồi 50g", donViCongBo: "Công ty Cổ phần Thực phẩm Acecook", ngayNop: "10/02/2025", ngayHetHan: "10/02/2028", nhomNganhHang: "Mì, cháo, phở ăn liền", phuongXa: "P. Hiệp Bình Phước", trangThai: "Từ chối" },
  { soHoSo: "TCB-2025-00512", tenSanPham: "Snack khoai tây vị tôm cay 60g", donViCongBo: "Nhà máy bánh kẹo Hương Sen", ngayNop: "12/02/2025", ngayHetHan: "12/02/2028", nhomNganhHang: "Bánh kẹo", phuongXa: "P. Tân Thành", trangThai: "Đã tiếp nhận" },
  { soHoSo: "TCB-2023-00891", tenSanPham: "Nước mắm cá cơm 40 độ đạm đặc biệt", donViCongBo: "Cơ sở nước mắm Phú Quốc", ngayNop: "20/03/2023", ngayHetHan: "20/03/2026", nhomNganhHang: "Gia vị", phuongXa: "P. Nguyễn Kiệm", trangThai: "Đã xác nhận" },
  { soHoSo: "TCB-2022-00456", tenSanPham: "Mì gạo lứt hữu cơ 500g", donViCongBo: "Công ty TNHH Thực phẩm Xanh", ngayNop: "15/06/2022", ngayHetHan: "10/02/2026", nhomNganhHang: "Mì, cháo, phở ăn liền", phuongXa: "P. Đa Kao", trangThai: "Đã xác nhận" },
  { soHoSo: "TCB-2022-00512", tenSanPham: "Đường thốt nốt An Giang 500g", donViCongBo: "HTX Nông nghiệp An Phú", ngayNop: "01/08/2022", ngayHetHan: "05/01/2026", nhomNganhHang: "Đường", phuongXa: "P. An Bình", trangThai: "Đã xác nhận" },
];

const nhomOptions = [...new Set(allData.map((d) => String(d.nhomNganhHang)))].sort();
const phuongOptions = [...new Set(allData.map((d) => String(d.phuongXa)))].sort();

const columns = [
  { key: "soHoSo", label: "Số hồ sơ", sortable: true },
  { key: "tenSanPham", label: "Tên sản phẩm", sortable: true },
  { key: "donViCongBo", label: "Đơn vị công bố" },
  { key: "nhomNganhHang", label: "Nhóm ngành hàng", sortable: true },
  { key: "phuongXa", label: "Phường/Xã", sortable: true },
  { key: "ngayNop", label: "Ngày nộp" },
  { key: "ngayHetHan", label: "Ngày hết hạn" },
  {
    key: "trangThai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const val = String(row.trangThai);
      const variant = val === "Đã xác nhận" ? "success" : val === "Đang xử lý" ? "info" : val === "Đã tiếp nhận" ? "neutral" : "danger";
      return <Badge variant={variant as "success" | "info" | "neutral" | "danger"}>{val}</Badge>;
    },
  },
];

export default function DanhSachTuCongBoPage() {
  const [nhom, setNhom] = useState("");
  const [phuong, setPhuong] = useState("");

  const filtered = allData.filter((d) => {
    if (nhom && d.nhomNganhHang !== nhom) return false;
    if (phuong && d.phuongXa !== phuong) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Hồ sơ tự công bố"
        subtitle="Danh sách, tra cứu theo nhóm ngành hàng và phường/xã"
        action={
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            <Plus size={16} />
            Nhập hồ sơ
          </button>
        }
      />

      {/* Bộ lọc tra cứu */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Search size={15} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Tra cứu hồ sơ</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Nhóm ngành hàng</label>
            <select
              value={nhom}
              onChange={(e) => setNhom(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 outline-none focus:border-brand-400"
            >
              <option value="">Tất cả nhóm ngành hàng</option>
              {nhomOptions.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Phường/Xã</label>
            <select
              value={phuong}
              onChange={(e) => setPhuong(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 outline-none focus:border-brand-400"
            >
              <option value="">Tất cả phường/xã</option>
              {phuongOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        {(nhom || phuong) && (
          <button
            onClick={() => { setNhom(""); setPhuong(""); }}
            className="mt-2 text-xs text-brand-600 hover:text-brand-700 font-medium"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchable
        searchKeys={["soHoSo", "tenSanPham", "donViCongBo", "nhomNganhHang", "phuongXa"]}
      />
    </DashboardLayout>
  );
}
