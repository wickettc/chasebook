import React, { useState } from 'react';
import { createComment } from '../api/apiCalls';
import './AddComment.css';

const AddComment = ({ id, token, setUpdateFeed }) => {
    const [body, setBody] = useState('');

    const handleChange = (e) => {
        setBody(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //add comment function
        // pass in ID prop as forPostID
        const res = await createComment(id, body, token.user._id, token.token);
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
                />
                <button>Add Comment</button>
            </form>
        </div>
    );
};

export default AddComment;
