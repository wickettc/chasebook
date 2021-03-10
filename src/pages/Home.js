import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostFeed from '../components/PostFeed';
import { Redirect } from 'react-router-dom';

const Home = ({ token, isLoggedIn }) => {
    // pass to create post / post feed to rerender
    const [updateFeed, setUpdateFeed] = useState(false);

    return (
        <div>
            {!isLoggedIn ? (
                <Redirect to="/login" />
            ) : (
                <div>
                    <CreatePost token={token} setUpdateFeed={setUpdateFeed} />
                    <PostFeed
                        token={token}
                        updateFeed={updateFeed}
                        setUpdateFeed={setUpdateFeed}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
