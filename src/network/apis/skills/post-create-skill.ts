import { supabase, ApiResponse } from '../common';
import { SkillDetail, CreateSkillRequest } from './types';

/**
 * 새로운 스킬을 생성합니다.
 */
export async function postCreateSkill(
  params: CreateSkillRequest
): Promise<ApiResponse<SkillDetail>> {
  try {
    const { data, error } = await supabase
      .from('skills')
      .insert(params)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: '스킬 생성 중 오류가 발생했습니다.' };
  }
}

/**
 * 여러 스킬을 한번에 생성합니다.
 */
export async function postCreateSkills(
  params: CreateSkillRequest[]
): Promise<ApiResponse<SkillDetail[]>> {
  try {
    const { data, error } = await supabase
      .from('skills')
      .insert(params)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: '스킬 생성 중 오류가 발생했습니다.' };
  }
}
