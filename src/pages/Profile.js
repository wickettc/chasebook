import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/apiCalls';
import _ from 'lodash';
import './Profile.css';

const Profile = ({ match, token }) => {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [curProfile, setCurProfile] = useState({});
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        if (match.params.id === token.user._id) {
            setIsMyProfile(true);
        }
    }, [match, token]);

    useEffect(() => {
        async function fetchUser(id, token) {
            const res = await getUserProfile(id, token);
            setCurProfile(res.data);
        }
        fetchUser(match.params.id, token.token);
    }, [match, token]);

    return (
        <div>
            {_.isEmpty(curProfile) ? (
                <div className="loading"></div>
            ) : (
                <div>
                    <h1>
                        {curProfile.firstname} {curProfile.lastname}
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Profile;
