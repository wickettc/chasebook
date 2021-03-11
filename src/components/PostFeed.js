import React, { useState, useEffect } from 'react';
import { getAllPosts, addLike } from '../api/apiCalls';
import './PostFeed.css';

const DisplayPost = ({ body, author, comments, likes, date, token, id }) => {
    const [alreadyLiked, setAlreadyLiked] = useState(null);

    useEffect(() => {
        console.log(likes);
        likes.forEach((like) => {
            if (like.author === token.user._id) {
                setAlreadyLiked(true);
            }
        });
    }, []);

    const handleLike = async () => {
        const res = await addLike(id, token.user._id, token.token);
        console.log(res);
        if (res.status === 200) {
            setAlreadyLiked(true);
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
                                    console.log('alreadyliked');
                                } else {
                                    await handleLike();
                                }
                            }}
                        >
                            Like:
                        </span>{' '}
                        {likes.length}
                    </div>
                    <div>Comments: {comments.length}</div>
                </div>
                <div>
                    {author.firstname} {author.lastname}
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
            console.log(res);
            /////// need error handling here
            setPosts(res.data);
            setLoading(false);
            setUpdateFeed(false);
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
                        />
                    );
                })
            )}
        </div>
    );
};

export default PostFeed;
