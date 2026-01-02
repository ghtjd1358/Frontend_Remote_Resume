export interface ProfileDetail {
  name: string;
  email: string;
}

export interface ResumeProfileDetail {
  title: string;
  summary: string;
  contact_email: string;
  github: string;
}

export const mockProfile: ProfileDetail = {
  name: '손호성',
  email: 'hoseong1358@gmail.com'
};

export const mockResumeProfile: ResumeProfileDetail = {
  title: '프론트엔드 개발자',
  summary: 'React와 TypeScript를 기반으로 개발합니다.\n복잡한 시스템을 나누고 다시 조합하는 것을 좋아합니다.',
  contact_email: 'hoseong1358@gmail.com',
  github: 'https://github.com/ghtjd1358'
};
