// src/components/Themes/CreateTheme.jsx
import React, { useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function CreateTheme() {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    if (!user || user.role !== 'administrator') {
        return <div>Access denied. Only administrators can create themes.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/Themes', {
                title,
                description,
                createdByUserID: user.userId,
                dateCreated: new Date(),
            });
            setMessage('Theme created successfully!');
            navigate('/themes');
        } catch (error) {
            console.error('Error creating theme:', error);
            setMessage(error.response?.data?.message || 'Failed to create theme.');
        }
    };

    return (
        <div>
            <h2>Create New Theme</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

                <button type="submit">Create Theme</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default CreateTheme;
