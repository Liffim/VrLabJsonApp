// src/components/Auth/Register.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjusted the import path
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await register(username, email, password);
        if (result.success) {
            setMessage('Registration successful! You are now logged in.');
            navigate('/'); // Redirect to home or desired page
        } else {
            setMessage(result.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Register</button>
                <p>{message}</p>
            </form>
            <p>
                Already have an account? <Link to="/login">Login here</Link>.
            </p>
        </div>
    );
}

export default Register;
