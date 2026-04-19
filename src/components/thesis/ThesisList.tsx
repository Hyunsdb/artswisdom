import Link from "next/link";
import type { PaperGroup } from "@/lib/queries/thesis";

interface ThesisListProps {
  papers: PaperGroup[];
  query?: string;
  totalCount: number;
}

function highlight(text: string, term?: string) {
  if (!term) return text;
  const idx = text.toLowerCase().indexOf(term.toLowerCase());
  if (idx < 0) return text;
  const start = Math.max(0, idx - 60);
  const end = Math.min(text.length, idx + term.length + 120);
  const slice = text.slice(start, end);
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = slice.split(regex);
  return (
    <>
      {start > 0 && "… "}
      {parts.map((p, i) =>
        regex.test(p) ? (
          <mark key={i} className="bg-yellow-200 text-gray-900 font-semibold">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
      {end < text.length && " …"}
    </>
  );
}

export function ThesisList({ papers, query, totalCount }: ThesisListProps) {
  if (papers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-500">
        {query
          ? `"${query}"에 대한 검색 결과가 없습니다.`
          : "등록된 논문이 없습니다."}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        총 <span className="font-semibold text-gray-800">{totalCount.toLocaleString()}</span>
        {query ? "개의 문장이 검색되었습니다." : "개의 논문"}
      </p>

      <ul className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
        {papers.map((p) => (
          <li key={p.sample_id} className="p-5 md:p-6 hover:bg-gray-50 transition-colors">
            <Link href={`/thesis/${p.sample_id}${query ? `?q=${encodeURIComponent(query)}` : ""}`} className="block">
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                <span className="inline-block px-2 py-0.5 bg-[#85544D]/10 text-[#85544D] rounded-full font-medium">
                  {p.keyword}
                </span>
                <span>논문 #{p.keyword_file_num}</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {p.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {highlight(p.sample_content, query)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
