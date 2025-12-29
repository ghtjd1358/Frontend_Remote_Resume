// Remote1 (이력서) LNB 메뉴 구조
export interface LnbItem {
  title: string;
  link: string;
  searchStr?: string;
  subItems?: LnbItem[];
}

export const lnbItems: LnbItem[] = [
  {
    title: '소개',
    link: '#hero',
    searchStr: '소개,인트로,hero',
  },
  {
    title: '기술스택',
    link: '#skills',
    searchStr: '기술,스킬,skills',
  },
  {
    title: '경력',
    link: '#experience',
    searchStr: '경력,경험,experience',
  },
  {
    title: '프로젝트',
    link: '#projects',
    searchStr: '프로젝트,작업물,projects',
  },
  {
    title: '연락처',
    link: '#contact',
    searchStr: '연락,contact',
  },
];

export default lnbItems;
