import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {getDoc, doc} from "firebase/firestore";
import {db} from "../../firebase";

const UserProfileInfo = () => {
  const {currentUser} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const getUserData = async () => {
    const docSnap = await getDoc(doc(db, 'users', currentUser.uid))
    if(docSnap.exists()) {
      setUserData(docSnap.data())
    }
  }

  useEffect(() => {
    if(currentUser.displayName) {
      getUserData();
    }
    return () => {

    }

  }, [currentUser])
  return (
    <div className={'userProfileInfo'}>
      <div className={'userProfileInfo__imageContainer'}>
        <img src={currentUser.photoURL} alt=""/>
      </div>
      <div className={'userProfileInfo__title'}>{currentUser.displayName}</div>
      <div className={'userProfileInfo__text'}>{currentUser.email}</div>
      <div className={'userProfileInfo__text'}>{userData?.phoneNumber}</div>
    </div>
  );
};

export default UserProfileInfo;