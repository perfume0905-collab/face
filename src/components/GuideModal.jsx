import React, { useState } from 'react';
import { X, Terminal, Cpu, Check, Copy, BookOpen, ExternalLink, Code } from 'lucide-react';

export default function GuideModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('cli'); // 'cli' | 'mcp'
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookOpen size={20} color="var(--accent-indigo)" />
            <h2 className="modal-title">Supabase CLI & MCP 설치 및 사용 가이드</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* 가이드 탭 */}
          <div className="guide-tabs">
            <button
              className={`guide-tab-btn ${activeTab === 'cli' ? 'active' : ''}`}
              onClick={() => setActiveTab('cli')}
            >
              <Terminal size={15} style={{ display: 'inline', marginRight: '0.3rem' }} /> Supabase CLI 설치 & 사용법
            </button>
            <button
              className={`guide-tab-btn ${activeTab === 'mcp' ? 'active' : ''}`}
              onClick={() => setActiveTab('mcp')}
            >
              <Cpu size={15} style={{ display: 'inline', marginRight: '0.3rem' }} /> Supabase MCP Server 연동
            </button>
          </div>

          {activeTab === 'cli' ? (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>
                1. Supabase CLI 설치 (터미널)
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                개발 환경에 맞게 명령어(npm, npx, brew, scoop)로 Supabase CLI를 글로벌 설치합니다.
              </p>

              <div className="code-block">
                <button className="code-copy-btn" onClick={() => handleCopy('npm install -g supabase', 'cli-1')}>
                  {copiedCode === 'cli-1' ? '복사됨!' : '복사'}
                </button>
                <pre># npm을 사용한 글로벌 설치{'\n'}npm install -g supabase{'\n\n'}# macOS Homebrew{'\n'}brew install supabase/tap/supabase{'\n\n'}# Windows Scoop{'\n'}scoop bucket add supabase https://github.com/supabase/scoop-bucket.git{'\n'}scoop install supabase</pre>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '1.5rem 0 0.75rem 0', color: 'var(--accent-purple)' }}>
                2. 프로젝트 초기화 및 로컬 DB 시작
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                로컬 프로젝트 폴더에서 Supabase를 초기화하고 로컬 Docker 백엔드를 시작합니다.
              </p>

              <div className="code-block">
                <button className="code-copy-btn" onClick={() => handleCopy('npx supabase init\nnpx supabase start', 'cli-2')}>
                  {copiedCode === 'cli-2' ? '복사됨!' : '복사'}
                </button>
                <pre># 프로젝트 초기화 (supabase/ 폴더 생성){'\n'}npx supabase init{'\n\n'}# 로컬 Supabase 컨테이너(DB, Auth, Storage, Studio) 시작{'\n'}npx supabase start</pre>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '1.5rem 0 0.75rem 0', color: 'var(--accent-emerald)' }}>
                3. 원격 Supabase 프로젝트 연동 & DB 마이그레이션
              </h3>
              <div className="code-block">
                <button className="code-copy-btn" onClick={() => handleCopy('npx supabase login\nnpx supabase link --project-ref YOUR_PROJECT_ID', 'cli-3')}>
                  {copiedCode === 'cli-3' ? '복사됨!' : '복사'}
                </button>
                <pre># Supabase 계정 로그인{'\n'}npx supabase login{'\n\n'}# 원격 클라우드 프로젝트와 바인딩{'\n'}npx supabase link --project-ref &lt;YOUR_PROJECT_ID&gt;{'\n\n'}# 로컬 변경사항을 클라우드 DB에 적용{'\n'}npx supabase db push</pre>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>
                🤖 Supabase MCP (Model Context Protocol) 연동이란?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
                MCP(Model Context Protocol)를 이용하면 AI 에이전트(Claude Desktop, Antigravity IDE 등)가 사용자의 Supabase 데이터베이스 스키마와 테이블 정보를 직접 읽고 안전하게 SQL 쿼리를 생성하거나 데이터를 조회할 수 있습니다.
              </p>

              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>
                1. MCP Server 설정 JSON 예시 (claude_desktop_config.json)
              </h4>
              <div className="code-block">
                <button
                  className="code-copy-btn"
                  onClick={() =>
                    handleCopy(
                      JSON.stringify(
                        {
                          mcpServers: {
                            supabase: {
                              command: 'npx',
                              args: ['-y', '@modelcontextprotocol/server-supabase'],
                              env: {
                                SUPABASE_URL: 'https://your-project.supabase.co',
                                SUPABASE_SERVICE_ROLE_KEY: 'your-service-role-key'
                              }
                            }
                          }
                        },
                        null,
                        2
                      ),
                      'mcp-json'
                    )
                  }
                >
                  {copiedCode === 'mcp-json' ? '복사됨!' : 'JSON 복사'}
                </button>
                <pre>{`{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-supabase"],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key"
      }
    }
  }
}`}</pre>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem 0', color: '#fff' }}>
                2. AI 커맨드로 DB 상태 질문하기 예시
              </h4>
              <ul style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '1.2rem', lineHeight: 1.7 }}>
                <li>"내 Supabase 게시판에서 가장 인기가 높은 게시글 5개를 가져와줘"</li>
                <li>"posts 테이블에 새로운 카테고리 필드를 추가하는 SQL 마이그레이션 작성해줘"</li>
                <li>"comments 테이블의 RLS 정책이 제대로 적용되어 있는지 검증해줘"</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
