import React from 'react';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="section features">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">핵심 역량</div>
          <h2 className="section-title">이런 개발자입니다</h2>
        </div>
        <div className="feature-grid">
          <div className="feature-card animate-on-scroll delay-1">
            <div className="feature-image">
              <img src="./images/hero/react.png" alt="React 기반 개발" />
            </div>
            <h3 className="feature-title">React 기반 개발</h3>
            <p className="feature-desc">
              React를 중심으로 성능과 사용자 경험을 함께 고려한 개발을 해왔습니다.
              최적화를 통해 안정적인 화면 흐름을 만드는 데 집중합니다.
            </p>
          </div>
          <div className="feature-card animate-on-scroll delay-2">
            <div className="feature-image">
              <img src="./images/hero/optimization.png" alt="아키텍처 설계" />
            </div>
            <h3 className="feature-title">아키텍처 설계</h3>
            <p className="feature-desc">
              Micro Frontend 환경에서 역할과 책임이 분리된 구조를 설계하며
              확장성과 유지보수를 함께 고민합니다.
            </p>
          </div>
          <div className="feature-card animate-on-scroll delay-3">
            <div className="feature-image">
              <img src="./images/hero/teamwork.png" alt="커뮤니케이션 및 협업" />
            </div>
            <h3 className="feature-title">커뮤니케이션 및 협업</h3>
            <p className="feature-desc">
              기획·백엔드와의 협업 속에서 문제를 정리하고
              더 나은 방향을 함께 찾아가는 과정을 중요하게 생각합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
