export interface ExperienceTask {
  id: string;
  task: string;
}

export interface ExperienceDetail {
  id: string;
  company: string;
  position: string;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  tasks: ExperienceTask[];
  tags: string[];
}

export const mockExperiences: ExperienceDetail[] = [
  {
    id: '1',
    company: '테크 회사',
    position: '프론트엔드 개발자',
    start_date: '2023-01-01',
    end_date: null,
    is_current: true,
    tasks: [
      { id: '1', task: 'React/TypeScript 기반 웹 애플리케이션 개발' },
      { id: '2', task: '프론트엔드 아키텍처 설계 및 코드 리뷰' }
    ],
    tags: ['React', 'TypeScript', 'Redux']
  }
];
