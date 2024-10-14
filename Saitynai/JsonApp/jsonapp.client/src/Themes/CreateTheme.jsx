// src/components/Themes/CreateTheme.jsx
import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function CreateTheme() {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/Themes', {
                title,
                description,
                dateCreated: new Date(), // Optional: backend sets default
            });
            setMessage('Theme created successfully!');
            navigate('/themes'); // Redirect to themes list
        } catch (error) {
            console.error('Error creating theme:', error);
            setMessage(error.response?.data?.message || 'Failed to create theme.');
        }
    };

    // Ensure only admins can access this page
    if (!user || user.role !== 'admin') {
        return <div>Access denied. Only admins can create themes.</div>;
    }

    return (
        <div>
            <h2>Create New Theme</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <button type="submit">Create Theme</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default CreateTheme;
