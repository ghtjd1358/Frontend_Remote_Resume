import React, { useState, useEffect } from 'react';
import '../EditSidebar.css';

export interface SkillItem {
  id: string;
  name: string;
  category_id: string;
  category_name: string;
}

export interface SkillsConfig {
  selectedIds: string[];
}

interface SkillsEditorProps {
  initialSelected: string[];
  availableSkills: SkillItem[];
  onSave: (selectedIds: string[]) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * SkillsEditor - 기술스택 섹션 편집기
 * Supabase에서 불러온 스킬 목록에서 선택하여 홈페이지에 표시
 */
const SkillsEditor: React.FC<SkillsEditorProps> = ({
  initialSelected,
  availableSkills,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelected));
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState('');

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

  const handleSelectAll = () => {
    setSelectedIds(new Set(availableSkills.map(s => s.id)));
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave(Array.from(selectedIds));
    } finally {
      setIsSaving(false);
    }
  };

  // 카테고리별로 그룹화
  const groupedSkills = availableSkills.reduce((acc, skill) => {
    const category = skill.category_name || '기타';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, SkillItem[]>);

  const filteredGroups = Object.entries(groupedSkills).map(([category, skills]) => ({
    category,
    skills: skills.filter(s =>
      s.name.toLowerCase().includes(filter.toLowerCase())
    ),
  })).filter(g => g.skills.length > 0);

  return (
    <div className="skills-editor">
      {/* 검색 및 액션 */}
      <div className="edit-form-group">
        <input
          type="text"
          className="edit-form-input"
          placeholder="스킬 검색..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          className="edit-sidebar-btn edit-sidebar-btn-secondary"
          onClick={handleSelectAll}
          style={{ flex: 1, padding: '8px' }}
        >
          전체 선택
        </button>
        <button
          className="edit-sidebar-btn edit-sidebar-btn-secondary"
          onClick={handleDeselectAll}
          style={{ flex: 1, padding: '8px' }}
        >
          전체 해제
        </button>
      </div>

      <p className="edit-form-hint" style={{ marginBottom: '16px' }}>
        선택된 스킬: {selectedIds.size}개
      </p>

      {isLoading ? (
        <div className="edit-empty-state">
          <p>스킬 목록을 불러오는 중...</p>
        </div>
      ) : availableSkills.length === 0 ? (
        <div className="edit-empty-state">
          <p>등록된 스킬이 없습니다.</p>
          <p className="edit-form-hint">관리자 페이지에서 스킬을 먼저 추가해주세요.</p>
        </div>
      ) : (
        <div className="skills-category-list">
          {filteredGroups.map(({ category, skills }) => (
            <div key={category} className="skills-category-group">
              <h4 className="skills-category-title">{category}</h4>
              <div className="edit-selection-list">
                {skills.map(skill => (
                  <label
                    key={skill.id}
                    className={`edit-selection-item ${selectedIds.has(skill.id) ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      className="edit-selection-checkbox"
                      checked={selectedIds.has(skill.id)}
                      onChange={() => handleToggle(skill.id)}
                    />
                    <span className="edit-selection-label">{skill.name}</span>
                  </label>
                ))}
              </div>
            </div>
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

      <style>{`
        .skills-category-group {
          margin-bottom: 20px;
        }
        .skills-category-group:last-child {
          margin-bottom: 0;
        }
        .skills-category-title {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 12px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }
      `}</style>
    </div>
  );
};

export default SkillsEditor;
