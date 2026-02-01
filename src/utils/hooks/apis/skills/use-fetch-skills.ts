import { useEffect, useState, useCallback } from 'react';
import { getSkills, getSkill, SkillDetail } from '../../../../network';

interface UseFetchSkillsResult {
  skills: SkillDetail[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetchSkills(): UseFetchSkillsResult {
  const [skills, setSkills] = useState<SkillDetail[]>([]);
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

      const response = await getSkills();

      if (cancelled) return;

      if (response.success && response.data) {
        setSkills(response.data);
      } else {
        setError(response.error || '스킬 목록 조회 실패');
        setSkills([]);
      }

      setLoading(false);
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [updater]);

  return { skills, loading, error, refetch };
}

interface UseFetchSkillResult {
  skill: SkillDetail | null;
  loading: boolean;
  error: string | null;
}

export function useFetchSkill(id: string | undefined): UseFetchSkillResult {
  const [skill, setSkill] = useState<SkillDetail | null>(null);
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

      const response = await getSkill(id);

      if (cancelled) return;

      if (response.success && response.data) {
        setSkill(response.data);
      } else {
        setError(response.error || '스킬 조회 실패');
        setSkill(null);
      }

      setLoading(false);
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { skill, loading, error };
}
