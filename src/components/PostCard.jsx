import React, { useState } from 'react';
import { Heart, MessageSquare, Eye, Share2, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PostCard({ post, onSelectPost, onLikePost, onSharePost }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(true);
    onLikePost(post.id, post.likes_count || 0);

    // 하트 폭죽 애니메이션 효과
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#a855f7', '#38bdf8']
    });
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffMin = Math.floor((now - date) / (1000 * 60));

    if (diffMin < 1) return '방금 전';
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}시간 전`;
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <div className="post-card" onClick={() => onSelectPost(post)}>
      <div>
        <div className="card-header">
          <div className="author-info">
            <img
              src={post.author_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
              alt={post.author_name}
              className="author-avatar"
            />
            <div>
              <div className="author-name">{post.author_name || '익명 사용자'}</div>
              <div className="post-time">{formatDate(post.created_at)}</div>
            </div>
          </div>
          <span className="category-badge">{post.category || '자유수다'}</span>
        </div>

        <h3 className="card-title">{post.title}</h3>
        <p className="card-excerpt">
          {post.content ? post.content.replace(/[#*`]/g, '') : ''}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="card-tags">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="tag-item">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="card-metrics">
          <button
            className={`metric-btn like-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}
          >
            <Heart size={15} fill={isLiked ? '#f43f5e' : 'none'} />
            <span>{post.likes_count || 0}</span>
          </button>

          <div className="metric-btn">
            <MessageSquare size={15} />
            <span>{post.comments ? post.comments.length : (post.comments_count || 0)}</span>
          </div>

          <div className="metric-btn">
            <Eye size={15} />
            <span>{post.views_count || 0}</span>
          </div>
        </div>

        <button
          className="metric-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSharePost(post);
          }}
          title="게시글 공유"
        >
          <Share2 size={15} />
        </button>
      </div>
    </div>
  );
}
