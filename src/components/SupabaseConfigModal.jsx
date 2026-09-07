import React, { useState } from 'react';
import { X, Database, Check, Copy, Key, Link as LinkIcon, Sparkles } from 'lucide-react';
import { SUPABASE_SQL_SCHEMA } from '../lib/sqlSchema';
import { getStoredSupabaseConfig, setStoredSupabaseConfig } from '../lib/supabase';

export default function SupabaseConfigModal({ onClose, onSaveConfig, isLiveSupabase }) {
  const currentConfig = getStoredSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url);
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey);
  const [copiedSql, setCopiedSql] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setStoredSupabaseConfig(url.trim(), anonKey.trim());
    onSaveConfig();
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Database size={20} color="var(--accent-cyan)" />
            <h2 className="modal-title">Supabase 백엔드 연동 & DB 설정</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.88rem', color: '#e0f2fe' }}>
            💡 <strong>내 Supabase 데이터베이스 연결 방법</strong>
            <br />
            Supabase 대시보드(https://supabase.com) 프로젝트의 <code>Settings -&gt; API</code>에서 Project URL과 anon public key를 복사하여 아래에 입력하세요.
          </div>

          <form onSubmit={handleSave} style={{ marginBottom: '2rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LinkIcon size={14} color="var(--accent-cyan)" /> Supabase Project URL
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="https://xyzcompany.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Key size={14} color="var(--accent-purple)" /> Supabase Anon Public Key
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="eyJhYmdj... (Public Anon Key)"
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-glass"
                onClick={() => {
                  setStoredSupabaseConfig('', '');
                  setUrl('');
                  setAnonKey('');
                  onSaveConfig();
                }}
              >
                설정 초기화 (데모 모드로 전환)
              </button>

              <button type="submit" className="btn btn-primary">
                <Sparkles size={16} />
                <span>저장 및 연동 검증</span>
              </button>
            </div>
          </form>

          <hr style={{ borderColor: 'var(--border-glass)', margin: '1.5rem 0' }} />

          {/* SQL 스키마 복사 섹션 */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              ⚡️ Supabase DB 테이블 생성 SQL 스크립트
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Supabase SQL Editor에 복사하여 붙여넣으면 <code>posts</code>, <code>comments</code> 테이블 및 실시간 RLS 정책이 1초만에 자동 생성됩니다.
            </p>

            <div className="code-block" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <button className="code-copy-btn" onClick={handleCopySql}>
                {copiedSql ? (
                  <span style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Check size={12} /> 복사 완료!
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Copy size={12} /> SQL 전체 복사
                  </span>
                )}
              </button>
              <pre>{SUPABASE_SQL_SCHEMA}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
