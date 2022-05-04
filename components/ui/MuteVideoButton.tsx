import classnames from "classnames";
import { createContext, useContext, useState } from "react";
import useMuteVideoStore from "../../stores/MuteVideoStore";


const MuteButton = () => {
    const muteVideo = useMuteVideoStore(state => state.muteVideo);
    const toggleMuteVideo = useMuteVideoStore(state => state.toggleMuteVideo);

    return (
        <div className={"button"} onClick={toggleMuteVideo}>
          {muteVideo ? "Enable sound" : "Disable sound"}
        </div>
    );


}

export default MuteButton;