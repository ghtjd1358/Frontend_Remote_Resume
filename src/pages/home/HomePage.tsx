import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ModalContainer } from '../../components/modal';
import { ScrollTopButton } from '../../components/button';
import {
    HeroSection,
    FeaturesSection,
    SkillsSection,
    ExperienceSection,
    ProjectsSection,
    ContactSection
} from '../../components/sections';
import {
    mockResumeProfile,
    mockSkillCategories,
    mockExperiences,
    mockProjects,
    mockPortfolioData,
    navSections
} from '../../data';

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

const HomePage: React.FC = () => {
    const user = useSelector((state: any) => state.app?.user);
    const [activeSection, setActiveSection] = useState('');

    const resumeProfile = mockResumeProfile;
    const skillCategories = mockSkillCategories;
    const experiences = mockExperiences;

    useScrollAnimation();

    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            const triggerPoint = viewportHeight * 0.2;

            for (const section of navSections) {
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

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 60;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <>
            <HeroSection userName={user?.name} />
            <div className="sticky-nav-wrapper">
                <nav className="sticky-nav">
                    <ul className="nav-pills">
                        {navSections.map((section) => (
                            <li key={section.id}>
                                <button
                                    className={`nav-pill ${activeSection === section.id ? 'active' : ''}`}
                                    onClick={() => scrollToSection(section.id)}
                                >
                                    {section.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <FeaturesSection />
            <SkillsSection skillCategories={skillCategories} />
            <ExperienceSection experiences={experiences} projects={mockProjects} />
            <ProjectsSection portfolioData={mockPortfolioData} />
            <ContactSection
                contactEmail={resumeProfile?.contact_email || 'hoseong1358@gmail.com'}
                githubUrl={resumeProfile?.github || 'https://github.com/ghtjd1358'}
                blogUrl={resumeProfile?.blog || 'https://velog.io/@ghtjd1358/series'}
            />
            <ScrollTopButton />
            <ModalContainer />
        </>
    );
};

export default HomePage;
