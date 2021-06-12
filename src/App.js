import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatContainer from './components/ChatContainer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [curUser, setCurUser] = useState({});
    const [updateFeed, setUpdateFeed] = useState(false);

    console.log('apprun');

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            if (localStorage.getItem('token') !== null) {
                setToken(localStorage.getItem('token'));
                let curUserObj = JSON.parse(localStorage.getItem('curUser'));
                setCurUser(curUserObj);
                setIsLoggedIn(true);
            }
        }
    }, [token]);

    return (
        <div className="App">
            <Router>
                {!isLoggedIn ? <Redirect to="/login" /> : null}
                <Navbar
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    token={token}
                    setToken={setToken}
                    curUser={curUser}
                />
                <div className="app-container">
                    <Switch>
                        <Route exact path="/">
                            <Home
                                curUser={curUser}
                                setUpdateFeed={setUpdateFeed}
                                updateFeed={updateFeed}
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                                token={token}
                                setToken={setToken}
                            />
                        </Route>
                        <Route
                            exact
                            path={`/profile/:id`}
                            render={({ match }) => (
                                <Profile
                                    curUser={curUser}
                                    setCurUser={setCurUser}
                                    setUpdateFeed={setUpdateFeed}
                                    match={match}
                                    isLoggedIn={isLoggedIn}
                                    token={token}
                                    setIsLoggedIn={setIsLoggedIn}
                                    setToken={setToken}
                                />
                            )}
                        />
                        <Route exact path="/login">
                            <Landing
                                setCurUser={setCurUser}
                                isLoggedIn={isLoggedIn}
                                setToken={setToken}
                            />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
                <ChatContainer curUser={curUser} />
            </Router>
        </div>
    );
}

export default App;
