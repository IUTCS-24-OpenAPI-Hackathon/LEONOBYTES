import React, { useState, useEffect} from 'react';
import ChatList from './chatList/ChatList';
import ChatMessages from './chatMessages/ChatMessages';

const Chats = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleChatItemClick = (receiverUser) => {
        //console.log(receiverUser);
        setSelectedUser(receiverUser);
    };
  
    return (
      <div className="chats">
        <div className='chats_mainBox'>
            <ChatList onChatItemClick={handleChatItemClick} />
            <ChatMessages receiverUser={selectedUser} />
        </div>
        
      </div>
    );
}

export default Chats