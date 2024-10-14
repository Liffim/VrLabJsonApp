// src/Home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to the JSON Sharing Platform</h1>
            <p>This platform allows you to upload, explore, and share JSON files for VR Lab projects.</p>
            <p>
                <Link to="/objectfiles">View Object Files</Link>
                {' | '}
                <Link to="/upload">Upload a File</Link>
            </p>
        </div>
    );
}

export default Home;
