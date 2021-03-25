import React, { useState } from 'react';
import { signup, login } from '../api/apiCalls';

const Signup = ({ setToken, setCurUser }) => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [errors, setErrors] = useState({});

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
        if (res.status === 200) {
            if (res.data.errors) {
                const err = res.data.errors[0];
                switch (err.param) {
                    case 'email':
                        setErrors({ email: err.msg });
                        break;
                    case 'firstname':
                        setErrors({ first: err.msg });
                        break;
                    case 'lastname':
                        setErrors({ last: err.msg });
                        break;
                    case 'password':
                        setErrors({ pw: err.msg });
                        break;
                    case 'confirmpassword':
                        setErrors({ cpw: err.msg });
                        break;
                    default:
                        console.log('something went wrong');
                        break;
                }
            } else {
                const obj = JSON.parse(res.config.data);
                console.log(obj);
                // after successful signup go ahead and login user
                const loginRes = await login(obj.email, obj.password);
                setCurUser(loginRes.data.user);
                setToken(loginRes.data.token);
                localStorage.setItem(
                    'curUser',
                    JSON.stringify(loginRes.data.user)
                );
                localStorage.setItem('token', loginRes.data.token);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="landing-form">
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={handleChange}
            />
            {errors.email ? (
                <div className="err-msg">{errors.email}</div>
            ) : null}
            <input
                type="text"
                placeholder="First Name"
                name="firstname"
                value={firstname}
                required
                onChange={handleChange}
            />
            {errors.first ? (
                <div className="err-msg">{errors.first}</div>
            ) : null}
            <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={lastname}
                required
                onChange={handleChange}
            />
            {errors.last ? <div className="err-msg">{errors.last}</div> : null}
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                required
                onChange={handleChange}
            />
            {errors.pw ? <div className="err-msg">{errors.pw}</div> : null}
            <input
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                value={confirmpassword}
                required
                onChange={handleChange}
            />
            {errors.cpw ? <div className="err-msg">{errors.cpw}</div> : null}
            <button>Sign Up</button>
        </form>
    );
};

export default Signup;
