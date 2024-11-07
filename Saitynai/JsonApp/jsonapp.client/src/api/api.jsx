// src/api/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7180/api',
    withCredentials: false, // Include cookies in requests
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export default api;
