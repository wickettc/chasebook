import React, { useState } from 'react';
import { createComment } from '../api/apiCalls';
import './AddComment.css';

const AddComment = ({ id, token, setUpdateFeed, curUser }) => {
    const [body, setBody] = useState('');

    const handleChange = (e) => {
        setBody(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createComment(id, body, curUser._id, token.token);
        if (res.status === 201) {
            // success
            setBody('');
            setUpdateFeed(true);
        } else {
            // failed
        }
    };

    return (
        <div>
            <hr />
            <form className="add-comment" onSubmit={handleSubmit}>
                <textarea
                    onChange={handleChange}
                    name="body"
                    value={body}
                    placeholder="Enter your comment here..."
                    required
                />
                <button>Add Comment</button>
            </form>
        </div>
    );
};

export default AddComment;
