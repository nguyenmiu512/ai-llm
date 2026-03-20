import { Calendar, MapPin, ClipboardCheck, ChevronRight } from "lucide-react";
import Link from "next/link";

const reminders = [
  { id: 1, title: "Kiểm tra định kỳ Q1/2026 - Quận 1", location: "Quận 1, Quận 3", date: "15/03/2026", type: "Định kỳ" },
  { id: 2, title: "Kiểm tra đột xuất bếp ăn tập thể", location: "Bình Thạnh", date: "18/03/2026", type: "Đột xuất" },
  { id: 3, title: "Chuyên đề thức ăn đường phố mùa hè", location: "Quận 5, Quận 10", date: "22/03/2026", type: "Chuyên đề" },
  { id: 4, title: "Kiểm tra định kỳ cơ sở sản xuất thực phẩm", location: "Gò Vấp, Bình Tân", date: "25/03/2026", type: "Định kỳ" },
];

const typeStyle: Record<string, string> = {
  "Định kỳ": "bg-blue-50 text-blue-700",
  "Đột xuất": "bg-amber-50 text-amber-700",
  "Chuyên đề": "bg-violet-50 text-violet-700",
};

export default function InspectionReminder() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-brand-600" />
          <h3 className="font-semibold text-gray-800 text-sm">Lịch kiểm tra ATTP sắp tới</h3>
        </div>
        <Link
          href="/kiem-tra"
          className="flex items-center gap-1 text-xs text-brand-600 font-semibold hover:text-brand-700 transition-colors"
        >
          Xem tất cả <ChevronRight size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reminders.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-brand-200 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 mt-0.5">
              <ClipboardCheck size={15} className="text-brand-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 leading-tight">{item.title}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={10} />
                  {item.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar size={10} />
                  {item.date}
                </span>
              </div>
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${typeStyle[item.type]}`}>
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
