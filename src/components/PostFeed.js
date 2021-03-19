import React, { useState, useEffect } from 'react';
import AddComment from './AddComment';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
    getAllPosts,
    getPostsByUser,
    addLike,
    removeLike,
} from '../api/apiCalls';
import './PostFeed.css';

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

const DisplayPost = ({
    body,
    author,
    comments,
    likes,
    date,
    token,
    id,
    setUpdateFeed,
}) => {
    const [alreadyLiked, setAlreadyLiked] = useState(null);
    const [alreadyLikedID, setAlreadyLikedID] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);

    useEffect(() => {
        likes.forEach((like) => {
            if (like.author === token.user._id) {
                setAlreadyLiked(true);
                setAlreadyLikedID(like._id);
            }
        });
    }, [likes, token]);

    const handleLike = async () => {
        const res = await addLike(id, token.user._id, token.token);
        if (res.status === 200) {
            setAlreadyLiked(true);
            setUpdateFeed(true);
        } else {
            // error popup
        }
    };

    const handleRemoveLike = async () => {
        const res = await removeLike(alreadyLikedID, token.token);
        if (res.status === 204) {
            setAlreadyLiked(false);
            setAlreadyLikedID(null);
            setUpdateFeed(true);
        } else {
            // error popup
        }
    };

    return (
        <div className="post-container">
            <div className="post-container-body">{body}</div>
            <hr />
            <div className="post-container-rest">
                <div className="post-container-meta">
                    <div>
                        <span
                            onClick={async () => {
                                if (alreadyLiked) {
                                    await handleRemoveLike();
                                } else {
                                    await handleLike();
                                }
                            }}
                        >
                            {alreadyLiked ? (
                                <span className="post-container-clickable">
                                    Unlike:
                                </span>
                            ) : (
                                <span className="post-container-clickable">
                                    Like:
                                </span>
                            )}
                        </span>{' '}
                        {likes.length}
                    </div>
                    <div>
                        <span
                            onClick={() => setShowComment(!showComment)}
                            className="post-container-clickable"
                        >
                            Comments:
                        </span>{' '}
                        {comments.length}
                    </div>
                </div>
                <div>
                    <Link to={`/profile/${author._id}`}>
                        {author.firstname} {author.lastname}
                    </Link>
                </div>
                <div>
                    Created:{' '}
                    {new Date(date).toLocaleTimeString('en-US', {
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                </div>
            </div>
            <hr />
            {showComment ? (
                <DisplayComment
                    setShowAddComment={setShowAddComment}
                    showAddComment={showAddComment}
                    comments={comments}
                />
            ) : null}
            {showAddComment ? (
                <div>
                    <AddComment
                        setUpdateFeed={setUpdateFeed}
                        id={id}
                        token={token}
                    />
                </div>
            ) : null}
        </div>
    );
};

const PostFeed = ({ token, updateFeed, setUpdateFeed, feedInfo }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts(token) {
            const res = await getAllPosts(token);
            console.log('all posts', res.data);
            if (res) {
                //reverse array to show newest first
                let posts = res.data;
                posts = posts.reverse();
                setPosts(posts);
                setLoading(false);
                setUpdateFeed(false);
            } else {
                // error popup
            }
        }
        async function fetchUsersPosts(userID, token) {
            const res = await getPostsByUser(userID, token);
            console.log('userPosts', res.data);
            if (res) {
                let posts = res.data;
                posts = posts.reverse();
                setPosts(posts);
                setLoading(false);
                setUpdateFeed(false);
            }
        }
        if (feedInfo.type === 'main') {
            fetchPosts(token.token);
        } else if (feedInfo.type === 'users') {
            fetchUsersPosts(feedInfo.userID, token.token);
        }
    }, [token, updateFeed, setUpdateFeed, feedInfo]);

    return (
        <div>
            {loading ? (
                <div className="loader"></div>
            ) : _.isEmpty(posts) ? (
                <div>No Posts to Display</div>
            ) : (
                posts.map((post) => {
                    const { body, author, comments, likes, _id, date } = post;
                    return (
                        <DisplayPost
                            key={_id}
                            id={_id}
                            token={token}
                            body={body}
                            author={author}
                            comments={comments}
                            likes={likes}
                            date={date}
                            setUpdateFeed={setUpdateFeed}
                        />
                    );
                })
            )}
        </div>
    );
};

export default PostFeed;
