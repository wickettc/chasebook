import React, { useState, useEffect } from 'react';
import DisplayPost from './DisplayPost';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import {
    getAllPosts,
    getPostsByUser,
    getPostsFromFriends,
} from '../api/apiCalls';
import './PostFeed.css';

const PostFeed = ({
    token,
    updateFeed,
    setUpdateFeed,
    feedInfo,
    curUser,
    setIsLoggedIn,
    setToken,
    setIsToken,
}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    useEffect(() => {
        async function fetchPosts(token) {
            const res = await getAllPosts(token);
            if (res) {
                if (res.status === 200) {
                    //reverse array to show newest first
                    let posts = res.data;
                    posts = posts.reverse();
                    setPosts(posts);
                    setLoading(false);
                    setUpdateFeed(false);
                } else if (res.err.response.status === 401) {
                    setIsLoggedIn(false);
                    setToken(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('curUser');
                    history.push('/login');
                }
            }
        }
        async function fetchUsersPosts(userID, token) {
            const res = await getPostsByUser(userID, token);
            if (res) {
                if (res.status === 200) {
                    let posts = res.data;
                    posts = posts.reverse();
                    setPosts(posts);
                    setLoading(false);
                    setUpdateFeed(false);
                } else if (res.err.response.status === 401) {
                    setIsLoggedIn(false);
                    setToken(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('curUser');
                    history.push('/login');
                }
            }
        }

        async function fetchFriendsPosts(friendsArr, token) {
            const res = await getPostsFromFriends(friendsArr, token);
            if (res) {
                if (res.status === 200) {
                    let posts = res.data;
                    posts = posts.reverse();
                    setPosts(posts);
                    setLoading(false);
                    setUpdateFeed(false);
                } else if (res.err.response.status === 401) {
                    setIsLoggedIn(false);
                    setToken(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('curUser');
                    history.push('/login');
                }
            }
        }
        if (feedInfo.type === 'main') {
            fetchPosts(token);
        } else if (feedInfo.type === 'users') {
            fetchUsersPosts(feedInfo.userID, token);
        } else if (feedInfo.type === 'friends') {
            fetchFriendsPosts(curUser.friends, token);
        }
    }, [
        token,
        setToken,
        curUser,
        updateFeed,
        setUpdateFeed,
        feedInfo,
        setIsLoggedIn,
        history,
    ]);

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
                            curUser={curUser}
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
