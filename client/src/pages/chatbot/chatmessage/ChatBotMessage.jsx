import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios  from 'axios';
import './ChatBotMessage.css'
import { IoMdSend } from "react-icons/io";
import {GiHamburgerMenu} from 'react-icons/gi';
import { useUserContext } from '@/context/UserContext';
import PageLoading from '@/mycomponenrs/loading/PageLoading';
import { apiPath } from '@/utils/apiPath';

const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY; // Replace with your actual API key

const ChatBotMessage = ({ receiverUser, onChatItemClick }) => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const [pageLoading, setPageLoading] = useState(true);

  const {userInfo} = useUserContext();
  receiverUser = receiverUser || { id: -1 };
  
  //send message
  const handleSendMessage = async () => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: chatHistory.map(message => ({
        role: message.role,
        parts: [{ text: message.text }] // Ensure each message has 'parts' property with an array of parts
      })),
      generationConfig: {
        maxOutputTokens: 100000,
      },
    });

    if(receiverUser?.id != -1){
      const msg = inputValue;
      setInputValue('');
      await saveMessage({ role: 'user', text: msg });
      setChatHistory(prev => [...prev, { role: 'user', text: msg }]);
      

      const result = await chat.sendMessage(msg);
      const response = await result.response;
      const responseText = await response.text();
      await saveMessage({ role: 'model', text: responseText })
      setChatHistory(prev => [...prev, { role: 'model', text: responseText }]);
    }
    else{
      const chatBot = await createChat();

      const msg = inputValue;
      setInputValue('');
      await saveMessageFirst({ role: 'user', text: msg }, chatBot);
      setChatHistory(prev => [...prev, { role: 'user', text: msg }]);
      

      const result = await chat.sendMessage(msg);
      const response = await result.response;
      const responseText = await response.text();
      await saveMessageFirst({ role: 'model', text: responseText }, chatBot)
      setChatHistory(prev => [...prev, { role: 'model', text: responseText }]);
    }
  };

  //save message first time in chat
  const saveMessageFirst = async (user, chatBot) => {
    try {
      const apipath = `${apiPath}/chatbot/messages/create`;
      const response = await axios.post(apipath, {
        chatId: chatBot.id,
        role: user.role,
        text: user.text,
      });
      if(response.data.message == 'message sent'){
        // onChatItemClick(currentChat);
      }
      else{
        console.log("could not save message" + response.data.message);
      }
    }
    catch (error) {
      console.error("Error saving message for the first time:", error.message);
    }
  }

  //save new message
  const saveMessage = async (user) => {
      try {
        const apipath = `${apiPath}/chatbot/messages/create`;
        const response = await axios.post(apipath, {
          chatId: receiverUser.id,
          role: user.role,
          text: user.text,
        });
        if(response.data.message == 'message sent'){
          // onChatItemClick(currentChat);
        }
        else{
          console.log("could not save message" + response.data.message);
        }
      }
      catch (error) {
        console.error("Error saving message for the first time:", error.message);
      }
  }

  //create new chat
  const createChat = async () => {
      try {
        const apipath = `${apiPath}/chatbot/chatlist/create`;
        const response = await axios.post(apipath, {
          userId: userInfo.id,
        });
        if(response.data.message == 'new chat created'){
          const newChat = response.data.chats;
          onChatItemClick(newChat);
          return newChat;
        }
        else{
          console.log('could not create chat');
        }
      }
      catch (error) {
        console.error("Error creating chat:", error);
      }
  }


  //load all chats
  const loadChatHistory = async () => {
      try {
        const apipath = `${apiPath}/chatbot/messages/${receiverUser.id}`;
        const response = await axios.get(apipath);
        if (response.data.message === "messages found") {
          setChatHistory(response.data.chats);
        } else {
          console.log(response.data.message);
        }
        setPageLoading(false);
      }
      catch (error) {
        console.error("Error getting chat list:", error);
      }
  }

  useEffect(() => {
    if(receiverUser.id !=-1){
      setPageLoading(true);
      loadChatHistory();
    }
    else{
      setChatHistory([]);
    }
  }, []);

  useEffect(() => {
    // console.log(receiverUser);
    if(receiverUser.id !=-1){
      setPageLoading(true);
      loadChatHistory();
    }
    else{
      setChatHistory([]);
    }
  }, [receiverUser.id]);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      setPageLoading(false);
    }
  }, [userInfo]);


  //chatlist slide in mobile display
  var chatListSlideCount = 0;
  const handleChatListSlide = () => {
    chatListSlideCount = (chatListSlideCount+1)%2;
    if(chatListSlideCount == 1)document.querySelector('.chatbot_list').classList.add('chatbot_list_slidein');
    else document.querySelector('.chatbot_list').classList.remove('chatbot_list_slidein');
  }


  if(pageLoading){
    return(
      <div className="chatbot_message">
        <div className="chatbot_message_mainBox">
          <PageLoading />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="chatbot_message">
        <div className="chatbot_message_mainBox">
          <div className='chatbot_message_header'>
            <h2>Model</h2>
            <GiHamburgerMenu onClick={()=> handleChatListSlide()} className='chatbot_message_header_icon'/>
          </div>
          <div className="chatbot_messageBox">
            {chatHistory.length == 0 &&
              (<p className={`chatbot_messages chatbot_start`}>
                  Hi, How can I help you?
              </p>)
            }
            {chatHistory.map((message, index) => (
              <div key={index}>
                {message.role === 'user' ? (
                  <p className={`chatbot_messages chatbot_myMessage`} >
                    {message.text}
                  </p>
                ) : (
                  <p className={`chatbot_messages chatbot_othersMessage`}>
                      {message.text}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="chatbot_input">
            <input
              type="text"
              value={inputValue}
              className="chatbot_inputField"
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            {inputValue.length>0 ?
              (<div className='chatbot_inputSendButtonBox'> 
                <IoMdSend className='chatbot_inputSendButton mx-auto my-auto'
                onClick={()=>handleSendMessage()}/>
              </div>): null
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBotMessage;
