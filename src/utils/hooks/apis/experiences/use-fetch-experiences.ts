import { useEffect, useState, useCallback } from 'react';
import { getExperiences, getExperience, ExperienceDetail } from '../../../../network';

interface UseFetchExperiencesResult {
  experiences: ExperienceDetail[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetchExperiences(): UseFetchExperiencesResult {
  const [experiences, setExperiences] = useState<ExperienceDetail[]>([]);
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

      const response = await getExperiences();

      if (cancelled) return;

      if (response.success && response.data) {
        setExperiences(response.data);
      } else {
        setError(response.error || '경력 목록 조회 실패');
        setExperiences([]);
      }

      setLoading(false);
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [updater]);

  return { experiences, loading, error, refetch };
}

interface UseFetchExperienceResult {
  experience: ExperienceDetail | null;
  loading: boolean;
  error: string | null;
}

export function useFetchExperience(id: string | undefined): UseFetchExperienceResult {
  const [experience, setExperience] = useState<ExperienceDetail | null>(null);
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

      const response = await getExperience(id);

      if (cancelled) return;

      if (response.success && response.data) {
        setExperience(response.data);
      } else {
        setError(response.error || '경력 조회 실패');
        setExperience(null);
      }

      setLoading(false);
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { experience, loading, error };
}
