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

const createPost = async (body, author, token) => {
    try {
        const response = await axios.post(
            `${baseURL}/post/post`,
            {
                body,
                author,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};

const getAllPosts = async (token) => {
    try {
        const response = await axios.get(`${baseURL}/post/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.log(err);
    }
};

const addLike = async (forpostID, author, token) => {
    try {
        const response = await axios.post(
            `${baseURL}/like/${forpostID}`,
            {
                forpostID,
                author,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};

const removeLike = async (id, token) => {
    try {
        const response = await axios.post(
            `${baseURL}/like/${id}`,
            {
                id,
                // postID,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};

export { login, signup, createPost, getAllPosts, addLike, removeLike };
