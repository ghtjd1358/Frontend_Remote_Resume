import { supabase, ApiResponse } from '../common';
import { ExperienceDetail, UpdateExperienceRequest } from './types';

/**
 * 경력을 수정합니다.
 */
export async function postUpdateExperience(
  id: string,
  params: UpdateExperienceRequest
): Promise<ApiResponse<ExperienceDetail>> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .update(params)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: '경력 수정 중 오류가 발생했습니다.' };
  }
}

/**
 * 경력 순서를 업데이트합니다.
 */
export async function postUpdateExperienceOrder(
  items: { id: string; sort_order: number }[]
): Promise<ApiResponse<void>> {
  try {
    for (const item of items) {
      const { error } = await supabase
        .from('experiences')
        .update({ sort_order: item.sort_order })
        .eq('id', item.id);

      if (error) {
        return { success: false, error: error.message };
      }
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: '순서 업데이트 중 오류가 발생했습니다.' };
  }
}
