import React from 'react';
import './App.css';
import sesacLogo from './assets/sesac-logo.png';

function App() {
  // URL에서 에러 메시지 파라미터 추출
  const params = new URLSearchParams(window.location.search);
  const error = params.get('error');

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#004EA2] to-[#003875] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {/* 로고 영역 */}
          <div className="text-center mb-8">
            <img
              src={sesacLogo}
              alt="새싹 로고"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h1 className="text-[#004EA2] text-2xl md:text-3xl font-bold mb-2">
              새싹 LMS
            </h1>
            <p className="text-gray-600 text-base">학습관리시스템</p>
          </div>

          {/* 테스트 계정 안내 */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              테스트 계정<br></br>
              학생: S24950101, 교수: P20950101, 교직원: E220100101
            </p>
            <p className="text-sm text-gray-600">비밀번호: qwer1234</p>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">
                아이디 또는 비밀번호가 올바르지 않습니다.
              </p>
            </div>
          )}

          {/* 로그인 폼 */}
          <form action="/login" method="post" className="space-y-4">
            {/* 이메일 입력 */}
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="학번:"
                required
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#004EA2] focus:border-[#004EA2] transition-colors text-gray-900"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="비밀번호:"
                required
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#004EA2] focus:border-[#004EA2] transition-colors text-gray-900"
              />
            </div>

            {/* 로그인 옵션 */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember"
                  className="w-4 h-4 border-gray-300 rounded text-[#004EA2] focus:ring-[#004EA2]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  로그인 상태 유지
                </label>
              </div>
              {/* 아이디/비밀번호 찾기 링크 (필요한 경우에만) */}
              <a
                href="/forgot-password"
                className="text-sm text-[#004EA2] hover:text-[#003875] font-medium transition-colors"
              >
                아이디/비밀번호 찾기
              </a>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full bg-[#004EA2] hover:bg-[#003875] text-white font-semibold py-3.5 px-4 rounded-lg mt-6 transition-colors"
            >
              로그인
            </button>
          </form>

          {/* 문의사항 */}
          <div className="text-center text-sm text-gray-500 mt-8">
            문의사항: 02-123-4567 (평일 09:00~18:00)
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
