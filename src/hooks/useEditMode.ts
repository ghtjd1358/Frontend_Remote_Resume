import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

export type SectionType = 'hero' | 'features' | 'skills' | 'experience' | 'projects' | 'contact' | null;

interface UseEditModeReturn {
  isEditMode: boolean;
  activeSection: SectionType;
  isSidebarOpen: boolean;
  openEditor: (section: SectionType) => void;
  closeEditor: () => void;
  toggleEditMode: () => void;
}

/**
 * 편집 모드 관리 훅
 * - 로그인한 사용자만 편집 가능
 * - 섹션별 편집 사이드바 열기/닫기
 */
export function useEditMode(): UseEditModeReturn {
  const user = useSelector((state: any) => state.app?.user);
  const isAuthenticated = !!user;

  const [isEditMode, setIsEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openEditor = useCallback((section: SectionType) => {
    if (!isAuthenticated || !isEditMode) return;
    setActiveSection(section);
    setIsSidebarOpen(true);
  }, [isAuthenticated, isEditMode]);

  const closeEditor = useCallback(() => {
    setIsSidebarOpen(false);
    // 애니메이션 후 activeSection 초기화
    setTimeout(() => {
      setActiveSection(null);
    }, 300);
  }, []);

  const toggleEditMode = useCallback(() => {
    if (!isAuthenticated) return;
    setIsEditMode(prev => {
      if (prev) {
        // 편집 모드 끄면 사이드바도 닫기
        setIsSidebarOpen(false);
        setActiveSection(null);
      }
      return !prev;
    });
  }, [isAuthenticated]);

  return {
    isEditMode: isAuthenticated && isEditMode,
    activeSection,
    isSidebarOpen,
    openEditor,
    closeEditor,
    toggleEditMode,
  };
}
