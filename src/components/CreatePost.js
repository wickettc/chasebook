import React, { useState } from 'react';
import { createPost } from '../api/apiCalls';
import './CreatePost.css';

const CreatePost = ({ token, setUpdateFeed }) => {
    const [body, setBody] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setBody(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createPost(body, e.target.author.value, token.token);
        // need to setup error handling
        console.log(res);
        setBody('');
        setUpdateFeed(true);
    };

    return (
        <div>
            <form className="create-post" onSubmit={handleSubmit}>
                <input type="hidden" value={token.user._id} name="author" />
                <textarea
                    name="body"
                    value={body}
                    placeholder="Enter your post here..."
                    onChange={handleChange}
                />
                <button>Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
