/**
 * Remote1 (이력서) LNB/메뉴 구조 - KOMCA 패턴
 */
import React from 'react';
import { RoutePath } from '../pages/routes/paths';

// LNB 아이템 타입
export interface LnbItem {
  title: string;
  link: string;
  searchStr?: string;
  subItems?: LnbItem[];
}

// 사이드바 메뉴 아이템 타입
export interface SidebarMenuItem {
  id: string;
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: Omit<SidebarMenuItem, 'icon' | 'children'>[];
}

// 메인 페이지 LNB 아이템 (앵커 링크)
export const lnbItems: LnbItem[] = [
  {
    title: '소개',
    link: '#hero',
    searchStr: '소개,인트로,hero',
  },
  {
    title: '기술스택',
    link: '#skills',
    searchStr: '기술,스킬,skills',
  },
  {
    title: '경력',
    link: '#experience',
    searchStr: '경력,경험,experience',
  },
  {
    title: '프로젝트',
    link: '#projects',
    searchStr: '프로젝트,작업물,projects',
  },
  {
    title: '연락처',
    link: '#contact',
    searchStr: '연락,contact',
  },
];

// 사이드바 아이콘 (SVG)
const icons = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  resume: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
};

// 기본 사이드바 메뉴 (비로그인)
export const guestMenuItems: SidebarMenuItem[] = [
  {
    id: 'home',
    title: '홈',
    path: RoutePath.Home,
    icon: icons.home,
  },
];

// 인증된 사용자 사이드바 메뉴
export const authMenuItems: SidebarMenuItem[] = [
  {
    id: 'home',
    title: '홈',
    path: RoutePath.Home,
    icon: icons.home,
  },
  {
    id: 'admin-dashboard',
    title: '대시보드',
    path: RoutePath.AdminDashboard,
    icon: icons.dashboard,
  },
  {
    id: 'resume-manage',
    title: '이력서 관리',
    icon: icons.resume,
    children: [
      { id: 'skills', title: '기술스택', path: RoutePath.AdminSkills },
      { id: 'experience', title: '경력', path: RoutePath.AdminExperience },
      { id: 'projects', title: '프로젝트', path: RoutePath.AdminProjects },
    ],
  },
];

// GNB 아이템 (헤더용) - Host에서 다른 앱으로 이동
export const gnbItems = [
  { id: 'resume', title: '이력서', path: '/' },
  { id: 'blog', title: '블로그', path: '/blog' },  // Host의 blog 앱으로 이동
];

export default lnbItems;
