import React, { useState, useEffect } from 'react';
import '../EditSidebar.css';

export interface HeroConfig {
  title: string;
  summary: string;
  contact_email: string;
  github: string;
  blog: string;
}

interface HeroEditorProps {
  initialData: HeroConfig;
  onSave: (data: HeroConfig) => Promise<void>;
  onCancel: () => void;
}

/**
 * HeroEditor - Hero 섹션 편집기
 */
const HeroEditor: React.FC<HeroEditorProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<HeroConfig>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (field: keyof HeroConfig) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="hero-editor">
      <div className="edit-form-group">
        <label className="edit-form-label">직함 / 타이틀</label>
        <input
          type="text"
          className="edit-form-input"
          value={formData.title}
          onChange={handleChange('title')}
          placeholder="예: 프론트엔드 개발자"
        />
      </div>

      <div className="edit-form-group">
        <label className="edit-form-label">소개글</label>
        <textarea
          className="edit-form-textarea"
          value={formData.summary}
          onChange={handleChange('summary')}
          placeholder="자기소개를 입력하세요..."
          rows={4}
        />
        <p className="edit-form-hint">줄바꿈을 사용하여 여러 줄로 작성할 수 있습니다.</p>
      </div>

      <hr className="edit-section-divider" />

      <h3 className="edit-section-title">연락처 정보</h3>

      <div className="edit-form-group">
        <label className="edit-form-label">이메일</label>
        <input
          type="email"
          className="edit-form-input"
          value={formData.contact_email}
          onChange={handleChange('contact_email')}
          placeholder="example@email.com"
        />
      </div>

      <div className="edit-form-group">
        <label className="edit-form-label">GitHub URL</label>
        <input
          type="url"
          className="edit-form-input"
          value={formData.github}
          onChange={handleChange('github')}
          placeholder="https://github.com/username"
        />
      </div>

      <div className="edit-form-group">
        <label className="edit-form-label">블로그 URL</label>
        <input
          type="url"
          className="edit-form-input"
          value={formData.blog}
          onChange={handleChange('blog')}
          placeholder="https://blog.example.com"
        />
      </div>

      <div className="edit-sidebar-footer" style={{ margin: '24px -24px -24px', padding: '16px 24px' }}>
        <button
          className="edit-sidebar-btn edit-sidebar-btn-secondary"
          onClick={onCancel}
          disabled={isSaving}
        >
          취소
        </button>
        <button
          className="edit-sidebar-btn edit-sidebar-btn-primary"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
};

export default HeroEditor;
