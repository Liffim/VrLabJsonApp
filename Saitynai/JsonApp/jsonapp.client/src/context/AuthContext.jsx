// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch current user status on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api
                .get('/Authentication/CurrentUser')
                .then((response) => {
                    setUser(response.data.user);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching current user:', error);
                    setUser(null);
                    localStorage.removeItem('token');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await api.post('/Authentication/Login', { username, password });
            const { token, user } = response.data;
            setUser(user);
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, message: error.response?.data || 'Login failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    };

    const register = async (username, email, password) => {
        try {
            const response = await api.post('/Authentication/Register', { username, email, password });
            const { token, user } = response.data;
            setUser(user);
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { success: true };
        } catch (error) {
            console.error('Registration failed:', error);
            return { success: false, message: error.response?.data || 'Registration failed' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
