import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off, set, push, onChildAdded , get} from "firebase/database";

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
const dragSyncRef = ref(db, `${DB_ROOT}/dragSync`);
const streamIDRef = ref(db, `${DB_ROOT}/streamID`)
let firstMessageRead = true

const getChatRoomRef = (chatRoom:string) => {
  return ref(db, `${DB_ROOT}/${chatRoom}`);
}


export const syncStreamID = (setStreamID: (id?: string) => void) => {
  onValue(streamIDRef, (snapshot) => {
    let val = snapshot.val();
    setStreamID(val);
  })
}

export const disableStreamIDSync = () => {
  off(streamIDRef);
}
export const syncMergedVideosDB = (setMergedVideos: (videoIDs: {[key:number]: string}) => void) => {
  onValue(mergedVideoRef, (snapshot) => {
    let val = snapshot.val();
    setMergedVideos(val || {});
  })
}

export const disableMergedVideosSyncDB = () => {
  off(mergedVideoRef);
}

export const setMergedVideoDB = (position: number, id: string) => {
  const specificVideoRef = ref(db, `${DB_ROOT}/mergedVideos/${position}`);
  set(specificVideoRef, id);
}

export const addMessageToDB = (chatRoom: string, message: Message) => {
  const newMessageRef = push(getChatRoomRef(chatRoom));
  set(newMessageRef, message);
}

// get(messageListRef).then(( ) => {
//   firstMessageRead = true;
// })

export const messageAddedToDB = (chatRoom: string, callback: (message: Message) => void) => {

  
  onChildAdded(getChatRoomRef(chatRoom), (data) => {
    if (!firstMessageRead) return;
    let val = data.val();
    if (val && val.username && val.text) {
      callback({username: val.username, text: val.text, timestamp: val.timestamp || 0});
    }
  });
}

export const disableMessageAddedToDB = (chatRoom: string) => {
  off(getChatRoomRef(chatRoom));
}

export const setupDragSync = (dragSyncCallback: (dragSyncs: {[key: string]: {top: number, left: number}})=>void ) => {
  onValue(dragSyncRef, (snapshot) => {
    let val = snapshot.val();
    if (val) {
      dragSyncCallback(val);
    } else {
      dragSyncCallback({});
    }
  });
}
export const syncDragWithID = (dragID: string, top: number, left: number) => {
  const specificDragRef = ref(db, `${DB_ROOT}/dragSync/${dragID}`);
  set(specificDragRef, {top, left});
}
export const disableDragSync = () => {
  off(dragSyncRef);
}