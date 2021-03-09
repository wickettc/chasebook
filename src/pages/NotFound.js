import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h2>Cannot seem to find what you are looking for....</h2>
            <Link to="/">Let's Go Home</Link>
        </div>
    );
};

export default NotFound;
