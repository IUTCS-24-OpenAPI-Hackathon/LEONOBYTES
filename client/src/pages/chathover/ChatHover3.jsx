import React, { useState, useEffect } from 'react';
import axios  from 'axios';
import { IoMdSend } from "react-icons/io";
import {GiHamburgerMenu} from 'react-icons/gi';
import { IoMdClose } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";

import { useUserContext } from '@/context/UserContext';
import PageLoading from '@/mycomponenrs/loading/PageLoading';
import { apiPath } from '@/utils/apiPath';
import './ChatHover.css'

const ChatHover3 = () => {
  const[flag, setFlag] = useState(true);
  const [reply, setReply] = useState('')
  const [chatOpen, setChatOpen] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'user',
      text: 'Hello, I have a question.',
      timestamp: new Date() // You can add a timestamp if needed
    },
    {
      role: 'bot',
      text: 'Sure, go ahead and ask your question.',
      timestamp: new Date() // You can add a timestamp if needed
    }
  ]);

  const [pageLoading, setPageLoading] = useState(true);

  const {userInfo} = useUserContext();


    //send new message
    const handleSendMessage = async () => {
        const myMsg = inputValue
        //setInputValue('');
        setFlag(false);

        setChatHistory(prev => [...prev, { role: 'user', text: myMsg }]);
        
        try {
          const apipath = `${apiPath}/chatbot/messages/send`;
          const response = await axios.post(apipath, {
            userId: userInfo,
            text: myMsg,
          });
          if(response.data.message){
            setReply(response.data.message)
            setChatHistory(prev => [...prev, { role: 'bot', text: response.data.message }]);
          }
          else{
            console.log("could not send message" + response.data.message);
          }
        }
        catch (error) {
          console.error("Error saving message for the first time:", error.message);
        }
    }

    //open and close chat
    const handleOpenChat = () => {
      const val= (chatOpen + 1) %2;
      setChatOpen(val);
      if(chatOpen == 0)document.querySelector('.chathover_message').classList.add('chathover_message_minimize');
      else document.querySelector('.chathover_message').classList.remove('chathover_message_minimize');
    }
    
  return (
    <div className="chathover">
      <div className="chathover_message">
        <div className="chathover_message_mainBox">
          <div className='chathover_message_header'>
            <h2>Chat</h2>
            {/* <GiHamburgerMenu onClick={()=> handleChatListSlide()} className='chatbot_message_header_icon'/> */}
          </div>
          <div className="chathover_messageBox">
            {chatHistory.length == 0 &&
              (<p className={`chathover_messages chathover_start`}>
                  Hi, How can I help you?
              </p>)
            }
            {chatHistory.map((message, index) => (
              <div key={index}>
                {message.role === 'user' ? (
                  <p className={`chathover_messages chathover_myMessage`} >
                    {message.text}
                  </p>
                ) : (
                  <p className={`chathover_messages chathover_othersMessage`}>
                      {message.text}
                  </p>
                )}
              </div>
            ))}

            <div>
                {inputValue && <p className={`chathover_messages chathover_myMessage`}>{inputValue}</p>}
                {reply && <p className={`chathover_messages chathover_othersMessage`}>{
                    reply.map((rep, index) => (
                        <p>{rep.name}</p>
                    ))
                }</p>}
            </div>
          </div>

          {flag &&
            <div className="chathover_input">
              <input
                type="text"
                value={inputValue}
                className="chathover_inputField"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              {inputValue.length>0 ?
                (<div className='chathover_inputSendButtonBox'> 
                  <IoMdSend className='chathover_inputSendButton mx-auto my-auto'
                  onClick={()=>handleSendMessage()}/>
                </div>): null
              }
            </div>
          }
        </div>
      </div>
      <div className='chathover_bottombuttons'>
        {chatOpen == 0?
          (<span className='chathover_bottombuttons_button' onClick={()=> handleOpenChat()}>
              <IoMdClose className='chathover_bottombuttons_icons'/>
          </span>):
          (<span className='chathover_bottombuttons_button' onClick={()=> handleOpenChat()}>
              <LuMessageSquare className='chathover_bottombuttons_icons'/>
          </span>)
        }
        
        
      </div>
    </div>
  )
}

export default ChatHover3