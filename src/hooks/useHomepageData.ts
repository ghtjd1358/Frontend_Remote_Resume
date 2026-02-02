import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  getHomepageConfig,
  updateHeroConfig,
  updateSelectedSkills,
  updateSelectedExperiences,
  updateSelectedProjects,
  HomepageConfig,
  HeroConfig,
} from '../network/apis/homepage';
// Skills는 목업 사용 (아이콘 매핑 문제)
// import { getSkillsByCategory } from '../network/apis/skills';
import { getExperiences } from '../network/apis/experiences';
import { getProjects } from '../network/apis/projects';
import {
  SkillCategoryDetail,
  ExperienceDetail as DataExperienceDetail,
  PortfolioItem,
  mockSkillCategories,
  mockExperiences,
  mockProjects,
  mockPortfolioData,
} from '../data';

interface UseHomepageDataReturn {
  // Config
  config: HomepageConfig | null;
  isConfigLoading: boolean;

  // Available data from Supabase
  availableSkills: Array<{ id: string; name: string; category_id: string; category_name: string }>;
  availableExperiences: Array<{ id: string; company: string; position: string; start_date: string | null; end_date: string | null; is_current: boolean; is_dev: boolean }>;
  availableProjects: Array<{ id: string; title: string; badge?: string; short_description?: string; status?: string; is_featured?: boolean }>;
  isDataLoading: boolean;

  // Filtered data for display (based on selected IDs)
  displaySkillCategories: SkillCategoryDetail[];
  displayExperiences: DataExperienceDetail[];
  displayProjects: PortfolioItem[];

  // Hero data
  heroConfig: HeroConfig;

  // Save functions
  saveHero: (data: HeroConfig) => Promise<void>;
  saveSkills: (selectedIds: string[]) => Promise<void>;
  saveExperiences: (selectedIds: string[]) => Promise<void>;
  saveProjects: (selectedIds: string[]) => Promise<void>;

  // Refresh
  refreshConfig: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const DEFAULT_HERO: HeroConfig = {
  title: '프론트엔드 개발자',
  summary: '안녕하세요, 저는 프론트엔드 개발자입니다.',
  contact_email: '',
  github: '',
  blog: '',
};

/**
 * 홈페이지 데이터 관리 훅
 * - Supabase에서 설정 및 데이터 로드
 * - 선택된 ID 기반으로 표시할 데이터 필터링
 * - 설정 저장 기능
 */
export function useHomepageData(): UseHomepageDataReturn {
  const user = useSelector((state: any) => state.app?.user);
  const isAuthenticated = !!user;

  // Config state
  const [config, setConfig] = useState<HomepageConfig | null>(null);
  const [isConfigLoading, setIsConfigLoading] = useState(false);

  // Available data state
  const [availableSkills, setAvailableSkills] = useState<Array<{ id: string; name: string; category_id: string; category_name: string }>>([]);
  const [availableExperiences, setAvailableExperiences] = useState<Array<{ id: string; company: string; position: string; start_date: string | null; end_date: string | null; is_current: boolean; is_dev: boolean }>>([]);
  const [availableProjects, setAvailableProjects] = useState<Array<{ id: string; title: string; badge?: string; short_description?: string; status?: string; is_featured?: boolean }>>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Full data for display
  const [fullSkillCategories, setFullSkillCategories] = useState<SkillCategoryDetail[]>([]);
  const [fullExperiences, setFullExperiences] = useState<DataExperienceDetail[]>([]);
  const [fullProjects, setFullProjects] = useState<PortfolioItem[]>([]);

  // Load config
  const refreshConfig = useCallback(async () => {
    setIsConfigLoading(true);
    try {
      const response = await getHomepageConfig();
      if (response.success && response.data) {
        setConfig(response.data);
      }
    } catch (error) {
      console.error('Failed to load homepage config:', error);
    } finally {
      setIsConfigLoading(false);
    }
  }, []);

  // Load available data from Supabase
  const refreshData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      // Skills: 목업 데이터 사용 (아이콘 매핑 때문에 DB 연동 안함)
      const flatSkills = mockSkillCategories.flatMap(cat =>
        cat.skills.map(skill => ({
          id: skill.id,
          name: skill.name,
          category_id: cat.id,
          category_name: cat.name,
        }))
      );
      setAvailableSkills(flatSkills);
      setFullSkillCategories(mockSkillCategories);

      // Fetch experiences
      const expResponse = await getExperiences();
      if (expResponse.success && expResponse.data) {
        const expList = expResponse.data.map((exp: any) => ({
          id: exp.id,
          company: exp.company,
          position: exp.position,
          start_date: exp.start_date,
          end_date: exp.end_date,
          is_current: exp.is_current,
          is_dev: exp.is_dev,
        }));
        setAvailableExperiences(expList);

        // API ExperienceDetail을 DataExperienceDetail로 변환
        const experiences: DataExperienceDetail[] = expResponse.data.map((exp: any) => ({
          id: exp.id,
          company: exp.company,
          position: exp.position,
          start_date: exp.start_date,
          end_date: exp.end_date,
          is_current: exp.is_current,
          is_dev: exp.is_dev,
          tasks: exp.tasks || [],
          tags: exp.tags || [],
        }));
        setFullExperiences(experiences);
      } else {
        const expList = mockExperiences.map(exp => ({
          id: exp.id,
          company: exp.company,
          position: exp.position,
          start_date: exp.start_date,
          end_date: exp.end_date,
          is_current: exp.is_current,
          is_dev: exp.is_dev,
        }));
        setAvailableExperiences(expList);
        setFullExperiences(mockExperiences);
      }

      // Fetch projects (portfolios)
      const projResponse = await getProjects();
      if (projResponse.success && projResponse.data) {
        // API ProjectDetail을 PortfolioItem으로 변환
        const portfolioItems: PortfolioItem[] = projResponse.data.map((proj: any) => ({
          id: proj.id,
          badge: proj.is_current ? '진행중' : '완료',
          title: proj.title,
          image: proj.image_url || undefined,
          desc: proj.role || '',
          tags: proj.tags || [],
          detail: {
            period: proj.start_date ? `${proj.start_date} - ${proj.is_current ? '현재' : proj.end_date || ''}` : undefined,
            role: proj.role || undefined,
            tasks: (proj.tasks || []).map((t: any) => typeof t === 'string' ? t : t.task),
          },
        }));

        const projList = portfolioItems.map(proj => ({
          id: String(proj.id),
          title: proj.title,
          badge: proj.badge,
          short_description: proj.desc,
          status: proj.badge === '진행중' ? 'in_progress' : 'completed',
          is_featured: true,
        }));
        setAvailableProjects(projList);
        setFullProjects(portfolioItems);
      } else {
        const projList = mockPortfolioData.map(proj => ({
          id: String(proj.id),
          title: proj.title,
          badge: proj.badge,
          short_description: proj.desc,
          status: proj.detail?.period?.includes('현재') ? 'in_progress' : 'completed',
          is_featured: true,
        }));
        setAvailableProjects(projList);
        setFullProjects(mockPortfolioData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      // Use mock data as fallback
      setFullSkillCategories(mockSkillCategories);
      setFullExperiences(mockExperiences);
      setFullProjects(mockPortfolioData);
    } finally {
      setIsDataLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshConfig();
    refreshData();
  }, [refreshConfig, refreshData]);

  // Filter data based on selected IDs
  const displaySkillCategories: SkillCategoryDetail[] = (() => {
    if (!config?.selected_skill_ids || config.selected_skill_ids.length === 0) {
      return fullSkillCategories;
    }
    const selectedSet = new Set(config.selected_skill_ids);
    return fullSkillCategories.map(cat => ({
      ...cat,
      skills: cat.skills.filter(skill => selectedSet.has(skill.id)),
    })).filter(cat => cat.skills.length > 0);
  })();

  const displayExperiences: DataExperienceDetail[] = (() => {
    if (!config?.selected_experience_ids || config.selected_experience_ids.length === 0) {
      return fullExperiences;
    }
    const selectedSet = new Set(config.selected_experience_ids);
    return fullExperiences.filter(exp => selectedSet.has(exp.id));
  })();

  const displayProjects: PortfolioItem[] = (() => {
    if (!config?.selected_project_ids || config.selected_project_ids.length === 0) {
      return fullProjects;
    }
    const selectedSet = new Set(config.selected_project_ids);
    return fullProjects.filter(proj => selectedSet.has(String(proj.id)));
  })();

  const heroConfig: HeroConfig = config?.hero || DEFAULT_HERO;

  // Save functions
  const saveHero = useCallback(async (data: HeroConfig) => {
    const response = await updateHeroConfig({ hero: data });
    if (response.success) {
      setConfig(prev => prev ? { ...prev, hero: data } : null);
    } else {
      throw new Error(response.error || 'Failed to save hero');
    }
  }, []);

  const saveSkills = useCallback(async (selectedIds: string[]) => {
    const response = await updateSelectedSkills({ selected_skill_ids: selectedIds });
    if (response.success) {
      setConfig(prev => prev ? { ...prev, selected_skill_ids: selectedIds } : null);
    } else {
      throw new Error(response.error || 'Failed to save skills');
    }
  }, []);

  const saveExperiences = useCallback(async (selectedIds: string[]) => {
    const response = await updateSelectedExperiences({ selected_experience_ids: selectedIds });
    if (response.success) {
      setConfig(prev => prev ? { ...prev, selected_experience_ids: selectedIds } : null);
    } else {
      throw new Error(response.error || 'Failed to save experiences');
    }
  }, []);

  const saveProjects = useCallback(async (selectedIds: string[]) => {
    const response = await updateSelectedProjects({ selected_project_ids: selectedIds });
    if (response.success) {
      setConfig(prev => prev ? { ...prev, selected_project_ids: selectedIds } : null);
    } else {
      throw new Error(response.error || 'Failed to save projects');
    }
  }, []);

  return {
    config,
    isConfigLoading,
    availableSkills,
    availableExperiences,
    availableProjects,
    isDataLoading,
    displaySkillCategories,
    displayExperiences,
    displayProjects,
    heroConfig,
    saveHero,
    saveSkills,
    saveExperiences,
    saveProjects,
    refreshConfig,
    refreshData,
  };
}
