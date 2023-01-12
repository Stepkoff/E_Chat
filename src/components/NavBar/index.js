import React, {useContext, useState} from 'react';
import {signOut} from 'firebase/auth'
import {auth} from "../../firebase";
import {AuthContext} from "../../context/AuthContext";
import {ChatContext} from "../../context/ChatContext";
import Modal from "../Modal";
import UserProfileInfo from "../UserProfileInfo";

const NavBar = () => {
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  const [modalActive, setModalActive] = useState(false);
  const logOut = () => {
    signOut(auth);
    dispatch({type: 'DELETE_CHAT_ID'})
  }
  return (
    <div className={'navbar'}>
      <span className={'logo'}>Є chat</span>
      <div className={'user'}>
        <div className={'user__info'} onClick={() => setModalActive(true)}>
          <img src={currentUser.photoURL} alt=""/>
          <span className={'displayName'}>{currentUser.displayName}</span>
        </div>
        <button onClick={logOut}>logout</button>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <UserProfileInfo/>
      </Modal>
    </div>
  );
};

export default NavBar;