import { supabase, ApiResponse } from '../common';

/**
 * 스킬을 삭제합니다.
 */
export async function postDeleteSkill(id: string): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: '스킬 삭제 중 오류가 발생했습니다.' };
  }
}

/**
 * 카테고리의 모든 스킬을 삭제합니다.
 */
export async function postDeleteSkillsByCategory(categoryId: string): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('category_id', categoryId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: '스킬 삭제 중 오류가 발생했습니다.' };
  }
}
