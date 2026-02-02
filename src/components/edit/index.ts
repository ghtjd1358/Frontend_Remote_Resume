// Edit components exports
export { default as EditSidebar } from './EditSidebar';
export { default as EditableSection } from './EditableSection';

// Section editors
export { default as HeroEditor } from './editors/HeroEditor';
export { default as SkillsEditor } from './editors/SkillsEditor';
export { default as ExperienceEditor } from './editors/ExperienceEditor';
export { default as ProjectsEditor } from './editors/ProjectsEditor';

// Types
export type { HeroConfig } from './editors/HeroEditor';
export type { SkillItem, SkillsConfig } from './editors/SkillsEditor';
export type { ExperienceItem } from './editors/ExperienceEditor';
export type { ProjectItem } from './editors/ProjectsEditor';
