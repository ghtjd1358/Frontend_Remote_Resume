import { ExperienceTask } from '../../query';

export interface CreateExperienceRequest {
  company: string;
  position: string;
  start_date?: string | null;
  end_date?: string | null;
  is_current?: boolean;
  is_dev?: boolean;
  tasks?: ExperienceTask[];
  tags?: string[];
  sort_order?: number;
}
