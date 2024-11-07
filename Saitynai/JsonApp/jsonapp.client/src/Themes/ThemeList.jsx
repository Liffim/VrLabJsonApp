// src/components/Themes/ThemeList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

function ThemeList() {
    const { user } = useContext(AuthContext);
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get('/Themes')
            .then((response) => {
                setThemes(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching themes:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading themes...</div>;
    }

    return (
        <div>
            <h2>Themes</h2>
            {user && user.role === 'administrator' && (
                <Link to="/create-theme">
                    <button>Create New Theme</button>
                </Link>
            )}
            <ul>
                {themes.map((theme) => (
                    <li key={theme.themeID}>
                        <h3>
                            <Link to={`/themes/${theme.themeID}`}>{theme.title}</Link>
                        </h3>
                        <p>{theme.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ThemeList;
