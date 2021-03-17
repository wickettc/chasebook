import React, { useEffect, useState } from 'react';

const Profile = ({ match, token }) => {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [curProfile, setCurProfile] = useState({});

    useEffect(() => {
        if (match.params.id === token.user._id) {
            setIsMyProfile(true);
        }
    }, [match, token]);

    useEffect(() => {
        if (isMyProfile) {
            setCurProfile(token.user);
        } else {
            // fetch user profile if not mine
        }
    }, [isMyProfile, token]);

    return <div></div>;
};

export default Profile;
