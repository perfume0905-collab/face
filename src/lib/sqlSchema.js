// Supabase SQL 마이그레이션 스크립트
export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- Supabase 커뮤니티 게시판 DB 스키마 생성 스크립트
-- Supabase 대시보드 -> SQL Editor -> New Query 에 붙여넣고 Run을 눌러주세요.
-- ==========================================

-- 1. posts (게시글) 테이블 생성
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT '자유수다',
    tags TEXT[] DEFAULT '{}',
    author_name VARCHAR(100) DEFAULT '익명 사용자',
    author_avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. comments (댓글) 테이블 생성
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    author_name VARCHAR(100) DEFAULT '익명 사용자',
    author_avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. RLS (Row Level Security) 활성화 & 누구나 접근 가능 정책 설정
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 기존 정책 존재 시 삭제 후 재생성 (에러 방지)
DROP POLICY IF EXISTS "Public Read Posts" ON public.posts;
DROP POLICY IF EXISTS "Public Read Comments" ON public.comments;
DROP POLICY IF EXISTS "Public Insert Posts" ON public.posts;
DROP POLICY IF EXISTS "Public Insert Comments" ON public.comments;
DROP POLICY IF EXISTS "Public Update Posts" ON public.posts;
DROP POLICY IF EXISTS "Public Delete Posts" ON public.posts;
DROP POLICY IF EXISTS "Public Delete Comments" ON public.comments;

-- 읽기 정책 (모두 허용)
CREATE POLICY "Public Read Posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Public Read Comments" ON public.comments FOR SELECT USING (true);

-- 쓰기 정책 (모두 허용)
CREATE POLICY "Public Insert Posts" ON public.posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Comments" ON public.comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Posts" ON public.posts FOR UPDATE USING (true);
CREATE POLICY "Public Delete Posts" ON public.posts FOR DELETE USING (true);
CREATE POLICY "Public Delete Comments" ON public.comments FOR DELETE USING (true);

-- 4. 실시간(Realtime) 구독 활성화
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;

-- 5. 샘플 초기 데이터 삽입
INSERT INTO public.posts (title, content, category, tags, author_name, author_avatar, likes_count, comments_count, views_count)
VALUES 
('🚀 Supabase와 React로 구축한 차세대 게시판에 오신 것을 환영합니다!', 
 '안녕하세요! 이 커뮤니티는 Supabase 백엔드와 오로라 그라데이션 UI를 기반으로 제작된 실시간 소통 공간입니다.\\n\\n### 주요 기능\\n- **Supabase 연동**: 실시간 데이터베이스 조회 및 작성\\n- **Glassmorphism UI**: 압도적인 시각적 몰입감\\n- **CLI & MCP 지원**: 개발자 친화적 환경 제공\\n\\n자유롭게 의견을 나누고 커뮤니티에 참여해보세요!', 
 '공지사항', ARRAY['Supabase', 'React', '공지'], '운영자 스톰', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 42, 3, 328),

('💡 Supabase CLI와 MCP(Model Context Protocol) 설치 및 사용 가이드', 
 'Supabase CLI를 사용하면 터미널에서 즉시 로컬 DB를 구동하고 마이그레이션을 실행할 수 있습니다.\\n\\n\`\`\`bash\\nnpm i -g supabase\\nsupabase init\\nsupabase start\\n\`\`\`\\n\\n상단 메뉴의 **[Guide & CLI]** 버튼을 누르면 더 자세한 설치 및 MCP 연동 방법을 확인하실 수 있습니다!', 
 '코드/기술', ARRAY['CLI', 'MCP', '튜토리얼'], '개발자 라이언', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 29, 2, 195);
`;
