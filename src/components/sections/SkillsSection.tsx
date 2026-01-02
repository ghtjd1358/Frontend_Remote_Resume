import React, { useState } from 'react';
import { iconMap } from '../../constants/iconMap';

interface Skill {
  id: string;
  name: string;
  icon?: string;
  icon_color?: string;
}

interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
  const [activeSkillTab, setActiveSkillTab] = useState<string>('');

  if (skillCategories.length === 0) {
    return (
      <section id="skills" className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">기술 스택</div>
            <h2 className="section-title">사용하는 기술들</h2>
          </div>
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            기술 스택 정보가 없습니다.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">기술 스택</div>
          <h2 className="section-title">사용하는 기술들</h2>
        </div>

        <div className="skill-tabs animate-on-scroll">
          <button
            className={`skill-tab ${activeSkillTab === '' ? 'active' : ''}`}
            onClick={() => setActiveSkillTab('')}
          >
            전체
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              className={`skill-tab ${activeSkillTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveSkillTab(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="skill-grid animate-on-scroll">
          {skillCategories.flatMap((cat) =>
            cat.skills?.map((skill) => (
              <div
                className={`skill-badge ${activeSkillTab && activeSkillTab !== cat.id ? 'dimmed' : ''}`}
                key={skill.id}
                data-tooltip={skill.name}
              >
                <div className="skill-icon">
                  {iconMap[skill.name] || (
                    <span style={{ color: skill.icon_color || '#666' }}>{skill.icon || '💻'}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
