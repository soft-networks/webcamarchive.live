import { useState } from "react";

interface PasswordGateProps {
  passcode: string;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ children, passcode }) => {
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const onSubmit = () => {
    if (password === passcode) {
      setIsOpen(true);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 1000);
      setPassword("")
    }
  };

  return isOpen ? (
    <> {children} </>
  ) : (
    <div className="password-overlay fullBleed">
      <label> enter password </label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password please?" />
      <div onClick={() => onSubmit()} className="button">
        submit
      </div>
      {isWrong && <div className="wrong"> wrong password </div>}
    </div>
  );
};

export default PasswordGate;
