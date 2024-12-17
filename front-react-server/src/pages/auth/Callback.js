// src/pages/auth/Callback.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const authConfig = {
    tokenUrl: 'http://auth.sesac-lms.click/oauth2/token', // 토큰 요청 URL
    clientId: 'sesac-lms', // 클라이언트 ID
    clientSecret: 'secret', // 클라이언트 시크릿
    redirectUri: 'http://sesac-lms.click/auth/callback', // 등록된 리다이렉션 URI
};

const Callback = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');

        if (authorizationCode) {
            fetchAccessToken(authorizationCode);
        } else {
            setError('Authorization code is missing. Please try logging in again.');
        }
    }, [navigate]);

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
            console.log("왔다감");
            console.log(data);
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                navigate('/'); // 토큰을 저장하고 홈 페이지로 이동
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