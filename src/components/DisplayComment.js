import React from 'react';
import calcTimeSince from '../utils/calcTimeSince';
import AddComment from './AddComment';
import { Link } from 'react-router-dom';
import './DisplayComment.css';

const DisplayComment = ({
    comments,
    setShowAddComment,
    showAddComment,
    curUser,
    setUpdateFeed,
    id,
    token,
}) => {
    return (
        <div className="all-comments-container">
            {comments.length > 0
                ? comments.map((comment) => {
                      return (
                          <div className="comment-container" key={comment._id}>
                              <div className="comment-body">{comment.body}</div>
                              <div className="comment-rest">
                                  <div className="comment-author">
                                      <Link
                                          to={`/profile/${comment.author._id}`}
                                      >
                                          {comment.author.firstname}
                                      </Link>
                                  </div>
                                  <div className="date">
                                      {calcTimeSince(comment.date)}
                                  </div>
                              </div>
                          </div>
                      );
                  })
                : 'No comments yet...'}
            <AddComment
                curUser={curUser}
                setUpdateFeed={setUpdateFeed}
                id={id}
                token={token}
            />
        </div>
    );
};

export default DisplayComment;
