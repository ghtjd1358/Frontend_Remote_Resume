import { supabase, ApiResponse } from '../common';

/**
 * 프로젝트(포트폴리오)를 삭제합니다.
 * 테이블명: portfolios (cascade로 tasks, tags 자동 삭제)
 */
export async function postDeleteProject(id: string): Promise<ApiResponse<void>> {
  try {
    // portfolio_tasks, portfolio_tags는 CASCADE DELETE가 설정되어 있다고 가정
    // 아니라면 먼저 수동으로 삭제
    await supabase.from('portfolio_tasks').delete().eq('portfolio_id', id);
    await supabase.from('portfolio_tags').delete().eq('portfolio_id', id);

    const { error } = await supabase
      .from('portfolios')
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
