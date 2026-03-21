import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import InspectionPerformanceChart from "@/components/dashboard/InspectionPerformanceChart";
import WardDistributionChart from "@/components/dashboard/WardDistributionChart";
import InspectionReminder from "@/components/dashboard/InspectionReminder";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Building2, FileCheck2, ClipboardList, AlertTriangle, FileText, ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý an toàn thực phẩm toàn diện – Tháng 3, 2026</p>
        </div>
      </div>

      {/* Stat Cards – 6 cards */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Cơ sở đang quản lý"
          value="3,842"
          change={2.4}
          subtitle="+86 cơ sở mới tháng này"
          icon={<Building2 size={20} className="text-blue-600" />}
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Giấy chứng nhận ATTP"
          value="2,561"
          change={1.8}
          subtitle="+34 cấp mới, 12 hết hạn"
          icon={<FileCheck2 size={20} className="text-brand-600" />}
          iconBg="bg-brand-50"
        />
        <StatCard
          title="Cuộc kiểm tra"
          value="748"
          change={5.1}
          subtitle="+62 cuộc kiểm tra tháng này"
          icon={<ClipboardList size={20} className="text-violet-600" />}
          iconBg="bg-violet-50"
        />
        <StatCard
          title="Vụ ngộ độc thực phẩm"
          value="14"
          change={-3.2}
          subtitle="Giảm 3 vụ so với tháng trước"
          icon={<AlertTriangle size={20} className="text-amber-600" />}
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Hồ sơ tự công bố"
          value="1,284"
          change={3.7}
          subtitle="+48 hồ sơ mới tháng này"
          icon={<FileText size={20} className="text-teal-600" />}
          iconBg="bg-teal-50"
        />
        <StatCard
          title="Cơ sở vi phạm"
          value="127"
          change={-8.5}
          subtitle="Giảm 12 so với tháng trước"
          icon={<ShieldAlert size={20} className="text-red-600" />}
          iconBg="bg-red-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <InspectionPerformanceChart />
        <WardDistributionChart />
      </div>

      {/* Inspection Reminder + Recent Activity */}
      <div className="grid grid-cols-2 gap-4">
        <InspectionReminder />
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}
