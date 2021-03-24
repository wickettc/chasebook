import React, { useState } from 'react';
import { login } from '../api/apiCalls';

const Login = ({ setToken, setCurUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(email, password);
        if (res.status === 200) {
            setToken(res.data.token);
            setCurUser(res.data.user);
            localStorage.setItem('curUser', JSON.stringify(res.data.user));
            localStorage.setItem('token', res.data.token);
        }
    };

    return (
        <form className="landing-form" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                required
                onChange={handleChange}
            />
            <button>Log In</button>
        </form>
    );
};

export default Login;
