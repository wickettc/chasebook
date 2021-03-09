import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, token }) => {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            {console.log(token)}
            {isLoggedIn
                ? `${token.user.firstname} Is Logged In`
                : 'Not Logged In'}
        </nav>
    );
};

export default Navbar;
