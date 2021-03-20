import React, { useState } from 'react';
import { signup, login } from '../api/apiCalls';

const Signup = ({ setToken, setCurUser }) => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'firstname':
                setFirstname(value);
                break;
            case 'lastname':
                setLastname(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmpassword':
                setConfirmpassword(value);
                break;
            default:
                console.log('something went wrong');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signup(
            email,
            firstname,
            lastname,
            password,
            confirmpassword
        );
        console.log(res);
        if (res.status === 200) {
            if (res.data.errors) {
                console.log(res.data.errors);
            } else {
                const obj = JSON.parse(res.config.data);
                console.log(obj);
                // after successful signup go ahead and login user
                const loginRes = await login(obj.email, obj.password);
                console.log(loginRes);
                setCurUser(loginRes.data.user);
                setToken(loginRes.data);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="First Name"
                name="firstname"
                value={firstname}
                required
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={lastname}
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
            <input
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                value={confirmpassword}
                required
                onChange={handleChange}
            />
            <button>Sign Up</button>
        </form>
    );
};

export default Signup;
