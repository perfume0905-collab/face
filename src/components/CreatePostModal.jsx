import React, { useState } from 'react';
import { X, Sparkles, Image, Tag as TagIcon, Eye, Edit3 } from 'lucide-react';

const CATEGORIES = ['공지사항', '코드/기술', '아이디어', '자유수다', '프로젝트 자랑'];

const AVATAR_OPTIONS = [
  { name: '개발자 라이언', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { name: '디자이너 클로이', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { name: '운영자 스톰', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { name: '테크마스터', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150' }
];

export default function CreatePostModal({ onClose, onSubmitPost }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('자유수다');
  const [tagsInput, setTagsInput] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('익명 사용자');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].url);
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' | 'preview'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tagsArr = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    onSubmitPost({
      title: title.trim(),
      category,
      tags: tagsArr,
      content: content.trim(),
      author_name: authorName.trim() || '익명 사용자',
      author_avatar: selectedAvatar
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={20} color="var(--accent-purple)" />
            <h2 className="modal-title">새 커뮤니티 게시글 작성</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <button
              type="button"
              className={`pill-btn ${activeTab === 'edit' ? 'active' : ''}`}
              onClick={() => setActiveTab('edit')}
            >
              <Edit3 size={14} style={{ display: 'inline', marginRight: '0.3rem' }} /> 작성하기
            </button>
            <button
              type="button"
              className={`pill-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              <Eye size={14} style={{ display: 'inline', marginRight: '0.3rem' }} /> 미리보기
            </button>
          </div>

          {activeTab === 'edit' ? (
            <>
              <div className="form-group">
                <label className="form-label">게시글 제목 *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="커뮤니티 유저들의 눈길을 사로잡을 제목을 입력하세요..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">카테고리</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">태그 (쉼표로 구분)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Supabase, React, CLI"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">작성자 닉네임 및 아바타 선택</label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="익명 사용자"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    style={{ maxWidth: '200px' }}
                  />
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {AVATAR_OPTIONS.map((av, idx) => (
                      <img
                        key={idx}
                        src={av.url}
                        alt={av.name}
                        onClick={() => {
                          setSelectedAvatar(av.url);
                          setAuthorName(av.name);
                        }}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          border: selectedAvatar === av.url ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                          opacity: selectedAvatar === av.url ? 1 : 0.6
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">본문 내용 (마크다운 지원) *</label>
                <textarea
                  className="form-textarea"
                  placeholder="자유롭게 이야기를 써보세요. # 제목, ```코드 블록```, - 리스트 형식을 지원합니다."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
            </>
          ) : (
            <div style={{ minHeight: '300px', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
              <span className="category-badge" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>{category}</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>{title || '제목 없음'}</h2>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#e2e8f0' }}>
                {content || '본문 내용이 없습니다.'}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-glass" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} />
              <span>게시글 등록</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
