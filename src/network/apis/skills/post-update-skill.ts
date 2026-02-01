import { supabase, ApiResponse } from '../common';
import { SkillDetail, UpdateSkillRequest } from './types';

/**
 * 스킬을 수정합니다.
 */
export async function postUpdateSkill(
  id: string,
  params: UpdateSkillRequest
): Promise<ApiResponse<SkillDetail>> {
  try {
    const { data, error } = await supabase
      .from('skills')
      .update(params)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: '스킬 수정 중 오류가 발생했습니다.' };
  }
}
