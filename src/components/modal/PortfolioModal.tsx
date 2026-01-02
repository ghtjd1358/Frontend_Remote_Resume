import React, { useEffect, useCallback } from 'react';
import { ModalCommonProps } from './types';
import { popModal } from './modal-manager';
import { PortfolioItem } from '../../data';

interface PortfolioModalProps extends ModalCommonProps {
  portfolio: PortfolioItem;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ portfolio, onClose }) => {
  const handleClose = useCallback(() => {
    popModal();
    onClose?.();
  }, [onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-container">
        {portfolio.image && (
          <div className="modal-cover">
            <img src={portfolio.image} alt={portfolio.title} />
            <button className="modal-close" onClick={handleClose}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        <div className="modal-header">
          <span className="modal-badge">{portfolio.badge}</span>
          <h1 className="modal-title">{portfolio.title}</h1>
          <div className="modal-tags">
            {portfolio.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="modal-content">
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

          <div className="modal-section">
            <h4 className="modal-section-title">프로젝트 소개</h4>
            <p className="modal-desc">{portfolio.detail?.description || portfolio.desc}</p>
          </div>

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
