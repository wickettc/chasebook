import React, { useState, useEffect } from 'react';
import DisplayComment from './DisplayComment';
import AddComment from './AddComment';

import { addLike, removeLike } from '../api/apiCalls';
import { Link } from 'react-router-dom';

const DisplayPost = ({
    body,
    author,
    comments,
    likes,
    date,
    token,
    id,
    setUpdateFeed,
}) => {
    const [alreadyLiked, setAlreadyLiked] = useState(null);
    const [alreadyLikedID, setAlreadyLikedID] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);

    useEffect(() => {
        likes.forEach((like) => {
            if (like.author === token.user._id) {
                setAlreadyLiked(true);
                setAlreadyLikedID(like._id);
            }
        });
    }, [likes, token]);

    const handleLike = async () => {
        const res = await addLike(id, token.user._id, token.token);
        if (res.status === 200) {
            setAlreadyLiked(true);
            setUpdateFeed(true);
        } else {
            // error popup
        }
    };

    const handleRemoveLike = async () => {
        const res = await removeLike(alreadyLikedID, token.token);
        if (res.status === 204) {
            setAlreadyLiked(false);
            setAlreadyLikedID(null);
            setUpdateFeed(true);
        } else {
            // error popup
        }
    };

    return (
        <div className="post-container">
            <div className="post-container-body">{body}</div>
            <hr />
            <div className="post-container-rest">
                <div className="post-container-meta">
                    <div>
                        <span
                            onClick={async () => {
                                if (alreadyLiked) {
                                    await handleRemoveLike();
                                } else {
                                    await handleLike();
                                }
                            }}
                        >
                            {alreadyLiked ? (
                                <span className="post-container-clickable">
                                    Unlike:
                                </span>
                            ) : (
                                <span className="post-container-clickable">
                                    Like:
                                </span>
                            )}
                        </span>{' '}
                        {likes.length}
                    </div>
                    <div>
                        <span
                            onClick={() => setShowComment(!showComment)}
                            className="post-container-clickable"
                        >
                            Comments:
                        </span>{' '}
                        {comments.length}
                    </div>
                </div>
                <div>
                    <Link to={`/profile/${author._id}`}>
                        {author.firstname} {author.lastname}
                    </Link>
                </div>
                <div>
                    Created:{' '}
                    {new Date(date).toLocaleTimeString('en-US', {
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                </div>
            </div>
            <hr />
            {showComment ? (
                <DisplayComment
                    setShowAddComment={setShowAddComment}
                    showAddComment={showAddComment}
                    comments={comments}
                />
            ) : null}
            {showAddComment ? (
                <div>
                    <AddComment
                        setUpdateFeed={setUpdateFeed}
                        id={id}
                        token={token}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default DisplayPost;
