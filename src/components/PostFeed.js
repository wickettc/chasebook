import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../api/apiCalls';

const DisplayPost = ({ id, body, author, meta }) => {
    return (
        <div key={id}>
            <div>{body}</div>
            <div>
                <div>Likes: {meta.likes}</div>
                <div>Comments: {meta.comments}</div>
            </div>
            <div>
                {author.firstname} {author.lastname}
            </div>
        </div>
    );
};

const PostFeed = ({ token }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts(token) {
            const res = await getAllPosts(token);
            console.log(res);
            setPosts(res.data);
            setLoading(false);
        }
        fetchPosts(token.token);
    }, [token.token]);

    return (
        <div>
            {loading ? (
                <div className="loader"></div>
            ) : (
                posts.map((post) => {
                    const { body, author, meta, id } = post;
                    return (
                        <DisplayPost
                            id={id}
                            body={body}
                            author={author}
                            meta={meta}
                        />
                    );
                })
            )}
        </div>
    );
};

export default PostFeed;
