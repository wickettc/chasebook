import React, { useState } from 'react';
import { login } from '../api/apiCalls';

const Login = ({ setToken, setCurUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logginError, setLogginError] = useState({});

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
            setLogginError({});
            setToken(res.data.token);
            setCurUser(res.data.user);
            localStorage.setItem('curUser', JSON.stringify(res.data.user));
            localStorage.setItem('token', res.data.token);
        } else {
            if (res.data.emailError) {
                setLogginError({ email: res.data.emailError });
            } else if (res.data.pwError) {
                setLogginError({ pw: res.data.pwError });
            }
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
            {logginError.email ? (
                <div className="err-msg">{logginError.email}</div>
            ) : null}
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                required
                onChange={handleChange}
            />
            {logginError.pw ? (
                <div className="err-msg">{logginError.pw}</div>
            ) : null}
            <button>Log In</button>
        </form>
    );
};

export default Login;
