import React, { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { storage } from '@sonhoseong/mfa-lib'
import { RoutePath } from './paths'

const HomePage = lazy(() => import('../home/HomePage'))
const AdminDashboard = lazy(() => import('../admin/AdminDashboard'))
const SkillsListPage = lazy(() => import('../admin/skills/SkillsListPage'))
const ExperienceListPage = lazy(() => import('../admin/experience/ExperienceListPage'))
const ExperienceEditorPage = lazy(() => import('../admin/experience/ExperienceEditorPage'))
const ProjectsListPage = lazy(() => import('../admin/projects/ProjectsListPage'))
const ProjectsEditorPage = lazy(() => import('../admin/projects/ProjectsEditorPage'))

// 단독 실행: /resume/... , Host에서: /platform/resume/...
const PREFIX = storage.isHostApp() ? '/platform/resume' : '/resume'

function RoutesAuthPages() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={PREFIX} replace />} />
            <Route path={PREFIX} element={<HomePage />} />
            {/* Admin */}
            <Route path={`${PREFIX}${RoutePath.AdminDashboard}`} element={<AdminDashboard />} />
            {/* Skills */}
            <Route path={`${PREFIX}${RoutePath.AdminSkills}`} element={<SkillsListPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminSkillsNew}`} element={<Navigate to={`${PREFIX}${RoutePath.AdminSkills}`} replace />} />
            <Route path={`${PREFIX}${RoutePath.AdminSkillsEdit}`} element={<Navigate to={`${PREFIX}${RoutePath.AdminSkills}`} replace />} />
            {/* Experience */}
            <Route path={`${PREFIX}${RoutePath.AdminExperience}`} element={<ExperienceListPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminExperienceNew}`} element={<ExperienceEditorPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminExperienceEdit}`} element={<ExperienceEditorPage />} />
            {/* Projects */}
            <Route path={`${PREFIX}${RoutePath.AdminProjects}`} element={<ProjectsListPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminProjectsNew}`} element={<ProjectsEditorPage />} />
            <Route path={`${PREFIX}${RoutePath.AdminProjectsEdit}`} element={<ProjectsEditorPage />} />

            <Route path="*" element={<Navigate to={PREFIX} replace />} />
        </Routes>
    )
}

export { RoutesAuthPages }
