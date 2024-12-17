import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/auth/home" replace />;
  }

  // 인증된 사용자는 컴포넌트 접근 가능
  return children;
};

export default ProtectedRoute;