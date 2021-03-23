import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';

const Landing = ({ isLoggedIn, setToken, setCurUser }) => {
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div>
            {isLoggedIn ? <Redirect to="/" /> : null}
            <div>
                <h1>Welcome to ChaseBook!</h1>
                <h3>the facebook clone</h3>
            </div>
            <div>
                <button
                    onClick={() => {
                        setShowLogin(false);
                        setShowSignup(true);
                    }}
                >
                    Sign Up
                </button>
                <button
                    onClick={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                    }}
                >
                    Log In
                </button>
                {showSignup ? (
                    <Signup setToken={setToken} setCurUser={setCurUser} />
                ) : null}
                {showLogin ? (
                    <Login setToken={setToken} setCurUser={setCurUser} />
                ) : null}
            </div>
        </div>
    );
};

export default Landing;
