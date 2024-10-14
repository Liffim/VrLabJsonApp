// src/components/Themes/ThemeList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

function ThemeList() {
    const { user } = useContext(AuthContext);
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/Themes')
            .then(response => {
                console.log('Fetched themes:', response.data);
                setThemes(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading themes...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Themes</h2>
            {user && user.role === 'admin' && (
                <Link to="/create-theme">
                    <button>Create New Theme</button>
                </Link>
            )}
            <ul>
                {themes.map(theme => (
                    <li key={theme.ThemeID}>
                        <h3><Link to={`/themes/${theme.ThemeID}`}>{theme.Title}</Link></h3>
                        <p>{theme.Description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ThemeList;
