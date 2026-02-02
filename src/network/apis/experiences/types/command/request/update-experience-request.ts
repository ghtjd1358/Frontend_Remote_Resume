import { ExperienceTask } from '../../query';

export interface UpdateExperienceRequest {
  company?: string;
  position?: string;
  start_date?: string | null;
  end_date?: string | null;
  is_current?: boolean;
  is_dev?: boolean;
  tasks?: ExperienceTask[];
  tags?: string[];
  order_index?: number;
}
