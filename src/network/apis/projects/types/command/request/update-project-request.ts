import { ProjectTask } from '../../query';

export interface UpdateProjectRequest {
  title?: string;
  role?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  is_current?: boolean;
  tasks?: ProjectTask[];
  tags?: string[];
  image_url?: string | null;
  order_index?: number;
}
