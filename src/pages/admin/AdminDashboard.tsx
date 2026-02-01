import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const quickLinks = [
    {
      title: '기술스택 관리',
      description: '프론트엔드, 상태관리, 도구 등 기술스택을 관리합니다.',
      link: '/admin/skills',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      title: '경력 관리',
      description: '회사 경력 및 교육 이력을 관리합니다.',
      link: '/admin/experience',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: '프로젝트 관리',
      description: '개인/팀 프로젝트 포트폴리오를 관리합니다.',
      link: '/admin/projects',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="admin-dashboard">
      <header className="admin-page-header">
        <h1>대시보드</h1>
        <p>이력서 데이터를 관리합니다.</p>
      </header>

      <section className="admin-quick-links">
        <h2>빠른 이동</h2>
        <div className="admin-card-grid">
          {quickLinks.map((item) => (
            <Link key={item.link} to={item.link} className="admin-card">
              <div className="admin-card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
