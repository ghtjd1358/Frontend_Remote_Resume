import { supabase } from '../common';
import { HomepageConfig, HomepageConfigResponse, HeroConfig } from './types';

const DEFAULT_HERO: HeroConfig = {
  title: '프론트엔드 개발자',
  summary: '안녕하세요, 저는 프론트엔드 개발자입니다.',
  contact_email: '',
  github: '',
  blog: '',
};

const DEFAULT_CONFIG: HomepageConfig = {
  hero: DEFAULT_HERO,
  selected_skill_ids: [],
  selected_experience_ids: [],
  selected_project_ids: [],
};

/**
 * 홈페이지 설정 불러오기
 * homepage_config 테이블에서 첫 번째 행을 가져옴 (단일 설정)
 */
export async function getHomepageConfig(): Promise<HomepageConfigResponse> {
  try {
    const { data, error } = await supabase
      .from('homepage_config')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      // 데이터가 없는 경우 기본값 반환
      if (error.code === 'PGRST116') {
        return {
          success: true,
          data: DEFAULT_CONFIG,
        };
      }
      console.error('Error fetching homepage config:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    // DB에서 가져온 데이터 파싱
    const config: HomepageConfig = {
      id: data.id,
      hero: typeof data.hero === 'string' ? JSON.parse(data.hero) : (data.hero || DEFAULT_HERO),
      selected_skill_ids: data.selected_skill_ids || [],
      selected_experience_ids: data.selected_experience_ids || [],
      selected_project_ids: data.selected_project_ids || [],
      updated_at: data.updated_at,
    };

    return {
      success: true,
      data: config,
    };
  } catch (error) {
    console.error('Failed to get homepage config:', error);
    return {
      success: false,
      error: String(error),
    };
  }
}
