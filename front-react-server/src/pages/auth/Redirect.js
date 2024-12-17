// src/pages/auth/Redirect.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const authConfig = {
    tokenUrl: 'http://auth.sesac-lms.click/oauth2/token', // 토큰 요청 URL
    clientId: 'spring', // 클라이언트 ID
    clientSecret: 'secret', // 클라이언트 시크릿
    redirectUri: 'http://sesac-lms.click/oauth2/redirect', // 리다이렉션 URI (프론트엔드 URI에 맞게 설정)
};

const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');

        if (authorizationCode) {
            fetchAccessToken(authorizationCode);
        } else {
            console.error('Authorization code is missing');
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
                localStorage.setItem('access_token', data.access_token);
                navigate('/'); // 토큰을 얻은 후 홈 또는 대시보드로 이동
            } else {
                console.error('Failed to retrieve access token:', data);
            }
        } catch (error) {
            console.error('Error fetching access token:', error);
        }
    };

    return <p>Processing authentication...</p>;
};

export default Redirect;