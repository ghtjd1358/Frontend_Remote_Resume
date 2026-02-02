/**
 * 홈페이지 설정 타입
 */

export interface HeroConfig {
  title: string;
  summary: string;
  contact_email: string;
  github: string;
  blog: string;
}

export interface HomepageConfig {
  id?: string;
  hero: HeroConfig;
  selected_skill_ids: string[];
  selected_experience_ids: string[];
  selected_project_ids: string[];
  updated_at?: string;
}

export interface HomepageConfigResponse {
  success: boolean;
  data?: HomepageConfig;
  error?: string;
}
