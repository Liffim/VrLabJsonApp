// src/components/ObjectFiles/ObjectFileList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

function ObjectFileList() {
    const { user } = useContext(AuthContext);
    const [objectFiles, setObjectFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api
            .get('/ObjectFiles')
            .then((response) => {
                setObjectFiles(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching object files:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading object files...</div>;
    }

    if (error) {
        return <div>Error fetching object files.</div>;
    }

    if (objectFiles.length === 0) {
        return <div>No object files available.</div>;
    }

    return (
        <div>
            <h2>Shared JSON Configurations</h2>
            {user && (
                <Link to="/upload">
                    <button>Upload New Object File</button>
                </Link>
            )}
            <ul>
                {objectFiles.map((file) => (
                    <li key={file.objectID}>
                        <h3>
                            <Link to={`/themes/${file.themeID}/objectfile/${file.objectID}`}>{file.title}</Link>
                        </h3>
                        <p>{file.description}</p>
                        <p>Popularity Votes: {file.popularityScore}</p>
                        {user && user.userId === file.uploadedByUserID && (
                            <Link to={`/objectfiles/${file.objectID}/edit`}>Edit</Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ObjectFileList;
