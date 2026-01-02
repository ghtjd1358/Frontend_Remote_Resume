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
    skills: [
      { id: '1', name: 'React' },
      { id: '2', name: 'Next.js' },
      { id: '3', name: 'TypeScript' },
      { id: '4', name: 'JavaScript' },
      { id: '5', name: 'HTML5' },
      { id: '6', name: 'CSS3' },
      { id: '7', name: 'Styled Components' },
      { id: '8', name: 'Tailwind CSS' },
      { id: '9', name: 'Sass' }
    ]
  },
  {
    id: 'state',
    name: '상태관리',
    skills: [
      { id: '10', name: 'Redux' },
      { id: '11', name: 'React Query' },
      { id: '12', name: 'Zustand' },
      { id: '13', name: 'React Hook Form' }
    ]
  },
  {
    id: 'tools',
    name: '도구',
    skills: [
      { id: '14', name: 'Git' },
      { id: '15', name: 'Webpack' },
      { id: '16', name: 'Vite' },
      { id: '17', name: 'Vercel' },
      { id: '18', name: 'npm' },
      { id: '19', name: 'Figma' }
    ]
  }
];
