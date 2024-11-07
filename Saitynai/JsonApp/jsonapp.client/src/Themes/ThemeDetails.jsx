// src/components/Themes/ThemeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';

function ThemeDetails() {
    const { themeId } = useParams();
    const [theme, setTheme] = useState(null);
    const [objectFiles, setObjectFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get(`/Themes/${themeId}`)
            .then((response) => {
                setTheme(response.data);
                return api.get(`/ObjectFiles/theme/${themeId}`);
            })
            .then((response) => {
                setObjectFiles(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching theme details:', error);
                setLoading(false);
            });
    }, [themeId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!theme) {
        return <div>Theme not found</div>;
    }

    return (
        <div>
            <h2>{theme.title}</h2>
            <p>{theme.description}</p>

            <h3>Object Files</h3>
            {objectFiles && objectFiles.length > 0 ? (
                <ul>
                    {objectFiles.map((file) => (
                        <li key={file.objectID}>
                            <Link to={`/themes/${themeId}/objectfile/${file.objectID}`}>{file.title}</Link>
                            <p>{file.description}</p>
                            <p>Popularity Votes: {file.popularityScore}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No object files found for this theme.</p>
            )}
        </div>
    );
}

export default ThemeDetails;
