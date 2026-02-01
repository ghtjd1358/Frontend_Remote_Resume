import { supabase, ApiResponse } from '../common';

/**
 * 경력을 삭제합니다.
 */
export async function postDeleteExperience(id: string): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: '경력 삭제 중 오류가 발생했습니다.' };
  }
}
