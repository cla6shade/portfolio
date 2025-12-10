export interface Project {
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  details: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: 'ExitMate',
    description: '자영업자를 위한 지원사업 안내 및 신청 보조',
    tags: ['Next.js', 'TypeScript', 'MongoDB'],
    link: 'https://test.exitmate.kr',
    github: 'https://github.com/exitmate/web/tree/develop',
    thumbnail: '/projects/exitmate.svg',
    details: [
      '자영업자의 폐업 문제 해결을 위해 지원사업 정책을 모아 보여주고 AI 비서를 통한 개인화 서비스 제공',
      '백엔드 100%, 프론트엔드 20% 기여',
      '공공빅데이터 활용 창업 아이디어 경진대회 장려상 수상',
      '부산대학교 창의융합 SW 해커톤 대회 최우수상 수상',
    ],
  },
  {
    title: '반짝이맵',
    description: '위치·시간 기반으로 감정을 기록하고 공유하는 앱',
    tags: ['React', 'Express.js', 'TypeScript', 'Redis', 'MySQL'],
    link: 'https://apps.apple.com/kr/app/%EB%B0%98%EC%A7%9D%EC%9D%B4%EB%A7%B5/id6745518783',
    github: 'https://github.com/banjjakme/glitters-be',
    thumbnail: '/projects/glitters.svg',
    details: [
      'HTTP API 개발, Redis Pub/Sub과 WebSocket 기반 채팅 구현',
      'Docker와 Github workflow를 이용한 Auto CI/CD 구축',
      '백엔드 개발 100% 기여',
      '대동제 홍보 후 가입자 400명 달성, 앱스토어 소셜 부문 61위 기록',
    ],
  },
  {
    title: 'Ditto',
    description: '스터디 참여율 저하와 운영 비효율 해결',
    tags: ['React', 'TypeScript'],
    github: 'https://github.com/kakao-tech-campus-2nd-step3/Team12_FE',
    thumbnail: '/projects/ditto.svg',
    details: [
      '출석 관리·과제 제출·스터디원 관리 기능을 통합 제공하고 스터디 간 경쟁 요소 도입',
      '디자인 시스템 도입으로 작업 생산성 향상 및 일관된 디자인 적용',
      'useSuspenseQueries를 이용한 data waterfall 방지',
      '프론트엔드 개발자로 50% 기여',
    ],
  },
  {
    title: 'LessonManager',
    description: '피아노학원 학원 관리 소프트웨어',
    tags: ['React', 'Express.js', 'Next.js'],
    link: 'https://doremisketch.com/admin',
    thumbnail: '/projects/lessonmanager.svg',
    details: [
      '부산의 피아노학원 "피아노투게더"를 위한 학원 관리 시스템',
      '모바일 레이아웃 디자인 및 구현, 선생님 관리 및 레슨 예약정보 관리, 결제 기능 구현',
      'Composite Index 도입과 Denormalization으로 통계기능 쿼리 최적화 (>1m ⭢ <1s)',
      '프론트엔드 50%, 백엔드 50% 기여',
    ],
  },
];
