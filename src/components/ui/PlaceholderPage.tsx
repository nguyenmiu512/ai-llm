import DashboardLayout from "@/components/layout/DashboardLayout";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
}

export default function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center justify-center text-center">
        <div className="size-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
          <Construction size={28} className="text-amber-500" />
        </div>
        <h2 className="text-base font-semibold text-gray-700 mb-2">Trang đang được phát triển</h2>
        <p className="text-sm text-gray-400 max-w-sm">
          Chức năng này đang trong quá trình xây dựng. Vui lòng quay lại sau.
        </p>
      </div>
    </DashboardLayout>
  );
}
