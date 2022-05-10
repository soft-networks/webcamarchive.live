import { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { disableStreamIDSync, syncStreamID } from '../../lib/firebase';
import useMuteVideoStore from "../../stores/MuteVideoStore";
import DragWrapper from '../DragWrapper';


const Stream = () => {
  const muted = useMuteVideoStore(useCallback(state => state.muteVideo, []));
  const myRef = useRef<HTMLDivElement>(null);
  const [streamID, setStreamID] = useState<string | undefined>(undefined);

  useEffect(() => {
    syncStreamID(setStreamID);
    return () => disableStreamIDSync();
  },[]);

  return streamID ? 
    <DragWrapper handle=".handle" dragID={'stream'} nodeRef={myRef} >
      <div id="stream" className="app" ref={myRef}>
        <div className="handle">
          <div className="icon"></div>
          <div className="title"> LIVE Webcam</div>
        </div>
        <div style={{width: "100%", height: "100%", background: "black"}}>
           <ReactPlayer url={streamID} playing={true} muted={muted} width={"100%"} height={"100%"} controls/>
        </div>
      </div>
    </DragWrapper>
  : null;
}

export default Stream;