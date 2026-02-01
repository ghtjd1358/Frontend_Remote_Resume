export enum RoutePath {
  // 메인 (basename="/resume" 적용됨)
  Home = '/',

  // Admin - 대시보드
  AdminDashboard = '/admin',

  // Admin - 기술스택
  AdminSkills = '/admin/skills',
  AdminSkillsNew = '/admin/skills/new',
  AdminSkillsEdit = '/admin/skills/edit/:id',

  // Admin - 경력
  AdminExperience = '/admin/experience',
  AdminExperienceNew = '/admin/experience/new',
  AdminExperienceEdit = '/admin/experience/edit/:id',

  // Admin - 프로젝트
  AdminProjects = '/admin/projects',
  AdminProjectsNew = '/admin/projects/new',
  AdminProjectsEdit = '/admin/projects/edit/:id',
}
