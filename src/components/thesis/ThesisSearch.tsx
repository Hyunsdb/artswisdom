"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface ThesisSearchProps {
  initialQuery?: string;
}

export function ThesisSearch({ initialQuery = "" }: ThesisSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      const trimmed = value.trim();
      if (trimmed) params.set("q", trimmed);
      router.push(`/thesis${params.toString() ? `?${params}` : ""}`);
    },
    [value, router]
  );

  const handleClear = useCallback(() => {
    setValue("");
    router.push("/thesis");
  }, [router]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto pb-10">
      <div className="flex items-center gap-1 h-11">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="검색어를 입력하세요 (예: 소매틱스, 무용치료, 신경가소성)"
          className="h-full px-4 border border-[#E1E1E1] text-sm flex-1 focus:outline-none focus:border-gray-500 rounded-none"
        />
        {initialQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="h-full px-4 bg-white text-gray-600 text-sm border border-[#E1E1E1] hover:bg-gray-50 rounded-none"
          >
            초기화
          </button>
        )}
        <button
          type="submit"
          className="h-full px-6 bg-[#85544D] text-white text-sm font-medium hover:bg-[#6f433c] transition-colors rounded-none"
        >
          검색
        </button>
      </div>
    </form>
  );
}
