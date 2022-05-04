import { useRef } from "react";
import DragWrapper from "../DragWrapper";
import BackgroundButton from "../ui/BackgroundButton";
import MuteButton from "../ui/MuteVideoButton";

const Settings = () => {
  const myRef = useRef<HTMLDivElement>(null);

  return (
    <DragWrapper handle=".handle" nodeRef={myRef} dragID="SETTINGS">
    <div className="app" id="settings" ref={myRef}>
      <div className="handle">
        <div className="icon"></div>
        <div className="title">Settings</div>
      </div>
      <div className="horizontal-stack padded">
        <MuteButton />
        <BackgroundButton />
      </div>
    </div>
    </DragWrapper>
  );
};
export default Settings;
