import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostFeed from '../components/PostFeed';
import { Redirect } from 'react-router-dom';
import './Home.css';

const Home = ({
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    setUpdateFeed,
    updateFeed,
    curUser,
}) => {
    const [feedType, setFeedType] = useState({ type: 'main' });
    const [whichBtnActive, setWhichBtnActive] = useState(true);

    return (
        <div>
            {!isLoggedIn ? (
                <Redirect to="/login" />
            ) : (
                <div>
                    <CreatePost
                        token={token}
                        curUser={curUser}
                        setUpdateFeed={setUpdateFeed}
                    />
                    <div className="home-buttons-container">
                        <button
                            className={whichBtnActive ? 'home-btn-active' : ''}
                            onClick={() => {
                                setFeedType({ type: 'main' });
                                setWhichBtnActive(true);
                            }}
                        >
                            World Feed
                        </button>
                        <button
                            className={!whichBtnActive ? 'home-btn-active' : ''}
                            onClick={() => {
                                setFeedType({ type: 'friends' });
                                setWhichBtnActive(false);
                            }}
                        >
                            Friends Feed
                        </button>
                    </div>
                    <PostFeed
                        setIsLoggedIn={setIsLoggedIn}
                        curUser={curUser}
                        token={token}
                        setToken={setToken}
                        updateFeed={updateFeed}
                        setUpdateFeed={setUpdateFeed}
                        feedInfo={feedType}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
