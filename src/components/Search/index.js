import React, {useContext, useEffect, useState} from 'react';
import {collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp} from "firebase/firestore";
import {db } from '../../firebase';
import {AuthContext} from "../../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentUser} = useContext(AuthContext)
  const handleSearch = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where('displayName', "==", username.toLowerCase()));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (err) {
      setErr(true)
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(null)
      handleSearch();
    }, 1000)
    return() => {
      clearTimeout(timer)
    }
  }, [username])
  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid
    ? currentUser.uid + user.uid
    : user.uid + currentUser.uid;
    try {
      const docSnap = await getDoc(doc(db, 'chats', combinedId));
      if(!docSnap.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {
          'messages': [],
        });
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId+'.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId+'.date']: serverTimestamp()
        });
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId+'.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId+'.date']: serverTimestamp()
        });
      }
    } catch (e) {
      console.log(e)
    }
    setUser(null);
    setUsername('');
  }
  return (
    <div className={'search'}>
      <div className="searchForm">
        <input
          type="text"
          placeholder={'Search users'}
          onChange={(e) => setUsername(e.target.value)}
          value={username}/>
      </div>
      {err && <span>user is not Found</span>}
      {user && <div className={'userChat'} onClick={handleSelect}>
        <img src={user.photoURL} alt=""/>
        <div className="userChatInfo">
          <span className={'displayName'}>{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
};

export default Search;