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

const ChatHover = () => {
  const[flag, setFlag] = useState(true);
  const [chatOpen, setChatOpen] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const [pageLoading, setPageLoading] = useState(true);

  const {userInfo} = useUserContext();


    //send new message
    const handleSendMessage = async () => {
      console.log(userInfo);
      console.log(inputValue);
        
        const myMsg = inputValue
        //setInputValue('');
        setFlag(false);

        setChatHistory(prev => [...prev, { role: 'user', text: myMsg }]);
        
        try {
          const apipath = `${apiPath}/chat`;
          const response = await axios.post(apipath, {
            user_id: userInfo,
            text: myMsg,
          });
          console.log(response.data);
          if(response.data.response){
            setChatHistory(prev => [...prev, { role: 'bot', text: response.data.response }]);
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

    const parseMessageText = (text) => {
      const boldRegex = /\*\*(.*?)\*\*/g; // Regex to match text enclosed within **
      const boldText = text.replace(boldRegex, '<strong>$1</strong>'); // Wrap matched text with <strong> tag
      
      const newLineRegex = /(\*\*|\n)/g; // Regex to match ** or new line character
      const formattedText = boldText.split(newLineRegex).map((part, index) => {
        if (index % 2 === 0) {
          // Regular text
          return part;
        } else {
          // Bold text or new line
          return part === '**' ? '<br>' : part; // Replace ** with <br> for new lines
        }
      });
    
      return formattedText.join('');
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
                      {parseMessageText(message.text)}
                  </p>
                )}
              </div>
            ))}
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

export default ChatHover