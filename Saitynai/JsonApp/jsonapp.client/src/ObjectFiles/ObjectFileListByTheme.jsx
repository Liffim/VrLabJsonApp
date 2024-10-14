import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ObjectFileListByTheme() {
    const { themeId } = useParams(); // Get the theme ID from the URL
    const [objectFiles, setObjectFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/ObjectFiles/theme/${themeId}`)
            .then((response) => {
                setObjectFiles(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching object files:', error);
                setError(error);
                setLoading(false);
            });
    }, [themeId]); // Refetch if the themeId changes

    if (loading) {
        return <div>Loading object files...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (objectFiles.length === 0) {
        return <div>No object files available for this theme.</div>;
    }

    return (
        <div>
            <h2>Object Files for Theme {themeId}</h2>
            <ul>
                {objectFiles.map((file) => (
                    <li key={file.ObjectID}>
                        <h3>{file.Title}</h3>
                        <p>{file.Description}</p>
                        <pre>{file.FileContent}</pre>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ObjectFileListByTheme;
