// src/components/ObjectFiles/ObjectFileDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

function ObjectFileDetails() {
    const { themeId, objectId } = useParams();
    const { user } = useContext(AuthContext);
    const [objectFile, setObjectFile] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get(`/themes/${themeId}/object/${objectId}`)
            .then((response) => {
                setObjectFile(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching object file details:', error);
                setLoading(false);
            });

        api
            .get(`/themes/${themeId}/object/${objectId}/comments`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }, [themeId, objectId]);

    const handleVote = () => {
        api
            .post('/PopularityVotes', {
                objectID: parseInt(objectId),
                userID: user.userId,
                voteType: 'upvote', // Adjust as per your API
            })
            .then((response) => {
                setObjectFile((prevState) => ({
                    ...prevState,
                    popularityScore: prevState.popularityScore + 1,
                }));
            })
            .catch((error) => {
                console.error('Error voting on the object file', error);
            });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        api
            .post('/Comments', {
                objectID: parseInt(objectId),
                content: newComment,
                userID: user.userId,
            })
            .then((response) => {
                setComments([...comments, response.data]);
                setNewComment('');
            })
            .catch((error) => {
                console.error('There was an error posting the comment!', error);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (!objectFile) return <div>Object file not found.</div>;

    return (
        <div>
            <h2>{objectFile.title}</h2>
            <p>{objectFile.description}</p>
            <div>
                <h3>Content</h3>
                <pre>{objectFile.fileContent}</pre>
            </div>
            <div>
                <h3>Popularity Votes: {objectFile.popularityScore}</h3>
                {user && <button onClick={handleVote}>Upvote</button>}
            </div>
            <div>
                <h3>Comments</h3>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.commentID}>
                            <p>{comment.content}</p>
                            <small>
                                By User ID {comment.userID} on {new Date(comment.dateCommented).toLocaleString()}
                            </small>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
                {user ? (
                    <form onSubmit={handleCommentSubmit}>
                        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
                        <button type="submit">Add Comment</button>
                    </form>
                ) : (
                    <p>You must be logged in to comment.</p>
                )}
            </div>
        </div>
    );
}

export default ObjectFileDetails;
