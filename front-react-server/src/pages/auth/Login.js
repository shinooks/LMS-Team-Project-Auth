// src/pages/auth/Login.js
import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const authConfig = {
  baseUrl: 'http://auth.sesac-lms.click/oauth2/authorize', // OAuth 서버 주소
  clientId: 'sesac-lms', // 클라이언트 ID
  redirectUri: 'http://sesac-lms.click/auth/callback', // 등록된 리다이렉션 URI (프론트엔드 URI에 맞게 설정)
  responseType: 'code', // 응답 유형 (Authorization Code Flow에서는 "code" 사용)
  scope: 'openid', // 요청할 권한 범위
};

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 이미 인증된 상태인지 확인
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/'); // 토큰이 있다면 홈으로 리다이렉트
      return;
    }

    const params = new URLSearchParams({
      client_id: authConfig.clientId,
      redirect_uri: authConfig.redirectUri,
      response_type: authConfig.responseType,
      scope: authConfig.scope,
    });

    // OAuth 서버로 리다이렉션
    const authUrl = `${authConfig.baseUrl}?${params.toString()}`;
    window.location.href = authUrl;
  }, []);

  return <p>Redirecting to authentication...</p>; // 인증 리다이렉션 메시지
};

export default Login;