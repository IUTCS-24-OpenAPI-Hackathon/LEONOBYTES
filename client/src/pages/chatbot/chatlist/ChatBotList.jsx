import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FaHistory } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import './ChatBotList.css'
import {useUserContext} from '../../../context/UserContext';
import PageLoading from '@/mycomponenrs/loading/PageLoading';
import { apiPath } from '@/utils/apiPath';
import { Input } from '@/components/ui/input';

const ChatBotList = ({ onChatItemClick }) => {
    const [chatListData, setChatListData] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [name, setName] = useState(true);
    const {userInfo, setUserInfo} = useUserContext();

    const getChatListData = async() => {
      try {
        setPageLoading(true);
        const apipath = `${apiPath}/chatbot/chatlist/${userInfo.id}`;
        const response = await axios.get(apipath);
        if (response.data.message === "chat list found") {
          setChatListData(response.data.chatlist);
          //console.log(response.data.chatlist);
        } else {
          console.log(response.data.message);
        }
        setPageLoading(false);
      }
      catch (error) {
        console.error("Error getting chat list:", error);
      }
    }

    const handleEditName = (chatItemId) => {
      setEditingItemId(chatItemId);
      const chatItem = chatListData.find(item => item.id === chatItemId);
      setName(chatItem.name);
    }

    const handleSaveName = async () => {
      try {
          const updatedChatListData = chatListData.map(item => {
              if (item.id === editingItemId) {
                  return { ...item, name: name };
              }
              return item;
          });
          await updateChatItemName();
          setChatListData(updatedChatListData);
          setEditingItemId(null);
      } catch (error) {
          console.error("Error saving name:", error);
      }
    }
    
    const updateChatItemName = async () => {
      try {
          // Make a PUT request to your backend API endpoint
          const response = await axios.put(`${apiPath}/chatbot/chatlist/update/${editingItemId}`, {
              name: name
          });
          if (response.data.message === "chat name updated") {
              //console.log("Name updated successfully");
          } else {
              console.log("Error updating name:", response.data.message);
          }
      } catch (error) {
          console.error("Error updating name:", error);
      }
  }


      useEffect(() => {
        if (userInfo && userInfo.id) {
          setPageLoading(false);
          getChatListData();
        }
      }, [userInfo]);

      useEffect(() => {
        if (userInfo && userInfo.id) {
          getChatListData();
        }
      }, []);
    
      if(pageLoading){
        return (
          <div className="chatbot_list">
            <div className="chatbot_list_mainBox">
              <PageLoading/>
            </div>
          </div>
        )
      }

      return (
        <>
          <div className="chatbot_list">
            <div className="chatbot_list_mainBox">
              <div className='chatbot_list_header'
                onClick={() => onChatItemClick(null)}
              >
                <h2>New Chat</h2>
                <IoMdAddCircleOutline className='chatbot_list_item_icon'/>
              </div>
              
              {chatListData && chatListData.map((chatItem) => (
                <div className='chatbot_list_fullItem' key={chatItem.id}>
                  <div
                    className="chatbot_list_item"
                    onClick={() => onChatItemClick(chatItem)}
                  >
                    <FaHistory className='chatbot_list_item_icon'/>
                      {editingItemId === chatItem.id ? (
                        <Input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            onBlur={()=> handleSaveName()}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveName();
                              }
                            }}
                        />
                        ) : (
                              <p>{chatItem.name}</p>
                      )}
                  </div>
                  <FaRegEdit onClick={()=> handleEditName(chatItem.id)} className='cursor-pointer'/>
                </div>
              ))}
            </div>
          </div>
        </>
      )
}

export default ChatBotList