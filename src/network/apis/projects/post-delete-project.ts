import { supabase, ApiResponse } from '../common';

/**
 * 프로젝트를 삭제합니다.
 */
export async function postDeleteProject(id: string): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: '프로젝트 삭제 중 오류가 발생했습니다.' };
  }
}
