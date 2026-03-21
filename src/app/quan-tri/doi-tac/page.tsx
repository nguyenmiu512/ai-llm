"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical } from "lucide-react";
import Badge from "@/components/ui/Badge";
import AddPartnerModal from "@/components/AddPartnerModal";
import SectionPage from "@/components/ui/SectionPage";

interface PartnerData {
  id: string;
  ten: string;
  loai: string;
  quoc_gia: string;
  lien_he: string;
  email: string;
  trang_thai: "active" | "inactive";
}

const data = [
  { id: "DT001", ten: "GS1 Vietnam", loai: "Tổ chức tiêu chuẩn", quoc_gia: "Việt Nam", lien_he: "Nguyễn Hồng Minh", email: "contact@gs1.org.vn", trang_thai: "active" },
  { id: "DT002", ten: "Aeon Vietnam", loai: "Nhà bán lẻ", quoc_gia: "Việt Nam", lien_he: "Tanaka Hiroshi", email: "partner@aeon.vn", trang_thai: "active" },
  { id: "DT003", ten: "Masan Consumer", loai: "Doanh nghiệp thực phẩm", quoc_gia: "Việt Nam", lien_he: "Trần Văn Lợi", email: "supply@masan.vn", trang_thai: "active" },
  { id: "DT004", ten: "Bureau Veritas Vietnam", loai: "Tổ chức chứng nhận", quoc_gia: "Pháp", lien_he: "Jean-Paul Martin", email: "vn@bureauveritas.com", trang_thai: "active" },
  { id: "DT005", ten: "SGS Vietnam", loai: "Tổ chức kiểm định", quoc_gia: "Thụy Sỹ", lien_he: "Lê Thị Thu Hà", email: "info@sgs.com.vn", trang_thai: "active" },
  { id: "DT006", ten: "Giao Hàng Nhanh (GHN)", loai: "Logistics", quoc_gia: "Việt Nam", lien_he: "Phạm Hùng", email: "b2b@ghn.vn", trang_thai: "active" },
  { id: "DT007", ten: "Shopee Vietnam", loai: "Thương mại điện tử", quoc_gia: "Singapore", lien_he: "Vũ Minh Tú", email: "seller@shopee.vn", trang_thai: "active" },
  { id: "DT008", ten: "FPT Software", loai: "Công nghệ thông tin", quoc_gia: "Việt Nam", lien_he: "Hoàng Đức Vinh", email: "partner@fpt.com.vn", trang_thai: "active" },
  { id: "DT009", ten: "Intertek Vietnam", loai: "Tổ chức kiểm định", quoc_gia: "Anh", lien_he: "David Nguyen", email: "vietnam@intertek.com", trang_thai: "active" },
  { id: "DT010", ten: "Lazada Vietnam", loai: "Thương mại điện tử", quoc_gia: "Đức", lien_he: "Ngô Thị Kim Anh", email: "seller@lazada.vn", trang_thai: "inactive" },
  { id: "DT011", ten: "Vinamilk", loai: "Doanh nghiệp thực phẩm", quoc_gia: "Việt Nam", lien_he: "Đặng Thu Hương", email: "supply@vinamilk.com.vn", trang_thai: "active" },
  { id: "DT012", ten: "KPMG Vietnam", loai: "Kiểm toán & tư vấn", quoc_gia: "Hà Lan", lien_he: "Nguyễn Bá Long", email: "vn@kpmg.com", trang_thai: "active" },
  { id: "DT013", ten: "ITC – International Trade Centre", loai: "Tổ chức quốc tế", quoc_gia: "Thụy Sỹ", lien_he: "Sophie Bernard", email: "vietnam@intracen.org", trang_thai: "active" },
  { id: "DT014", ten: "Tổng công ty Bưu điện Việt Nam (VNPost)", loai: "Logistics", quoc_gia: "Việt Nam", lien_he: "Trịnh Công Hùng", email: "partner@vnpost.vn", trang_thai: "inactive" },
];

const loaiColors: Record<string, "success" | "info" | "warning" | "neutral"> = {
  "Tổ chức tiêu chuẩn": "success",
  "Nhà bán lẻ": "info",
  "Doanh nghiệp thực phẩm": "warning",
  "Tổ chức chứng nhận": "success",
  "Tổ chức kiểm định": "neutral",
  "Logistics": "info",
  "Thương mại điện tử": "warning",
  "Công nghệ thông tin": "info",
  "Kiểm toán & tư vấn": "neutral",
  "Tổ chức quốc tế": "success",
};

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partners, setPartners] = useState(data);

  const handleSavePartner = (newPartner: Omit<PartnerData, "id">) => {
    const id = `DT${String(partners.length + 1).padStart(3, "0")}`;
    const partnerWithId = { ...newPartner, id };
    setPartners([...partners, partnerWithId]);
  };

  const actionButton = (
    <button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-[15px] font-medium transition-colors"
    >
      <Plus size={18} />
      <span>Thêm đối tác</span>
    </button>
  );

  return (
    <>
      <SectionPage
        title="Đối tác"
        actionButton={actionButton}
      >
        {/* Stats Bar */}
        <div className="flex items-center gap-4 mb-6">
          {[
            { label: "Tổng đối tác", value: partners.length, color: "gray" },
            { label: "Đang hợp tác", value: partners.filter((d) => d.trang_thai === "active").length, color: "teal" },
            { label: "Ngừng hợp tác", value: partners.filter((d) => d.trang_thai === "inactive").length, color: "gray" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-900">
              <span className="text-[14px] text-gray-500">{stat.label}</span>
              <span className={`text-[19px] font-semibold ${stat.color === "teal" ? "text-teal-600" : "text-gray-700"}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm đối tác..."
              className="flex-1 bg-transparent text-[15px] text-gray-900 dark:text-white outline-none placeholder-gray-400"
            />
          </div>
          <select className="px-4 py-2.5 text-[15px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl outline-none">
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngừng hợp tác</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left px-5 py-3 text-[14px] font-semibold text-gray-500 uppercase tracking-wide">Mã</th>
                <th className="text-left px-5 py-3 text-[14px] font-semibold text-gray-500 uppercase tracking-wide">Loại đối tác</th>
                <th className="text-left px-5 py-3 text-[14px] font-semibold text-gray-500 uppercase tracking-wide">Quốc gia</th>
                <th className="text-left px-5 py-3 text-[14px] font-semibold text-gray-500 uppercase tracking-wide">Liên hệ</th>
                <th className="text-left px-5 py-3 text-[14px] font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                <th className="text-left px-5 py-3 text-[14px] font-semibold text-gray-500 uppercase tracking-wide">Trạng thái</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner, index) => (
                <tr
                  key={partner.id}
                  className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-5 py-3.5 text-[15px] text-gray-700 dark:text-gray-200">{partner.id}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={loaiColors[partner.loai] ?? "neutral"}>{partner.loai}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-[15px] text-gray-700 dark:text-gray-200">{partner.quoc_gia}</td>
                  <td className="px-5 py-3.5 text-[15px] text-gray-700 dark:text-gray-200">{partner.lien_he}</td>
                  <td className="px-5 py-3.5 text-[15px] text-gray-700 dark:text-gray-200">{partner.email}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={partner.trang_thai === "active" ? "success" : "neutral"}>
                      {partner.trang_thai === "active" ? "Hoạt động" : "Ngừng hợp tác"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionPage>
      <AddPartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePartner}
      />
    </>
  );
}
