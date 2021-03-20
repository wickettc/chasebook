import axios from 'axios';
import qs from 'qs';

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

const getPostsByUser = async (userID, token) => {
    try {
        const response = await axios.get(
            `${baseURL}/post/postsbyuser/${userID}`,
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

const getPostsFromFriends = async (friendsArr, token) => {
    try {
        const response = await axios.get(`${baseURL}/post/postsfromfriends`, {
            params: {
                friendsArr: friendsArr,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params);
            },
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
        const response = await axios.delete(`${baseURL}/like/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.log(err);
    }
};

const createComment = async (forpost, body, author, token) => {
    try {
        const response = await axios.post(
            `${baseURL}/comment/`,
            {
                forpost,
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

const getUserProfile = async (id, token) => {
    try {
        const response = await axios.get(`${baseURL}/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.log(err);
    }
};

const sendFriendRequest = async (curUserID, reqUserID, token) => {
    try {
        const response = await axios.post(
            `${baseURL}/user/sendrequest`,
            {
                curUserID,
                reqUserID,
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

const acceptFriendRequest = async (curUserID, reqUserID, token) => {
    try {
        const response = await axios.put(
            `${baseURL}/user/acceptrequest`,
            {
                curUserID,
                reqUserID,
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

const denyFriendRequest = async (curUserID, reqUserID, token) => {
    try {
        const response = await axios.put(
            `${baseURL}/user/denyrequest`,
            {
                curUserID,
                reqUserID,
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

const removeFriend = async (curUserID, reqUserID, token) => {
    try {
        const response = await axios.put(
            `${baseURL}/user/removefriend`,
            { curUserID, reqUserID },
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

export {
    login,
    signup,
    createPost,
    getAllPosts,
    getPostsByUser,
    getPostsFromFriends,
    addLike,
    removeLike,
    createComment,
    getUserProfile,
    sendFriendRequest,
    acceptFriendRequest,
    denyFriendRequest,
    removeFriend,
};
