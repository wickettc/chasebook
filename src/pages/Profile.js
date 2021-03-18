import React, { useEffect, useState } from 'react';
import { getUserProfile, sendFriendRequest } from '../api/apiCalls';
import _ from 'lodash';
import './Profile.css';

const Profile = ({ match, token }) => {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [curProfile, setCurProfile] = useState({});
    const [isFriend, setIsFriend] = useState(false);
    const [isFriendPending, setIsFriendPending] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (match.params.id === token.user._id) {
            setIsMyProfile(true);
        }
    }, [match, token]);

    useEffect(() => {
        async function fetchUser(id, token) {
            const res = await getUserProfile(id, token);
            console.log(res.data);
            setCurProfile(res.data);
            if (res.data.friends.length > 0) {
                setFriends(...res.data.friends);
            }
            setFriendRequests(...res.data.friendrequests);
        }
        console.log(match);
        fetchUser(match.params.id, token.token);
    }, [match, token]);

    useEffect(() => {
        if (token.user.friends.includes(curProfile._id)) {
            setIsFriend(true);
        }
        if (
            curProfile.friendrequests
            // curProfile.friendrequests.includes(token.user._id)
        ) {
            curProfile.friendrequests.filter((req) => {
                if (req._id === token.user._id) {
                    setIsFriendPending(true);
                }
            });
        }
    }, [curProfile, token]);

    const handleFriendRequest = async () => {
        await sendFriendRequest(token.user._id, curProfile._id, token.token);
    };

    return (
        <div>
            {/* {console.log(curProfile)} */}
            {/* {console.log(isFriend)} */}
            {console.log('friends,', friends)}
            {console.log('friend requests,', friendRequests)}
            {_.isEmpty(curProfile) ? (
                <div className="loading"></div>
            ) : (
                <div>
                    <h1>
                        {curProfile.firstname} {curProfile.lastname}
                    </h1>
                    {/* ADD FRIEND */}
                    {isMyProfile ? null : isFriend ? (
                        <h3>You are friends!</h3>
                    ) : isFriendPending ? (
                        <h3>Friend Request Sent!</h3>
                    ) : (
                        <button onClick={handleFriendRequest}>
                            Add Friend
                        </button>
                    )}
                    {/* ADD FRIEND */}
                    {/* FRIEND REQUESTS */}
                    {isMyProfile ? (
                        <h3>Friend Requests</h3>
                    ) : isMyProfile && _.isEmpty(friendRequests) ? (
                        <h5>No requests currently</h5>
                    ) : isMyProfile && !_.isEmpty(friendRequests) ? (
                        // friendRequests.map((req) => {
                        //     return <div>{req}</div>;
                        // })
                        <div>to do, show request here</div>
                    ) : null}
                    {/* FRIEND REQUESTS */}
                </div>
            )}
        </div>
    );
};

export default Profile;
