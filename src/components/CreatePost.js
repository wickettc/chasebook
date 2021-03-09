import React, { useState } from 'react';
import { createPost } from '../api/apiCalls';

const CreatePost = ({ token }) => {
    const [body, setBody] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setBody(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createPost(body, e.target.author.value, token.token);
        console.log(res);
        setBody('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
