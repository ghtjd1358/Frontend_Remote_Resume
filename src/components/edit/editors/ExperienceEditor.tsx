import React, { useState, useEffect } from 'react';
import '../EditSidebar.css';

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  is_dev: boolean;
}

interface ExperienceEditorProps {
  initialSelected: string[];
  availableExperiences: ExperienceItem[];
  onSave: (selectedIds: string[]) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * ExperienceEditor - 경력 섹션 편집기
 * Supabase에서 불러온 경력 목록에서 선택하여 홈페이지에 표시
 */
const ExperienceEditor: React.FC<ExperienceEditorProps> = ({
  initialSelected,
  availableExperiences,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelected));
  const [isSaving, setIsSaving] = useState(false);
  const [showDevOnly, setShowDevOnly] = useState(false);

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

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave(Array.from(selectedIds));
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return '';
    return date.substring(0, 7).replace('-', '.');
  };

  const filteredExperiences = showDevOnly
    ? availableExperiences.filter(e => e.is_dev)
    : availableExperiences;

  return (
    <div className="experience-editor">
      {/* 필터 */}
      <div className="edit-form-group">
        <label className="edit-selection-item" style={{ marginBottom: '16px' }}>
          <input
            type="checkbox"
            className="edit-selection-checkbox"
            checked={showDevOnly}
            onChange={(e) => setShowDevOnly(e.target.checked)}
          />
          <span className="edit-selection-label">개발 경력만 표시</span>
        </label>
      </div>

      <p className="edit-form-hint" style={{ marginBottom: '16px' }}>
        선택된 경력: {selectedIds.size}개
      </p>

      {isLoading ? (
        <div className="edit-empty-state">
          <p>경력 목록을 불러오는 중...</p>
        </div>
      ) : availableExperiences.length === 0 ? (
        <div className="edit-empty-state">
          <p>등록된 경력이 없습니다.</p>
          <p className="edit-form-hint">관리자 페이지에서 경력을 먼저 추가해주세요.</p>
        </div>
      ) : (
        <div className="edit-selection-list" style={{ maxHeight: '400px' }}>
          {filteredExperiences.map(exp => (
            <label
              key={exp.id}
              className={`edit-selection-item ${selectedIds.has(exp.id) ? 'selected' : ''}`}
              style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                <input
                  type="checkbox"
                  className="edit-selection-checkbox"
                  checked={selectedIds.has(exp.id)}
                  onChange={() => handleToggle(exp.id)}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, color: '#1e3a5f' }}>{exp.company}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{exp.position}</div>
                </div>
                {exp.is_current && (
                  <span className="edit-selection-badge" style={{ background: '#dcfce7', color: '#16a34a' }}>
                    재직중
                  </span>
                )}
                {exp.is_dev && (
                  <span className="edit-selection-badge">개발</span>
                )}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '30px' }}>
                {formatDate(exp.start_date)} ~ {exp.is_current ? '현재' : formatDate(exp.end_date)}
              </div>
            </label>
          ))}
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

export default ExperienceEditor;
