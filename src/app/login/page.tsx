"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Email hoặc mật khẩu không đúng");
      }
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 dark:text-white">AI LLM</h1>
            <p className="text-[15px] text-gray-500">Hệ thống quản lý mô hình AI</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-lg">
          <h2 className="text-[22px] font-semibold text-gray-900 dark:text-white mb-6">Đăng nhập</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[15px] font-medium text-gray-700 dark:text-gray-200 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ai-llm.vn"
                  required
                  className="w-full pl-11 pr-4 py-3 text-[16px] border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-teal-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[15px] font-medium text-gray-700 dark:text-gray-200 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 text-[16px] border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-teal-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 transition-colors"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-[15px] text-red-500">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-[16px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang đăng nhập..." : (
                <>
                  Đăng nhập
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[15px] text-gray-500 mt-6">
            Chưa có tài khoản?{" "}
            <button className="text-teal-600 hover:text-teal-700 font-medium">
              Liên hệ quản trị viên
            </button>
          </p>
        </div>

        <p className="text-center text-[14px] text-gray-400 mt-6">
          © 2026 AI LLM. Mọi quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
}
