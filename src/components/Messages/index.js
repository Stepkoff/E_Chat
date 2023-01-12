import React, {useContext, useEffect, useState} from 'react';
import Message from "../Message";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";
import {ChatContext} from "../../context/ChatContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const {data} = useContext(ChatContext)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unsub();
    }
  }, [data.chatId]);
  return (
    <div className={'messages'}>
      {messages.map(m => (
        <Message message={m} key={m.id}/>
        ))}
    </div>
  );
};

export default Messages;