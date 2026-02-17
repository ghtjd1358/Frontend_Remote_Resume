import { mfaImg } from '../assets/images';

export interface PortfolioLink {
  label: string;
  url: string;
}

// 노션 스타일 섹션 (문제/원인/고민/해결 구조)
export interface PortfolioSection {
  heading: string;  // 섹션 제목
  problem?: string;  // 문제
  cause?: string;    // 원인
  thinking?: string; // 고민
  solution?: string[];  // 해결 (리스트)
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
    tasks?: string[];      // 기존 호환
    results?: string[];    // 기존 호환
    sections?: PortfolioSection[];  // 노션 스타일 섹션
    links?: PortfolioLink[];
  };
}

export const mockPortfolioData: PortfolioItem[] = [
  {
    id: 1,
    badge: '실무',
    title: '개인 플렛폼',
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
      links: [
        { label: 'GitHub', url: '#' },
        { label: 'Live Demo', url: '#' },
      ],
    },
  },
  {
    id: 2,
    badge: '실무',
    title: '북스토리',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
    desc: '재고 관리 자동화를 제공하는 이커머스 플랫폼.',
    tags: ['React', 'TypeScript', 'MFA', 'Redux Toolkit'],
    detail: {
      period: '2024.10 - 2024.11',
      role: '프론트엔드 개발',
      team: '프론트엔드 1명',
      description: '마이크로 프론트엔드 아키텍처 기반의 포털 시스템 개발.',
      tasks: ['Module Federation 설정 및 공통 모듈 개발', '인증/인가 시스템 구현'],
      results: ['독립 배포 가능한 마이크로 앱 구조 구축'],
      links: [
        { label: 'GitHub', url: '#' },
        { label: 'Live Demo', url: '#' },
      ],
    },
  },
  {
    id: 3,
    badge: '사이드',
    title: 'MFA 포트폴리오',
    image: mfaImg,
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
];
