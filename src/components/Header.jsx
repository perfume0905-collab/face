import React from 'react';
import { Zap, Search, PlusCircle, Database, BookOpen, Sparkles } from 'lucide-react';

export default function Header({
  searchTerm,
  setSearchTerm,
  isLiveSupabase,
  onOpenCreatePost,
  onOpenSupabaseConfig,
  onOpenGuide
}) {
  return (
    <header className="site-header">
      <div className="logo-group" onClick={() => setSearchTerm('')}>
        <div className="logo-icon">
          <Zap size={22} />
        </div>
        <div>
          <h1 className="logo-title">AURORA BOARD</h1>
        </div>
        <span className={`status-badge ${isLiveSupabase ? 'live' : 'demo'}`}>
          <span className="status-dot"></span>
          {isLiveSupabase ? 'Supabase 연동 완료' : '데모 에뮬레이션 모드'}
        </span>
      </div>

      <div className="header-search">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="게시글, 태그, 작성자 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="header-actions">
        <button className="btn btn-primary" onClick={onOpenCreatePost}>
          <PlusCircle size={17} />
          <span>새 글 작성</span>
        </button>

        <button className="btn btn-glass" onClick={onOpenSupabaseConfig} title="Supabase DB 설정">
          <Database size={16} />
          <span>Supabase 설정</span>
        </button>

        <button className="btn btn-accent" onClick={onOpenGuide} title="Supabase CLI & MCP 설치 가이드">
          <BookOpen size={16} />
          <span>CLI & MCP 가이드</span>
        </button>
      </div>
    </header>
  );
}
