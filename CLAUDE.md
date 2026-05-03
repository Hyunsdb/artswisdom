# 지혜의밭 (artswisdom) — wisdom 공개 사이트

`artswisdom.com`의 Next.js 16 (App Router) 공개 사이트. Cloudflare Workers에 OpenNext로 배포.

## 한 번에 시작하기 (cold start 체크리스트)

이 파일과 `CREDENTIALS.md`만 있으면 새 환경에서 작업 재개 가능.

```bash
# 1. 클론
git clone git@github.com-hyunsdb:Hyunsdb/artswisdom.git wisdom
cd wisdom

# 2. 의존성
npm install

# 3. .env.local 생성 (CREDENTIALS.md 참조)
cat > .env.local <<EOF
NEXT_PUBLIC_SUPABASE_URL=https://hazrjfxlzlhymyfghhme.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<CREDENTIALS.md 참조>
EOF

# 4. 개발
npm run dev      # http://localhost:3000

# 5. 타입체크
npx tsc --noEmit

# 6. 배포 (Cloudflare Workers, push로는 자동 안됨)
npx opennextjs-cloudflare build
npx wrangler deploy
```

## 관련 프로젝트

| 프로젝트 | 경로 | repo | 도메인 |
|---|---|---|---|
| **wisdom** (이 저장소) | `/Users/doah/study/work/wisdom` | `Hyunsdb/artswisdom` | `artswisdom.com` |
| **somatic-admin** | `/Users/doah/study/work/somatic-admin` | `Hyunsdb/somatic-admin` | `admin.artswisdom.com` |
| **thesis-migration** | `/Users/doah/study/work/thesis-migration` | (git 미사용, 1회성 스크립트) | - |

세 프로젝트는 모두 같은 Supabase DB를 공유합니다. 변경 시 영향 범위 확인 필요.

## 자격증명

`CREDENTIALS.md` (이 디렉터리, gitignore 처리됨) 에 통합 정리:
- Supabase: URL / anon key / DB 비번 / pooler 접속
- GitHub repo SSH alias
- Cloudflare 정보
- 도메인 등록 정보 (Whois Corp. → Cloudflare 이전 진행)
- whois 공개용 영문 운영자 정보

## 스택

- Next.js 16, React 19, TypeScript, Tailwind CSS
- Supabase (PostgreSQL 17.6, RLS)
- Cloudflare Workers + `@opennextjs/cloudflare` + `wrangler`
- Tiptap (어드민 측 리치텍스트, wisdom은 미사용)

## 디렉터리 구조

- `src/app/` — App Router 라우트
  - `notice/`, `notice/[id]/` — 공지사항 (조회수 RPC로 카운트)
  - `thesis/`, `thesis/[id]/` — 논문 검색/뷰어 (ISR 1년)
  - `somatic-lab/`, `business/`, `healsoma/`, `daily-art/`, `company/`, `contact/`, `brochure/`, `privacy/`
  - `robots.ts`, `sitemap.ts`
- `src/components/` — 도메인별 컴포넌트 폴더 (`home/`, `notice/`, `thesis/` 등)
- `src/lib/queries/` — Supabase 쿼리 함수 (`notices.ts`, `thesis.ts`, `programs.ts` 등)
- `src/lib/supabase/` — `client`/`server` Supabase 팩토리
- `src/types/database.ts` — Supabase 자동생성 타입

## 주요 DB 테이블

| 테이블 | 용도 | 비고 |
|---|---|---|
| `notices` | 공지사항 | `is_published`로 공개 제어, 조회수는 RPC `increment_notice_view`로 증가 |
| `thesis_reports` | 논문 문장 데이터 (162k rows) | `pg_trgm` GIN 인덱스로 ILIKE 검색 |
| `thesis_papers` (mat. view) | 논문 그룹핑 | `(keyword, keyword_file_num)` DISTINCT ON, 262 rows |
| `programs` | 소매틱 랩 프로그램 | id=37 "넋두리" |
| `inquiries` | 문의 폼 (anon INSERT 허용) | |
| `papers` | 어드민 논문 (somatic-admin에서 관리) | thesis_reports와 별개 |

## RLS / 권한 메모

- 대부분 anon SELECT only (공개 데이터)
- `notices` UPDATE는 anon 차단 → 조회수는 SECURITY DEFINER RPC 사용
- somatic-admin은 `SUPABASE_SERVICE_ROLE_KEY`로 RLS 우회 (서버 사이드만)
- 새 RPC 추가 패턴:
  ```sql
  CREATE OR REPLACE FUNCTION fn_name(...) RETURNS ...
  LANGUAGE sql SECURITY DEFINER SET search_path = public
  AS $$ ... $$;
  GRANT EXECUTE ON FUNCTION fn_name(...) TO anon, authenticated;
  ```

## 캐싱 / ISR 정책

- `/thesis` 목록: `revalidate = 31536000` (1년)
- `/thesis/[id]`: `revalidate = 31536000`
- `/notice/[id]`: 동적 (`ƒ`) — 조회수 카운트 위해 매 요청 실행
- `/notice`: 동적
- 변경 시 무효화: `revalidatePath('/thesis')`, `revalidatePath('/thesis/[id]', 'page')`
- Cloudflare 캐시: dynamic 페이지는 `private, no-cache`로 떠서 매번 워커 실행

## robots.txt

검색 결과 페이지 크롤링 차단:
```
Disallow: /api/
Disallow: /thesis?
Disallow: /thesis/*?
```

## 배포 워크플로

- `git push`만으로 배포 안 됨. **반드시 `wrangler deploy` 수동 실행**
- 빌드 산출물: `.open-next/` (gitignore)
- 환경변수: `wrangler.toml`의 `[vars]`에 anon key 박혀있음 (공개 OK)
- `SUPABASE_SERVICE_ROLE_KEY`는 wisdom에는 불필요 (admin만 사용)
- 배포 검증: `https://artswisdom.com/thesis`, `/notice/[id]`, `/robots.txt`

## 알려진 데이터 이슈

- `keyword_file_num = 999`은 "기타 모음" 버킷 — 한 키 아래 여러 논문이 잘못 묶여 있음 (touch=129, mindfulness=72, 터치=39 등 11개 버킷). 미해결, TODO.
- 일부 논문은 본문 구두점이 제거된 채 저장됨, 일부 address가 죽은 nanet 검색 페이지
- `thesis_reports` `id=162786`은 빈 row (keyword/content 모두 빈 문자열)
- 공지사항 일부에 `style="text-align:center"` 인라인 → `NoticeDetail.tsx`에서 `[&_*]:!text-left`로 강제 좌측 정렬

## 자주 하는 작업 패턴

### 새 RPC 함수 추가
1. psql로 함수 생성 (CREDENTIALS.md의 pooler 접속 사용)
2. 코드에서 `supabase.rpc("fn_name" as never, args as never)` 호출
3. `npx tsc --noEmit`로 검증

### 새 페이지 추가
1. `src/app/<route>/page.tsx` 생성
2. 필요하면 `src/lib/queries/<domain>.ts` 추가, `index.ts`에서 re-export
3. 컴포넌트는 `src/components/<domain>/`에 두기
4. 정적인 페이지면 `export const revalidate = N`로 ISR 설정

### 어드민에 새 CRUD 페이지 추가
- `somatic-admin/src/app/<route>/page.tsx` (list)
- `somatic-admin/src/app/<route>/[id]/page.tsx` (detail/edit)
- `somatic-admin/src/app/<route>/create/page.tsx` (create)
- `somatic-admin/src/lib/queries/<domain>.ts` — service role로 CRUD
- `somatic-admin/src/components/layout/Sidebar.tsx`에 메뉴 항목 추가

## 다른 프로젝트 빠른 안내

- **somatic-admin**: 위 디렉터리 구조와 같음. `npx wrangler deploy`로 배포. 자체 CLAUDE.md 보유.
- **thesis-migration**: 1회성 마이그레이션 스크립트. 비번 하드코딩되어 있음 (별도 git repo 아님)
- **`/Users/doah/study/artswisdom`** (옛 프로토타입): 무관한 레거시 (Next 15 + JSX, 2026-03 마지막 수정). 정리 가능.
