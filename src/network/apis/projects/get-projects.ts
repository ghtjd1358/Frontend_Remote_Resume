import { supabase, ApiResponse } from '../common';
import { ProjectDetail } from './types';

/**
 * 모든 프로젝트(포트폴리오) 목록을 조회합니다.
 * 테이블명: portfolios
 */
export async function getProjects(): Promise<ApiResponse<ProjectDetail[]>> {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        portfolio_tasks (task, order_index),
        portfolio_tags (tag, order_index)
      `)
      .order('order_index', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    // 데이터 변환: tasks와 tags를 배열로 정리
    const projects = (data || []).map((item: any) => ({
      ...item,
      tasks: (item.portfolio_tasks || [])
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((t: any) => t.task),
      tags: (item.portfolio_tags || [])
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((t: any) => t.tag),
    }));

    return { success: true, data: projects };
  } catch (err) {
    return { success: false, error: '프로젝트 목록 조회 중 오류가 발생했습니다.' };
  }
}

/**
 * 단일 프로젝트(포트폴리오)를 조회합니다.
 */
export async function getProject(id: string): Promise<ApiResponse<ProjectDetail>> {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        portfolio_tasks (task, order_index),
        portfolio_tags (tag, order_index)
      `)
      .eq('id', id)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    // 데이터 변환
    const project = {
      ...data,
      tasks: (data.portfolio_tasks || [])
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((t: any) => t.task),
      tags: (data.portfolio_tags || [])
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((t: any) => t.tag),
    };

    return { success: true, data: project };
  } catch (err) {
    return { success: false, error: '프로젝트 조회 중 오류가 발생했습니다.' };
  }
}
