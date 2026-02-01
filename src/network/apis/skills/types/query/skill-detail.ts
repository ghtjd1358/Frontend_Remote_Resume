export interface SkillDetail {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  created_at?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillDetail[];
}
