import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // JWT 디코딩 라이브러리
import { useAuth } from '../../context/AuthContext'; // AuthContext 가져오기

const authConfig = {
    tokenUrl: 'http://auth.sesac-univ.click/oauth2/token',
    clientId: 'sesac-univ',
    clientSecret: 'secret',
    redirectUri: 'http://sesac-univ.click/auth/callback',
};

const Callback = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // AuthContext의 login 메서드
    const [error, setError] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');

        if (authorizationCode) {
            fetchAccessToken(authorizationCode);
        } else {
            setError('Authorization code is missing. Please try logging in again.');
        }
    }, []);

    const fetchAccessToken = async (authorizationCode) => {
        try {
            const response = await fetch(authConfig.tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: authorizationCode,
                    redirect_uri: authConfig.redirectUri,
                    client_id: authConfig.clientId,
                    client_secret: authConfig.clientSecret,
                }),
            });

            const data = await response.json();

            if (data.access_token) {
                // JWT 디코딩
                const decodedToken = jwtDecode(data.access_token);

                // AuthContext의 login 메서드 호출
                login(data.access_token);

                // 역할에 따른 리다이렉션
                const roles = decodedToken.roles || [];
                if (roles.includes('ROLE_학생')) {
                    navigate('/student/dashboard');
                } else if (roles.includes('ROLE_교수')) {
                    navigate('/professor/dashboard');
                } else if (roles.includes('ROLE_교직원')) {
                    navigate('/admin/dashboard');
                } else {
                    setError('유효하지 않은 사용자 역할입니다.');
                }
            } else {
                setError('Failed to retrieve access token. Please try logging in again.');
                console.error('Failed to retrieve access token:', data);
            }
        } catch (error) {
            setError('Error fetching access token. Please try logging in again.');
            console.error('Error fetching access token:', error);
        }
    };

    return (
        <div>
            <p>Processing authentication...</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Callback;