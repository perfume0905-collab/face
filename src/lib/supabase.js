import { createClient } from '@supabase/supabase-js';
import { INITIAL_DEMO_POSTS } from './defaultData';

// 로컬 스토리지 또는 환경 변수에서 Supabase 연결 설정 로드
export const getStoredSupabaseConfig = () => {
  const url = localStorage.getItem('supabase_url') || import.meta.env.VITE_SUPABASE_URL || '';
  const anonKey = localStorage.getItem('supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  return { url, anonKey };
};

export const setStoredSupabaseConfig = (url, anonKey) => {
  localStorage.setItem('supabase_url', url);
  localStorage.setItem('supabase_anon_key', anonKey);
};

// Supabase 클라이언트 인스턴스 생성 함수
export const getSupabaseClient = () => {
  const { url, anonKey } = getStoredSupabaseConfig();
  if (url && anonKey && url.startsWith('http')) {
    try {
      return createClient(url, anonKey);
    } catch (e) {
      console.error('Supabase Client Error:', e);
      return null;
    }
  }
  return null;
};

// --- 데모 로컬스토리지 데이터 관리 헬퍼 ---
const LOCAL_STORAGE_POSTS_KEY = 'aurora_board_posts_v1';

export const getLocalPosts = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_POSTS_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_POSTS_KEY, JSON.stringify(INITIAL_DEMO_POSTS));
    return INITIAL_DEMO_POSTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_DEMO_POSTS;
  }
};

export const saveLocalPosts = (posts) => {
  localStorage.setItem(LOCAL_STORAGE_POSTS_KEY, JSON.stringify(posts));
};

// --- 백엔드 데이터 레이어 (Supabase & Fallback 통합) ---

// 1. 게시글 목록 불러오기
export const fetchPostsFromBackend = async () => {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        // 댓글 목록도 함께 로드하기 시도
        const postsWithComments = await Promise.all(
          data.map(async (post) => {
            const { data: comments } = await supabase
              .from('comments')
              .select('*')
              .eq('post_id', post.id)
              .order('created_at', { ascending: true });
            
            return {
              ...post,
              comments: comments || []
            };
          })
        );
        return { isLive: true, posts: postsWithComments };
      }
    } catch (err) {
      console.warn('Supabase fetch failed, fallback to local storage:', err);
    }
  }

  // Fallback to local storage demo
  return { isLive: false, posts: getLocalPosts() };
};

// 2. 새 게시글 생성
export const createPostInBackend = async (newPost) => {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const postPayload = {
        title: newPost.title,
        content: newPost.content,
        category: newPost.category || '자유수다',
        tags: newPost.tags || [],
        author_name: newPost.author_name || '익명 사용자',
        author_avatar: newPost.author_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        likes_count: 0,
        comments_count: 0,
        views_count: 1
      };

      const { data, error } = await supabase
        .from('posts')
        .insert([postPayload])
        .select();

      if (!error && data && data.length > 0) {
        return { isLive: true, post: { ...data[0], comments: [] } };
      }
    } catch (err) {
      console.warn('Supabase create error:', err);
    }
  }

  // Fallback to local storage
  const posts = getLocalPosts();
  const created = {
    id: 'post-' + Date.now(),
    title: newPost.title,
    content: newPost.content,
    category: newPost.category || '자유수다',
    tags: newPost.tags || [],
    author_name: newPost.author_name || '익명 사용자',
    author_avatar: newPost.author_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    likes_count: 0,
    comments_count: 0,
    views_count: 1,
    created_at: new Date().toISOString(),
    comments: []
  };

  const updatedPosts = [created, ...posts];
  saveLocalPosts(updatedPosts);
  return { isLive: false, post: created, allPosts: updatedPosts };
};

// 3. 좋아요(추천) 카운트 증가
export const likePostInBackend = async (postId, currentLikes) => {
  const supabase = getSupabaseClient();
  const newCount = (currentLikes || 0) + 1;

  if (supabase) {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ likes_count: newCount })
        .eq('id', postId);

      if (!error) {
        return { isLive: true, likes_count: newCount };
      }
    } catch (err) {
      console.warn('Supabase like failed:', err);
    }
  }

  // Fallback to local storage
  const posts = getLocalPosts();
  const updatedPosts = posts.map((p) =>
    p.id === postId ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p
  );
  saveLocalPosts(updatedPosts);
  return { isLive: false, likes_count: newCount, allPosts: updatedPosts };
};

// 4. 댓글 작성
export const addCommentInBackend = async (postId, commentData) => {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            author_name: commentData.author_name || '익명 사용자',
            author_avatar: commentData.author_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            content: commentData.content
          }
        ])
        .select();

      if (!error && data && data.length > 0) {
        // 게시글 댓글 수 증가
        const { data: postData } = await supabase
          .from('posts')
          .select('comments_count')
          .eq('id', postId)
          .single();
        
        const nextCount = ((postData?.comments_count) || 0) + 1;
        await supabase.from('posts').update({ comments_count: nextCount }).eq('id', postId);

        return { isLive: true, comment: data[0] };
      }
    } catch (err) {
      console.warn('Supabase comment error:', err);
    }
  }

  // Fallback to local storage
  const posts = getLocalPosts();
  const newComment = {
    id: 'c-' + Date.now(),
    author_name: commentData.author_name || '익명 사용자',
    author_avatar: commentData.author_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content: commentData.content,
    created_at: new Date().toISOString()
  };

  const updatedPosts = posts.map((p) => {
    if (p.id === postId) {
      const existingComments = p.comments || [];
      return {
        ...p,
        comments_count: existingComments.length + 1,
        comments: [...existingComments, newComment]
      };
    }
    return p;
  });

  saveLocalPosts(updatedPosts);
  return { isLive: false, comment: newComment, allPosts: updatedPosts };
};
