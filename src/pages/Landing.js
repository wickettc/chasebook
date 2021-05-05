import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import './Landing.css';

const Landing = ({ isLoggedIn, setToken, setCurUser }) => {
    const [showSignup, setShowSignup] = useState(true);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="landing-div">
            {isLoggedIn ? <Redirect to="/" /> : null}
            <div className="landing-header">
                <div>
                    <h1>ChaseBook!</h1>
                    <h3>The Facebook Clone</h3>
                </div>
                <div>
                    <button
                        className={`landing-signup-btn ${
                            showSignup ? 'landing-btn-active' : ''
                        }`}
                        onClick={() => {
                            setShowLogin(false);
                            setShowSignup(true);
                        }}
                    >
                        Sign Up
                    </button>
                    <button
                        className={showLogin ? 'landing-btn-active' : ''}
                        onClick={() => {
                            setShowSignup(false);
                            setShowLogin(true);
                        }}
                    >
                        Log In
                    </button>
                </div>
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
