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
            <div className="feature-icon">⚛️</div>
            <h3 className="feature-title">React 기반 개발</h3>
            <p className="feature-desc">
              React, TypeScript를 활용한 프론트엔드 개발 경험이 있습니다.
              Redux, IBSheet 등을 활용한 복잡한 상태 관리와 데이터 그리드 구현에 익숙합니다.
            </p>
          </div>
          <div className="feature-card animate-on-scroll delay-2">
            <div className="feature-icon">🏗️</div>
            <h3 className="feature-title">아키텍처 설계</h3>
            <p className="feature-desc">
              모노레포에서 MFA(Micro Frontend Architecture)로의 전환 경험이 있습니다.
              확장 가능하고 유지보수하기 좋은 구조를 고민합니다.
            </p>
          </div>
          <div className="feature-card animate-on-scroll delay-3">
            <div className="feature-icon">🤝</div>
            <h3 className="feature-title">커뮤니케이션 및 협업</h3>
            <p className="feature-desc">
              Github 이용한 협업 경험이 있으며, Jira, Slack, Notion 등의 협업 도구 사용 경험도 있습니다.
              그룹웨어, 포털 같은 사이트를 개발하며 기획, 절차 이해 등 다양한 직무 경험을 기반으로 다른 직군과 원활한 커뮤니케이션이 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
