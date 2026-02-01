import React, { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RoutePath } from './paths';

// Main pages
const HomePage = lazy(() => import('../home/HomePage'));

// Admin Layout
const AdminLayout = lazy(() => import('../admin/AdminLayout'));

// Admin pages
const AdminDashboard = lazy(() => import('../admin/AdminDashboard'));
const SkillsListPage = lazy(() => import('../admin/skills/SkillsListPage'));
const SkillsEditorPage = lazy(() => import('../admin/skills/SkillsEditorPage'));
const ExperienceListPage = lazy(() => import('../admin/experience/ExperienceListPage'));
const ExperienceEditorPage = lazy(() => import('../admin/experience/ExperienceEditorPage'));
const ProjectsListPage = lazy(() => import('../admin/projects/ProjectsListPage'));
const ProjectsEditorPage = lazy(() => import('../admin/projects/ProjectsEditorPage'));

function RoutesAuthPages() {
  return (
    <Routes>
      {/* 메인 */}
      <Route path={RoutePath.Home} element={<HomePage />} />

      {/* Admin - 대시보드 */}
      <Route path={RoutePath.AdminDashboard} element={<AdminLayout><AdminDashboard /></AdminLayout>} />

      {/* Admin - 기술스택 */}
      <Route path={RoutePath.AdminSkills} element={<AdminLayout><SkillsListPage /></AdminLayout>} />
      <Route path={RoutePath.AdminSkillsNew} element={<AdminLayout><SkillsEditorPage /></AdminLayout>} />
      <Route path={RoutePath.AdminSkillsEdit} element={<AdminLayout><SkillsEditorPage /></AdminLayout>} />

      {/* Admin - 경력 */}
      <Route path={RoutePath.AdminExperience} element={<AdminLayout><ExperienceListPage /></AdminLayout>} />
      <Route path={RoutePath.AdminExperienceNew} element={<AdminLayout><ExperienceEditorPage /></AdminLayout>} />
      <Route path={RoutePath.AdminExperienceEdit} element={<AdminLayout><ExperienceEditorPage /></AdminLayout>} />

      {/* Admin - 프로젝트 */}
      <Route path={RoutePath.AdminProjects} element={<AdminLayout><ProjectsListPage /></AdminLayout>} />
      <Route path={RoutePath.AdminProjectsNew} element={<AdminLayout><ProjectsEditorPage /></AdminLayout>} />
      <Route path={RoutePath.AdminProjectsEdit} element={<AdminLayout><ProjectsEditorPage /></AdminLayout>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={RoutePath.Home} replace />} />
    </Routes>
  );
}

export { RoutesAuthPages };
