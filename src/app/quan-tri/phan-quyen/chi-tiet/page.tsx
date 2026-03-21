"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import Breadcrumb, { PermissionBreadcrumbs } from "@/components/ui/Breadcrumb";
import { Save, X, Check } from "lucide-react";

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

export default function Page() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "PQ001",
    vai_tro: "Quản trị viên",
    module: "Sản phẩm",
    xem: true,
    tao: true,
    sua: true,
    xoa: true,
    phe_duyet: true,
    ngay_cap_nhat: "01/01/2024",
    trang_thai: "active" as "active" | "inactive",
  });

  const handleSave = () => {
    // Here you would save to API
    console.log("Saving:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <Breadcrumb items={PermissionBreadcrumbs.detail(formData.id)} />

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Chi tiết phân quyền</h1>
            <p className="text-sm text-gray-500 mt-1">Xem và chỉnh sửa quyền truy cập cho vai trò</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl px-4 py-2 transition-colors"
            >
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-2 transition-colors"
              >
                <X size={14} />
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl px-4 py-2 transition-colors"
              >
                <Save size={14} />
                Lưu thay đổi
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Thông tin phân quyền</h2>
          </div>
          <div className="p-5 space-y-6">
            {/* Mã phân quyền */}
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">Mã phân quyền</label>
              <input
                type="text"
                value={formData.id}
                disabled
                className="w-full px-4 py-2.5 text-[14px] rounded-xl border border-gray-200 bg-gray-50 text-gray-400"
              />
            </div>

            {/* Vai trò */}
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">Vai trò</label>
              {isEditing ? (
                <select
                  value={formData.vai_tro}
                  onChange={(e) => setFormData({ ...formData, vai_tro: e.target.value })}
                  className="w-full px-4 py-2.5 text-[14px] rounded-xl border border-gray-200 outline-none focus:border-brand-400 transition-colors"
                >
                  <option value="Quản trị viên">Quản trị viên</option>
                  <option value="Quản lý">Quản lý</option>
                  <option value="Kiểm định viên">Kiểm định viên</option>
                  <option value="Nhân viên nhập liệu">Nhân viên nhập liệu</option>
                  <option value="Đối tác">Đối tác</option>
                  <option value="Người xem">Người xem</option>
                  <option value="Cán bộ quản lý">Cán bộ quản lý</option>
                  <option value="Chuyên gia kỹ thuật">Chuyên gia kỹ thuật</option>
                </select>
              ) : (
                <div className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50">
                  <Badge variant={roleColors[formData.vai_tro] ?? "neutral"}>{formData.vai_tro}</Badge>
                </div>
              )}
            </div>

            {/* Module */}
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">Module</label>
              {isEditing ? (
                <select
                  value={formData.module}
                  onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                  className="w-full px-4 py-2.5 text-[14px] rounded-xl border border-gray-200 outline-none focus:border-brand-400 transition-colors"
                >
                  <option value="Sản phẩm">Sản phẩm</option>
                  <option value="Sự kiện truy xuất">Sự kiện truy xuất</option>
                  <option value="Tem nhãn (UID/QR)">Tem nhãn (UID/QR)</option>
                  <option value="Chứng chỉ">Chứng chỉ</option>
                  <option value="Báo cáo">Báo cáo</option>
                  <option value="Quản trị người dùng">Quản trị người dùng</option>
                  <option value="Tích hợp API">Tích hợp API</option>
                  <option value="Dashboard">Dashboard</option>
                  <option value="Cài đặt hệ thống">Cài đặt hệ thống</option>
                </select>
              ) : (
                <div className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700">
                  {formData.module}
                </div>
              )}
            </div>

            {/* Permissions Grid */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-[14px] font-medium text-gray-700 mb-4">Quyền hạn</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { key: "xem", label: "Xem" },
                  { key: "tao", label: "Tạo" },
                  { key: "sua", label: "Sửa" },
                  { key: "xoa", label: "Xóa" },
                  { key: "phe_duyet", label: "Phê duyệt" },
                ].map((perm) => (
                  <div key={perm.key} className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors ${
                      formData[perm.key as keyof typeof formData] ? "bg-green-500 border-green-500" : "border-gray-300"
                    }`}>
                      {formData[perm.key as keyof typeof formData] && <Check size={14} className="text-white" />}
                    </div>
                    <label className="text-[14px] text-gray-700">{perm.label}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Ngày cập nhật */}
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">Ngày cập nhật</label>
              <input
                type="text"
                value={formData.ngay_cap_nhat}
                disabled
                className="w-full px-4 py-2.5 text-[14px] rounded-xl border border-gray-200 bg-gray-50 text-gray-400"
              />
            </div>

            {/* Trạng thái */}
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">Trạng thái</label>
              {isEditing ? (
                <select
                  value={formData.trang_thai}
                  onChange={(e) => setFormData({ ...formData, trang_thai: e.target.value as "active" | "inactive" })}
                  className="w-full px-4 py-2.5 text-[14px] rounded-xl border border-gray-200 outline-none focus:border-brand-400 transition-colors"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Vô hiệu</option>
                </select>
              ) : (
                <div className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50">
                  <Badge variant={formData.trang_thai === "active" ? "success" : "neutral"}>
                    {formData.trang_thai === "active" ? "Hoạt động" : "Vô hiệu"}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel - Summary */}
        <div className="space-y-6">
          {/* Role Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Tổng quan quyền</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-600">Số quyền được cấp</span>
                <span className="text-[14px] font-semibold text-brand-600">
                  {[formData.xem, formData.tao, formData.sua, formData.xoa, formData.phe_duyet].filter(Boolean).length}/5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-600">Mức độ quyền</span>
                <Badge variant={
                  [formData.xem, formData.tao, formData.sua, formData.xoa, formData.phe_duyet].filter(Boolean).length >= 4 ? "danger" :
                  [formData.xem, formData.tao, formData.sua, formData.xoa, formData.phe_duyet].filter(Boolean).length >= 3 ? "warning" :
                  [formData.xem, formData.tao, formData.sua, formData.xoa, formData.phe_duyet].filter(Boolean).length >= 2 ? "info" :
                  "neutral"
                }>
                  {[formData.xem, formData.tao, formData.sua, formData.xoa, formData.phe_duyet].filter(Boolean).length >= 4 ? "Toàn quyền" :
                   [formData.xem, formData.tao, formData.sua, formData.xoa, formData.phe_duyet].filter(Boolean).length >= 3 ? "Quản lý" :
                   [formData.xem, formData.tao, formData.sua, formData.xoa, formData.phe_duyet].filter(Boolean).length >= 2 ? "Hạn chế" :
                   "Chỉ xem"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Similar Permissions */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Phân quyền liên quan</h2>
            </div>
            <div className="p-4 space-y-3">
              {[
                { id: "PQ008", vai_tro: "Quản lý", module: "Sản phẩm", trang_thai: "active" },
                { id: "PQ013", vai_tro: "Kiểm định viên", module: "Sản phẩm", trang_thai: "active" },
                { id: "PQ017", vai_tro: "Nhân viên nhập liệu", module: "Sản phẩm", trang_thai: "active" },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/quan-tri/phan-quyen/chi-tiet?id=${item.id}`)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-[14px] font-medium text-gray-800">{item.vai_tro}</p>
                    <p className="text-[13px] text-gray-500">{item.module}</p>
                  </div>
                  <Badge variant={item.trang_thai === "active" ? "success" : "neutral"}>
                    {item.trang_thai === "active" ? "Hoạt động" : "Vô hiệu"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Lịch sử thay đổi</h2>
            </div>
            <div className="p-4 space-y-3">
              {[
                { date: "10/03/2026 09:15", action: "Cập nhật quyền Phê duyệt", user: "Nguyễn Văn An" },
                { date: "01/01/2024 08:00", action: "Tạo phân quyền mới", user: "System" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-gray-800">{item.action}</p>
                    <p className="text-[13px] text-gray-500">{item.user} - {item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
