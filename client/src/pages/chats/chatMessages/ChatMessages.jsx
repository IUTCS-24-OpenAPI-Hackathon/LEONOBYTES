import React, { useState, useEffect} from 'react';
import './ChatMessages.css'; // Import your custom CSS file
import axios from 'axios'
import { IoMdSend } from "react-icons/io";
import PubNub from 'pubnub';

import {useUserContext} from '../../../context/UserContext';
import PageLoading from '@/mycomponenrs/loading/PageLoading';
import { Skeleton } from "@/components/ui/skeleton"

const ChatMessages = ({ receiverUser }) =>{
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [pageLoading, setPageLoading] = useState(true);

  const {userInfo} = useUserContext();
  receiverUser = receiverUser || { id: -1 };
  
  const VITE_PUBNUB_PUBLISH_KEY = import.meta.env.VITE_PUBNUB_PUBLISH_KEY;
  const VITE_PUBNUB_SUBSCRIBE_KEY = import.meta.env.VITE_PUBNUB_SUBSCRIBE_KEY;
  const VITE_PUBNUB_USER_ID = import.meta.env.VITE_PUBNUB_USER_ID;

  const pubnub = new PubNub({
    publishKey: VITE_PUBNUB_PUBLISH_KEY,
    subscribeKey: VITE_PUBNUB_SUBSCRIBE_KEY,
    userId: VITE_PUBNUB_USER_ID,
  });

  // const handleMessageSubmit = (e) => {
  //   e.preventDefault();
  //   if (inputValue.trim() !== '') {
  //     setMessages([...messages, { text: inputValue }]);
  //     setInputValue('');
  //   }
  // };

  const sendMessage = async () => {
    //alert(inputValue);
    const msg = inputValue;
    setInputValue('');
  
    const myMsg = {
      sendBy: userInfo.id,
      sendTo: receiverUser.id,
      message: msg, // Change this line to assign msg to the 'text' property
      createdAt: new Date(),
    };
  
    const apipath = `https://sharental-api.vercel.app/chats/send`;
  
    try {
      const response = await axios.post(apipath, {
        sendBy: userInfo.id,
        sendTo: receiverUser.id,
        message: msg,
        createdAt: new Date(),
      }, {
        timeout: 10000, // Timeout set to 10 seconds (10000 milliseconds)
      });
      console.log(response.data);
      if (response.data.message === "message sent") {
        setMessages(previousMessages => [...previousMessages, response.data.chat]);
      } else {
        throw new Error("Failed to send message: " + response.data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

 
  //get all message post request
  const getAllMessages =  async () => {
    const apipath = `https://sharental-api.vercel.app/chats/receive`;

    try {
      const response= await axios.post(apipath,
        {
          sendBy: userInfo.id,
          sendTo: receiverUser.id,
        },
        {
          timeout: 10000, // Timeout set to 30 seconds (30000 milliseconds)
        },
      ) 
      // setPageLoading(false);
      //console.log(response.data);
      setPageLoading(false);
      const Chats=response.data.chats;

      const formattedMessages = Chats.map(chat => {
      return {
        _id: chat._id,
        text: chat.message,
        createdAt: new Date(chat.createdAt),
        user: {
          _id: chat.sendBy,
          name: (chat.sendBy === 1) ? 'Tafsir' : 'Other User',
        },
      };
    });

    // Sort the messages based on createdAt
    const sortedMessages = formattedMessages.sort((a, b) => a.createdAt - b.createdAt);

    // Set the sorted messages in the state
    setMessages(sortedMessages);
    //console.log(sortedMessages);

    } catch (error) {
      setPageLoading(false);
      console.error(error.message);
    };
  }

  useEffect(() => {
    // console.log(userInfo);
    if(receiverUser.id !=-1){
      setPageLoading(true);
      getAllMessages();
    }
  }, []);
  useEffect(() => {
    // console.log(userInfo);
    if(receiverUser.id !=-1){
      setPageLoading(true);
      getAllMessages();
    }
  }, [receiverUser.id]);

  useEffect(() => {
    const channel = `chat_${receiverUser.id}_${userInfo.id}`; // Define channel name

    // Subscribe to PubNub
    pubnub.subscribe({
      channels: [channel],
    });

    // Listen for incoming messages
    pubnub.addListener({
      message: (event) => {
        const incomingMessage = event.message.text; // Access message text
        //console.log(event.message);
        setMessages((prevMessages) => GiftedChat.append(prevMessages, [incomingMessage]));
      },
      presence: (event) => {
        // Handle presence events (optional)
      },
      status: (status) => {
        // Handle PubNub status updates (optional)
      },
      error: (error) => {
        // Handle PubNub errors
        console.error('PubNub error:', error);
      },
    });

    // Cleanup when unmounting
    return () => pubnub.unsubscribeAll();
  }, [receiverUser.id, userInfo.id]);

  const randomWidth = () => {
    var min = 0;
    var max = 30;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if(receiverUser.id ==-1){
    return (
      <div className="chat">
        <div className="chat_mainBox">
        </div>
      </div>
    )
  }
  
  if(pageLoading){
    return (
      <div className="chat">
        <div className="chat_mainBox">
          <div className='chat-header '>
            <Skeleton className='chat-headerImage' />
          </div>
          <div className="chat-messageBox">
              <Skeleton className={`chat-messages chat-myMessage h-[2.5vw] rounded-xl`}
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>
              <Skeleton className={`chat-messages chat-myMessage h-[2.5vw] rounded-xl random-width`} 
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>

              
              <Skeleton className={`chat-messages chat-othersMessage h-[2.5vw] rounded-xl`} 
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>
              <Skeleton className={`chat-messages chat-othersMessage h-[2.5vw] rounded-xl`}
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>

              <Skeleton className='chat-messages chat-myMessage h-[2.5vw] rounded-xl' 
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>

              <Skeleton className='chat-messages chat-othersMessage h-[2.5vw] rounded-xl' 
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>
              <Skeleton className='chat-messages chat-othersMessage h-[2.5vw] rounded-xl' 
                style={{ width: `${randomWidth()}vw` }} >
                <p></p>
              </Skeleton>
          </div>
          
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="chat">
        <div className="chat_mainBox">
          <div className='chat-header '>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className='chat-headerImage'/>
            <h2>{receiverUser.name}</h2>
          </div>
          <div className="chat-messageBox">
            {messages.map((message,index) => (
              message.user._id === userInfo.id ?
                <div className={`chat-messages chat-myMessage`} >
                  <p key={index}>
                    {message.text}
                  </p>
                </div>
                :
                <div className={`chat-messages chat-othersMessage`}>
                  <p key={index}
                  >
                    {message.text}
                  </p>
                </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="chat-inputField"
            />
            {inputValue.length>0 ?
              (<div className='chat-inputSendButtonBox'> 
                <IoMdSend className='chat-inputSendButton mx-auto my-auto'
                onClick={()=>sendMessage()}/>
              </div>): null
            }
            
          </div>
        </div>
      </div>
    </>

  );
}

export default ChatMessages;
