// ThemeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ThemeDetails() {
    const { themeId } = useParams();
    const [theme, setTheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/Themes/${themeId}/details`)
            .then(response => {
                console.log('Fetched theme:', response.data);
                setTheme(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [themeId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!theme) {
        return <div>Theme not found</div>;
    }

    return (
        <div>
            <h2>{theme.title}</h2>
            <p>{theme.description}</p>

            <h3>Object Files</h3>
            {theme.objectFiles && theme.objectFiles.length > 0 ? (
                <ul>
                    {theme.objectFiles.map(file => (
                        <li key={file.objectID}>
                            <Link to={`/themes/${themeId}/objectfile/${file.objectID}`}>
                                {file.title}
                            </Link>
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
