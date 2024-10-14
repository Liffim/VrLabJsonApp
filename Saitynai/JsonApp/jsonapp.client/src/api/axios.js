// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7180/', // Replace with your backend URL
    withCredentials: true, // Allow sending cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
