export interface SkillDetail {
  id: string;
  name: string;
  icon?: string;
  icon_color?: string;
}

export interface SkillCategoryDetail {
  id: string;
  name: string;
  icon?: string;
  skills: SkillDetail[];
}

export const mockSkillCategories: SkillCategoryDetail[] = [
  {
    id: 'frontend',
    name: '프론트엔드',
    icon: '⚛️',
    skills: [
      { id: '1', name: 'React' },
      { id: '2', name: 'TypeScript' },
      { id: '3', name: 'JavaScript' },
      { id: '4', name: 'HTML5' },
      { id: '5', name: 'CSS3' }
    ]
  },
  {
    id: 'state',
    name: '상태관리',
    icon: '🔄',
    skills: [
      { id: '6', name: 'Redux' },
      { id: '7', name: 'React Query' },
      { id: '8', name: 'Zustand' },
      { id: '9', name: 'Context API' }
    ]
  },
  {
    id: 'tools',
    name: '도구',
    icon: '🛠️',
    skills: [
      { id: '10', name: 'Git' },
      { id: '11', name: 'Webpack' },
      { id: '12', name: 'Vite' },
      { id: '13', name: 'npm' },
      { id: '14', name: 'Figma' },
      { id: '15', name: 'VS Code' }
    ]
  }
];
