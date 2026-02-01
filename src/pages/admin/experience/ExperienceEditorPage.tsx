import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getExperience,
  postCreateExperience,
  postUpdateExperience,
  ExperienceTask,
  CreateExperienceRequest,
  UpdateExperienceRequest
} from '../../../network';

interface FormData {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  is_dev: boolean;
  tasks: ExperienceTask[];
  tags: string[];
}

const ExperienceEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<FormData>({
    company: '',
    position: '',
    start_date: '',
    end_date: '',
    is_current: false,
    is_dev: true,
    tasks: [],
    tags: []
  });
  const [newTask, setNewTask] = useState('');
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      fetchExperience(id);
    }
  }, [id, isEditMode]);

  const fetchExperience = async (expId: string) => {
    setLoading(true);
    const response = await getExperience(expId);
    if (response.success && response.data) {
      const exp = response.data;
      setFormData({
        company: exp.company,
        position: exp.position,
        start_date: exp.start_date || '',
        end_date: exp.end_date || '',
        is_current: exp.is_current,
        is_dev: exp.is_dev,
        tasks: exp.tasks || [],
        tags: exp.tags || []
      });
    } else {
      setError(response.error || '경력을 불러오는데 실패했습니다.');
    }
    setLoading(false);
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const task: ExperienceTask = {
      id: `task-${Date.now()}`,
      task: newTask.trim()
    };
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, task]
    }));
    setNewTask('');
  };

  const handleRemoveTask = (taskId: string) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId)
    }));
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    if (formData.tags.includes(newTag.trim())) return;
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, newTag.trim()]
    }));
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company.trim()) {
      alert('회사/기관명을 입력해주세요.');
      return;
    }

    if (!formData.position.trim()) {
      alert('직책을 입력해주세요.');
      return;
    }

    setSaving(true);

    try {
      const data = {
        company: formData.company,
        position: formData.position,
        start_date: formData.start_date || null,
        end_date: formData.is_current ? null : (formData.end_date || null),
        is_current: formData.is_current,
        is_dev: formData.is_dev,
        tasks: formData.tasks,
        tags: formData.tags
      };

      let response;
      if (isEditMode && id) {
        response = await postUpdateExperience(id, data as UpdateExperienceRequest);
      } else {
        response = await postCreateExperience(data as CreateExperienceRequest);
      }

      if (response.success) {
        navigate('/admin/experience');
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
        <button onClick={() => navigate('/admin/experience')}>목록으로</button>
      </div>
    );
  }

  return (
    <div className="admin-editor-page">
      <header className="admin-page-header">
        <button
          type="button"
          className="admin-btn-back"
          onClick={() => navigate('/admin/experience')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          목록으로
        </button>
        <h1>{isEditMode ? '경력 수정' : '새 경력 추가'}</h1>
      </header>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label htmlFor="company">회사/기관명 *</label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="예: (주)포인정보"
              className="admin-input"
              autoFocus
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="position">직책 *</label>
            <input
              type="text"
              id="position"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              placeholder="예: 프론트엔드 개발자"
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label htmlFor="start_date">시작일</label>
            <input
              type="text"
              id="start_date"
              value={formData.start_date}
              onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              placeholder="예: 2025-04"
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="end_date">종료일</label>
            <input
              type="text"
              id="end_date"
              value={formData.end_date}
              onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
              placeholder="예: 2025-12"
              className="admin-input"
              disabled={formData.is_current}
            />
          </div>
        </div>

        <div className="admin-form-row admin-form-row-checkboxes">
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={formData.is_current}
              onChange={(e) => setFormData(prev => ({ ...prev, is_current: e.target.checked }))}
            />
            <span>현재 재직중</span>
          </label>

          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={formData.is_dev}
              onChange={(e) => setFormData(prev => ({ ...prev, is_dev: e.target.checked }))}
            />
            <span>개발 직무</span>
          </label>
        </div>

        <div className="admin-form-group">
          <label>주요 업무</label>
          <div className="admin-list-input">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="업무 내용을 입력하고 Enter 또는 추가 버튼을 누르세요"
              className="admin-input"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTask())}
            />
            <button type="button" onClick={handleAddTask} className="admin-btn admin-btn-secondary">
              추가
            </button>
          </div>
          {formData.tasks.length > 0 && (
            <ul className="admin-task-list">
              {formData.tasks.map((task) => (
                <li key={task.id} className="admin-task-item">
                  <span>{task.task}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTask(task.id)}
                    className="admin-btn-remove"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-form-group">
          <label>기술 태그</label>
          <div className="admin-list-input">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="태그를 입력하고 Enter 또는 추가 버튼을 누르세요"
              className="admin-input"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <button type="button" onClick={handleAddTag} className="admin-btn admin-btn-secondary">
              추가
            </button>
          </div>
          {formData.tags.length > 0 && (
            <div className="admin-tags">
              {formData.tags.map((tag) => (
                <span key={tag} className="admin-tag">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={() => navigate('/admin/experience')}
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

export default ExperienceEditorPage;
