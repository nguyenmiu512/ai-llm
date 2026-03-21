"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/chat/new");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
      <p className="text-gray-500">Đang chuyển hướng...</p>
    </div>
  );
}
