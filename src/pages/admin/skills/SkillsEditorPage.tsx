import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getSkill,
  postCreateSkill,
  postUpdateSkill,
  SkillDetail,
  CreateSkillRequest,
  UpdateSkillRequest
} from '../../../network';

const CATEGORIES = [
  { id: 'frontend', name: '프론트엔드' },
  { id: 'state', name: '상태관리' },
  { id: 'tools', name: '도구' },
  { id: 'backend', name: '백엔드' },
  { id: 'database', name: '데이터베이스' },
  { id: 'other', name: '기타' }
];

const SkillsEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    category_id: 'frontend',
    category_name: '프론트엔드'
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      fetchSkill(id);
    }
  }, [id, isEditMode]);

  const fetchSkill = async (skillId: string) => {
    setLoading(true);
    const response = await getSkill(skillId);
    if (response.success && response.data) {
      const skill = response.data;
      setFormData({
        name: skill.name,
        category_id: skill.category_id,
        category_name: skill.category_name
      });
    } else {
      setError(response.error || '스킬을 불러오는데 실패했습니다.');
    }
    setLoading(false);
  };

  const handleCategoryChange = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    setFormData(prev => ({
      ...prev,
      category_id: categoryId,
      category_name: category?.name || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('스킬 이름을 입력해주세요.');
      return;
    }

    setSaving(true);

    try {
      let response;
      if (isEditMode && id) {
        const updateData: UpdateSkillRequest = {
          name: formData.name,
          category_id: formData.category_id,
          category_name: formData.category_name
        };
        response = await postUpdateSkill(id, updateData);
      } else {
        const createData: CreateSkillRequest = {
          name: formData.name,
          category_id: formData.category_id,
          category_name: formData.category_name
        };
        response = await postCreateSkill(createData);
      }

      if (response.success) {
        navigate('/admin/skills');
      } else {
        alert(response.error || '저장 중 오류가 발생했습니다.');
      }
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
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
        <button onClick={() => navigate('/admin/skills')}>목록으로</button>
      </div>
    );
  }

  return (
    <div className="admin-editor-page">
      <header className="admin-page-header">
        <button
          type="button"
          className="admin-btn-back"
          onClick={() => navigate('/admin/skills')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          목록으로
        </button>
        <h1>{isEditMode ? '스킬 수정' : '새 스킬 추가'}</h1>
      </header>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label htmlFor="category">카테고리</label>
          <select
            id="category"
            value={formData.category_id}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="admin-input"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="admin-form-group">
          <label htmlFor="name">스킬 이름</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="예: React, TypeScript"
            className="admin-input"
            autoFocus
          />
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={() => navigate('/admin/skills')}
          >
            취소
          </button>
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={saving}
          >
            {saving ? '저장 중...' : (isEditMode ? '수정하기' : '추가하기')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillsEditorPage;
