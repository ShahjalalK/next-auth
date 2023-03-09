import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBDTrmu--aMHvu3PBcTmRBVMhagaw71r-8",
  authDomain: "fir-content-e6557.firebaseapp.com",
  projectId: "fir-content-e6557",
  storageBucket: "fir-content-e6557.appspot.com",
  messagingSenderId: "453150406301",
  appId: "1:453150406301:web:6821d7789fe5a51d664674"
};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {auth, db, storage}