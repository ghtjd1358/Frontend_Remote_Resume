import React from 'react';
import { useSelector } from 'react-redux';
import { StickyNav } from '@sonhoseong/mfa-lib';
import { ModalContainer } from '../../components/modal';
import { ScrollTopButton } from '../../components/button';
import {
    HeroSection,
    FeaturesSection,
    SkillsSection,
    ExperienceSection,
    ProjectsSection,
    ContactSection
} from './components';
import { useScrollAnimation } from './hooks';
import {
    mockResumeProfile,
    mockSkillCategories,
    mockExperiences,
    mockProjects,
    mockPortfolioData,
    mockFeatures,
    mockContactLinks,
    navSections
} from '../../data';

const HomePage: React.FC = () => {
    const user = useSelector((state: any) => state.app?.user);

    useScrollAnimation();

    return (
        <>
            <HeroSection userName={user?.name} resumeProfile={mockResumeProfile} />
            <StickyNav sections={navSections} scrollOffset={60} topPosition={20}/>
            <FeaturesSection features={mockFeatures} />
            <SkillsSection categories={mockSkillCategories} />
            <ExperienceSection experiences={mockExperiences} projects={mockProjects} />
            <ProjectsSection portfolioData={mockPortfolioData} />
            <ContactSection links={mockContactLinks} />
            <ScrollTopButton />
            <ModalContainer />
        </>
    );
};

export default HomePage;
