import { supabase, ApiResponse } from '../common';
import { SkillDetail, SkillCategory } from './types';

/**
 * 모든 스킬 목록을 조회합니다.
 */
export async function getSkills(): Promise<ApiResponse<SkillDetail[]>> {
  try {
    // skill_categories 테이블과 조인하여 category_name 가져오기
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        skill_categories!inner (
          label
        )
      `)
      .order('name', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    // category_name 필드 추가
    const skillsWithCategory = (data || []).map((skill: any) => ({
      ...skill,
      category_name: skill.skill_categories?.label || '기타'
    }));

    return { success: true, data: skillsWithCategory };
  } catch (err) {
    return { success: false, error: '스킬 목록 조회 중 오류가 발생했습니다.' };
  }
}

/**
 * 카테고리별로 그룹화된 스킬 목록을 조회합니다.
 */
export async function getSkillsByCategory(): Promise<ApiResponse<SkillCategory[]>> {
  try {
    // 먼저 카테고리 목록을 가져옵니다
    const { data: categories, error: catError } = await supabase
      .from('skill_categories')
      .select('*')
      .order('order_index', { ascending: true });

    if (catError) {
      return { success: false, error: catError.message };
    }

    // 스킬 목록을 가져옵니다
    const { data: skills, error: skillError } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true });

    if (skillError) {
      return { success: false, error: skillError.message };
    }

    // 카테고리별로 그룹화
    const categoryMap = new Map<string, SkillCategory>();

    // 카테고리 초기화
    (categories || []).forEach((cat: any) => {
      categoryMap.set(cat.id, {
        id: cat.id,
        name: cat.label || cat.name,
        skills: []
      });
    });

    // 스킬을 해당 카테고리에 추가
    (skills || []).forEach((skill: any) => {
      const category = categoryMap.get(skill.category_id);
      if (category) {
        category.skills.push({
          ...skill,
          category_name: category.name
        });
      }
    });

    // 빈 카테고리는 제외하고 반환
    const result = Array.from(categoryMap.values()).filter(cat => cat.skills.length > 0);

    return { success: true, data: result };
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
