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
  name: '홍길동',
  email: 'example@gmail.com'
};

export const mockResumeProfile: ResumeProfileDetail = {
  title: '프론트엔드 개발자',
  summary: 'React와 TypeScript를 기반으로 사용자 친화적인 웹 애플리케이션을 개발합니다. 깔끔한 코드와 좋은 사용자 경험을 추구합니다.',
  contact_email: 'example@gmail.com',
  github: 'https://github.com'
};
