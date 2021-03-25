import React, { useEffect, useState } from 'react';
import PostFeed from '../components/PostFeed';
import CreatePost from '../components/CreatePost';
import {
    getUserProfile,
    sendFriendRequest,
    acceptFriendRequest,
    denyFriendRequest,
    removeFriend,
} from '../api/apiCalls';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import './Profile.css';
import { Redirect } from 'react-router-dom';

const Profile = ({
    match,
    token,
    isLoggedIn,
    setIsLoggedIn,
    setToken,
    setUpdateFeed,
    curUser,
    setCurUser,
}) => {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [curProfile, setCurProfile] = useState({});
    const [isFriend, setIsFriend] = useState(false);
    const [isFriendPending, setIsFriendPending] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    let location = useLocation();

    ///////////// PAGE LOAD /////////////

    useEffect(() => {
        if (!token) {
            setToken(localStorage.getItem('token'));
            let curUserObj = JSON.parse(localStorage.getItem('curUser'));
            setCurUser(curUserObj);
            setIsLoggedIn(true);
        }
    }, [token, setToken, setCurUser, setIsLoggedIn]);

    useEffect(() => {
        const curUserId = location.pathname.split('/')[2];
        if (curUserId === curUser._id) {
            setIsMyProfile(true);
        } else {
            setIsMyProfile(false);
        }
    }, [curUser, location]);

    useEffect(() => {
        let mounted = true;
        async function fetchUser(id, token) {
            const res = await getUserProfile(id, token);
            if (mounted) {
                setCurProfile(res.data);
                setFriends(res.data.friends);
                setFriendRequests(res.data.friendrequests);
            }
        }

        if (!token) {
            // let curUserObj = JSON.parse(localStorage.getItem('curUser'));
            fetchUser(match.params.id, localStorage.getItem('token'));
            setIsLoggedIn(true);
        } else {
            fetchUser(match.params.id, token);
        }
        return () => (mounted = false);
    }, [match, token, location, setIsLoggedIn]);

    useEffect(() => {
        if (!_.isEmpty(curProfile)) {
            if (curUser.friends.includes(curProfile._id)) {
                setIsFriend(true);
            }
        }
        if (curProfile.friendrequests) {
            curProfile.friendrequests.filter((req) => {
                return req._id === curUser._id
                    ? setIsFriendPending(true)
                    : null;
            });
        }
        // prevents user from sending request to someone who already requested them
        if (curUser.friendrequests && !_.isEmpty(curProfile)) {
            curUser.friendrequests.filter((req) => {
                return req === curProfile._id ? setIsFriendPending(true) : null;
            });
        }
    }, [curProfile, curUser]);
    ///////////// PAGE LOAD /////////////

    ///////////// FRIEND REQUESTS /////////////
    const handleSendFriendRequest = async () => {
        await sendFriendRequest(curUser._id, curProfile._id, token);
        setIsFriendPending(true);
    };

    const handleAcceptFriendRequest = async (
        curUserID,
        reqUserID,
        token,
        index
    ) => {
        const res = await acceptFriendRequest(curUserID, reqUserID, token);
        setCurUser(res.data.addFriend1);
        const newFriend = friendRequests[index];
        setFriends([...friends, newFriend]);
        setFriendRequests([
            ...friendRequests.slice(0, index),
            ...friendRequests.slice(index + 1),
        ]);
    };

    const handleDenyFriendRequest = async (
        curUserID,
        reqUserID,
        token,
        index
    ) => {
        const res = await denyFriendRequest(curUserID, reqUserID, token);
        setCurUser(res.data);
    };

    const handleRemoveFriend = async (curUserID, reqUserID, token) => {
        const res = await removeFriend(curUserID, reqUserID, token);
        setCurUser(res.data.firstRemoval);
        setIsFriend(false);
    };
    ///////////// FRIEND REQUESTS /////////////

    return (
        <div>
            {!isLoggedIn ? <Redirect to="/login" /> : null}
            {_.isEmpty(curProfile) ? (
                <div className="loading"></div>
            ) : (
                <div>
                    <div className="profile-header">
                        <div>
                            <h1>
                                {isMyProfile ? 'YOUR PROFILE' : null}
                                <br />
                                {curProfile.firstname} {curProfile.lastname}
                            </h1>

                            {/* ADD FRIEND */}
                            {isMyProfile ? null : isFriend ? (
                                <h3>You are friends!</h3>
                            ) : isFriendPending ? (
                                <h3>Friend Request Pending!</h3>
                            ) : (
                                <button onClick={handleSendFriendRequest}>
                                    Add Friend
                                </button>
                            )}
                            {/* ADD FRIEND */}

                            {/* REMOVE FRIEND */}
                            {!isMyProfile && isFriend ? (
                                <button
                                    onClick={() =>
                                        handleRemoveFriend(
                                            curUser._id,
                                            curProfile._id,
                                            token
                                        )
                                    }
                                >
                                    Remove Friend
                                </button>
                            ) : null}
                            {/* REMOVE FRIEND */}
                        </div>
                        {/* FRIEND REQUESTS */}
                        <div className="profile-header-container">
                            {isMyProfile ? <h3>Friend Requests</h3> : null}
                            {isMyProfile && _.isEmpty(friendRequests) ? (
                                <h5>No requests currently</h5>
                            ) : isMyProfile && !_.isEmpty(friendRequests) ? (
                                <div className="profile-header-scrollable">
                                    {friendRequests.map(
                                        (eachRequest, index) => {
                                            return (
                                                <div
                                                    className="friend-request"
                                                    key={eachRequest._id}
                                                >
                                                    <span className="friend-link">
                                                        <Link
                                                            to={`/profile/${eachRequest._id}`}
                                                        >
                                                            {
                                                                eachRequest.firstname
                                                            }
                                                        </Link>{' '}
                                                        wants to be friends!
                                                    </span>
                                                    <div className="friendrequest-btns">
                                                        <button
                                                            onClick={() =>
                                                                handleAcceptFriendRequest(
                                                                    curUser._id,
                                                                    eachRequest._id,
                                                                    token,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDenyFriendRequest(
                                                                    curUser._id,
                                                                    eachRequest._id,
                                                                    token,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Decline
                                                        </button>
                                                    </div>
                                                    {/* disables the <hr /> tag for the last request */}
                                                    {friendRequests.length -
                                                        1 >=
                                                    index + 1 ? (
                                                        <hr />
                                                    ) : null}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            ) : null}
                        </div>
                        {/* FRIEND REQUESTS */}

                        {/* SHOW FRIENDS */}
                        <div className="profile-header-container">
                            <h3>Friends</h3>
                            {_.isEmpty(friends) ? (
                                <div>{curProfile.firstname} has no friends</div>
                            ) : (
                                <div className="profile-header-scrollable">
                                    {friends.map((friend) => {
                                        return (
                                            <div
                                                className="friend-link"
                                                key={friend._id}
                                            >
                                                <Link
                                                    to={`/profile/${friend._id}`}
                                                >
                                                    {friend.firstname}{' '}
                                                    {friend.lastname}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        {/* SHOW FRIENDS */}
                    </div>

                    {/* CREATE POST ON YOUR PROFILE */}
                    {isMyProfile ? (
                        <CreatePost
                            token={token}
                            curUser={curUser}
                            setUpdateFeed={setUpdateFeed}
                        />
                    ) : null}
                    {/* CREATE POST */}
                    {/* POST FEED */}
                    <PostFeed
                        curUser={curUser}
                        setUpdateFeed={setUpdateFeed}
                        token={token}
                        feedInfo={{
                            type: 'users',
                            userID: `${curProfile._id}`,
                        }}
                    />
                    {/* POST FEED */}
                </div>
            )}
        </div>
    );
};

export default Profile;
