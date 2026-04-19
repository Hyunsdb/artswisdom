import { createClient } from "@/lib/supabase/server";
import type { ThesisReport } from "@/types/database";

export interface PaperGroup {
  keyword: string;
  keyword_file_num: number;
  title: string;
  address: string;
  sample_content: string;
  sample_id: number;
}

export interface PaginatedPapers {
  papers: PaperGroup[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedSentences {
  sentences: ThesisReport[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const PAGE_SIZE = 10;

export async function searchThesisPapers(
  query: string | undefined,
  page: number = 1
): Promise<PaginatedPapers> {
  const supabase = await createClient();
  const offset = (page - 1) * PAGE_SIZE;
  const term = query?.trim();

  if (!term) {
    // No search → list distinct papers via the thesis_papers view
    const { data, count, error } = await supabase
      .from("thesis_papers" as never)
      .select("*", { count: "exact" })
      .order("keyword", { ascending: true })
      .order("keyword_file_num", { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);


    const rows = (data ?? []) as ThesisReport[];
    const papers: PaperGroup[] = rows.map((r) => ({
      keyword: r.keyword,
      keyword_file_num: r.keyword_file_num,
      title: r.title,
      address: r.address,
      sample_content: r.content.slice(0, 200),
      sample_id: r.id,
    }));
    const totalCount = count ?? 0;
    return {
      papers,
      totalCount,
      totalPages: Math.ceil(totalCount / PAGE_SIZE),
      currentPage: page,
    };
  }

  // With search → content LIKE match, one result per sentence (paginated directly)
  const { data, count } = await supabase
    .from("thesis_reports")
    .select("*", { count: "planned" })
    .ilike("content", `%${term}%`)
    .order("id", { ascending: true })
    .range(offset, offset + PAGE_SIZE - 1);

  const rows = (data ?? []) as ThesisReport[];
  const papers: PaperGroup[] = rows.map((r) => ({
    keyword: r.keyword,
    keyword_file_num: r.keyword_file_num,
    title: r.title,
    address: r.address,
    sample_content: r.content,
    sample_id: r.id,
  }));
  const totalCount = count ?? 0;
  return {
    papers,
    totalCount,
    totalPages: Math.ceil(totalCount / PAGE_SIZE),
    currentPage: page,
  };
}

export async function getPaperById(id: number): Promise<ThesisReport | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("thesis_reports")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as ThesisReport;
}

export interface PaginatedSentencesResult {
  sentences: ThesisReport[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

const SENTENCE_PAGE_SIZE = 30;

export async function getPaperSentences(
  keyword: string,
  keywordFileNum: number,
  page: number = 1,
  pageSize: number = SENTENCE_PAGE_SIZE
): Promise<PaginatedSentencesResult> {
  const supabase = await createClient();
  const offset = (page - 1) * pageSize;
  const { data, count } = await supabase
    .from("thesis_reports")
    .select("*", { count: "exact" })
    .eq("keyword", keyword)
    .eq("keyword_file_num", keywordFileNum)
    .order("sentence_num", { ascending: true })
    .range(offset, offset + pageSize - 1);

  const totalCount = count ?? 0;
  return {
    sentences: (data ?? []) as ThesisReport[],
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
    pageSize,
  };
}
