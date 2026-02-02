import { supabase } from '../common';
import { HomepageConfig, HomepageConfigResponse, HeroConfig } from './types';

interface UpdateHeroParams {
  hero: HeroConfig;
}

interface UpdateSkillsParams {
  selected_skill_ids: string[];
}

interface UpdateExperiencesParams {
  selected_experience_ids: string[];
}

interface UpdateProjectsParams {
  selected_project_ids: string[];
}

/**
 * 홈페이지 설정 upsert (없으면 생성, 있으면 업데이트)
 */
async function upsertConfig(updates: Partial<HomepageConfig>): Promise<HomepageConfigResponse> {
  try {
    // 먼저 기존 설정 조회
    const { data: existing } = await supabase
      .from('homepage_config')
      .select('id')
      .limit(1)
      .single();

    let result;

    if (existing?.id) {
      // 업데이트
      result = await supabase
        .from('homepage_config')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      // 새로 생성
      result = await supabase
        .from('homepage_config')
        .insert({
          hero: updates.hero || {
            title: '프론트엔드 개발자',
            summary: '',
            contact_email: '',
            github: '',
            blog: '',
          },
          selected_skill_ids: updates.selected_skill_ids || [],
          selected_experience_ids: updates.selected_experience_ids || [],
          selected_project_ids: updates.selected_project_ids || [],
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
    }

    if (result.error) {
      console.error('Error upserting homepage config:', result.error);
      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Failed to upsert homepage config:', error);
    return {
      success: false,
      error: String(error),
    };
  }
}

/**
 * Hero 섹션 설정 업데이트
 */
export async function updateHeroConfig(params: UpdateHeroParams): Promise<HomepageConfigResponse> {
  return upsertConfig({ hero: params.hero });
}

/**
 * 선택된 스킬 ID 업데이트
 */
export async function updateSelectedSkills(params: UpdateSkillsParams): Promise<HomepageConfigResponse> {
  return upsertConfig({ selected_skill_ids: params.selected_skill_ids });
}

/**
 * 선택된 경력 ID 업데이트
 */
export async function updateSelectedExperiences(params: UpdateExperiencesParams): Promise<HomepageConfigResponse> {
  return upsertConfig({ selected_experience_ids: params.selected_experience_ids });
}

/**
 * 선택된 프로젝트 ID 업데이트
 */
export async function updateSelectedProjects(params: UpdateProjectsParams): Promise<HomepageConfigResponse> {
  return upsertConfig({ selected_project_ids: params.selected_project_ids });
}

/**
 * 전체 설정 업데이트
 */
export async function updateHomepageConfig(config: Partial<HomepageConfig>): Promise<HomepageConfigResponse> {
  return upsertConfig(config);
}
