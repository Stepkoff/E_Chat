import React, {useContext} from 'react';
import Messages from "../Messages";
import ChatInput from "../ChatInput";
import {ChatContext} from "../../context/ChatContext";

const Chat = () => {
  const {data} = useContext(ChatContext)
  return (
    <div className={'chat'}>
      <div className="chatInfo">
        <span className={'displayName'}>{data.user?.displayName}</span>
        <div className="chatIcons">
          {/*<img src={More} alt=""/>*/}
        </div>
      </div>
      <Messages/>
      <ChatInput/>
    </div>
  );
};

export default Chat;