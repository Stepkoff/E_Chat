import React from 'react';
import NavBar from "../NavBar";
import Search from "../Search";
import ChatList from "../ChatList";

const Sidebar = () => {
  return (
    <div className={'sidebar'}>
      <NavBar/>
      <Search/>
      <ChatList/>
    </div>
  );
};

export default Sidebar;