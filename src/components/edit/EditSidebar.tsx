import React, { useEffect, useRef } from 'react';
import './EditSidebar.css';

export interface EditSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  isSaving?: boolean;
}

/**
 * EditSidebar - 오른쪽에서 슬라이드되는 편집 사이드바
 */
const EditSidebar: React.FC<EditSidebarProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  onCancel,
  isSaving = false,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 바깥 클릭으로 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className={`edit-sidebar-overlay ${isOpen ? 'open' : ''}`} />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`edit-sidebar ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-sidebar-title"
      >
        {/* Header */}
        <div className="edit-sidebar-header">
          <h2 id="edit-sidebar-title" className="edit-sidebar-title">{title}</h2>
          <button
            className="edit-sidebar-close"
            onClick={onClose}
            aria-label="닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="edit-sidebar-content">
          {children}
        </div>

        {/* Footer */}
        {(onSave || onCancel) && (
          <div className="edit-sidebar-footer">
            <button
              className="edit-sidebar-btn edit-sidebar-btn-secondary"
              onClick={handleCancel}
              disabled={isSaving}
            >
              취소
            </button>
            {onSave && (
              <button
                className="edit-sidebar-btn edit-sidebar-btn-primary"
                onClick={onSave}
                disabled={isSaving}
              >
                {isSaving ? '저장 중...' : '저장'}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EditSidebar;
