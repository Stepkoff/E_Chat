import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDlka3qFfZzNPnzDI_ONSQ87teFiLM4AOo",
  authDomain: "chat-33863.firebaseapp.com",
  projectId: "chat-33863",
  storageBucket: "chat-33863.appspot.com",
  messagingSenderId: "379769015072",
  appId: "1:379769015072:web:f84dd5252fdafb0a922545"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();