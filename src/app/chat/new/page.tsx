"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewChatPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/chat");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">Đang tạo cuộc hội thoại mới...</p>
    </div>
  );
}
