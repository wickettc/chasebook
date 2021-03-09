import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn, token, setToken }) => {
    const history = useHistory();

    return (
        <nav className="navbar">
            <Link className="navbar-clickable" to="/">
                Home
            </Link>
            <Link className="navbar-clickable" to="/profile">
                Profile
            </Link>
            {console.log(token)}
            {isLoggedIn ? (
                <div> {token.user.firstname} Is Logged In </div>
            ) : (
                <div>Not Logged In</div>
            )}
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
