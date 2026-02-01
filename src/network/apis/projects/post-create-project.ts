import { supabase, ApiResponse } from '../common';
import { ProjectDetail, CreateProjectRequest } from './types';

/**
 * 새로운 프로젝트를 생성합니다.
 */
export async function postCreateProject(
  params: CreateProjectRequest
): Promise<ApiResponse<ProjectDetail>> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        ...params,
        tasks: params.tasks || [],
        tags: params.tags || [],
        is_current: params.is_current ?? false,
        sort_order: params.sort_order ?? 0
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: '프로젝트 생성 중 오류가 발생했습니다.' };
  }
}
