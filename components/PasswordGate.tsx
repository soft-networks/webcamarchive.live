/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";
import Draggable from "react-draggable";

interface PasswordGateProps {
  passcode: string;
  waitingRoom?: ReactNode;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ children, passcode, waitingRoom }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (password: string) => {
    if (password === passcode) {
      setIsOpen(true);
      return true;
    } else {
      console.log("password failed");
      return false;
    }
  };

  return isOpen ? (
    <> {children} </>
  ) : (
    <>
      <PasswordDialog onSubmit={onSubmit} /> {waitingRoom}
    </>
  );
};

interface PasswordDialogProps {
  onSubmit: (password: string) => boolean;
}
const PasswordDialog: React.FC<PasswordDialogProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);

  const submitPassword = () => {
    console.log("Submitting");
    if (!onSubmit(password)) {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 1000);
    }
  };
  return (
    <>
      <AltDialog />
      <Draggable nodeRef={myRef}>
        <div className="password-overlay app" id="password" ref={myRef}>
          <div className="handle">
            <div className="icon">
              <img src="/icons/drag.svg" alt="drag window" />
            </div>
            <div className="title"> Ticket please </div>
          </div>
          <div className="stack padded">
            <input
              tabIndex={10}
              className="padded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password please?"
            />
            <div
              onClick={submitPassword}
              onKeyDown={(e) => e.key === "Enter" && submitPassword()}
              className="button align-end"
              tabIndex={11}
            >
              submit
            </div>
            {isWrong && <div className="wrong"> wrong password </div>}
          </div>
        </div>
      </Draggable>
    </>
  );
};

const AltDialog: React.FC = () => {
  const myRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={myRef}>
      <div className="app" id="info" ref={myRef} style={{ top: "40%" }}>
        <div className="handle">
          <div className="icon">
            <img src="/icons/drag.svg" alt="drag window" />
          </div>
          <div className="title"> Info </div>
        </div>
        <div className="padded lightFill" style={{ width: "42ch" }}>
          Welcome to webcamarchive.live - a collaborative video editor for the work of Molly Soda. If you dont have a
          ticket, you can visit our <Link href="/preview">preview page</Link> to see what our editors have been up to.
        </div>
      </div>
    </Draggable>
  );
};

export default PasswordGate;
