import { supabase, ApiResponse } from '../common';
import { ProjectDetail } from './types';

/**
 * 모든 프로젝트 목록을 조회합니다.
 */
export async function getProjects(): Promise<ApiResponse<ProjectDetail[]>> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: '프로젝트 목록 조회 중 오류가 발생했습니다.' };
  }
}

/**
 * 단일 프로젝트를 조회합니다.
 */
export async function getProject(id: string): Promise<ApiResponse<ProjectDetail>> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: '프로젝트 조회 중 오류가 발생했습니다.' };
  }
}
