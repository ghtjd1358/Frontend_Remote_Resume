import React, { useState } from 'react';
import { iconMap } from '../../constants/iconMap';

interface Task {
  id: string;
  task: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  tags?: string[];
  tasks?: Task[];
}

interface Project {
  id: string;
  title: string;
  role: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  tags?: string[];
  tasks?: Task[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
  projects?: Project[];
}

const formatDate = (dateStr: string | null, isEnd = false, isCurrent = false) => {
  if (isCurrent && isEnd) return '현재';
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, projects = [] }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const hasNoData = experiences.length === 0 && projects.length === 0;

  if (hasNoData) {
    return (
      <section id="experience" className="section experience">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">경력</div>
            <h2 className="section-title">
              다양한 프로젝트를 통해<br />
              성장하고 있습니다
            </h2>
          </div>
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            경력 정보가 없습니다.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">경력</div>
          <h2 className="section-title">
            다양한 프로젝트를 통해<br />
            성장하고 있습니다
          </h2>
        </div>

        {/* 경력 */}
        {experiences.length > 0 && (
          <>
            <div className="timeline-category animate-on-scroll">
              <div className="timeline-category-line left"></div>
              <span className="timeline-category-text">경력</span>
              <div className="timeline-category-line right"></div>
            </div>
            <div className="timeline">
              {experiences.map((exp) => (
                <div key={exp.id} className="timeline-item animate-on-scroll">
                  <div className="timeline-date">
                    {formatDate(exp.start_date)} - {formatDate(exp.end_date, true, exp.is_current)}
                  </div>
                  <div className="timeline-content">
                    <h3>{exp.company}</h3>
                    <p>{exp.position}</p>
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="timeline-tech-icons">
                        {exp.tags.map((tag, index) => (
                          <div className="tech-icon" key={`${exp.id}-tag-${index}`} data-tooltip={tag}>
                            {iconMap[tag] || <span>💻</span>}
                          </div>
                        ))}
                      </div>
                    )}
                    {exp.tasks && exp.tasks.length > 0 && (
                      <>
                        <div
                          className={`toggle-tasks ${expandedItem === exp.id ? 'active' : ''}`}
                          onClick={() => setExpandedItem(expandedItem === exp.id ? null : exp.id)}
                        >
                          <span className="toggle-icon">›</span>
                          <span>주요 업무 내용</span>
                        </div>
                        {expandedItem === exp.id && (
                          <ul className="timeline-tasks">
                            {exp.tasks.map((task) => (
                              <li key={task.id}>{task.task}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 프로젝트 */}
        {projects.length > 0 && (
          <>
            <div className="timeline-category animate-on-scroll">
              <div className="timeline-category-line left"></div>
              <span className="timeline-category-text">프로젝트</span>
              <div className="timeline-category-line right"></div>
            </div>
            <div className="timeline">
              {projects.map((proj) => (
                <div key={proj.id} className="timeline-item animate-on-scroll">
                  <div className="timeline-date">
                    {formatDate(proj.start_date)} - {formatDate(proj.end_date, true, proj.is_current)}
                  </div>
                  <div className="timeline-content">
                    <h3>{proj.title}</h3>
                    <p>{proj.role}</p>
                    {proj.tags && proj.tags.length > 0 && (
                      <div className="timeline-tech-icons">
                        {proj.tags.map((tag, index) => (
                          <div className="tech-icon" key={`${proj.id}-tag-${index}`} data-tooltip={tag}>
                            {iconMap[tag] || <span>💻</span>}
                          </div>
                        ))}
                      </div>
                    )}
                    {proj.tasks && proj.tasks.length > 0 && (
                      <>
                        <div
                          className={`toggle-tasks ${expandedItem === proj.id ? 'active' : ''}`}
                          onClick={() => setExpandedItem(expandedItem === proj.id ? null : proj.id)}
                        >
                          <span className="toggle-icon">›</span>
                          <span>주요 작업 내용</span>
                        </div>
                        {expandedItem === proj.id && (
                          <ul className="timeline-tasks">
                            {proj.tasks.map((task) => (
                              <li key={task.id}>{task.task}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
