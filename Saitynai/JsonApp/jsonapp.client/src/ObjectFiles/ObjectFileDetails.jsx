// src/components/ObjectFiles/ObjectFileDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

function ObjectFileDetails() {
    const { objectId } = useParams();
    const { user } = useContext(AuthContext);
    const [objectFile, setObjectFile] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/ObjectFiles/${objectId}/comments`)
            .then(response => {
                setObjectFile(response.data);
                setComments(response.data.comments);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [objectId]);

    const handleVote = () => {
        axios.post('/PopularityVotes', {
            objectID: parseInt(objectId),
        })
            .then(response => {
                setObjectFile(prevState => ({
                    ...prevState,
                    popularityScore: prevState.popularityScore + 1
                }));
            })
            .catch(error => {
                console.error("Error voting on the object file", error);
            });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        axios.post('/Comments', {
            objectID: parseInt(objectId),
            content: newComment,
        })
            .then(response => {
                setComments([...comments, response.data]);
                setNewComment('');
            })
            .catch(error => {
                console.error("There was an error posting the comment!", error);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) {
        return (
            <div>
                <h3>Error loading object file details:</h3>
                <p>{error.response?.data?.message || error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>{objectFile.Title}</h2>
            <p>{objectFile.Description}</p>
            <div>
                <h3>Content</h3>
                <p>{objectFile.FileContent}</p>
            </div>
            <div>
                <h3>Popularity Votes: {objectFile.PopularityScore}</h3>
                {user && <button onClick={handleVote}>Upvote</button>}
            </div>
            <div>
                <h3>Comments</h3>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.CommentID}>
                            <p>{comment.Content}</p>
                            <small>By {comment.Username} on {new Date(comment.DateCommented).toLocaleString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
                {user ? (
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                        />
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
