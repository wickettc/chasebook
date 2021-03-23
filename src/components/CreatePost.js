import React, { useState } from 'react';
import { createPost } from '../api/apiCalls';
import './CreatePost.css';

const CreatePost = ({ token, setUpdateFeed, curUser }) => {
    const [body, setBody] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setBody(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createPost(body, e.target.author.value, token);
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
                <input type="hidden" value={curUser._id} name="author" />
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
