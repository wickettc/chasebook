import React, { useState } from "react";
import CreatePost from "../components/CreatePost";
import PostFeed from "../components/PostFeed";
import { Redirect } from "react-router-dom";

const Home = ({ token, isLoggedIn }) => {
    // pass to create post / post feed to rerender
    const [updateFeed, setUpdateFeed] = useState(false);
    const [feedType, setFeedType] = useState({ type: "main" });

    return (
        <div>
            {!isLoggedIn ? (
                <Redirect to="/login" />
            ) : (
                <div>
                    <div>
                        <button onClick={() => setFeedType({ type: "main" })}>
                            World Feed
                        </button>
                        <button
                            onClick={() => setFeedType({ type: "friends" })}
                        >
                            Friends Feed
                        </button>
                    </div>
                    <CreatePost token={token} setUpdateFeed={setUpdateFeed} />
                    <PostFeed
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
