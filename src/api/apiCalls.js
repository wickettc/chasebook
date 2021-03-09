import axios from 'axios';

const baseURL = 'http://localhost:3000';

const login = async (email, password) => {
    try {
        const response = await axios.post(`${baseURL}/auth/login`, {
            email,
            password,
        });
        return response;
    } catch (err) {
        console.log(err);
        if (err.response) {
            return err.response;
        }
    }
};

const signup = async (
    email,
    firstname,
    lastname,
    password,
    confirmpassword
) => {
    try {
        const response = await axios.post(`${baseURL}/auth/signup`, {
            firstname,
            lastname,
            email,
            password,
            confirmpassword,
        });
        return response;
    } catch (err) {
        console.log(err);
        if (err.response) {
            return err.response;
        }
    }
};

export { login, signup };
