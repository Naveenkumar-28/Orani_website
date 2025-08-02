
import { BASE_URL } from '@/constants';
import axios from 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        skipAuthRedirect?: boolean;
    }
}

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Send cookies with requests
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => {
        console.log('✅ Response passed through interceptor');
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const skipAuth = originalRequest.skipAuthRedirect;
        console.log('❌ Axios error:', error.response?.status);

        // Check if it's 401 and hasn't already tried to refresh
        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log('🔄 Triggering token refresh...');
            if (isRefreshing) {
                // Queue up requests while refresh is happening
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: () => {
                            resolve(api(originalRequest));
                        },
                        reject: (err: any) => reject(err),
                    });
                });
            }

            isRefreshing = true;

            try {
                const res = await api.get('/auth/refreshToken', { skipAuthRedirect: skipAuth });
                const newAccessToken = res.data.accessToken;

                // Set header for all future requests

                processQueue(null, newAccessToken);

                // Retry original request with new token
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }


        if ((status === 401 || status === 403) && !skipAuth) {
            console.log('🚪 Redirecting to login...');
            window.location.href = '/auth/login';
        }

        return Promise.reject(error);
    }
);


export default api;
