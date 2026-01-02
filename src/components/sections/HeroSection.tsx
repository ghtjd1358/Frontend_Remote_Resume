import React from 'react';

interface HeroSectionProps {
  userName?: string;
  profileName: string;
  title: string;
  summary: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  userName,
  profileName,
  title,
  summary
}) => {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          {userName && (
            <div style={{ background: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '8px', marginBottom: '16px' }}>
              {userName}님, 환영합니다!
            </div>
          )}
          <h1 className="hero-title">
            안녕하세요,<br />
            프론트엔드 개발자<br />
            <span className="highlight">개발자</span>입니다.
          </h1>
          <p className="hero-desc">
            React와 TypeScript를 기반으로 웹 프론트엔드를 개발합니다.
          </p>
          <div className="hero-buttons">
            <a href="#" className="btn btn-primary">
              이력서 다운로드 ↓
            </a>
            <a href="#contact" className="btn btn-secondary">
              블로그
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
