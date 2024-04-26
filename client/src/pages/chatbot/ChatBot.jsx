import React, {useState} from 'react'
import ChatBotList from './chatlist/ChatBotList';
import ChatBotMessage from './chatmessage/ChatBotMessage';
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';

const ChatBot = () => {
  const [selectedUser, setSelectedUser] = useState(null);

    const handleChatItemClick = (receiverUser) => {
        // console.log(receiverUser);
        setSelectedUser(receiverUser);
    };
  return (
    <>
      {/* <NavigationBar /> */}
      <div className='chatbot'>
          <ChatBotList onChatItemClick={handleChatItemClick}/>
          <ChatBotMessage receiverUser={selectedUser} onChatItemClick={handleChatItemClick}/>
      </div>
    </>
  )
}

export default ChatBot