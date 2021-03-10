import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
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
                />
                <div className="app-container">
                    <Switch>
                        <Route exact path="/">
                            <Home isLoggedIn={isLoggedIn} token={token} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/login">
                            <Landing
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                                setToken={setToken}
                            />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
