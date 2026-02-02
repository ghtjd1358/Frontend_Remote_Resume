import { supabase, ApiResponse } from '../common';
import { ProjectDetail, CreateProjectRequest } from './types';

/**
 * 새로운 프로젝트(포트폴리오)를 생성합니다.
 * 테이블명: portfolios, portfolio_tasks, portfolio_tags
 */
export async function postCreateProject(
  params: CreateProjectRequest
): Promise<ApiResponse<ProjectDetail>> {
  try {
    const { tasks, tags, ...portfolioData } = params;

    // 1. 포트폴리오 생성
    const { data: portfolio, error: portfolioError } = await supabase
      .from('portfolios')
      .insert({
        ...portfolioData,
        order_index: params.order_index ?? 0
      })
      .select()
      .single();

    if (portfolioError) {
      return { success: false, error: portfolioError.message };
    }

    // 2. Tasks 추가
    if (tasks && tasks.length > 0) {
      const taskRows = tasks.map((task, index) => ({
        portfolio_id: portfolio.id,
        task,
        order_index: index
      }));
      await supabase.from('portfolio_tasks').insert(taskRows);
    }

    // 3. Tags 추가
    if (tags && tags.length > 0) {
      const tagRows = tags.map((tag, index) => ({
        portfolio_id: portfolio.id,
        tag,
        order_index: index
      }));
      await supabase.from('portfolio_tags').insert(tagRows);
    }

    return { success: true, data: { ...portfolio, tasks: tasks || [], tags: tags || [] } };
  } catch (err) {
    return { success: false, error: '프로젝트 생성 중 오류가 발생했습니다.' };
  }
}
