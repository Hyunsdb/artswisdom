import Link from "next/link";
import type { ThesisReport } from "@/types/database";

interface ThesisDetailProps {
  paperId: number;
  title: string;
  keyword: string;
  address?: string;
  sentences: ThesisReport[];
  totalSentences: number;
  currentPage: number;
  totalPages: number;
  highlightTerm?: string;
}

function renderContent(content: string, term?: string) {
  if (!term) return content;
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return content.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 text-gray-900 font-semibold">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function buildHref(paperId: number, page: number, query?: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/thesis/${paperId}${qs ? `?${qs}` : ""}`;
}

export function ThesisDetail({
  paperId,
  title,
  keyword,
  address,
  sentences,
  totalSentences,
  currentPage,
  totalPages,
  highlightTerm,
}: ThesisDetailProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-100 p-6 md:p-10 shadow-sm">
      <header className="border-b border-gray-100 pb-6 mb-8">
        <div className="text-xs text-gray-500 mb-2">
          <span className="inline-block px-2 py-0.5 bg-[#85544D]/10 text-[#85544D] rounded-full font-medium">
            {keyword}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug break-keep">
          {title}
        </h1>
        {address && (
          <a
            href={address}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-[#85544D] hover:underline break-all"
          >
            원문 링크 →
          </a>
        )}
      </header>

      <div className="space-y-5">
        {sentences.map((s) => (
          <p
            key={s.id}
            className="text-[15px] md:text-base text-gray-800 leading-[1.9] break-keep"
          >
            <span className="inline-block text-xs text-gray-400 mr-2 align-top">
              #{s.sentence_num}
            </span>
            {renderContent(s.content, highlightTerm)}
          </p>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-1 mt-10 pt-6 border-t border-gray-100">
          {currentPage > 1 && (
            <Link
              href={buildHref(paperId, currentPage - 1, highlightTerm)}
              className="w-10 h-10 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-50 border border-gray-200"
              aria-label="이전 페이지"
            >
              ‹
            </Link>
          )}
          <span className="px-4 text-sm text-gray-600">
            {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={buildHref(paperId, currentPage + 1, highlightTerm)}
              className="w-10 h-10 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-50 border border-gray-200"
              aria-label="다음 페이지"
            >
              ›
            </Link>
          )}
        </nav>
      )}

      <footer className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between text-sm">
        <Link href="/thesis" className="text-gray-600 hover:text-[#85544D]">
          ← 목록으로
        </Link>
        <span className="text-gray-400">총 {totalSentences}개의 문장</span>
      </footer>
    </article>
  );
}
