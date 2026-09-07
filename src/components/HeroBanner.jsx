import React from 'react';
import { Sparkles, Activity, ShieldCheck, Flame } from 'lucide-react';

export default function HeroBanner({ totalPosts, totalLikes, isLiveSupabase, onOpenGuide }) {
  return (
    <div className="hero-card">
      <div className="hero-text">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="category-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Sparkles size={12} /> Supabase Realtime Ecosystem
          </span>
        </div>
        <h1>차세대 개발자 & 사용자 커뮤니티</h1>
        <p>
          Supabase의 실시간 백엔드 파워와 압도적인 Glassmorphism 인터페이스로 소통하세요.
          CLI 명령어로 마이그레이션하고 MCP Server로 AI와 연동해보세요!
        </p>

        <div className="hero-tags">
          <span className="hero-tag">
            <Activity size={12} color="#38bdf8" /> Supabase JS Client v2
          </span>
          <span className="hero-tag">
            <ShieldCheck size={12} color="#10b981" /> Row Level Security (RLS)
          </span>
          <span className="hero-tag" onClick={onOpenGuide} style={{ cursor: 'pointer' }}>
            <Flame size={12} color="#f43f5e" /> Supabase CLI & MCP 가이드
          </span>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-value">{totalPosts}</div>
          <div className="stat-label">게시글 수</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--accent-purple)' }}>{totalLikes}</div>
          <div className="stat-label">누적 추천</div>
        </div>
      </div>
    </div>
  );
}
