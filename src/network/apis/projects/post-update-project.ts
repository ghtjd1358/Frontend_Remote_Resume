import { supabase, ApiResponse } from '../common';
import { ProjectDetail, UpdateProjectRequest } from './types';

/**
 * 프로젝트를 수정합니다.
 */
export async function postUpdateProject(
  id: string,
  params: UpdateProjectRequest
): Promise<ApiResponse<ProjectDetail>> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(params)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: '프로젝트 수정 중 오류가 발생했습니다.' };
  }
}

/**
 * 프로젝트 순서를 업데이트합니다.
 */
export async function postUpdateProjectOrder(
  items: { id: string; sort_order: number }[]
): Promise<ApiResponse<void>> {
  try {
    for (const item of items) {
      const { error } = await supabase
        .from('projects')
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
