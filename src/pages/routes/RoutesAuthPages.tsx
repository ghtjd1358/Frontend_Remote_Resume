import React, { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { RoutePath } from './paths'

const HomePage = lazy(() => import('../home/HomePage'))
const AdminLayout = lazy(() => import('../admin/AdminLayout'))
const AdminDashboard = lazy(() => import('../admin/AdminDashboard'))
const SkillsListPage = lazy(() => import('../admin/skills/SkillsListPage'))
const ExperienceListPage = lazy(() => import('../admin/experience/ExperienceListPage'))
const ExperienceEditorPage = lazy(() => import('../admin/experience/ExperienceEditorPage'))
const ProjectsListPage = lazy(() => import('../admin/projects/ProjectsListPage'))
const ProjectsEditorPage = lazy(() => import('../admin/projects/ProjectsEditorPage'))

function RoutesAuthPages() {
    return (
        <Routes>
            <Route path={RoutePath.Home} element={<HomePage />} />

            {/* Admin */}
            <Route path={RoutePath.AdminDashboard} element={<AdminLayout><AdminDashboard /></AdminLayout>} />

            {/* Skills */}
            <Route path={RoutePath.AdminSkills} element={<AdminLayout><SkillsListPage /></AdminLayout>} />
            <Route path={RoutePath.AdminSkillsNew} element={<Navigate to={RoutePath.AdminSkills} replace />} />
            <Route path={RoutePath.AdminSkillsEdit} element={<Navigate to={RoutePath.AdminSkills} replace />} />

            {/* Experience */}
            <Route path={RoutePath.AdminExperience} element={<AdminLayout><ExperienceListPage /></AdminLayout>} />
            <Route path={RoutePath.AdminExperienceNew} element={<AdminLayout><ExperienceEditorPage /></AdminLayout>} />
            <Route path={RoutePath.AdminExperienceEdit} element={<AdminLayout><ExperienceEditorPage /></AdminLayout>} />

            {/* Projects */}
            <Route path={RoutePath.AdminProjects} element={<AdminLayout><ProjectsListPage /></AdminLayout>} />
            <Route path={RoutePath.AdminProjectsNew} element={<AdminLayout><ProjectsEditorPage /></AdminLayout>} />
            <Route path={RoutePath.AdminProjectsEdit} element={<AdminLayout><ProjectsEditorPage /></AdminLayout>} />

            <Route path="*" element={<Navigate to={RoutePath.Home} replace />} />
        </Routes>
    )
}

export { RoutesAuthPages }
