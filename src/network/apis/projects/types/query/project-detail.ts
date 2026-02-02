export interface ProjectTask {
  id: string;
  task: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  role: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  tasks: ProjectTask[];
  tags: string[];
  image_url: string | null;
  order_index: number;
  created_at?: string;
}
