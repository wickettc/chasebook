import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn, token, setToken }) => {
    const history = useHistory();

    return (
        <nav className="navbar">
            {console.log(token)}
            <Link className="navbar-clickable" to="/">
                Home
            </Link>
            {isLoggedIn ? (
                <Link
                    className="navbar-clickable"
                    to={`/profile/${token.user._id}`}
                >
                    My Profile
                </Link>
            ) : null}
            {isLoggedIn ? (
                <div
                    className="navbar-clickable"
                    onClick={() => {
                        setIsLoggedIn(false);
                        setToken(null);
                        history.push('/login');
                    }}
                >
                    Logout
                </div>
            ) : null}
        </nav>
    );
};

export default Navbar;
