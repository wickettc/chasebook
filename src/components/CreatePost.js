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
        if (res.status === 201) {
            setBody('');
            setUpdateFeed(true);
        } else {
            // error popup
        }
    };

    return (
        <div>
            <form className="create-post" onSubmit={handleSubmit}>
                <input type="hidden" value={token.user._id} name="author" />
                <textarea
                    rows="4"
                    name="body"
                    value={body}
                    placeholder="Enter your post here..."
                    onChange={handleChange}
                    required
                />
                <button>Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
