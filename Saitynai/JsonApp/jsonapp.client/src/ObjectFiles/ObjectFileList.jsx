// src/components/ObjectFiles/ObjectFileList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

function ObjectFileList() {
    const { user } = useContext(AuthContext);
    const [objectFiles, setObjectFiles] = useState([]);  // Initialize with an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch object files from the API
        axios
            .get('/ObjectFiles')
            .then((response) => {
                // Log the API response for debugging
                console.log('Fetched object files:', response.data);

                // Check if response.data is an array, otherwise log an error
                if (Array.isArray(response.data)) {
                    setObjectFiles(response.data);  // Set object files state
                } else {
                    console.error('Expected an array but got:', response.data);
                    setError(new Error('Unexpected response format'));
                }

                setLoading(false);  // Stop loading once data is fetched
            })
            .catch((error) => {
                console.error('Error fetching object files:', error);
                setError(error);  // Set the error state
                setLoading(false);  // Stop loading in case of error
            });
    }, []);

    // Handle loading state
    if (loading) {
        return <div>Loading object files...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Handle case where no object files are available or objectFiles is not an array
    if (!Array.isArray(objectFiles) || objectFiles.length === 0) {
        return <div>No object files available.</div>;
    }

    // Render the list of object files
    return (
        <div>
            <h2>Shared JSON Configurations</h2>
            {user && <Link to="/upload"><button>Upload New Object File</button></Link>}
            <ul>
                {objectFiles.map((file) => (
                    <li key={file.ObjectID}>
                        <h3><Link to={`/themes/${file.ThemeID}/objectfile/${file.ObjectID}`}>{file.Title}</Link></h3>
                        <p>{file.Description}</p>
                        <p>Popularity Votes: {file.PopularityScore}</p>
                        {user && <Link to={`/objectfiles/${file.ObjectID}/edit`}>Edit</Link>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ObjectFileList;
