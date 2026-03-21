import Link from "next/link";

export default function Page() {
  return (
    <div className="p-4 min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Chào mừng quay trở lại!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/quan-tri/doi-tac"
          className="bg-white dark:bg-gray-900 rounded-xl p-4 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 group"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">Đối tác</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Quản lý thông tin đối tác</p>
        </Link>

        <Link
          href="/settings/api-keys"
          className="bg-white dark:bg-gray-900 rounded-xl p-4 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 group"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">API Keys</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Quản lý API keys</p>
        </Link>

        <Link
          href="/settings/theme"
          className="bg-white dark:bg-gray-900 rounded-xl p-4 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 group"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">Giao diện</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Tùy chỉnh giao diện</p>
        </Link>

        <Link
          href="/data/documents"
          className="bg-white dark:bg-gray-900 rounded-xl p-4 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 group"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">Tài liệu</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Quản lý tài liệu</p>
        </Link>

        <Link
          href="/data/datasets"
          className="bg-white dark:bg-gray-900 rounded-xl p-4 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 group"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">Bộ dữ liệu</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Quản lý bộ dữ liệu</p>
        </Link>

        <Link
          href="/chat/new"
          className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-4 transition-all duration-200 border border-brand-200 dark:border-brand-800 hover:border-brand-300 dark:hover:border-brand-700 group"
        >
          <h2 className="text-xl font-semibold text-brand-700 dark:text-brand-400 group-hover:text-brand-600 transition-colors">Chat mới</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Bắt đầu cuộc trò chuyện mới</p>
        </Link>
      </div>
    </div>
  );
}