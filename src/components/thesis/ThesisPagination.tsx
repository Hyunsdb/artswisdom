"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ThesisPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ThesisPagination({ currentPage, totalPages }: ThesisPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goto = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) params.delete("page");
    else params.set("page", String(page));
    router.push(`/thesis${params.toString() ? `?${params}` : ""}`);
  };

  const pages: (number | string)[] = [];
  const maxVisible = 5;
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else if (currentPage <= 3) {
    for (let i = 1; i <= 4; i++) pages.push(i);
    pages.push("...", totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, "...");
    for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, "...");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
    pages.push("...", totalPages);
  }

  return (
    <nav className="flex items-center justify-center mt-10 mb-4 gap-1">
      <button
        onClick={() => goto(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="이전 페이지"
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goto(p as number)}
            className={`w-10 h-10 flex items-center justify-center text-sm font-medium ${
              currentPage === p
                ? "bg-[#85544D] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => goto(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="다음 페이지"
      >
        ›
      </button>
    </nav>
  );
}
