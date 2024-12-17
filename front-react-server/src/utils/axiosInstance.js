import axios from 'axios';

// Axios 인스턴스 생성
// API 요청 시 AccessToken을 자동으로 추가해서 보냄
const axiosInstance = axios.create({
    baseURL: 'http://api.sesac-univ.click', // API 서버 주소
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
// 모든 요청에 Access Token을 자동으로 포함시켜 보냄
axiosInstance.interceptors.request.use( // .interceptors.request.use는 모든 요청 전에 수행하라는 옵션
    config => {
        const token = localStorage.getItem('access_token'); // 로컬 스토리지에서 Access Token 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 Access Token 추가
        }
        return config;
    },
    error => Promise.reject(error)
);

// 응답 인터셉터
// Access Token이 만료된 경우 Refresh Token을 사용해 자동 갱신
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) { // 모든 요청에서 401 Unauthorized가 도착할 경우
            try {
                const refreshToken = localStorage.getItem('refresh_token'); // 로컬 스토리지에서 Refresh Token 가져오기
                const tokenResponse = await axios.post('http://auth.sesac-univ.click/oauth2/token', {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: 'sesac-univ',
                    client_secret: 'secret',
                });

                // 새 Access Token 저장
                localStorage.setItem('access_token', tokenResponse.data.access_token);

                // 실패했던 요청을 새 토큰으로 다시 시도
                error.config.headers.Authorization = `Bearer ${tokenResponse.data.access_token}`;
                return axiosInstance.request(error.config);
            } catch (err) {
                console.error('Token refresh failed:', err);

                localStorage.clear(); // 저장된 토큰 초기화
                window.location.href = '/login'; // 로그인 페이지로 리다이렉션
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;