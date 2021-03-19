import React, { useState, useEffect } from 'react';
import DisplayPost from './DisplayPost';
import _ from 'lodash';
import {
    getAllPosts,
    getPostsByUser,
    getPostsFromFriends,
} from '../api/apiCalls';
import './PostFeed.css';

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

        async function fetchFriendsPosts(friendsArr, token) {
            const res = await getPostsFromFriends(friendsArr, token);
            console.log('friendsPosts,', res.data);
            if (res) {
                let posts = res.data;
                // maybe reverse posts here
                setPosts(posts);
                setLoading(false);
                setUpdateFeed(false);
            }
        }

        if (feedInfo.type === 'main') {
            fetchPosts(token.token);
        } else if (feedInfo.type === 'users') {
            fetchUsersPosts(feedInfo.userID, token.token);
        } else if (feedInfo.type === 'friends') {
            fetchFriendsPosts(token.user.friends, token.token);
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
