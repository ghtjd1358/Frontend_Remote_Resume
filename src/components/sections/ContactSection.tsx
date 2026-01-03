import React from 'react';
import { SiGmail, SiGithub, SiVelog } from 'react-icons/si';

interface ContactSectionProps {
  contactEmail: string;
  githubUrl: string;
  blogUrl: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactEmail,
  githubUrl,
  blogUrl
}) => {
  return (
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
          <a href={`mailto:${contactEmail}`} className="contact-icon-link" title="이메일 보내기">
            <SiGmail size={28} color="#EA4335" />
          </a>
          <a href={githubUrl} className="contact-icon-link" target="_blank" rel="noreferrer" title="GitHub">
            <SiGithub size={28} color="#181717" />
          </a>
          <a href={blogUrl} className="contact-icon-link" target="_blank" rel="noreferrer" title="블로그">
            <SiVelog size={28} color="#20C997" />
          </a>
        </div>
      </div>
    </section>
  );
};
