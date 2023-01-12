import React, {useContext, useEffect, useRef} from 'react';
import {ChatContext} from "../../context/ChatContext";
import {AuthContext} from "../../context/AuthContext";
const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      ref.current?.scrollIntoView({behavior: 'smooth'});
    }, 650)
  }, [message])
  return (
    <div className={`message ${message.senderId === currentUser.uid ? 'owner' : ''}`} ref={ref}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid
          ? currentUser.photoURL
          : data.user.photoURL}
             alt=""/>
      </div>
      <div className="messageContent">
        <p>
          {message.text && <span>{message.text}</span>}
          {
            message.img && <img src={message.img} alt=""/>
          }
          <span className={'time'}>{new Date(message.date.seconds * 1000).toLocaleTimeString()}</span>
        </p>

      </div>
    </div>
  );
};

export default Message;