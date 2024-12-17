import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAccessToken(token);

        const roles = decodedToken.roles || [];
        const primaryRole = roles.includes('ROLE_학생') ? 'student' :
            roles.includes('ROLE_교수') ? 'professor' :
                roles.includes('ROLE_교직원') ? 'admin' : null;

        if (!primaryRole) {
          throw new Error('유효하지 않은 역할');
        }

        setUser({
          id: decodedToken.sub,
          name: '사용자 이름 미상', // 임의 값
          email: 'unknown@example.com', // 임의 값
          role: primaryRole,
          department: roles.find(role => role.startsWith('ROLE_') && role !== 'ROLE_사용자')?.split('_')[1] || 'Unknown',
        });
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      setAccessToken(token);

      const roles = decodedToken.roles || [];
      const primaryRole = roles.includes('ROLE_학생') ? 'student' :
          roles.includes('ROLE_교수') ? 'professor' :
              roles.includes('ROLE_교직원') ? 'admin' : null;

      if (!primaryRole) {
        throw new Error('유효하지 않은 역할');
      }

      setUser({
        id: decodedToken.sub,
        name: '사용자 이름 미상', // 임의 값
        email: 'unknown@example.com', // 임의 값
        role: primaryRole,
        department: roles.find(role => role.startsWith('ROLE_') && role !== 'ROLE_사용자')?.split('_')[1] || 'Unknown',
      });

      localStorage.setItem('access_token', token);
    } catch (error) {
      console.error('Invalid token during login:', error);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('access_token');
    navigate('/auth/login');
  };

  return (
      <AuthContext.Provider value={{ user, accessToken, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다');
  }
  return context;
};