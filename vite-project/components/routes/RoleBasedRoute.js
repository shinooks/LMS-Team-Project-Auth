import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/auth/home" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // 역할이 허용되지 않은 경우 기본 경로로 리다이렉트
    console.log(user)
    return <Navigate to="/auth/home" replace />;
  }

  // 접근 권한이 있는 경우 컴포넌트를 렌더링
  return children;
};

export default RoleBasedRoute;