import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExperiences, postDeleteExperience, ExperienceDetail } from '../../../network';

const ExperienceListPage: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = async () => {
    setLoading(true);
    const response = await getExperiences();
    if (response.success && response.data) {
      setExperiences(response.data);
    } else {
      setError(response.error || '경력 목록을 불러오는데 실패했습니다.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (exp: ExperienceDetail) => {
    if (!confirm(`"${exp.company}" 경력을 삭제하시겠습니까?`)) return;

    const response = await postDeleteExperience(exp.id);
    if (response.success) {
      fetchExperiences();
    } else {
      alert(response.error || '삭제 중 오류가 발생했습니다.');
    }
  };

  const formatDateRange = (start: string | null, end: string | null, isCurrent: boolean) => {
    if (!start) return '';
    const startStr = start;
    const endStr = isCurrent ? '현재' : (end || '');
    return `${startStr} ~ ${endStr}`;
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <p>{error}</p>
        <button onClick={fetchExperiences}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className="admin-list-page">
      <header className="admin-page-header">
        <div className="admin-page-header-left">
          <h1>경력 관리</h1>
          <p>회사 경력 및 교육 이력을 관리합니다.</p>
        </div>
        <div className="admin-page-header-right">
          <Link to="/admin/experience/new" className="admin-btn admin-btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            새 경력 추가
          </Link>
        </div>
      </header>

      {experiences.length === 0 ? (
        <div className="admin-empty">
          <p>등록된 경력이 없습니다.</p>
          <Link to="/admin/experience/new" className="admin-btn admin-btn-primary">
            첫 경력 추가하기
          </Link>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>회사/기관</th>
                <th>직책</th>
                <th>기간</th>
                <th>구분</th>
                <th>업무</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id}>
                  <td className="admin-table-title">
                    {exp.company}
                    {exp.is_current && <span className="admin-badge admin-badge-primary">재직중</span>}
                  </td>
                  <td>{exp.position}</td>
                  <td className="admin-table-date">
                    {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                  </td>
                  <td>
                    <span className={`admin-badge ${exp.is_dev ? 'admin-badge-success' : 'admin-badge-secondary'}`}>
                      {exp.is_dev ? '개발' : '비개발'}
                    </span>
                  </td>
                  <td className="admin-table-count">{exp.tasks?.length || 0}개</td>
                  <td className="admin-table-actions">
                    <Link
                      to={`/admin/experience/edit/${exp.id}`}
                      className="admin-btn-icon"
                      title="수정"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(exp)}
                      className="admin-btn-icon admin-btn-danger"
                      title="삭제"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExperienceListPage;
