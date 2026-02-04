import React, { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { storage } from '@sonhoseong/mfa-lib'
import { RoutePath } from './paths'

const HomePage = lazy(() => import('../home/HomePage'))
const SkillsListPage = lazy(() => import('../admin/skills/SkillsListPage'))
const ExperienceListPage = lazy(() => import('../admin/experience/ExperienceListPage'))
const ExperienceEditorPage = lazy(() => import('../admin/experience/ExperienceEditorPage'))
const ProjectsListPage = lazy(() => import('../admin/projects/ProjectsListPage'))
const ProjectsEditorPage = lazy(() => import('../admin/projects/ProjectsEditorPage'))

// Host에서: '' (빈 문자열), 단독 실행: /resume
const PREFIX = storage.isHostApp() ? '' : '/resume'

// Home path: Host에서는 '/', 단독에서는 '/resume'
const HOME_PATH = PREFIX || '/'

function RoutesAuthPages() {
    return (
        <Routes>
            {/* Host에서는 '/'가 홈, 단독에서는 '/resume'가 홈 */}
            <Route path="/" element={<HomePage />} />
            {PREFIX && <Route path={PREFIX} element={<HomePage />} />}
            {/* Skills */}
            <Route path={`${PREFIX}${RoutePath.AdminSkills}`} element={<SkillsListPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminSkillsNew}`} element={<SkillsListPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminSkillsEdit}`} element={<SkillsListPage />} />
            {/* Experience */}
            <Route path={`${PREFIX}${RoutePath.AdminExperience}`} element={<ExperienceListPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminExperienceNew}`} element={<ExperienceEditorPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminExperienceEdit}`} element={<ExperienceEditorPage />} />
            {/* Projects */}
            <Route path={`${PREFIX}${RoutePath.AdminProjects}`} element={<ProjectsListPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminProjectsNew}`} element={<ProjectsEditorPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminProjectsEdit}`} element={<ProjectsEditorPage />} />

            <Route path="*" element={<HomePage />} />
        </Routes>
    )
}

export { RoutesAuthPages }
