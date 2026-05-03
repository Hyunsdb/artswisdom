# 지혜의밭 (artswisdom) — wisdom 공개 사이트

이 프로젝트는 `artswisdom.com`의 Next.js 16 (App Router, Turbopack) 공개 사이트입니다. Cloudflare Workers에 OpenNext로 배포됩니다.

## 관련 프로젝트

| 프로젝트 | 경로 | 용도 | 도메인 |
|---|---|---|---|
| **wisdom** (이 저장소) | `/Users/doah/study/work/wisdom` | 공개 사이트 | `artswisdom.com` |
| **somatic-admin** | `/Users/doah/study/work/somatic-admin` | 운영자 어드민 | `admin.artswisdom.com` |
| **thesis-migration** | `/Users/doah/study/work/thesis-migration` | 논문 데이터 이관 (Python) | - |

두 Next.js 프로젝트는 같은 Supabase DB를 공유합니다.

## 자격증명

자격증명/비밀번호/프로젝트 식별자 등 민감 정보는 `CREDENTIALS.md`에 있습니다 (gitignore 처리됨).

## 스택

- Next.js 16, React 19, TypeScript, Tailwind CSS
- Supabase (PostgreSQL 17.6, RLS)
- Cloudflare Workers + `@opennextjs/cloudflare`
- Tiptap (어드민 측 리치텍스트)

## 명령어 빠른 참조

```bash
# 개발
npm run dev

# 타입체크
npx tsc --noEmit

# 빌드 + 배포 (Cloudflare)
npx opennextjs-cloudflare build
npx wrangler deploy
```

## 주요 디렉터리

- `src/app/` — App Router 라우트 (notice, thesis, somatic-lab, business, healsoma, daily-art 등)
- `src/components/` — 재사용 컴포넌트, 도메인별 폴더
- `src/lib/queries/` — Supabase 쿼리 함수
- `src/lib/supabase/` — `client`/`server` Supabase 클라이언트 팩토리
- `src/types/database.ts` — Supabase 자동 생성 타입

## 캐싱 정책

- `/thesis` 목록: `revalidate = 31536000` (1년, ISR)
- `/thesis/[id]`: `revalidate = 31536000`
- 공지사항 상세 페이지는 동적 렌더링 (조회수 카운트를 위해)
- 변경 시 `revalidatePath('/thesis')` 등으로 무효화

## DB 정책 메모

- `notices` 테이블의 anon UPDATE는 RLS가 막음 → 조회수는 RPC `increment_notice_view(notice_id int)` (SECURITY DEFINER)로 처리
- `thesis_papers` 머티리얼라이즈드 뷰: `(keyword, keyword_file_num)`로 그룹핑된 논문 목록
- `thesis_reports` 검색은 `content`에 `pg_trgm` GIN 인덱스 적용 (`ilike '%term%'` 빠름)

## 알려진 데이터 이슈

- `keyword_file_num = 999`은 "기타 모음" 버킷 — 한 키 아래 여러 논문이 잘못 묶여 있음 (touch=129, mindfulness=72, 터치=39 외 11개 버킷)
- 일부 논문은 본문 구두점이 제거된 채 저장됨, address가 죽은 nanet 검색 페이지인 경우 다수
- `id=162786`은 빈 row (keyword/content 모두 비어 있음)
- 공지사항 일부에 `style="text-align:center"` 인라인 — `NoticeDetail.tsx`에서 `[&_*]:!text-left`로 강제 좌측 정렬

## 배포

- Push만으로 자동 배포되지 않음 — 수동으로 `wrangler deploy` 실행 필요
- 빌드 결과는 `.open-next/` (gitignore)
- `wrangler.toml`에 환경변수 (anon key) 노출. `SUPABASE_SERVICE_ROLE_KEY`는 Worker secret (admin 쪽만 사용)
