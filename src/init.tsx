/**
 * Init - KOMCA 패턴
 *
 * 앱 초기화 전 실행되는 설정
 * - 단독 실행 모드 표시 (removeHostApp)
 * - 기타 초기화 작업
 */

import { storage } from '@sonhoseong/mfa-lib';

// 단독 실행 모드 표시
// Host에서 실행될 때는 Host가 setHostApp()을 호출하므로
// Remote가 단독으로 실행될 때만 이 코드가 의미가 있음
storage.removeHostApp();
console.log('[Remote1] Init: Standalone mode');
