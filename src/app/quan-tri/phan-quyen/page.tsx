"use client";

import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";
import Breadcrumb, { PermissionBreadcrumbs } from "@/components/ui/Breadcrumb";

const data = [
  { id: "PQ001", vai_tro: "Quản trị viên", module: "Sản phẩm", xem: true, tao: true, sua: true, xoa: true, phe_duyet: true, ngay_cap_nhat: "01/01/2024", trang_thai: "active" },
  { id: "PQ002", vai_tro: "Quản trị viên", module: "Sự kiện truy xuất", xem: true, tao: true, sua: true, xoa: true, phe_duyet: true, ngay_cap_nhat: "01/01/2024", trang_thai: "active" },
  { id: "PQ003", vai_tro: "Quản trị viên", module: "Tem nhãn (UID/QR)", xem: true, tao: true, sua: true, xoa: true, phe_duyet: true, ngay_cap_nhat: "01/01/2024", trang_thai: "active" },
  { id: "PQ004", vai_tro: "Quản trị viên", module: "Chứng chỉ", xem: true, tao: true, sua: true, xoa: true, phe_duyet: true, ngay_cap_nhat: "01/01/2024", trang_thai: "active" },
  { id: "PQ005", vai_tro: "Quản trị viên", module: "Báo cáo", xem: true, tao: true, sua: true, xoa: true, phe_duyet: true, ngay_cap_nhat: "01/01/2024", trang_thai: "active" },
  { id: "PQ006", vai_tro: "Quản trị viên", module: "Quản trị người dùng", xem: true, tao: true, sua: true, xoa: true, phe_duyet: true, ngay_cap_nhat: "01/01/2024", trang_thai: "active" },
  { id: "PQ007", vai_tro: "Quản trị viên", module: "Tích hợp API", xem: true, tao: true, sua: true, xoa: true, phe_duyet: true, ngay_cap_nhat: "01/01/2024", trang_thai: "active" },
  { id: "PQ008", vai_tro: "Quản lý", module: "Sản phẩm", xem: true, tao: true, sua: true, xoa: false, phe_duyet: true, ngay_cap_nhat: "15/01/2024", trang_thai: "active" },
  { id: "PQ009", vai_tro: "Quản lý", module: "Sự kiện truy xuất", xem: true, tao: true, sua: true, xoa: false, phe_duyet: true, ngay_cap_nhat: "15/01/2024", trang_thai: "active" },
  { id: "PQ010", vai_tro: "Quản lý", module: "Tem nhãn (UID/QR)", xem: true, tao: true, sua: true, xoa: false, phe_duyet: false, ngay_cap_nhat: "15/01/2024", trang_thai: "active" },
  { id: "PQ011", vai_tro: "Quản lý", module: "Chứng chỉ", xem: true, tao: true, sua: true, xoa: false, phe_duyet: true, ngay_cap_nhat: "15/01/2024", trang_thai: "active" },
  { id: "PQ012", vai_tro: "Quản lý", module: "Báo cáo", xem: true, tao: true, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "15/01/2024", trang_thai: "active" },
  { id: "PQ013", vai_tro: "Kiểm định viên", module: "Sản phẩm", xem: true, tao: false, sua: false, xoa: false, phe_duyet: true, ngay_cap_nhat: "20/01/2024", trang_thai: "active" },
  { id: "PQ014", vai_tro: "Kiểm định viên", module: "Sự kiện truy xuất", xem: true, tao: false, sua: false, xoa: false, phe_duyet: true, ngay_cap_nhat: "20/01/2024", trang_thai: "active" },
  { id: "PQ015", vai_tro: "Kiểm định viên", module: "Tem nhãn (UID/QR)", xem: true, tao: false, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "20/01/2024", trang_thai: "active" },
  { id: "PQ016", vai_tro: "Kiểm định viên", module: "Chứng chỉ", xem: true, tao: false, sua: false, xoa: false, phe_duyet: true, ngay_cap_nhat: "20/01/2024", trang_thai: "active" },
  { id: "PQ017", vai_tro: "Nhân viên nhập liệu", module: "Sản phẩm", xem: true, tao: true, sua: true, xoa: false, phe_duyet: false, ngay_cap_nhat: "01/02/2024", trang_thai: "active" },
  { id: "PQ018", vai_tro: "Nhân viên nhập liệu", module: "Sự kiện truy xuất", xem: true, tao: true, sua: true, xoa: false, phe_duyet: false, ngay_cap_nhat: "01/02/2024", trang_thai: "active" },
  { id: "PQ019", vai_tro: "Nhân viên nhập liệu", module: "Tem nhãn (UID/QR)", xem: true, tao: true, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "01/02/2024", trang_thai: "active" },
  { id: "PQ020", vai_tro: "Nhân viên nhập liệu", module: "Chứng chỉ", xem: true, tao: true, sua: true, xoa: false, phe_duyet: false, ngay_cap_nhat: "01/02/2024", trang_thai: "active" },
  { id: "PQ021", vai_tro: "Đối tác", module: "Sản phẩm", xem: true, tao: false, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "15/02/2024", trang_thai: "active" },
  { id: "PQ022", vai_tro: "Đối tác", module: "Sự kiện truy xuất", xem: true, tao: false, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "15/02/2024", trang_thai: "active" },
  { id: "PQ023", vai_tro: "Đối tác", module: "Tích hợp API", xem: true, tao: true, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "15/02/2024", trang_thai: "active" },
  { id: "PQ024", vai_tro: "Người xem", module: "Sản phẩm", xem: true, tao: false, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "01/03/2024", trang_thai: "active" },
  { id: "PQ025", vai_tro: "Người xem", module: "Sự kiện truy xuất", xem: true, tao: false, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "01/03/2024", trang_thai: "active" },
  { id: "PQ026", vai_tro: "Người xem", module: "Chứng chỉ", xem: true, tao: false, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "01/03/2024", trang_thai: "active" },
  { id: "PQ027", vai_tro: "Quản trị viên", module: "Dashboard", xem: true, tao: true, sua: true, xoa: true, phe_duyet: true, ngay_cap_nhat: "10/03/2024", trang_thai: "active" },
  { id: "PQ028", vai_tro: "Quản lý", module: "Dashboard", xem: true, tao: false, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "10/03/2024", trang_thai: "active" },
  { id: "PQ029", vai_tro: "Cán bộ quản lý", module: "Báo cáo & phân tích", xem: true, tao: true, sua: true, xoa: false, phe_duyet: true, ngay_cap_nhat: "20/03/2024", trang_thai: "active" },
  { id: "PQ030", vai_tro: "Cán bộ quản lý", module: "Cảnh báo rủi ro", xem: true, tao: true, sua: true, xoa: false, phe_duyet: true, ngay_cap_nhat: "10/04/2024", trang_thai: "active" },
  { id: "PQ031", vai_tro: "Chuyên gia kỹ thuật", module: "Tích hợp API", xem: true, tao: true, sua: true, xoa: true, phe_duyet: false, ngay_cap_nhat: "01/04/2024", trang_thai: "active" },
  { id: "PQ032", vai_tro: "Chuyên gia kỹ thuật", module: "Webhook", xem: true, tao: true, sua: true, xoa: true, phe_duyet: false, ngay_cap_nhat: "10/04/2024", trang_thai: "active" },
  { id: "PQ033", vai_tro: "Chuyên gia kỹ thuật", module: "Transaction API", xem: true, tao: true, sua: true, xoa: true, phe_duyet: false, ngay_cap_nhat: "01/04/2024", trang_thai: "active" },
  { id: "PQ034", vai_tro: "Quản trị viên", module: "Cài đặt hệ thống", xem: true, tao: true, sua: true, xoa: true, phe_duyet: true, ngay_cap_nhat: "01/04/2024", trang_thai: "active" },
  { id: "PQ035", vai_tro: "Quản trị viên", module: "Nhật ký hoạt động", xem: true, tao: false, sua: false, xoa: false, phe_duyet: false, ngay_cap_nhat: "10/04/2024", trang_thai: "active" },
];

const roleColors: Record<string, "success" | "info" | "warning" | "neutral" | "danger"> = {
  "Quản trị viên": "danger",
  "Quản lý": "warning",
  "Kiểm định viên": "info",
  "Nhân viên nhập liệu": "success",
  "Đối tác": "neutral",
  "Người xem": "neutral",
  "Cán bộ quản lý": "info",
  "Chuyên gia kỹ thuật": "warning",
};

const PermissionBadge = ({ allowed, label }: { allowed: boolean; label: string }) => (
  <Badge variant={allowed ? "success" : "neutral"}>
    {allowed ? label : "—"}
  </Badge>
);

const columns = [
  { key: "id", label: "Mã", width: "80px" },
  {
    key: "vai_tro",
    label: "Vai trò",
    render: (row: Record<string, unknown>) => (
      <Badge variant={roleColors[row.vai_tro as string] ?? "neutral"}>{row.vai_tro as string}</Badge>
    ),
    width: "150px",
  },
  { key: "module", label: "Module", width: "180px" },
  {
    key: "xem",
    label: "Xem",
    render: (row: Record<string, unknown>) => (
      <span className="text-green-600 font-semibold text-center block">{(row.xem as boolean) ? "✓" : "—"}</span>
    ),
    width: "60px",
  },
  {
    key: "tao",
    label: "Tạo",
    render: (row: Record<string, unknown>) => (
      <span className="text-green-600 font-semibold text-center block">{(row.tao as boolean) ? "✓" : "—"}</span>
    ),
    width: "60px",
  },
  {
    key: "sua",
    label: "Sửa",
    render: (row: Record<string, unknown>) => (
      <span className="text-green-600 font-semibold text-center block">{(row.sua as boolean) ? "✓" : "—"}</span>
    ),
    width: "60px",
  },
  {
    key: "xoa",
    label: "Xóa",
    render: (row: Record<string, unknown>) => (
      <span className="text-green-600 font-semibold text-center block">{(row.xoa as boolean) ? "✓" : "—"}</span>
    ),
    width: "60px",
  },
  {
    key: "phe_duyet",
    label: "Phê duyệt",
    render: (row: Record<string, unknown>) => (
      <span className="text-green-600 font-semibold text-center block">{(row.phe_duyet as boolean) ? "✓" : "—"}</span>
    ),
    width: "80px",
  },
  { key: "ngay_cap_nhat", label: "Ngày cập nhật", width: "130px" },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "active" ? "success" : "neutral"}>
        {row.trang_thai === "active" ? "Hoạt động" : "Vô hiệu"}
      </Badge>
    ),
    width: "110px",
  },
];

export default function Page() {
  const router = useRouter();

  const handleRowClick = (row: Record<string, unknown>) => {
    router.push(`/quan-tri/phan-quyen/chi-tiet?id=${row.id as string}`);
  };

  const handleAddClick = () => {
    router.push("/quan-tri/phan-quyen/them-moi");
  };

  return (
    <DashboardLayout>
      <Breadcrumb items={PermissionBreadcrumbs.list} />

      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Phân quyền</h1>
        <p className="text-sm text-gray-500 mt-1">Quản lý quyền truy cập cho vai trò và module trong hệ thống</p>
      </div>

      <SectionPage
        showHeader={false}
        stats={[
          { label: "Tổng phân quyền", value: data.length, variant: "info" },
          { label: "Đang hoạt động", value: data.filter((d) => d.trang_thai === "active").length, variant: "success" },
          { label: "Vai trò khác nhau", value: "8", variant: "warning" },
          { label: "Module", value: "8", variant: "neutral" },
        ]}
        tableColumns={columns}
        tableData={data}
        searchKeys={["id", "vai_tro", "module"]}
        addLabel="Thêm phân quyền"
        searchable
        onRowClick={handleRowClick}
        actionButton={
          <button
            onClick={handleAddClick}
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl px-4 py-2 transition-colors"
          >
            Thêm phân quyền
          </button>
        }
      />
    </DashboardLayout>
  );
}
