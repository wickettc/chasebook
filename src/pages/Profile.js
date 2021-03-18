import React, { useEffect, useState } from 'react';
import PostFeed from '../components/PostFeed';
import {
    getUserProfile,
    sendFriendRequest,
    acceptFriendRequest,
    denyFriendRequest,
} from '../api/apiCalls';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import './Profile.css';

const Profile = ({ match, token }) => {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [curProfile, setCurProfile] = useState({});
    const [isFriend, setIsFriend] = useState(false);
    const [isFriendPending, setIsFriendPending] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const location = useLocation();

    ///////////// PAGE LOAD /////////////
    useEffect(() => {
        const curUserId = location.pathname.split('/')[2];
        if (curUserId === token.user._id) {
            setIsMyProfile(true);
        } else {
            setIsMyProfile(false);
        }
    }, [token, location]);

    useEffect(() => {
        async function fetchUser(id, token) {
            const res = await getUserProfile(id, token);
            setCurProfile(res.data);
            setFriends(res.data.friends);
            setFriendRequests(res.data.friendrequests);
        }
        fetchUser(match.params.id, token.token);
    }, [match, token, location]);

    useEffect(() => {
        if (token.user.friends.includes(curProfile._id)) {
            setIsFriend(true);
        }
        if (curProfile.friendrequests) {
            curProfile.friendrequests.filter((req) => {
                return req._id === token.user._id
                    ? setIsFriendPending(true)
                    : null;
            });
        }
        // prevents user from sending request to someone who already requested them
        if (token.user.friendrequests && !_.isEmpty(curProfile)) {
            token.user.friendrequests.filter((req) => {
                return req === curProfile._id ? setIsFriendPending(true) : null;
            });
        }
    }, [curProfile, token]);
    ///////////// PAGE LOAD /////////////

    ///////////// FRIEND REQUESTS /////////////
    const handleSendFriendRequest = async () => {
        await sendFriendRequest(token.user._id, curProfile._id, token.token);
        setIsFriendPending(true);
    };

    const handleAcceptFriendRequest = async (
        curUserID,
        reqUserID,
        token,
        index
    ) => {
        await acceptFriendRequest(curUserID, reqUserID, token);
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
        await denyFriendRequest(curUserID, reqUserID, token);
        setFriendRequests([
            ...friendRequests.slice(0, index),
            ...friendRequests.slice(index + 1),
        ]);
    };
    ///////////// FRIEND REQUESTS /////////////

    return (
        <div>
            {_.isEmpty(curProfile) ? (
                <div className="loading"></div>
            ) : (
                <div>
                    <h1>
                        {isMyProfile ? 'YOUR PROFILE' : null}
                        <br />
                        {curProfile.firstname} {curProfile.lastname}
                    </h1>

                    {/* POST FEED */}
                    <PostFeed
                        feedInfo={{
                            type: 'users',
                            userID: `${curProfile._id}`,
                        }}
                    />
                    {/* POST FEED */}

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

                    {/* FRIEND REQUESTS */}
                    {isMyProfile ? <h3>Friend Requests</h3> : null}
                    {isMyProfile && _.isEmpty(friendRequests) ? (
                        <h5>No requests currently</h5>
                    ) : isMyProfile && !_.isEmpty(friendRequests) ? (
                        friendRequests.map((eachRequest, index) => {
                            return (
                                <div key={eachRequest._id}>
                                    <span>
                                        {/* <Link
                                            to={`/profile/${eachRequest._id}`}
                                        >
                                            {eachRequest.firstname}
                                        </Link>{' '} */}
                                        {eachRequest.firstname} wants to be
                                        friends!
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleAcceptFriendRequest(
                                                token.user._id,
                                                eachRequest._id,
                                                token.token,
                                                index
                                            )
                                        }
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDenyFriendRequest(
                                                token.user._id,
                                                eachRequest._id,
                                                token.token,
                                                index
                                            )
                                        }
                                    >
                                        Decline
                                    </button>
                                </div>
                            );
                        })
                    ) : null}
                    {/* FRIEND REQUESTS */}

                    {/* SHOW FRIENDS */}
                    <h3>Friends</h3>
                    {_.isEmpty(friends) ? (
                        <div>{curProfile.firstname} has no friends</div>
                    ) : (
                        friends.map((friend) => {
                            return (
                                <div key={friend._id}>
                                    <Link to={`/profile/${friend._id}`}>
                                        {friend.firstname} {friend.lastname}
                                    </Link>
                                </div>
                            );
                        })
                    )}
                    {/* SHOW FRIENDS */}
                </div>
            )}
        </div>
    );
};

export default Profile;
