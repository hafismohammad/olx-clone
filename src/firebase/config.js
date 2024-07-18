// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuGpp4qGE-50TBKCOWmfzmjyv-fDZLJPw",
  authDomain: "olx-clone-f13be.firebaseapp.com",
  projectId: "olx-clone-f13be",
  storageBucket: "olx-clone-f13be.appspot.com",
  messagingSenderId: "310643704102",
  appId: "1:310643704102:web:ce4ae2c24f5df07b9981e7",
  measurementId: "G-HXR846M8Q0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
