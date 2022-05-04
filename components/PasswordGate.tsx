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
    setPassword("");
    if (!onSubmit(password)) {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 1000);
    }
  };
  return (
    <Draggable nodeRef={myRef}>
      <div className="password-overlay app" id="password" ref={myRef}>
        <div className="handle">
          <div className="icon"> </div>
          <div className="title"> Ticket please </div>
        </div>
        <div className="stack padded">
          <input tabIndex={10} className="padded" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password please?" />
          <div onClick={() => submitPassword()} onKeyDown={e => e.key === 'Enter' && submitPassword()} className="button align-end" tabIndex={11}>
            submit
          </div>
          {isWrong && <div className="wrong"> wrong password </div>}
          </div>
      </div>
    </Draggable>
  );
};

export default PasswordGate;
