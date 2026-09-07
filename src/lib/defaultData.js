export const INITIAL_DEMO_POSTS = [
  {
    id: 'demo-post-1',
    title: '🚀 Supabase와 React로 구축한 차세대 프리미엄 커뮤니티에 오신 것을 환영합니다!',
    content: `안녕하세요! 이 커뮤니티는 **Supabase 백엔드**와 **Vite + React** 기반의 현대적인 오로라 그라데이션 Glassmorphism UI/UX로 제작된 소통 플랫폼입니다.

### 🌟 주요 커뮤니티 스펙
1. **Supabase 연동 지원**: 실시간 데이터베이스(Realtime Database) 연결로 언제든 내 Supabase 프로젝트와 연결 가능.
2. **Glassmorphism 디자인**: 네온 글로우, 3D 카드 호버 효과, 심리스 반응형 레이아웃.
3. **CLI & MCP 지원 가이드**: Supabase CLI 설치법 및 AI 보조 도구 MCP Server 연동 설명서 내장.
4. **마이크로 인터랙션**: 추천(좋아요) 폭죽 축하 애니메이션, 실시간 댓글 반응.

자유롭게 글을 작성하고 댓글을 남겨보세요! 상단 **[Supabase 설정]** 버튼을 누르면 본인만의 데이터베이스를 연결하실 수 있습니다.`,
    category: '공지사항',
    tags: ['Supabase', 'React', '커뮤니티', 'Glassmorphism'],
    author_name: '오로라 관리자',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    likes_count: 54,
    comments_count: 3,
    views_count: 482,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    comments: [
      {
        id: 'c1',
        author_name: '개발자 닉',
        author_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        content: '디자인이 정말 압도적이네요! 글 쓸 맛이 납니다 🔥',
        created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
      },
      {
        id: 'c2',
        author_name: '수지 Kim',
        author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        content: 'Supabase 연동 모달에서 SQL 스크립트 복사 기능 덕분에 1초만에 제 Supabase DB 설정했어요 ㅎㅎ',
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      },
      {
        id: 'c3',
        author_name: '테크마스터',
        author_avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
        content: 'MCP 가이드 탭 정리 잘 되어 있어서 바로 설치해봤습니다!',
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString()
      }
    ]
  },
  {
    id: 'demo-post-2',
    title: '💻 Supabase CLI & MCP(Model Context Protocol) 완전 설치 가이드 요약',
    content: `Supabase CLI는 로컬 환경에서 DB를 빠르게 실행하고 마이그레이션 및 타입 생성을 도와주는 개발자 최고의 도구입니다.

#### 1. CLI 설치 명령어
\`\`\`bash
# npm 사용 시
npm install -g supabase

# macOS Homebrew 사용 시
brew install supabase/tap/supabase
\`\`\`

#### 2. 프로젝트 초기화 및 로컬 실행
\`\`\`bash
supabase init
supabase start
\`\`\`

#### 3. MCP (Model Context Protocol) 연동
AI 에이전트(Claude Desktop, Antigravity 등)에 Supabase MCP Server를 등록하면, AI가 내 데이터베이스 구조를 읽고 스키마 쿼리를 자동 생성할 수 있습니다!

상단 **[CLI & MCP 가이드]** 버튼을 클릭하시면 전체 복사 가능한 스크립트와 상세 가이드를 볼 수 있습니다.`,
    category: '코드/기술',
    tags: ['Supabase', 'CLI', 'MCP', '백엔드', '개발팁'],
    author_name: '알렉스 Dev',
    author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    likes_count: 38,
    comments_count: 1,
    views_count: 290,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    comments: [
      {
        id: 'c4',
        author_name: '코딩꿈나무',
        author_avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
        content: 'MCP 설정이 궁금했는데 아주 유용한 정보네요!',
        created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString()
      }
    ]
  },
  {
    id: 'demo-post-3',
    title: '💡 2026년 웹 프론트엔드 디자인 트렌드: Glassmorphism & Cyber Aura',
    content: `최근 프론트엔드 UI 트렌드는 기존 플랫 디자인을 넘어 **반투명 블러(Backdrop Filter)**, **입체 네온 파티클**, 그리고 **다크모드 오로라 그래디언트**가 결합된 정교한 인터랙션 디자인이 주를 이루고 있습니다.

> "훌륭한 UI/UX는 단순한 시각적 예쁨을 넘어, 사용자가 서비스와 소통하는 모든 순간에 감탄(Wow)을 주는 경험입니다."

여러분은 어떤 UI 디자인 스타일에 끌리시나요? 의견을 남겨주세요!`,
    category: '아이디어',
    tags: ['UIUX', 'Design', 'Glassmorphism', 'Trend'],
    author_name: '클로이 UX대장',
    author_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    likes_count: 45,
    comments_count: 0,
    views_count: 310,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    comments: []
  },
  {
    id: 'demo-post-4',
    title: '🚀 사이드 프로젝트 "Supabase 3분 커뮤니티 생성기" 자랑해봅니다!',
    content: `퇴근 후 주말 동안 Supabase와 React로 제작한 풀스택 커뮤니티 프로젝트를 완성했습니다!

- ⚡️ **Vite + React** 기반 0.1초 렌더링
- 🛡 **Supabase Row Level Security (RLS)** 안전 보호
- 🎨 **커스텀 CSS 애니메이션 및 하트 폭죽**

많은 피드백과 응원 부탁드립니다!`,
    category: '프로젝트 자랑',
    tags: ['사이드프로젝트', 'Supabase', 'React', '토이프로젝트'],
    author_name: '주말코딩러',
    author_avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    likes_count: 62,
    comments_count: 2,
    views_count: 520,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    comments: [
      {
        id: 'c5',
        author_name: '스타트업CTO',
        author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        content: '완성도가 장난 아니네요! 스타 코딩하고 갑니다 ⭐️',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
      }
    ]
  }
];
