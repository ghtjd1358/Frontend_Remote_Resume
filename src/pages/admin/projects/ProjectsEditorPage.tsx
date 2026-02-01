import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProject,
  postCreateProject,
  postUpdateProject,
  ProjectTask,
  CreateProjectRequest,
  UpdateProjectRequest
} from '../../../network';

interface FormData {
  title: string;
  role: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  tasks: ProjectTask[];
  tags: string[];
  image_url: string;
}

const ProjectsEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    role: '',
    start_date: '',
    end_date: '',
    is_current: false,
    tasks: [],
    tags: [],
    image_url: ''
  });
  const [newTask, setNewTask] = useState('');
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      fetchProject(id);
    }
  }, [id, isEditMode]);

  const fetchProject = async (projectId: string) => {
    setLoading(true);
    const response = await getProject(projectId);
    if (response.success && response.data) {
      const project = response.data;
      setFormData({
        title: project.title,
        role: project.role || '',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        is_current: project.is_current,
        tasks: project.tasks || [],
        tags: project.tags || [],
        image_url: project.image_url || ''
      });
    } else {
      setError(response.error || '프로젝트를 불러오는데 실패했습니다.');
    }
    setLoading(false);
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const task: ProjectTask = {
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

    if (!formData.title.trim()) {
      alert('프로젝트명을 입력해주세요.');
      return;
    }

    setSaving(true);

    try {
      const data = {
        title: formData.title,
        role: formData.role || null,
        start_date: formData.start_date || null,
        end_date: formData.is_current ? null : (formData.end_date || null),
        is_current: formData.is_current,
        tasks: formData.tasks,
        tags: formData.tags,
        image_url: formData.image_url || null
      };

      let response;
      if (isEditMode && id) {
        response = await postUpdateProject(id, data as UpdateProjectRequest);
      } else {
        response = await postCreateProject(data as CreateProjectRequest);
      }

      if (response.success) {
        navigate('/admin/projects');
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
        <button onClick={() => navigate('/admin/projects')}>목록으로</button>
      </div>
    );
  }

  return (
    <div className="admin-editor-page">
      <header className="admin-page-header">
        <button
          type="button"
          className="admin-btn-back"
          onClick={() => navigate('/admin/projects')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          목록으로
        </button>
        <h1>{isEditMode ? '프로젝트 수정' : '새 프로젝트 추가'}</h1>
      </header>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label htmlFor="title">프로젝트명 *</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="예: 개인 플랫폼"
            className="admin-input"
            autoFocus
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="role">역할/설명</label>
          <input
            type="text"
            id="role"
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            placeholder="예: 개인 프로젝트 · 설계/개발"
            className="admin-input"
          />
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label htmlFor="start_date">시작일</label>
            <input
              type="text"
              id="start_date"
              value={formData.start_date}
              onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              placeholder="예: 2024-12"
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
              placeholder="예: 2025-01"
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
            <span>현재 진행중</span>
          </label>
        </div>

        <div className="admin-form-group">
          <label htmlFor="image_url">이미지 URL</label>
          <input
            type="text"
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            placeholder="https://example.com/image.jpg"
            className="admin-input"
          />
          {formData.image_url && (
            <div className="admin-image-preview">
              <img src={formData.image_url} alt="Preview" />
            </div>
          )}
        </div>

        <div className="admin-form-group">
          <label>주요 성과/업무</label>
          <div className="admin-list-input">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="성과/업무 내용을 입력하고 Enter 또는 추가 버튼을 누르세요"
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
            onClick={() => navigate('/admin/projects')}
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

export default ProjectsEditorPage;
