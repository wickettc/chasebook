import React, { useState } from 'react';

const ChatOnlineUser = ({ user }) => {
    return (
        <div className="online-container">
            <div className="online-user-name">{user}</div>
            <div className="online-div"></div>
        </div>
    );
};

const ChatOnlineList = () => {
    const [onlineUsers, setOnlineUsers] = useState(['john', 'chase']);

    return (
        <div className="chat-online-list">
            {onlineUsers.map((user, index) => {
                return <ChatOnlineUser key={index} user={user} />;
            })}
        </div>
    );
};

export default ChatOnlineList;
