import React from 'react';
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
                              <div>
                                  Created:{' '}
                                  {new Date(comment.date).toLocaleTimeString(
                                      'en-US',
                                      {
                                          day: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric',
                                          month: 'short',
                                          year: 'numeric',
                                      }
                                  )}
                              </div>
                          </div>
                      );
                  })
                : 'No comments yet...'}
        </div>
    );
};

export default DisplayComment;
