import React, {useContext, useEffect, useState} from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import {db} from '../../firebase'
import {AuthContext} from "../../context/AuthContext";
import {ChatContext} from "../../context/ChatContext";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
      return () => {
        unsub();
      }
    }
    currentUser.uid && getChats()
  }, [currentUser.uid])
  const handleSelect = (userInfo) => {
    dispatch({type: 'CHANGE_USER', payload: userInfo})
  }
  return (
    <div className={'chatList'}>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => {
        return(
          <div key={chat[0]} className={'userChat'} onClick={() => handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt=""/>
            <div className="userChatInfo">
              <span className={'displayName'}>{chat[1].userInfo.displayName}</span>
              <p className={'userChat__message'}>
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default ChatList;