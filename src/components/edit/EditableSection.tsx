import React from 'react';
import './EditableSection.css';

export type SectionType = 'hero' | 'features' | 'skills' | 'experience' | 'projects' | 'contact';

export interface EditableSectionProps {
  sectionType: SectionType;
  isEditMode: boolean;
  onEdit: (sectionType: SectionType) => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * EditableSection - 편집 모드에서 클릭 가능한 섹션 래퍼
 */
const EditableSection: React.FC<EditableSectionProps> = ({
  sectionType,
  isEditMode,
  onEdit,
  children,
  className = '',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!isEditMode) return;

    // 링크나 버튼 클릭은 무시
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }

    onEdit(sectionType);
  };

  const sectionLabels: Record<SectionType, string> = {
    hero: 'Hero 섹션',
    features: 'Features 섹션',
    skills: '기술스택 섹션',
    experience: '경력 섹션',
    projects: '프로젝트 섹션',
    contact: '연락처 섹션',
  };

  return (
    <div
      className={`editable-section ${isEditMode ? 'edit-mode' : ''} ${className}`}
      onClick={handleClick}
      role={isEditMode ? 'button' : undefined}
      tabIndex={isEditMode ? 0 : undefined}
      onKeyDown={isEditMode ? (e) => e.key === 'Enter' && onEdit(sectionType) : undefined}
    >
      {isEditMode && (
        <div className="editable-section-overlay">
          <div className="editable-section-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>{sectionLabels[sectionType]} 편집</span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default EditableSection;
