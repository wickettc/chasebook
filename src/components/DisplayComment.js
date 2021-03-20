import React from 'react';
import calcTimeSince from '../utils/calcTimeSince';
import './DisplayComment.css';

const DisplayComment = ({ comments, setShowAddComment, showAddComment }) => {
    return (
        <div>
            <div className="comment-header">
                <h4>Comments</h4>
                <button onClick={() => setShowAddComment(!showAddComment)}>
                    Add Comment
                </button>
            </div>
            {comments.length > 0
                ? comments.map((comment) => {
                      return (
                          <div key={comment._id}>
                              <hr />
                              <div>{comment.body}</div>
                              <div>
                                  {comment.author.firstname}{' '}
                                  {comment.author.lastname}
                              </div>
                              <div className="date">
                                  {calcTimeSince(comment.date)}
                              </div>
                          </div>
                      );
                  })
                : 'No comments yet...'}
        </div>
    );
};

export default DisplayComment;
