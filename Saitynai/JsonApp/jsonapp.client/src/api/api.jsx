// src/api/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7180/api',
    withCredentials: true, // Include cookies in requests
});

export default api;
