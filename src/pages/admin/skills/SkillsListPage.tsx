import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSkillsByCategory, postDeleteSkill, SkillCategory, SkillDetail } from '../../../network';

const SkillsListPage: React.FC = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = async () => {
    setLoading(true);
    const response = await getSkillsByCategory();
    if (response.success && response.data) {
      setCategories(response.data);
    } else {
      setError(response.error || '스킬 목록을 불러오는데 실패했습니다.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (skill: SkillDetail) => {
    if (!confirm(`"${skill.name}" 스킬을 삭제하시겠습니까?`)) return;

    const response = await postDeleteSkill(skill.id);
    if (response.success) {
      fetchSkills();
    } else {
      alert(response.error || '삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <p>{error}</p>
        <button onClick={fetchSkills}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className="admin-list-page">
      <header className="admin-page-header">
        <div className="admin-page-header-left">
          <h1>기술스택 관리</h1>
          <p>보유한 기술스택을 관리합니다.</p>
        </div>
        <div className="admin-page-header-right">
          <Link to="/admin/skills/new" className="admin-btn admin-btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            새 스킬 추가
          </Link>
        </div>
      </header>

      {categories.length === 0 ? (
        <div className="admin-empty">
          <p>등록된 스킬이 없습니다.</p>
          <Link to="/admin/skills/new" className="admin-btn admin-btn-primary">
            첫 스킬 추가하기
          </Link>
        </div>
      ) : (
        <div className="admin-categories-list">
          {categories.map((category) => (
            <section key={category.id} className="admin-category-section">
              <h2 className="admin-category-title">{category.name}</h2>
              <div className="admin-skills-grid">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="admin-skill-card">
                    <span className="admin-skill-name">{skill.name}</span>
                    <div className="admin-skill-actions">
                      <Link
                        to={`/admin/skills/edit/${skill.id}`}
                        className="admin-btn-icon"
                        title="수정"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(skill)}
                        className="admin-btn-icon admin-btn-danger"
                        title="삭제"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsListPage;
