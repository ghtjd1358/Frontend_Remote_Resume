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
  is_dev: boolean;
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
  image?: string;
}

export const mockExperiences: ExperienceDetail[] = [
  {
    id: '1',
    company: '(주)포인정보',
    position: '프론트엔드 개발',
    start_date: '2025-04',
    end_date: null,
    is_current: true,
    is_dev: true,
    tasks: [
      { id: '1', task: 'Webpack Module Federation 기반 MFA 전환으로 7개 서비스 독립 배포 체계 구축, 배포 시간 70% 단축' },
      { id: '2', task: 'Axios Interceptor 토큰 자동 갱신 로직 구현으로 세션 만료 관련 사용자 이탈률 감소' },
      { id: '3', task: '공통 컴포넌트 라이브러리 5종(모달, 토스트, 파일 업로드 등) 설계로 개발 생산성 향상' },
      { id: '4', task: 'Redux Toolkit 동적 Reducer 주입 패턴 적용, Host/Remote 간 상태 공유 아키텍처 설계' }
    ],
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'Webpack', 'Jira', 'Confluence']
  },
  {
    id: '2',
    company: '스파르타코딩클럽',
    position: '프론트엔드 부트캠프',
    start_date: '2024-09',
    end_date: '2024-12',
    is_current: false,
    is_dev: true,
    tasks: [
      { id: '4', task: 'TanStack Query 캐싱 전략 및 Zustand 전역 상태 관리 심화 학습' },
      { id: '5', task: 'Jest, React Testing Library 기반 단위/통합 테스트 작성 경험' },
      { id: '6', task: '알고리즘 문제 풀이 100+ 문제 해결' }
    ],
    tags: ['Next.js', 'React Query', 'Zustand', 'Tailwind CSS']
  },
  {
    id: '3',
    company: '포스코미래창조아카데미',
    position: '웹 풀스택 과정',
    start_date: '2023-10',
    end_date: '2024-04',
    is_current: false,
    is_dev: true,
    tasks: [
      { id: '7', task: 'React SPA 프로젝트 3건 수행, 컴포넌트 설계 및 상태 관리 패턴 학습' },
      { id: '8', task: 'Spring Boot REST API 설계 및 MySQL 연동 경험' },
      { id: '9', task: '4인 팀 프로젝트 Git Flow 협업, 주간 코드 리뷰 진행' }
    ],
    tags: ['React', 'Spring Boot', 'MySQL', 'Git']
  },
  {
    id: '4',
    company: '이전 직장',
    position: '비개발 직무',
    start_date: '2020-01',
    end_date: '2023-06',
    is_current: false,
    is_dev: false,
    tasks: [
      { id: '10', task: '업무 경험 내용 1' },
      { id: '11', task: '업무 경험 내용 2' }
    ],
    tags: []
  }
];

export const mockProjects: ProjectDetail[] = [
  {
    id: 'p1',
    title: 'MFA 포트폴리오',
    role: '개인 프로젝트 · 설계/개발',
    start_date: '2024-12',
    end_date: null,
    is_current: true,
    tasks: [
      { id: 'pt1', task: 'Module Federation 기반 Host/Remote 3개 앱 분리, 독립 빌드/배포 환경 구축' },
      { id: 'pt2', task: 'window.__REDUX_STORE__ 패턴으로 런타임 상태 공유, 앱 간 인증 상태 동기화' },
      { id: 'pt3', task: 'Supabase RLS 적용으로 사용자별 데이터 접근 제어 구현' }
    ],
    tags: ['React', 'TypeScript', 'Webpack', 'Supabase'],
    image: './images/project/mfa.jpg'
  },
  {
    id: 'p2',
    title: '북스토리',
    role: '개인 프로젝트 · 성능 최적화',
    start_date: '2024-10',
    end_date: '2024-11',
    is_current: false,
    tasks: [
      { id: 'pt4', task: 'Code Splitting + Tree Shaking으로 번들 사이즈 8.09MB → 397KB (95% 감소)' },
      { id: 'pt5', task: 'Lighthouse Performance 73 → 89점, LCP 2.1s → 1.2s 개선' },
      { id: 'pt6', task: 'React.lazy + Suspense 병렬 로딩으로 초기 렌더링 waterfall 제거' },
      { id: 'pt7', task: 'TanStack Query 무한 스크롤 + Debounce로 API 호출 60% 감소' }
    ],
    tags: ['React', 'Vite', 'React Query', 'Zustand'],
    image: './images/project/bookstory.jpg'
  },
  {
    id: 'p3',
    title: '두런두런',
    role: '팀 프로젝트 (4인) · 프론트엔드',
    start_date: '2024-02',
    end_date: '2024-04',
    is_current: false,
    tasks: [
      { id: 'pt7', task: 'Axios Interceptor 토큰 갱신 자동화로 인증 관련 코드 중복 제거' },
      { id: 'pt8', task: 'Compound Component 패턴 적용, 공통 UI 재사용성 향상' },
      { id: 'pt9', task: 'React.memo + useCallback으로 리렌더링 최적화, 렌더 횟수 40% 감소' }
    ],
    tags: ['React', 'Redux', 'TypeScript'],
    image: './images/project/dorundorun.png'
  }
];
