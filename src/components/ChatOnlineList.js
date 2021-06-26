import React from 'react';

const ChatOnlineUser = ({ user, setSelectedUser }) => {
    return (
        <div onClick={() => setSelectedUser(user)} className="online-container">
            <div className="online-user-name">{user.username}</div>
            <div className="online-div"></div>
        </div>
    );
};

const ChatOnlineList = ({ onlineUsers, setSelectedUser }) => {
    return (
        <div className="chat-online-list">
            {onlineUsers.map((user, index) => {
                return (
                    <ChatOnlineUser
                        setSelectedUser={setSelectedUser}
                        key={index}
                        user={user}
                    />
                );
            })}
        </div>
    );
};

export default ChatOnlineList;
