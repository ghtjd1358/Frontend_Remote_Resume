import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiRedux,
  SiReactquery,
  SiGit,
  SiWebpack,
  SiVite,
  SiNpm,
  SiFigma,
  SiVscodium,
  SiGithub,
  SiGmail
} from 'react-icons/si';
import PortfolioModal, { PortfolioItem } from './components/PortfolioModal';
import {
  mockProfile,
  mockResumeProfile,
  mockSkillCategories,
  mockExperiences,
  mockCertifications
} from './data';
import './global.css';

const sections = [
  { id: 'skills', label: '기술' },
  { id: 'experience', label: '경력' },
  { id: 'projects', label: '프로젝트' },
];

// 아이콘 매핑
const iconMap: Record<string, React.ReactNode> = {
  'React': <SiReact color="#61DAFB" />,
  'TypeScript': <SiTypescript color="#3178C6" />,
  'JavaScript': <SiJavascript color="#F7DF1E" />,
  'HTML5': <SiHtml5 color="#E34F26" />,
  'CSS3': <SiCss3 color="#1572B6" />,
  'Redux': <SiRedux color="#764ABC" />,
  'React Query': <SiReactquery color="#FF4154" />,
  'Zustand': <span style={{ fontSize: '24px' }}>🐻</span>,
  'Context API': <SiReact color="#61DAFB" />,
  'Git': <SiGit color="#F05032" />,
  'Webpack': <SiWebpack color="#8DD6F9" />,
  'Vite': <SiVite color="#646CFF" />,
  'npm': <SiNpm color="#CB3837" />,
  'Figma': <SiFigma color="#F24E1E" />,
  'VS Code': <SiVscodium color="#007ACC" />,
};

// 포트폴리오 데이터 (기본값 - DB 데이터로 대체 가능)
const defaultPortfolioData: PortfolioItem[] = [
  {
    id: 1,
    badge: '실무',
    title: 'KOMCA 어드민 시스템',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
    desc: '저작권 관리 시스템의 프론트엔드 개발. IBSheet 기반 데이터 그리드와 복잡한 폼 처리 구현.',
    tags: ['React', 'Redux', 'IBSheet'],
    detail: {
      period: '2023.01 - 현재',
      role: '프론트엔드 개발',
      description: '한국음악저작권협회의 저작권 관리 어드민 시스템 프론트엔드 개발을 담당했습니다.',
      tasks: ['저작권 관리 시스템 프론트엔드 아키텍처 설계 및 개발', 'IBSheet8 기반 대용량 데이터 그리드 구현'],
      results: ['데이터 그리드 렌더링 성능 40% 개선'],
    },
  },
];

// 스크롤 애니메이션 훅
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const App: React.FC = () => {
  const user = useSelector((state: any) => state?.app?.user);

  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [activeSkillTab, setActiveSkillTab] = useState<string>('');
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Static mock data
  const profile = mockProfile;
  const resumeProfile = mockResumeProfile;
  const skillCategories = mockSkillCategories;
  const experiences = mockExperiences;
  const certifications = mockCertifications;

  useScrollAnimation();

  useEffect(() => {
    if (skillCategories.length > 0 && !activeSkillTab) {
      setActiveSkillTab(skillCategories[0].id);
    }
  }, []);

  const handlePortfolioClick = (portfolio: PortfolioItem) => {
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPortfolio(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingNav(window.scrollY > 100);

      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateStr: string | null, isEnd = false, isCurrent = false) => {
    if (isCurrent && isEnd) return '현재';
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  // Get current active skills
  const activeCategory = skillCategories.find(cat => cat.id === activeSkillTab);

  return (
    <>
      {/* 히어로 */}
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-content">
            {user && (
              <div style={{ background: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '8px', marginBottom: '16px' }}>
                {user.name}님, 환영합니다!
              </div>
            )}
            <h1 className="hero-title">
              안녕하세요,<br />
              {resumeProfile?.title || '프론트엔드 개발자'}<br />
              <span className="highlight">{profile?.name || '개발자'}</span>입니다.
            </h1>
            <p className="hero-desc">
              {resumeProfile?.summary || 'React와 TypeScript를 기반으로 웹 프론트엔드를 개발합니다.'}
            </p>
            <div className="hero-buttons">
              <a href="#" className="btn btn-primary">
                이력서 다운로드 ↓
              </a>
              <a href="#contact" className="btn btn-secondary">
                연락하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심역량 */}
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
              <h3 className="feature-title">협업과 소통</h3>
              <p className="feature-desc">
                기획, 디자인, 백엔드 팀과의 원활한 커뮤니케이션을 지향합니다.
                명확한 문서화와 코드 리뷰를 통해 팀 생산성 향상에 기여합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      <section id="skills" className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">기술 스택</div>
            <h2 className="section-title">사용하는 기술들</h2>
          </div>

          {skillCategories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              기술 스택 정보가 없습니다.
            </div>
          ) : (
            <>
              <div className="skill-tabs animate-on-scroll">
                {skillCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`skill-tab ${activeSkillTab === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveSkillTab(cat.id)}
                  >
                    {cat.icon || ''} {cat.name}
                  </button>
                ))}
              </div>
              <div className="skill-grid animate-on-scroll">
                {activeCategory?.skills?.map((skill) => (
                  <div className="skill-badge" key={skill.id}>
                    <div className="skill-icon">
                      {iconMap[skill.name] || (
                        <span style={{ color: skill.icon_color || '#666' }}>{skill.icon || '💻'}</span>
                      )}
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 경력 */}
      <section id="experience" className="section experience">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">경력</div>
            <h2 className="section-title">
              다양한 프로젝트를 통해<br />
              성장하고 있습니다
            </h2>
          </div>

          {experiences.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              경력 정보가 없습니다.
            </div>
          ) : (
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="timeline-item animate-on-scroll">
                  <div className="timeline-date">
                    {formatDate(exp.start_date)} - {formatDate(exp.end_date, true, exp.is_current)}
                  </div>
                  <div className="timeline-content">
                    <h3>{exp.company}</h3>
                    <p>{exp.position}</p>
                    {exp.tasks && exp.tasks.length > 0 && (
                      <ul className="timeline-tasks">
                        {exp.tasks.map((task) => (
                          <li key={task.id}>{task.task}</li>
                        ))}
                      </ul>
                    )}
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="timeline-tags">
                        {exp.tags.map((tag, index) => (
                          <span className="tag" key={`${exp.id}-tag-${index}`}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 자격증 */}
          {certifications.length > 0 && (
            <div style={{ marginTop: '48px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#333' }}>자격증</h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{
                    background: '#f8f9fa',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div style={{ fontWeight: 600 }}>{cert.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      {cert.issuer} {cert.issue_date && `· ${formatDate(cert.issue_date)}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 프로젝트 */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">프로젝트</div>
            <h2 className="section-title">주요 작업물</h2>
          </div>
          <div className="project-grid">
            {defaultPortfolioData.map((portfolio, index) => (
              <div
                key={portfolio.id}
                className={`project-card animate-on-scroll delay-${index + 1}`}
                onClick={() => handlePortfolioClick(portfolio)}
              >
                {portfolio.image && (
                  <div className="project-image">
                    <img src={portfolio.image} alt={portfolio.title} />
                    <div className="project-overlay">
                      <span className="project-overlay-btn">바로가기</span>
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
          <div className="project-more animate-on-scroll">
            <a href="http://localhost:3003" className="btn btn-secondary" target="_blank" rel="noreferrer">
              포트폴리오 더보기 →
            </a>
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="section contact">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            감사합니다<br />
            편하게 연락주세요
          </h2>
          <p className="contact-desc animate-on-scroll">
            새로운 기회나 협업 제안을 기다리고 있습니다
          </p>
          <div className="contact-icons animate-on-scroll">
            <a href={`mailto:${resumeProfile?.contact_email || 'example@gmail.com'}`} className="contact-icon-link" title="이메일 보내기">
              <SiGmail size={32} />
            </a>
            <a href={resumeProfile?.github || 'https://github.com'} className="contact-icon-link" target="_blank" rel="noreferrer" title="GitHub">
              <SiGithub size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* 스크롤 탑 버튼 */}
      <button
        className={`scroll-top-btn ${showFloatingNav ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="맨 위로"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 11 12 6 7 11"></polyline>
          <polyline points="17 18 12 13 7 18"></polyline>
        </svg>
      </button>

      {/* 포트폴리오 모달 */}
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        portfolio={selectedPortfolio}
      />
    </>
  );
};

export default App;
