import { useCallback, useEffect, useRef, useState } from "react";
import { addMessageToDB, disableMessageAddedToDB, messageAddedToDB } from "../lib/firebase";
import DragWrapper from "./DragWrapper";

const Chat: React.FunctionComponent = ({}) => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string>("anon-" + Math.floor(Math.random() * 1000));
  const [currentText, setCurrentText] = useState<string>("");
  const myRef = useRef<HTMLDivElement>(null);

  const sendCurrentMessage = useCallback(() => {
    if (currentText.length > 0) {
      setCurrentText("");
    }
    addMessageToDB({ username: userName, text: currentText });
  }, [currentText, userName]);

  useEffect(() => {
    messageAddedToDB((message: Message) => {
      console.log("RECEIVED A MESSAGE",message);
      setMessageList((p) => [message, ...p]);
    });
    return () => disableMessageAddedToDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DragWrapper handle=".handle" nodeRef={myRef} dragID="CHAT">
    <div className="chat" ref={myRef}>
      <div className="handle"> •••</div>
      <div className="chat-input message">
        <div className="caption">
          <input type="text" placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <input
            type="text"
            placeholder="Type your message here"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
        </div>
        <div className="button" onClick={sendCurrentMessage}>
          send
        </div>
      </div>
      <div className="chat-messages">
        {messageList.map((msg) => (
          <div className="message" key={msg.username + "-" + msg.text.substring(0,10)}>
            <div className="caption"> {msg.username} </div>
            <div > {msg.text} </div>
              
          </div>
        ))}
      </div>
    </div>
    </DragWrapper>
  );
};

export default Chat;
