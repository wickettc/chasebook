import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import './Landing.css';

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
                    className="landing-signup-btn"
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
                <div className="form-div">
                    {showSignup ? (
                        <Signup setToken={setToken} setCurUser={setCurUser} />
                    ) : null}
                    {showLogin ? (
                        <Login setToken={setToken} setCurUser={setCurUser} />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Landing;
