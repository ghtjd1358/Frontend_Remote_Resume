import React, { useEffect, useCallback } from 'react';

export interface PortfolioItem {
  id: number;
  badge: string;
  title: string;
  image?: string;
  link?: string;
  desc: string;
  tags: string[];
  detail?: {
    period?: string;
    role?: string;
    description?: string;
    tasks?: string[];
    results?: string[];
  };
}

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioItem | null;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, portfolio }) => {
  // ESC 키로 모달 닫기
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // 배경 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !portfolio) return null;

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-container">
        {/* 커버 이미지 */}
        {portfolio.image && (
          <div className="modal-cover">
            <img src={portfolio.image} alt={portfolio.title} />
            <button className="modal-close" onClick={onClose}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        {/* 헤더 */}
        <div className="modal-header">
          <span className="modal-badge">{portfolio.badge}</span>
          <h1 className="modal-title">{portfolio.title}</h1>
          <div className="modal-tags">
            {portfolio.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="modal-content">
          {/* 속성 */}
          <div className="modal-properties">
            {portfolio.detail?.period && (
              <div className="modal-property">
                <span className="modal-property-label">기간</span>
                <span className="modal-property-value">{portfolio.detail.period}</span>
              </div>
            )}
            {portfolio.detail?.role && (
              <div className="modal-property">
                <span className="modal-property-label">역할</span>
                <span className="modal-property-value">{portfolio.detail.role}</span>
              </div>
            )}
          </div>

          {/* 프로젝트 소개 */}
          <div className="modal-section">
            <h4 className="modal-section-title">프로젝트 소개</h4>
            <p className="modal-desc">{portfolio.detail?.description || portfolio.desc}</p>
          </div>

          {/* 주요 업무 */}
          {portfolio.detail?.tasks && portfolio.detail.tasks.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title">주요 업무</h4>
              <ul className="modal-list">
                {portfolio.detail.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 성과 */}
          {portfolio.detail?.results && portfolio.detail.results.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title">성과</h4>
              <ul className="modal-list">
                {portfolio.detail.results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
