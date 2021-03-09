import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';

const Landing = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div>
            {isLoggedIn ? <Redirect to="/" /> : null}
            {showSignup ? <Signup setToken={setToken} /> : null}
            {showLogin ? <Login setToken={setToken} /> : null}
            <div>
                <h1>Welcome to ChaseBook!</h1>
                <h3>the facebook clone</h3>
            </div>
            <div>
                <button onClick={() => setShowSignup(true)}>Sign Up</button>
                <button onClick={() => setShowLogin(true)}>Log In</button>
            </div>
        </div>
    );
};

export default Landing;
