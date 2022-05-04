/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { addMessageToDB, disableMessageAddedToDB, messageAddedToDB } from "../../lib/firebase";
import DragWrapper from "../DragWrapper";

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
      setMessageList((p) => [message, ...p]);
    });
    return () => disableMessageAddedToDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DragWrapper handle=".handle" nodeRef={myRef} dragID="CHAT">
      <div className="app" id="chat" ref={myRef}>
        <div className="handle">
          <div className="icon"></div>
          <div className="title">Chat</div>
        </div>
        <div className="chat-input horizontal-stack ">
          <div className="stack text-input">
            <input
              type="text"
              placeholder="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="user-input caption"
              tabIndex={1}
            />

            <input
              type="text"
              placeholder="say something to the other fans!"
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              className="message-input"
              tabIndex={2}
            />
          </div>
          <div className="button" onClick={sendCurrentMessage} tabIndex={3}>
            <img src="/icons/arrow.png" alt="send message"  />
          </div>
        </div>
        <div className="chat-messages">
          {messageList.map((msg) => (
            <div className="message" key={msg.username + "-" + msg.text.substring(0, 10)}>
              <div className="caption"> {msg.username} </div>
              <div> {msg.text} </div>
            </div>
          ))}
        </div>
      </div>
    </DragWrapper>
  );
};

export default Chat;
