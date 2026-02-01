import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, postDeleteProject, ProjectDetail } from '../../../network';

const ProjectsListPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    const response = await getProjects();
    if (response.success && response.data) {
      setProjects(response.data);
    } else {
      setError(response.error || '프로젝트 목록을 불러오는데 실패했습니다.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (project: ProjectDetail) => {
    if (!confirm(`"${project.title}" 프로젝트를 삭제하시겠습니까?`)) return;

    const response = await postDeleteProject(project.id);
    if (response.success) {
      fetchProjects();
    } else {
      alert(response.error || '삭제 중 오류가 발생했습니다.');
    }
  };

  const formatDateRange = (start: string | null, end: string | null, isCurrent: boolean) => {
    if (!start) return '';
    const startStr = start;
    const endStr = isCurrent ? '진행중' : (end || '');
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
        <button onClick={fetchProjects}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className="admin-list-page">
      <header className="admin-page-header">
        <div className="admin-page-header-left">
          <h1>프로젝트 관리</h1>
          <p>개인/팀 프로젝트 포트폴리오를 관리합니다.</p>
        </div>
        <div className="admin-page-header-right">
          <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            새 프로젝트 추가
          </Link>
        </div>
      </header>

      {projects.length === 0 ? (
        <div className="admin-empty">
          <p>등록된 프로젝트가 없습니다.</p>
          <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">
            첫 프로젝트 추가하기
          </Link>
        </div>
      ) : (
        <div className="admin-project-grid">
          {projects.map((project) => (
            <div key={project.id} className="admin-project-card">
              {project.image_url && (
                <div className="admin-project-image">
                  <img src={project.image_url} alt={project.title} />
                </div>
              )}
              <div className="admin-project-content">
                <h3>
                  {project.title}
                  {project.is_current && <span className="admin-badge admin-badge-primary">진행중</span>}
                </h3>
                {project.role && <p className="admin-project-role">{project.role}</p>}
                <p className="admin-project-date">
                  {formatDateRange(project.start_date, project.end_date, project.is_current)}
                </p>
                {project.tasks && project.tasks.length > 0 && (
                  <ul className="admin-project-tasks">
                    {project.tasks.slice(0, 2).map((task) => (
                      <li key={task.id}>{task.task}</li>
                    ))}
                    {project.tasks.length > 2 && (
                      <li className="admin-project-more">+{project.tasks.length - 2}개 더보기</li>
                    )}
                  </ul>
                )}
                {project.tags && project.tags.length > 0 && (
                  <div className="admin-project-tags">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="admin-tag-small">{tag}</span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="admin-tag-small">+{project.tags.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="admin-project-actions">
                <Link
                  to={`/admin/projects/edit/${project.id}`}
                  className="admin-btn-icon"
                  title="수정"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Link>
                <button
                  onClick={() => handleDelete(project)}
                  className="admin-btn-icon admin-btn-danger"
                  title="삭제"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsListPage;
