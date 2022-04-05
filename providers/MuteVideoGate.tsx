import classnames from "classnames";
import { createContext, useContext, useState } from "react";


interface MuteVideoGateContextType {
  muteVideo: boolean;
}

const MuteVideoContext = createContext<MuteVideoGateContextType>({ muteVideo: true });

const MuteVideoGate = ({ children }: { children: React.ReactNode }) => {
    let [muteVideo, setMuteVideo] = useState<boolean>(true);

    return (
      <MuteVideoContext.Provider value={{ muteVideo }}>
        <div className={"mute button"} onClick={() => setMuteVideo((m) => !m)}>
          {muteVideo ? "play sound" : "mute sound"}
        </div>
        {children}
      </MuteVideoContext.Provider>
    );


}

export const useMuteVideoGate = () => {
    return useContext(MuteVideoContext);
}


export default MuteVideoGate;