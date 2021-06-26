import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';
import './ChatContainer.css';
import ChatOnlineList from './ChatOnlineList';

const ChatContainer = ({ curUser }) => {
    const [showOnline, setShowOnline] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const initReactiveProperties = (user) => {
        user.connected = true;
        user.messages = [];
        user.hasNewMessages = false;
    };
    console.log('chatcontainer outside useeffect', onlineUsers, selectedUser);

    useEffect(() => {
        socket.on('connect', () => {
            let updateOnline = onlineUsers.forEach((user) => {
                if (user.self) {
                    user.connected = true;
                }
            });
            console.log(updateOnline);
            setOnlineUsers(updateOnline);
        });

        socket.on('disconnect', () => {
            let updateOnline = onlineUsers.forEach((user) => {
                if (user.self) {
                    user.connected = false;
                }
            });
            setOnlineUsers(updateOnline);
        });
    }, []);

    useEffect(() => {
        let username = `${curUser.firstname} ${curUser.lastname}`;
        console.log('chatcontainer running again');
        socket.auth = { username };
        socket.connect();

        // this logic may need to be outside useEffect hook
        socket.on('users', (users) => {
            users.forEach((user) => {
                user.self = user.userID === socket.id;
                initReactiveProperties(user);
            });
            // put the current user first, and then sort by username
            setOnlineUsers(
                users.sort((a, b) => {
                    if (a.self) return -1;
                    if (b.self) return 1;
                    if (a.username < b.username) return -1;
                    return a.username > b.username ? 1 : 0;
                })
            );
        });
        socket.on('user connected', (user) => {
            initReactiveProperties(user);
            setOnlineUsers((onlineUsers) => [...onlineUsers, user]);
        });

        socket.on('private message', ({ content, from }) => {
            for (let i = 0; i < onlineUsers.length; i++) {
                const user = onlineUsers[i];
                if (user.userID === from) {
                    let updatedUser = user;
                    updatedUser.messages.push({
                        content,
                        fromSelf: false,
                    });
                    setOnlineUsers((prevUsers) => [...prevUsers, updatedUser]);
                }
                if (user !== selectedUser) {
                    const updatedUser = user;
                    updatedUser.hasNewMessages = true;
                    setOnlineUsers((prevUsers) => [...prevUsers, updatedUser]);
                }
            }
        });

        console.log(onlineUsers);
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });
    }, [curUser, onlineUsers, selectedUser]);

    const onMessage = (content) => {
        if (selectedUser) {
            socket.emit('private message', {
                content,
                to: selectedUser.userID,
            });
            const updateSelectedUser = selectedUser;
            updateSelectedUser.messages.push({ content, fromSelf: true });
            setSelectedUser(updateSelectedUser);
            console.log(selectedUser);
        }
    };

    return (
        <div className="chat-container">
            {showOnline ? (
                <ChatOnlineList
                    setSelectedUser={setSelectedUser}
                    onlineUsers={onlineUsers}
                />
            ) : null}
            <div
                className="chat-container-bubble"
                onClick={() => setShowOnline(!showOnline)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                >
                    <path d="M10 3.002c4.411 0 8 2.849 8 6.35 0 3.035-3.029 6.311-7.925 6.311-1.58 0-2.718-.317-3.718-.561-.966.593-1.256.813-3.006 1.373.415-1.518.362-2.182.331-3.184-.837-1.001-1.682-2.069-1.682-3.939 0-3.501 3.589-6.35 8-6.35zm0-2.002c-5.281 0-10 3.526-10 8.352 0 1.711.615 3.391 1.705 4.695.047 1.527-.851 3.718-1.661 5.312 2.168-.391 5.252-1.258 6.649-2.115 1.181.289 2.312.421 3.382.421 5.903 0 9.925-4.038 9.925-8.313 0-4.852-4.751-8.352-10-8.352zm11.535 11.174c-.161.488-.361.961-.601 1.416 1.677 1.262 2.257 3.226.464 5.365-.021.745-.049 1.049.138 1.865-.892-.307-.979-.392-1.665-.813-2.127.519-4.265.696-6.089-.855-.562.159-1.145.278-1.74.364 1.513 1.877 4.298 2.897 7.577 2.1.914.561 2.933 1.127 4.352 1.385-.53-1.045-1.117-2.479-1.088-3.479 1.755-2.098 1.543-5.436-1.348-7.348zm-15.035-3.763c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071z" />
                </svg>
            </div>
        </div>
    );
};

export default ChatContainer;
