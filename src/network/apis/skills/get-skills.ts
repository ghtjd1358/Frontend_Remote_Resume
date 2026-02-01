import { supabase, ApiResponse } from '../common';
import { SkillDetail, SkillCategory } from './types';

/**
 * 모든 스킬 목록을 조회합니다.
 */
export async function getSkills(): Promise<ApiResponse<SkillDetail[]>> {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: '스킬 목록 조회 중 오류가 발생했습니다.' };
  }
}

/**
 * 카테고리별로 그룹화된 스킬 목록을 조회합니다.
 */
export async function getSkillsByCategory(): Promise<ApiResponse<SkillCategory[]>> {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    // 카테고리별로 그룹화
    const categoryMap = new Map<string, SkillCategory>();

    (data || []).forEach((skill: SkillDetail) => {
      if (!categoryMap.has(skill.category_id)) {
        categoryMap.set(skill.category_id, {
          id: skill.category_id,
          name: skill.category_name,
          skills: []
        });
      }
      categoryMap.get(skill.category_id)!.skills.push(skill);
    });

    return { success: true, data: Array.from(categoryMap.values()) };
  } catch (err) {
    return { success: false, error: '스킬 목록 조회 중 오류가 발생했습니다.' };
  }
}

/**
 * 단일 스킬을 조회합니다.
 */
export async function getSkill(id: string): Promise<ApiResponse<SkillDetail>> {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: '스킬 조회 중 오류가 발생했습니다.' };
  }
}
