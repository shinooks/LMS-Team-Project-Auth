import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // 사용자 역할에 따라 리다이렉션
            switch (user.role) {
                case 'student':
                    navigate('/student/dashboard');
                    break;
                case 'professor':
                    navigate('/professor/dashboard');
                    break;
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                default:
                    navigate('/auth/login'); // 유효하지 않은 역할일 경우
            }
        } else {
            navigate('/auth/login'); // 비로그인 상태일 경우
        }
    }, [user, navigate]);

    return <div>Redirecting...</div>; // 상태 확인 중 보여줄 임시 메시지
};

export default Home;