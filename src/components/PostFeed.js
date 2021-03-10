import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../api/apiCalls';
import './PostFeed.css';

const DisplayPost = ({ body, author, meta, date }) => {
    return (
        <div className="post-container">
            <div className="post-container-body">{body}</div>
            <hr />
            <div className="post-container-rest">
                <div className="post-container-meta">
                    <div>Likes: {meta.likes}</div>
                    <div>Comments: {meta.comments}</div>
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
                    const { body, author, meta, _id, date } = post;
                    return (
                        <DisplayPost
                            key={_id}
                            body={body}
                            author={author}
                            meta={meta}
                            date={date}
                        />
                    );
                })
            )}
        </div>
    );
};

export default PostFeed;
