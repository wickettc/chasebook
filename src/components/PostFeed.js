import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, addLike, removeLike } from '../api/apiCalls';
import './PostFeed.css';

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
                    <div>Comments: {comments.length}</div>
                </div>
                <div>
                    <Link to={`/profile/${author._id}`}>
                        {author.firstname} {author.lastname}
                    </Link>
                </div>
                <div>Created at: {new Date(date).toLocaleTimeString()}</div>
            </div>
        </div>
    );
};

const PostFeed = ({ token, updateFeed, setUpdateFeed }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts(token) {
            const res = await getAllPosts(token);
            console.log('all posts', res.data);
            if (res) {
                //reverse array to show newest first
                let posts = res.data;
                posts = posts.reverse();
                setPosts(posts);
                setLoading(false);
                setUpdateFeed(false);
            } else {
                // error popup
            }
        }
        fetchPosts(token.token);
    }, [token, updateFeed, setUpdateFeed]);

    return (
        <div>
            {loading ? (
                <div className="loader"></div>
            ) : (
                posts.map((post) => {
                    const { body, author, comments, likes, _id, date } = post;
                    return (
                        <DisplayPost
                            key={_id}
                            id={_id}
                            token={token}
                            body={body}
                            author={author}
                            comments={comments}
                            likes={likes}
                            date={date}
                            setUpdateFeed={setUpdateFeed}
                        />
                    );
                })
            )}
        </div>
    );
};

export default PostFeed;
