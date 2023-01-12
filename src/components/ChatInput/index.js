import React, {useContext, useEffect, useState} from 'react';
import Image from '../../img/img.png';
import {AuthContext} from "../../context/AuthContext";
import {ChatContext} from "../../context/ChatContext";
import {arrayUnion, updateDoc, doc, Timestamp, serverTimestamp} from 'firebase/firestore';
import {db, storage} from "../../firebase";
import {v4 as uuid} from 'uuid';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

const ChatInput = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  useEffect(() => {
    setText('')
    setImage('');
  }, [data.chatId]);
  const handleSend = async (e) => {
    e.preventDefault()
    if(!data.chatId || data.chatId === 'null' || !image && !text) return
    if(image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed',
        (snapshot) => {
          console.log('Uploading file...');
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL
                })
              })
            });
        }
      );
      setImage('');
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + '.lastMessage'] :{
        text,
      },
      [data.chatId + '.date']: serverTimestamp()
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + '.lastMessage'] :{
        text,
      },
      [data.chatId + '.date']: serverTimestamp()
    })
    setText('')
    setImage('')
  }
  return (
    <form onSubmit={handleSend} className={'chatInput'}>
      <input type="text" placeholder={'Type message...'} value={text} onChange={e => setText(e.target.value)} />
      <div className={'send'}>
        <input type="file" id={'message-file'} style={{display: "none"}} onChange={e => setImage(e.target.files[0])}/>
        <label htmlFor="message-file">
          <img src={Image} alt=""/>
        </label>
        <button type={"submit"}>Send</button>
      </div>
    </form>
  );
};

export default ChatInput;