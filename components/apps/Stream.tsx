import { useCallback } from 'react';
import {TwitchPlayer} from 'react-twitch-embed';
import useMuteVideoStore from "../../stores/MuteVideoStore";
import DragWrapper from '../DragWrapper';


const Stream = () => {
  const muted = useMuteVideoStore(useCallback(state => state.muteVideo, []));
  return (
    <DragWrapper handle=".handle" dragID={'stream'} >
      <div id="stream" className="app">
        <div className="handle">
          <div className="icon"></div>
          <div className="title"> LIVE Webcam</div>
        </div>
        <div style={{width: "100%", height: "100%", background: "black"}}>
          <TwitchPlayer channel="maya" width="100%" height="100%" hideControls muted={muted} />
        </div>
      </div>
    </DragWrapper>
  );
}

export default Stream;