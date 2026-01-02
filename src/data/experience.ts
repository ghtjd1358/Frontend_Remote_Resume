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

export interface ProjectDetail {
  id: string;
  title: string;
  role: string;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  tasks: ExperienceTask[];
  tags: string[];
}

export const mockExperiences: ExperienceDetail[] = [
  {
    id: '1',
    company: '한국음악저작권협회',
    position: '프론트엔드 개발자',
    start_date: '2023-06-01',
    end_date: null,
    is_current: true,
    tasks: [
      { id: '1', task: 'React/TypeScript 기반 저작권 관리 시스템 개발' },
      { id: '2', task: '모노레포에서 MFA(Micro Frontend Architecture)로 전환' },
      { id: '3', task: '공통 컴포넌트 라이브러리 설계 및 개발' }
    ],
    tags: ['React', 'TypeScript', 'Redux']
  },
  {
    id: '2',
    company: '스타트업 A',
    position: '프론트엔드 개발자',
    start_date: '2022-03-01',
    end_date: '2023-05-31',
    is_current: false,
    tasks: [
      { id: '4', task: 'Next.js 기반 이커머스 플랫폼 개발' },
      { id: '5', task: 'React Query를 활용한 서버 상태 관리 최적화' }
    ],
    tags: ['Next.js', 'React Query', 'Tailwind CSS']
  },
  {
    id: '3',
    company: '웹 에이전시 B',
    position: '퍼블리셔 / 주니어 개발자',
    start_date: '2021-01-01',
    end_date: '2022-02-28',
    is_current: false,
    tasks: [
      { id: '6', task: '반응형 웹사이트 퍼블리싱 및 유지보수' },
      { id: '7', task: 'jQuery에서 React로 마이그레이션 참여' }
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript']
  }
];

export const mockProjects: ProjectDetail[] = [
  {
    id: 'p1',
    title: 'MFA 포트폴리오',
    role: '풀스택 개발',
    start_date: '2024-12-01',
    end_date: null,
    is_current: true,
    tasks: [
      { id: 'pt1', task: 'Webpack Module Federation 기반 마이크로 프론트엔드 구현' },
      { id: 'pt2', task: 'Host/Remote 앱 분리 설계 및 공유 상태 관리' },
      { id: 'pt3', task: 'Supabase 연동 및 데이터 모델링' }
    ],
    tags: ['React', 'TypeScript', 'Webpack']
  },
  {
    id: 'p2',
    title: '이커머스 플랫폼',
    role: '프론트엔드 개발',
    start_date: '2024-06-01',
    end_date: '2024-08-31',
    is_current: false,
    tasks: [
      { id: 'pt4', task: 'Next.js App Router 기반 SSR/SSG 구현' },
      { id: 'pt5', task: '상품 목록, 장바구니, 주문 기능 개발' }
    ],
    tags: ['Next.js', 'React Query', 'Tailwind CSS']
  },
  {
    id: 'p3',
    title: '기술 블로그',
    role: '풀스택 개발',
    start_date: '2024-03-01',
    end_date: '2024-05-31',
    is_current: false,
    tasks: [
      { id: 'pt6', task: 'MDX 기반 콘텐츠 관리 시스템 구축' },
      { id: 'pt7', task: '다크모드 및 반응형 디자인 적용' }
    ],
    tags: ['Next.js', 'MDX', 'Styled Components']
  }
];
