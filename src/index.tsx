/**
 * 진입점
 *
 * 1. init: 앱 초기화 (storage 설정)
 * 2. bootstrap: React 앱 부팅
 */

// 초기화 먼저 실행
import('./init');

// Module Federation requires async bootstrap
import('./bootstrap');
