// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch current user status on mount
    useEffect(() => {
        axios.get('/Authentication/CurrentUser')
            .then(response => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch(error => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/Authentication/Login', { username, password });
            setUser(response.data.user);
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, message: error.response?.data || 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            await axios.post('/Authentication/Logout');
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await axios.post('/Authentication/Register', { username, email, password });
            setUser(response.data.user);
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
