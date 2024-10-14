// components/ObjectFiles/ObjectFileForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ObjectFileForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [themeID, setThemeID] = useState('');
    const [themes, setThemes] = useState([]);
    const [message, setMessage] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get('/Themes').then((response) => {
            setThemes(response.data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/ObjectFiles', {
                title,
                description,
                fileContent,
                themeID: parseInt(themeID),
                uploadedByUserID: user ? user.userID : null,
            });

            setMessage('Object file uploaded successfully!');
        } catch (error) {
            console.log('Failed to upload object file.', error);
            setMessage('Failed to upload object file.');
        }
    };

    return (
        <div>
            <h2>Upload Object File</h2>
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
                />

                <label>File Content:</label>
                <textarea
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    required
                    rows="10"
                />

                <label>Theme:</label>
                <select value={themeID} onChange={(e) => setThemeID(e.target.value)} required>
                    <option value="">Select a theme</option>
                    {themes.map((theme) => (
                        <option key={theme.themeID} value={theme.themeID}>
                            {theme.title}
                        </option>
                    ))}
                </select>

                <button type="submit">Upload</button>
                <p>{message}</p>
            </form>
        </div>
    );
}

export default ObjectFileForm;
