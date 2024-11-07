// src/components/Layout/Header.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Adjusted the import path

function Header() {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <header>
            <h1>JSON Sharing Platform</h1>
            <nav>
                <Link to="/">Home</Link>
                {' | '}
                <Link to="/themes">Themes</Link>
                {user && user.role === 'administrator' && (
                    <>
                        {' | '}
                        <Link to="/create-theme">Create Theme</Link>
                    </>
                )}
                {user ? (
                    <>
                        {' | '}
                        <Link to="/upload">Upload</Link>
                        {' | '}
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'blue',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        {' | '}
                        <Link to="/login">Login</Link>
                        {' | '}
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
