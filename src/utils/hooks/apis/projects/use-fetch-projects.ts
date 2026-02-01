import { useEffect, useState, useCallback } from 'react';
import { getProjects, getProject, ProjectDetail } from '../../../../network';

interface UseFetchProjectsResult {
  projects: ProjectDetail[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetchProjects(): UseFetchProjectsResult {
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updater, setUpdater] = useState(0);

  const refetch = useCallback(() => {
    setUpdater(prev => prev + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const response = await getProjects();

      if (cancelled) return;

      if (response.success && response.data) {
        setProjects(response.data);
      } else {
        setError(response.error || '프로젝트 목록 조회 실패');
        setProjects([]);
      }

      setLoading(false);
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [updater]);

  return { projects, loading, error, refetch };
}

interface UseFetchProjectResult {
  project: ProjectDetail | null;
  loading: boolean;
  error: string | null;
}

export function useFetchProject(id: string | undefined): UseFetchProjectResult {
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const response = await getProject(id);

      if (cancelled) return;

      if (response.success && response.data) {
        setProject(response.data);
      } else {
        setError(response.error || '프로젝트 조회 실패');
        setProject(null);
      }

      setLoading(false);
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { project, loading, error };
}
