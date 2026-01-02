import React, { useState } from 'react';
import { usePortfolioModal } from '../modal';
import { PortfolioItem } from '../../data';

interface ProjectsSectionProps {
  portfolioData: PortfolioItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ portfolioData }) => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { openPortfolioModal } = usePortfolioModal();

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">프로젝트</div>
          <h2 className="section-title">주요 작업물</h2>
        </div>
        <div className="project-grid">
          {(showAllProjects ? portfolioData : portfolioData.slice(0, 4)).map((portfolio, index) => (
            <div
              key={portfolio.id}
              className={`project-card ${index < 4 ? 'animate-on-scroll delay-' + (index + 1) : 'animate-visible'}`}
              onClick={() => openPortfolioModal(portfolio)}
            >
              {portfolio.image && (
                <div className="project-image">
                  <img src={portfolio.image} alt={portfolio.title} />
                  <div className="project-overlay">
                    <span className="project-overlay-btn">자세히 보기</span>
                  </div>
                </div>
              )}
              <div className="project-content">
                <span className="project-badge">{portfolio.badge}</span>
                <h3 className="project-title">{portfolio.title}</h3>
                <p className="project-desc">{portfolio.desc}</p>
                <div className="project-tags">
                  {portfolio.tags.map((tag) => (
                    <span className="project-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {portfolioData.length > 4 && (
          <div className="project-more animate-on-scroll">
            <button
              className="btn btn-secondary"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              {showAllProjects ? '접기 ↑' : `더보기 (${portfolioData.length - 4}개) ↓`}
            </button>
          </div>
        )}
        <div className="project-more animate-on-scroll" style={{ marginTop: '16px' }}>
          <a href="http://localhost:3003" className="btn btn-secondary" target="_blank" rel="noreferrer">
            포트폴리오 전체보기 →
          </a>
        </div>
      </div>
    </section>
  );
};
