import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import PostCard from './components/PostCard';
import PostDetailModal from './components/PostDetailModal';
import CreatePostModal from './components/CreatePostModal';
import SupabaseConfigModal from './components/SupabaseConfigModal';
import GuideModal from './components/GuideModal';
import ToastNotification from './components/ToastNotification';
import {
  fetchPostsFromBackend,
  createPostInBackend,
  likePostInBackend,
  addCommentInBackend,
  getSupabaseClient
} from './lib/supabase';
import { MessageSquare, PlusCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveSupabase, setIsLiveSupabase] = useState(false);

  // 필터 및 정렬 상태
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');

  // 모달 상태
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // 토스트 알림 상태
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // 백엔드 데이터 불러오기
  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetchPostsFromBackend();
      setIsLiveSupabase(res.isLive);
      setPosts(res.posts || []);
    } catch (e) {
      console.error('Failed to load posts:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // 새 글 작성 핸들러
  const handleCreatePost = async (newPostData) => {
    const res = await createPostInBackend(newPostData);
    if (res.post) {
      if (res.allPosts) {
        setPosts(res.allPosts);
      } else {
        setPosts((prev) => [res.post, ...prev]);
      }
      setShowCreateModal(false);
      addToast('🚀 게시글이 성공적으로 등록되었습니다!', 'success');
    }
  };

  // 좋아요(추천) 핸들러
  const handleLikePost = async (postId, currentLikes) => {
    const res = await likePostInBackend(postId, currentLikes);
    if (res.allPosts) {
      setPosts(res.allPosts);
    } else {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes_count: res.likes_count } : p))
      );
    }

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => ({ ...prev, likes_count: res.likes_count }));
    }

    addToast('❤️ 게시글을 추천하셨습니다!', 'success');
  };

  // 댓글 작성 핸들러
  const handleAddComment = async (postId, commentData) => {
    const res = await addCommentInBackend(postId, commentData);
    if (res.comment) {
      if (res.allPosts) {
        setPosts(res.allPosts);
        const updated = res.allPosts.find((p) => p.id === postId);
        if (updated) setSelectedPost(updated);
      } else {
        setPosts((prev) =>
          prev.map((p) => {
            if (p.id === postId) {
              const comments = p.comments || [];
              return { ...p, comments: [...comments, res.comment], comments_count: comments.length + 1 };
            }
            return p;
          })
        );
        setSelectedPost((prev) => ({
          ...prev,
          comments: [...(prev.comments || []), res.comment]
        }));
      }
      addToast('💬 댓글이 등록되었습니다.', 'info');
    }
  };

  // 공유하기 링크 복사
  const handleSharePost = (post) => {
    const shareUrl = window.location.origin + '?post=' + post.id;
    navigator.clipboard.writeText(shareUrl);
    addToast('🔗 게시글 공유 링크가 클립보드에 복사되었습니다.', 'info');
  };

  // 게시글 필터링 및 정렬 계산
  const filteredPosts = posts
    .filter((post) => {
      const matchCategory =
        selectedCategory === '전체' ? true : post.category === selectedCategory;
      const term = searchTerm.toLowerCase();
      const matchSearch =
        !term ||
        post.title?.toLowerCase().includes(term) ||
        post.content?.toLowerCase().includes(term) ||
        post.author_name?.toLowerCase().includes(term) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(term)));
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'likes') return (b.likes_count || 0) - (a.likes_count || 0);
      if (sortBy === 'comments')
        return (
          (b.comments ? b.comments.length : b.comments_count || 0) -
          (a.comments ? a.comments.length : a.comments_count || 0)
        );
      if (sortBy === 'views') return (b.views_count || 0) - (a.views_count || 0);
      // latest
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });

  const totalLikesCount = posts.reduce((sum, p) => sum + (p.likes_count || 0), 0);

  return (
    <div className="app-container">
      {/* 배경 오로라 애니메이션 블롭 */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* 상단 헤더 */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLiveSupabase={isLiveSupabase}
        onOpenCreatePost={() => setShowCreateModal(true)}
        onOpenSupabaseConfig={() => setShowConfigModal(true)}
        onOpenGuide={() => setShowGuideModal(true)}
      />

      {/* 히어로 섹션 */}
      <HeroBanner
        totalPosts={posts.length}
        totalLikes={totalLikesCount}
        isLiveSupabase={isLiveSupabase}
        onOpenGuide={() => setShowGuideModal(true)}
      />

      {/* 필터 및 정렬 */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* 게시글 그리드 피드 */}
      {loading ? (
        <div className="empty-state">
          <div className="status-dot" style={{ width: '12px', height: '12px', margin: '0 auto 1rem auto' }}></div>
          <p>커뮤니티 데이터를 로딩하는 중입니다...</p>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onSelectPost={(p) => setSelectedPost(p)}
              onLikePost={handleLikePost}
              onSharePost={handleSharePost}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <MessageSquare size={40} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
          <h3>게시글이 존재하지 않습니다</h3>
          <p style={{ marginTop: '0.5rem' }}>검색어나 필터를 변경하시거나 첫 글을 작성해보세요!</p>
          <button
            className="btn btn-primary"
            style={{ marginTop: '1.5rem' }}
            onClick={() => setShowCreateModal(true)}
          >
            <PlusCircle size={16} /> 첫 게시글 작성하기
          </button>
        </div>
      )}

      {/* 게시글 상세 모달 */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLikePost={handleLikePost}
          onAddComment={handleAddComment}
          onSharePost={handleSharePost}
        />
      )}

      {/* 게시글 작성 모달 */}
      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onSubmitPost={handleCreatePost}
        />
      )}

      {/* Supabase 연동 설정 모달 */}
      {showConfigModal && (
        <SupabaseConfigModal
          onClose={() => setShowConfigModal(false)}
          onSaveConfig={() => {
            setShowConfigModal(false);
            loadPosts();
            addToast('Supabase 설정이 अपडेट되었습니다!', 'success');
          }}
          isLiveSupabase={isLiveSupabase}
        />
      )}

      {/* CLI & MCP 가이드 모달 */}
      {showGuideModal && (
        <GuideModal onClose={() => setShowGuideModal(false)} />
      )}

      {/* 토스트 알림 */}
      <ToastNotification toasts={toasts} />
    </div>
  );
}
