import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostFeed from '../components/PostFeed';
import { Redirect } from 'react-router-dom';
import './Home.css';

const Home = ({ token, isLoggedIn, setUpdateFeed, updateFeed, curUser }) => {
    const [feedType, setFeedType] = useState({ type: 'main' });
    const [whichBtnActive, setWhichBtnActive] = useState(true);

    return (
        <div>
            {console.log('curUser,', curUser)}
            {!isLoggedIn ? (
                <Redirect to="/login" />
            ) : (
                <div>
                    <CreatePost token={token} setUpdateFeed={setUpdateFeed} />
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
                        curUser={curUser}
                        token={token}
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
