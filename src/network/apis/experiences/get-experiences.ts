import { supabase, ApiResponse } from '../common';
import { ExperienceDetail } from './types';

/**
 * 모든 경력 목록을 조회합니다.
 */
export async function getExperiences(): Promise<ApiResponse<ExperienceDetail[]>> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: '경력 목록 조회 중 오류가 발생했습니다.' };
  }
}

/**
 * 단일 경력을 조회합니다.
 */
export async function getExperience(id: string): Promise<ApiResponse<ExperienceDetail>> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: '경력 조회 중 오류가 발생했습니다.' };
  }
}

/**
 * 개발 경력만 조회합니다.
 */
export async function getDevExperiences(): Promise<ApiResponse<ExperienceDetail[]>> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('is_dev', true)
      .order('start_date', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: '경력 목록 조회 중 오류가 발생했습니다.' };
  }
}
