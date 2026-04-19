import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPaperById, getPaperSentences } from "@/lib/queries/thesis";
import { ThesisDetail } from "@/components/thesis";

export const revalidate = 86400;

interface ThesisDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({
  params,
}: ThesisDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const paper = await getPaperById(Number(id));
  if (!paper) return { title: "논문을 찾을 수 없습니다" };
  return {
    title: `${paper.title} | 소매틱스 논문`,
    description: paper.content.slice(0, 160),
  };
}

export default async function ThesisDetailPage({
  params,
  searchParams,
}: ThesisDetailPageProps) {
  const { id } = await params;
  const { q, page } = await searchParams;
  const paper = await getPaperById(Number(id));
  if (!paper) notFound();

  const pageNum = page ? Math.max(1, parseInt(page, 10)) : 1;
  const { sentences, totalCount, totalPages, currentPage } =
    await getPaperSentences(paper.keyword, paper.keyword_file_num, pageNum);

  return (
    <section className="bg-[#FAF7F2] py-16 min-h-screen">
      <div className="container px-4 mx-auto max-w-[900px]">
        <ThesisDetail
          paperId={paper.id}
          title={paper.title}
          keyword={paper.keyword}
          address={paper.address}
          sentences={sentences.length ? sentences : [paper]}
          totalSentences={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          highlightTerm={q}
        />
      </div>
    </section>
  );
}
