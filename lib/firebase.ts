import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEELIQs6LfHdFCnqUUNluk7tXKodeHIwE",
  authDomain: "is-this-thing-on-320a7.firebaseapp.com",
  databaseURL: "https://is-this-thing-on-320a7-default-rtdb.firebaseio.com",
  projectId: "is-this-thing-on-320a7",
  storageBucket: "is-this-thing-on-320a7.appspot.com",
  messagingSenderId: "895037288643",
  appId: "1:895037288643:web:4da7f037a77603eac6b276",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Constants
const DB_ROOT = "MOLLYEDITOR-TESTING";
const mergedVideoRef = ref(db, `${DB_ROOT}/mergedVideos`);


export const syncMergedVideosDB = (setMergedVideos: (videoIDs: {[key:number]: string}) => void) => {
  onValue(mergedVideoRef, (snapshot) => {
    let val = snapshot.val();
    console.log("Received snapshot")
    if (val) { 
      setMergedVideos(val);
    } 
  })
}

export const disableMergedVideosSyncDB = () => {
  off(mergedVideoRef);
}

export const setMergedVideoDB = (position: number, id: string) => {
  const specificVideoRef = ref(db, `${DB_ROOT}/mergedVideos/${position}`);
  set(specificVideoRef, id);
}