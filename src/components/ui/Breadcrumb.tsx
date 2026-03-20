"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string | null;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function Breadcrumb({ items, showBackButton = true, onBackClick }: BreadcrumbProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else if (items.length >= 2 && items[items.length - 2].href) {
      router.push(items[items.length - 2].href);
    } else if (items.length > 1) {
      router.back();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {showBackButton && (
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>
      )}
      {showBackButton && items.length > 0 && <div className="h-4 w-px bg-gray-300"></div>}
      <div className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight size={14} className="text-gray-400" />}
            {item.href ? (
              <button
                onClick={() => router.push(item.href)}
                className={`transition-colors ${
                  item.active
                    ? "text-gray-900 font-medium"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {item.label}
              </button>
            ) : (
              <span className={`transition-colors ${
                item.active
                  ? "text-gray-900 font-medium"
                  : "text-gray-600"
              }`}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Predefined breadcrumb templates for common routes
export const PermissionBreadcrumbs = {
  list: [
    { label: "Quản trị", href: "/quan-tri" },
    { label: "Phân quyền", href: "/quan-tri/phan-quyen", active: true },
  ],
  detail: (id?: string) => [
    { label: "Quản trị", href: "/quan-tri" },
    { label: "Phân quyền", href: "/quan-tri/phan-quyen" },
    { label: "Chi tiết", href: id ? `/quan-tri/phan-quyen/chi-tiet?id=${id}` : null, active: true },
  ],
  create: [
    { label: "Quản trị", href: "/quan-tri" },
    { label: "Phân quyền", href: "/quan-tri/phan-quyen" },
    { label: "Thêm mới", href: null, active: true },
  ],
};

export const UserBreadcrumbs = {
  list: [
    { label: "Quản trị", href: "/quan-tri" },
    { label: "Người dùng", href: "/quan-tri/nguoi-dung", active: true },
  ],
  detail: (id?: string) => [
    { label: "Quản trị", href: "/quan-tri" },
    { label: "Người dùng", href: "/quan-tri/nguoi-dung" },
    { label: "Chi tiết", href: id ? `/quan-tri/nguoi-dung/chi-tiet?id=${id}` : null, active: true },
  ],
};

export const RoleBreadcrumbs = {
  list: [
    { label: "Quản trị", href: "/quan-tri" },
    { label: "Quản lý vai trò", href: "/quan-tri/vai-tro", active: true },
  ],
};

export const ProductBreadcrumbs = {
  list: [
    { label: "Sản phẩm", href: "/san-pham", active: true },
  ],
  detail: (id?: string) => [
    { label: "Sản phẩm", href: "/san-pham" },
    { label: "Chi tiết", href: id ? `/san-pham/chi-tiet?id=${id}` : null, active: true },
  ],
  create: [
    { label: "Sản phẩm", href: "/san-pham" },
    { label: "Tạo mới", href: null, active: true },
  ],
};
