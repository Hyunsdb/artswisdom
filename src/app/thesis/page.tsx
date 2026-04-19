import type { Metadata } from "next";
import { Suspense } from "react";
import { searchThesisPapers } from "@/lib/queries/thesis";
import {
  ThesisHero,
  ThesisSearch,
  ThesisList,
  ThesisPagination,
} from "@/components/thesis";

export const revalidate = 31536000;

export const metadata: Metadata = {
  title: "소매틱스 논문",
  description:
    "국내외 소매틱스 관련 논문을 문장 단위로 검색할 수 있는 페이지입니다.",
  openGraph: {
    title: "소매틱스 논문 | 지혜의밭",
    description: "국내외 소매틱스 관련 논문을 문장 단위로 검색하세요.",
  },
};

interface ThesisPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

async function ThesisContent({
  query,
  page,
}: {
  query?: string;
  page: number;
}) {
  const { papers, totalCount, totalPages, currentPage } =
    await searchThesisPapers(query, page);

  return (
    <>
      <ThesisList papers={papers} query={query} totalCount={totalCount} />
      <ThesisPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

function ListSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2 border-b border-gray-100 pb-4 last:border-0">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default async function ThesisPage({ searchParams }: ThesisPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || undefined;
  const page = params.page ? parseInt(params.page, 10) : 1;

  return (
    <>
      <ThesisHero />
      <section className="bg-[#FAF7F2] py-16">
        <div className="container px-4 mx-auto max-w-[1100px]">
          <ThesisSearch initialQuery={query} />
          <Suspense fallback={<ListSkeleton />}>
            <ThesisContent query={query} page={page} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
