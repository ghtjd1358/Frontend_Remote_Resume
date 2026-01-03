export interface PortfolioLink {
  label: string;
  url: string;
}

export interface PortfolioItem {
  id: number;
  badge: string;
  title: string;
  image?: string;
  link?: string;
  desc: string;
  tags: string[];
  detail?: {
    period?: string;
    role?: string;
    team?: string;
    description?: string;
    tasks?: string[];
    results?: string[];
    links?: PortfolioLink[];
  };
}

export const mockPortfolioData: PortfolioItem[] = [
  {
    id: 1,
    badge: '실무',
    title: 'KOMCA 어드민 시스템',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
    desc: '저작권 관리 시스템의 프론트엔드 개발. IBSheet 기반 데이터 그리드와 복잡한 폼 처리 구현.',
    tags: ['React', 'Redux', 'TypeScript', 'IBSheet'],
    detail: {
      period: '2023.06 - 현재',
      role: '프론트엔드 개발',
      team: '프론트엔드 3명, 백엔드 4명',
      description: '한국음악저작권협회의 저작권 관리 어드민 시스템 프론트엔드 개발을 담당했습니다.',
      tasks: ['저작권 관리 시스템 프론트엔드 아키텍처 설계 및 개발', 'IBSheet8 기반 대용량 데이터 그리드 구현'],
      results: ['데이터 그리드 렌더링 성능 40% 개선'],
    },
  },
  {
    id: 2,
    badge: '실무',
    title: 'KOMCA 포털 시스템',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
    desc: 'MFA 기반 포털 시스템 구축. Module Federation을 활용한 마이크로 프론트엔드 아키텍처 설계.',
    tags: ['React', 'Webpack', 'MFA', 'Redux Toolkit'],
    detail: {
      period: '2023.06 - 현재',
      role: '프론트엔드 개발',
      team: '프론트엔드 3명, 백엔드 4명',
      description: '마이크로 프론트엔드 아키텍처 기반의 포털 시스템 개발.',
      tasks: ['Module Federation 설정 및 공통 모듈 개발', '인증/인가 시스템 구현'],
      results: ['독립 배포 가능한 마이크로 앱 구조 구축'],
    },
  },
  {
    id: 3,
    badge: '사이드',
    title: 'MFA 포트폴리오',
    image: 'http://localhost:5001/images/project/mfa.jpg',
    desc: 'Webpack Module Federation 기반의 마이크로 프론트엔드 포트폴리오 사이트.',
    tags: ['React', 'TypeScript', 'MFA', 'Supabase'],
    detail: {
      period: '2024.12',
      role: '풀스택 개발',
      team: '개인 프로젝트',
      description: '개인 포트폴리오를 MFA 구조로 구현한 프로젝트.',
      tasks: ['Host/Remote 앱 분리 설계', 'Supabase 연동'],
      results: ['실무 MFA 경험을 개인 프로젝트에 적용'],
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Live Demo', url: 'http://localhost:3001' },
      ],
    },
  },
  {
    id: 4,
    badge: '사이드',
    title: '이커머스 플랫폼',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
    desc: 'Next.js 기반 이커머스 플랫폼. 상품 관리, 장바구니, 결제 기능 구현.',
    tags: ['Next.js', 'React Query', 'Tailwind CSS'],
    detail: {
      period: '2024.06 - 2024.08',
      role: '프론트엔드 개발',
      team: '개인 프로젝트',
      description: 'Next.js App Router 기반의 이커머스 플랫폼 개발.',
      tasks: ['상품 목록/상세 페이지 개발', '장바구니 및 주문 기능 구현'],
      results: ['서버 컴포넌트 활용으로 초기 로딩 속도 개선'],
      links: [
        { label: 'GitHub', url: 'https://github.com' },
      ],
    },
  },
  {
    id: 5,
    badge: '사이드',
    title: '블로그 플랫폼',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop',
    desc: 'MDX 기반 기술 블로그. 마크다운 에디터와 코드 하이라이팅 구현.',
    tags: ['Next.js', 'MDX', 'Styled Components'],
    detail: {
      period: '2024.03 - 2024.05',
      role: '풀스택 개발',
      team: '개인 프로젝트',
      description: '개인 기술 블로그 플랫폼 개발.',
      tasks: ['MDX 기반 콘텐츠 관리', '다크모드 및 반응형 디자인'],
      results: ['SEO 최적화로 검색 노출 개선'],
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Blog', url: 'https://velog.io' },
      ],
    },
  },
  {
    id: 6,
    badge: '사이드',
    title: '할일 관리 앱',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=200&fit=crop',
    desc: 'React와 Redux Toolkit을 활용한 할일 관리 애플리케이션.',
    tags: ['React', 'Redux', 'TypeScript'],
    detail: {
      period: '2023.12',
      role: '프론트엔드 개발',
      team: '개인 프로젝트',
      description: '상태 관리 학습을 위한 투두 앱 프로젝트.',
      tasks: ['Redux Toolkit을 활용한 상태 관리', '로컬스토리지 연동'],
      results: ['Redux 패턴 학습 및 적용'],
      links: [
        { label: 'GitHub', url: 'https://github.com' },
      ],
    },
  },
];
