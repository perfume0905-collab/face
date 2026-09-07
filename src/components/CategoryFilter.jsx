import React from 'react';
import { Layers, ArrowUpDown } from 'lucide-react';

const CATEGORIES = ['전체', '공지사항', '코드/기술', '아이디어', '자유수다', '프로젝트 자랑'];

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy
}) {
  return (
    <div className="filter-bar">
      <div className="category-pills">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ArrowUpDown size={15} color="var(--text-muted)" />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">최신 등록순</option>
          <option value="likes">추천(좋아요)순</option>
          <option value="comments">댓글 많은순</option>
          <option value="views">조회수순</option>
        </select>
      </div>
    </div>
  );
}
