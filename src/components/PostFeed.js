import React, { useState, useEffect } from 'react';
import DisplayPost from './DisplayPost';
import _ from 'lodash';
import {
    getAllPosts,
    getPostsByUser,
    getPostsFromFriends,
} from '../api/apiCalls';
import './PostFeed.css';

const PostFeed = ({ token, updateFeed, setUpdateFeed, feedInfo, curUser }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts(token) {
            const res = await getAllPosts(token);
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
            if (res) {
                let posts = res.data;
                posts = posts.reverse();
                setPosts(posts);
                setLoading(false);
                setUpdateFeed(false);
            }
        }

        async function fetchFriendsPosts(friendsArr, token) {
            const res = await getPostsFromFriends(friendsArr, token);
            if (res) {
                let posts = res.data;
                posts = posts.reverse();
                setPosts(posts);
                setLoading(false);
                setUpdateFeed(false);
            }
        }
        let mounted = true;
        if (mounted) {
            if (feedInfo.type === 'main') {
                fetchPosts(token);
            } else if (feedInfo.type === 'users') {
                fetchUsersPosts(feedInfo.userID, token);
            } else if (feedInfo.type === 'friends') {
                fetchFriendsPosts(curUser.friends, token);
            }
        }
        return () => (mounted = false);
    }, [token, curUser, updateFeed, setUpdateFeed, feedInfo]);

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
