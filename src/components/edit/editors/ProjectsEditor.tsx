import React, { useState, useEffect } from 'react';
import '../EditSidebar.css';

export interface ProjectItem {
  id: string;
  title: string;
  badge?: string;
  short_description?: string;
  status?: string;
  is_featured?: boolean;
}

interface ProjectsEditorProps {
  initialSelected: string[];
  availableProjects: ProjectItem[];
  onSave: (selectedIds: string[]) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * ProjectsEditor - 프로젝트 섹션 편집기
 * Supabase에서 불러온 포트폴리오 목록에서 선택하여 홈페이지에 표시
 */
const ProjectsEditor: React.FC<ProjectsEditorProps> = ({
  initialSelected,
  availableProjects,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelected));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setSelectedIds(new Set(initialSelected));
  }, [initialSelected]);

  const handleToggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectFeatured = () => {
    const featuredIds = availableProjects
      .filter(p => p.is_featured)
      .map(p => p.id);
    setSelectedIds(new Set(featuredIds));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave(Array.from(selectedIds));
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'completed': return { label: '완료', color: '#16a34a', bg: '#dcfce7' };
      case 'in_progress': return { label: '진행중', color: '#0ea5e9', bg: '#e0f2fe' };
      case 'planned': return { label: '예정', color: '#8b5cf6', bg: '#f3e8ff' };
      default: return { label: status || '', color: '#64748b', bg: '#f1f5f9' };
    }
  };

  return (
    <div className="projects-editor">
      {/* 액션 버튼 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          className="edit-sidebar-btn edit-sidebar-btn-secondary"
          onClick={handleSelectFeatured}
          style={{ flex: 1, padding: '8px' }}
        >
          Featured만 선택
        </button>
        <button
          className="edit-sidebar-btn edit-sidebar-btn-secondary"
          onClick={() => setSelectedIds(new Set())}
          style={{ flex: 1, padding: '8px' }}
        >
          전체 해제
        </button>
      </div>

      <p className="edit-form-hint" style={{ marginBottom: '16px' }}>
        선택된 프로젝트: {selectedIds.size}개
      </p>

      {isLoading ? (
        <div className="edit-empty-state">
          <p>프로젝트 목록을 불러오는 중...</p>
        </div>
      ) : availableProjects.length === 0 ? (
        <div className="edit-empty-state">
          <p>등록된 프로젝트가 없습니다.</p>
          <p className="edit-form-hint">관리자 페이지에서 프로젝트를 먼저 추가해주세요.</p>
        </div>
      ) : (
        <div className="edit-selection-list" style={{ maxHeight: '400px' }}>
          {availableProjects.map(project => {
            const status = getStatusLabel(project.status);
            return (
              <label
                key={project.id}
                className={`edit-selection-item ${selectedIds.has(project.id) ? 'selected' : ''}`}
                style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                  <input
                    type="checkbox"
                    className="edit-selection-checkbox"
                    checked={selectedIds.has(project.id)}
                    onChange={() => handleToggle(project.id)}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 500, color: '#1e3a5f' }}>{project.title}</span>
                      {project.badge && (
                        <span className="edit-selection-badge">{project.badge}</span>
                      )}
                    </div>
                  </div>
                  {project.is_featured && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  )}
                  {project.status && (
                    <span
                      className="edit-selection-badge"
                      style={{ background: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  )}
                </div>
                {project.short_description && (
                  <p style={{
                    fontSize: '13px',
                    color: '#64748b',
                    margin: 0,
                    marginLeft: '30px',
                    lineHeight: 1.4
                  }}>
                    {project.short_description}
                  </p>
                )}
              </label>
            );
          })}
        </div>
      )}

      <div className="edit-sidebar-footer" style={{ margin: '24px -24px -24px', padding: '16px 24px' }}>
        <button
          className="edit-sidebar-btn edit-sidebar-btn-secondary"
          onClick={onCancel}
          disabled={isSaving}
        >
          취소
        </button>
        <button
          className="edit-sidebar-btn edit-sidebar-btn-primary"
          onClick={handleSubmit}
          disabled={isSaving || isLoading}
        >
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
};

export default ProjectsEditor;
