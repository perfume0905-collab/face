import React, { useState } from 'react';
import { X, Heart, MessageSquare, Send, Share2, Tag, Calendar, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PostDetailModal({
  post,
  onClose,
  onLikePost,
  onAddComment,
  onSharePost
}) {
  const [commentText, setCommentText] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  if (!post) return null;

  const handleLike = () => {
    setIsLiked(true);
    onLikePost(post.id, post.likes_count || 0);

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#a855f7', '#38bdf8']
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(post.id, {
      author_name: commenterName.trim() || '익명 사용자',
      content: commentText.trim()
    });

    setCommentText('');
  };

  const renderContent = (content) => {
    if (!content) return '';
    // 줄바꿈 및 마크다운 코드블록 이스케이프 지원
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('```')) {
        return <div key={idx} className="code-block" style={{ margin: '0.5rem 0' }}><code>{line.replace(/```/g, '')}</code></div>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} style={{ margin: '1rem 0 0.5rem 0', color: 'var(--accent-cyan)' }}>{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={idx} style={{ margin: '0.8rem 0 0.4rem 0', color: 'var(--accent-purple)' }}>{line.replace('#### ', '')}</h4>;
      }
      if (line.startsWith('- ')) {
        return <li key={idx} style={{ marginLeft: '1.2rem', color: 'var(--text-main)' }}>{line.replace('- ', '')}</li>;
      }
      return <p key={idx} style={{ marginBottom: '0.6rem' }}>{line}</p>;
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="category-badge">{post.category || '자유수다'}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>
            {post.title}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-glass)' }}>
            <div className="author-info">
              <img
                src={post.author_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                alt={post.author_name}
                className="author-avatar"
              />
              <div>
                <div className="author-name">{post.author_name || '익명 사용자'}</div>
                <div className="post-time" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={12} /> {new Date(post.created_at).toLocaleString('ko-KR')}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`btn btn-glass ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
                style={{ color: isLiked ? 'var(--accent-rose)' : 'inherit' }}
              >
                <Heart size={16} fill={isLiked ? '#f43f5e' : 'none'} />
                <span>추천 {post.likes_count || 0}</span>
              </button>

              <button className="btn btn-glass" onClick={() => onSharePost(post)}>
                <Share2 size={16} />
                <span>공유</span>
              </button>
            </div>
          </div>

          <div style={{ fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '2rem', color: '#e2e8f0' }}>
            {renderContent(post.content)}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="card-tags" style={{ marginBottom: '2rem' }}>
              {post.tags.map((tag, idx) => (
                <span key={idx} className="tag-item" style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 댓글 섹션 */}
          <div className="comments-section">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={18} color="var(--accent-cyan)" />
              댓글 ({post.comments ? post.comments.length : 0})
            </h3>

            <form onSubmit={handleCommentSubmit} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="작성자 닉네임 (기본: 익명 사용자)"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  style={{ maxWidth: '240px' }}
                />
              </div>
              <div className="comment-input-box">
                <input
                  type="text"
                  className="form-input"
                  placeholder="친절하고 따뜻한 댓글을 남겨보세요..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  <Send size={16} />
                  <span>등록</span>
                </button>
              </div>
            </form>

            <div className="comment-list">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <div className="comment-author">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img
                          src={comment.author_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                          alt={comment.author_name}
                          style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                        />
                        <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{comment.author_name}</span>
                      </div>
                      <span className="post-time">
                        {new Date(comment.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>{comment.content}</p>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                  아직 첫 댓글이 없습니다. 가장 먼저 첫 의견을 작성해보세요!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
