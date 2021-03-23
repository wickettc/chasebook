import React, { useState, useEffect } from 'react';
import DisplayComment from './DisplayComment';
import { addLike, removeLike } from '../api/apiCalls';
import calcTimeSince from '../utils/calcTimeSince';
import { Link } from 'react-router-dom';
import './DisplayPost.css';

const DisplayPost = ({
    body,
    curUser,
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

    useEffect(() => {
        likes.forEach((like) => {
            if (like.author === curUser._id) {
                setAlreadyLiked(true);
                setAlreadyLikedID(like._id);
            }
        });
    }, [likes, token, curUser]);

    const handleLike = async () => {
        const res = await addLike(id, curUser._id, token);
        if (res.status === 200) {
            setAlreadyLiked(true);
            setUpdateFeed(true);
        } else {
            // error popup
        }
    };

    const handleRemoveLike = async () => {
        const res = await removeLike(alreadyLikedID, token);
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
            <div className="post-container-rest">
                <div className="post-container-like">
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="red"
                                >
                                    <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                                </svg>
                            </span>
                        ) : (
                            <span className="post-container-clickable">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="pink"
                                >
                                    <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                                </svg>
                            </span>
                        )}
                    </span>
                    <span className="post-like-count">{likes.length}</span>
                </div>
                <div className="post-container-comment">
                    <span
                        onClick={() => setShowComment(!showComment)}
                        className="post-container-clickable display-post-comment"
                    >
                        Comments:
                    </span>
                    {comments.length}
                </div>

                <div className="post-container-author">
                    <Link to={`/profile/${author._id}`}>
                        {author.firstname}
                    </Link>
                </div>
                <div className="post-container-date date">
                    {calcTimeSince(date)}
                </div>
            </div>
            {showComment ? (
                <DisplayComment
                    curUser={curUser}
                    setUpdateFeed={setUpdateFeed}
                    id={id}
                    token={token}
                    comments={comments}
                />
            ) : null}
        </div>
    );
};

export default DisplayPost;
