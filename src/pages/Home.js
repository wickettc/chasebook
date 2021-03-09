import React from 'react';
import CreatePost from '../components/CreatePost';
import PostFeed from '../components/PostFeed';

const Home = ({ token }) => {
    return (
        <div>
            <CreatePost token={token} />
            <PostFeed token={token} />
        </div>
    );
};

export default Home;
