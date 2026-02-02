import { supabase, ApiResponse } from '../common';
import { ProjectDetail, UpdateProjectRequest } from './types';

/**
 * 프로젝트(포트폴리오)를 수정합니다.
 * 테이블명: portfolios, portfolio_tasks, portfolio_tags
 */
export async function postUpdateProject(
  id: string,
  params: UpdateProjectRequest
): Promise<ApiResponse<ProjectDetail>> {
  try {
    const { tasks, tags, ...portfolioData } = params;

    // 1. 포트폴리오 업데이트
    const { data: portfolio, error: portfolioError } = await supabase
      .from('portfolios')
      .update(portfolioData)
      .eq('id', id)
      .select()
      .single();

    if (portfolioError) {
      return { success: false, error: portfolioError.message };
    }

    // 2. Tasks 업데이트 (기존 삭제 후 다시 추가)
    if (tasks !== undefined) {
      await supabase.from('portfolio_tasks').delete().eq('portfolio_id', id);
      if (tasks.length > 0) {
        const taskRows = tasks.map((task, index) => ({
          portfolio_id: id,
          task,
          order_index: index
        }));
        await supabase.from('portfolio_tasks').insert(taskRows);
      }
    }

    // 3. Tags 업데이트 (기존 삭제 후 다시 추가)
    if (tags !== undefined) {
      await supabase.from('portfolio_tags').delete().eq('portfolio_id', id);
      if (tags.length > 0) {
        const tagRows = tags.map((tag, index) => ({
          portfolio_id: id,
          tag,
          order_index: index
        }));
        await supabase.from('portfolio_tags').insert(tagRows);
      }
    }

    return { success: true, data: { ...portfolio, tasks: tasks || [], tags: tags || [] } };
  } catch (err) {
    return { success: false, error: '프로젝트 수정 중 오류가 발생했습니다.' };
  }
}

/**
 * 프로젝트 순서를 업데이트합니다.
 */
export async function postUpdateProjectOrder(
  items: { id: string; order_index: number }[]
): Promise<ApiResponse<void>> {
  try {
    for (const item of items) {
      const { error } = await supabase
        .from('portfolios')
        .update({ order_index: item.order_index })
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
