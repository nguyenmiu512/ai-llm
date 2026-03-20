"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import Breadcrumb, { PermissionBreadcrumbs } from "@/components/ui/Breadcrumb";
import { Save, Plus } from "lucide-react";

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
  const [formData, setFormData] = useState({
    vai_tro: "",
    module: "",
    xem: false,
    tao: false,
    sua: false,
    xoa: false,
    phe_duyet: false,
    trang_thai: "active" as "active" | "inactive",
  });

  const handleSave = () => {
    // Here you would save to API
    console.log("Creating new permission:", formData);
    alert("Tạo phân quyền thành công!");
  };

  const togglePermission = (key: string) => {
    setFormData({ ...formData, [key]: !formData[key as keyof typeof formData] });
  };

  return (
    <DashboardLayout>
      <Breadcrumb items={PermissionBreadcrumbs.create} />

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Thêm phân quyền mới</h1>
            <p className="text-sm text-gray-500 mt-1">Thiết lập quyền truy cập cho vai trò trong hệ thống</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Thông tin phân quyền</h2>
          </div>
          <div className="p-5 space-y-6">
            {/* Vai trò */}
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">Vai trò <span className="text-red-500">*</span></label>
              <select
                value={formData.vai_tro}
                onChange={(e) => setFormData({ ...formData, vai_tro: e.target.value })}
                className="w-full px-4 py-2.5 text-[14px] rounded-xl border border-gray-200 outline-none focus:border-brand-400 transition-colors"
              >
                <option value="">Chọn vai trò...</option>
                <option value="Quản trị viên">Quản trị viên</option>
                <option value="Quản lý">Quản lý</option>
                <option value="Kiểm định viên">Kiểm định viên</option>
                <option value="Nhân viên nhập liệu">Nhân viên nhập liệu</option>
                <option value="Đối tác">Đối tác</option>
                <option value="Người xem">Người xem</option>
                <option value="Cán bộ quản lý">Cán bộ quản lý</option>
                <option value="Chuyên gia kỹ thuật">Chuyên gia kỹ thuật</option>
              </select>
            </div>

            {/* Module */}
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">Module <span className="text-red-500">*</span></label>
              <select
                value={formData.module}
                onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                className="w-full px-4 py-2.5 text-[14px] rounded-xl border border-gray-200 outline-none focus:border-brand-400 transition-colors"
              >
                <option value="">Chọn module...</option>
                <option value="Sản phẩm">Sản phẩm</option>
                <option value="Sự kiện truy xuất">Sự kiện truy xuất</option>
                <option value="Tem nhãn (UID/QR)">Tem nhãn (UID/QR)</option>
                <option value="Chứng chỉ">Chứng chỉ</option>
                <option value="Báo cáo">Báo cáo</option>
                <option value="Quản trị người dùng">Quản trị người dùng</option>
                <option value="Tích hợp API">Tích hợp API</option>
                <option value="Dashboard">Dashboard</option>
                <option value="Cài đặt hệ thống">Cài đặt hệ thống</option>
                <option value="Báo cáo & phân tích">Báo cáo & phân tích</option>
                <option value="Cảnh báo rủi ro">Cảnh báo rủi ro</option>
                <option value="Webhook">Webhook</option>
                <option value="Transaction API">Transaction API</option>
              </select>
            </div>

            {/* Permissions Grid */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-[14px] font-medium text-gray-700 mb-4">Quyền hạn <span className="text-gray-400">(Chọn ít nhất 1 quyền)</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "xem", label: "Xem dữ liệu", desc: "Cho phép xem thông tin trong module" },
                  { key: "tao", label: "Tạo mới", desc: "Cho phép tạo bản ghi mới" },
                  { key: "sua", label: "Sửa", desc: "Cho phép chỉnh sửa dữ liệu" },
                  { key: "xoa", label: "Xóa", desc: "Cho phép xóa dữ liệu" },
                  { key: "phe_duyet", label: "Phê duyệt", desc: "Cho phép phê duyệt hồ sơ" },
                ].map((perm) => (
                  <div
                    key={perm.key}
                    onClick={() => togglePermission(perm.key)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData[perm.key as keyof typeof formData]
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-colors ${
                          formData[perm.key as keyof typeof formData]
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        }`}>
                          {formData[perm.key as keyof typeof formData] && <Plus size={12} className="text-white" />}
                        </div>
                        <span className="text-[14px] font-medium text-gray-800">{perm.label}</span>
                      </div>
                      {formData[perm.key as keyof typeof formData] && (
                        <Badge variant="success">Đã chọn</Badge>
                      )}
                    </div>
                    <p className="text-[13px] text-gray-500 ml-7">{perm.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trạng thái */}
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">Trạng thái</label>
              <div className="flex gap-4">
                <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.trang_thai === "active" ? "border-green-500 bg-green-50" : "border-gray-200"
                }`}>
                  <input
                    type="radio"
                    name="trang_thai"
                    value="active"
                    checked={formData.trang_thai === "active"}
                    onChange={() => setFormData({ ...formData, trang_thai: "active" })}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    formData.trang_thai === "active" ? "bg-green-500 border-green-500" : "border-gray-300"
                  }`}>
                    {formData.trang_thai === "active" && <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5"></div>}
                  </div>
                  <span className="text-[14px] font-medium text-gray-700">Hoạt động</span>
                </label>
                <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.trang_thai === "inactive" ? "border-gray-300 bg-gray-50" : "border-gray-200"
                }`}>
                  <input
                    type="radio"
                    name="trang_thai"
                    value="inactive"
                    checked={formData.trang_thai === "inactive"}
                    onChange={() => setFormData({ ...formData, trang_thai: "inactive" })}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    formData.trang_thai === "inactive" ? "bg-gray-400 border-gray-400" : "border-gray-300"
                  }`}>
                    {formData.trang_thai === "inactive" && <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5"></div>}
                  </div>
                  <span className="text-[14px] font-medium text-gray-700">Vô hiệu</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={!formData.vai_tro || !formData.module}
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl px-6 py-2.5 transition-colors"
              >
                <Save size={14} />
                Lưu phân quyền
              </button>
              <button
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl px-6 py-2.5 transition-colors"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel - Templates */}
        <div className="space-y-6">
          {/* Quick Templates */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Mẫu phân quyền nhanh</h2>
            </div>
            <div className="p-4 space-y-3">
              {[
                { name: "Quản trị viên full", permissions: ["xem", "tao", "sua", "xoa", "phe_duyet"] },
                { name: "Quản lý xem/sửa", permissions: ["xem", "tao", "sua"] },
                { name: "Chỉ xem", permissions: ["xem"] },
                { name: "Phê duyệt", permissions: ["xem", "phe_duyet"] },
              ].map((template, i) => (
                <button
                  key={i}
                  onClick={() => setFormData({
                    ...formData,
                    xem: template.permissions.includes("xem"),
                    tao: template.permissions.includes("tao"),
                    sua: template.permissions.includes("sua"),
                    xoa: template.permissions.includes("xoa"),
                    phe_duyet: template.permissions.includes("phe_duyet"),
                  })}
                  className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <p className="text-[14px] font-medium text-gray-800">{template.name}</p>
                  <p className="text-[13px] text-gray-500">
                    {template.permissions.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(", ")}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Help */}
          <div className="bg-brand-50 rounded-2xl border border-brand-100 overflow-hidden">
            <div className="p-5">
              <h3 className="text-sm font-semibold text-brand-800 mb-3">Hướng dẫn phân quyền</h3>
              <ul className="space-y-2 text-[13px] text-brand-700">
                <li>• Mỗi vai trò có thể có nhiều quyền trong từng module</li>
                <li>• Quyền "Xem" là tối thiểu để truy cập module</li>
                <li>• Quyền "Xóa" nên giới hạn cho vai trò quản trị</li>
                <li>• "Phê duyệt" dành cho cán bộ quản lý và kiểm định</li>
                <li>• Vô hiệu hóa không xóa quyền, chỉ tạm tắt</li>
              </ul>
            </div>
          </div>

          {/* Recent Permissions */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Phân quyền gần đây</h2>
            </div>
            <div className="p-4 space-y-3">
              {[
                { id: "PQ008", vai_tro: "Quản lý", module: "Sản phẩm", ngay: "10/03/2026" },
                { id: "PQ016", vai_tro: "Kiểm định viên", module: "Chứng chỉ", ngay: "08/03/2026" },
                { id: "PQ031", vai_tro: "Chuyên gia kỹ thuật", module: "Tích hợp API", ngay: "05/03/2026" },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => router.push(`/quan-tri/phan-quyen/chi-tiet?id=${item.id}`)}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={roleColors[item.vai_tro] ?? "neutral"}>{item.vai_tro}</Badge>
                    <span className="text-[12px] text-gray-400">{item.ngay}</span>
                  </div>
                  <p className="text-[13px] text-gray-600">{item.module}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
