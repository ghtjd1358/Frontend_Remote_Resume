import { supabase, ApiResponse } from '../common';
import { ExperienceDetail, CreateExperienceRequest } from './types';

/**
 * 새로운 경력을 생성합니다.
 */
export async function postCreateExperience(
  params: CreateExperienceRequest
): Promise<ApiResponse<ExperienceDetail>> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .insert({
        ...params,
        tasks: params.tasks || [],
        tags: params.tags || [],
        is_current: params.is_current ?? false,
        is_dev: params.is_dev ?? true,
        order_index: params.order_index ?? 0
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: '경력 생성 중 오류가 발생했습니다.' };
  }
}
