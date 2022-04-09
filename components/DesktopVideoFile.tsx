/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import classNames from "classnames";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { useEffect, useRef, useState } from "react";
import { useDragManager } from "../providers/DragManagerProvider";
import { useMuteVideoGate } from "../providers/MuteVideoGate";
import { useAllVideos } from "../providers/AllVideoProvider";
import DragWrapper from "./DragWrapper";
import slugify from "slugify";


interface DesktopVideoFileProps {
  video: Video;
}

const DesktopVideoFile: React.FC<DesktopVideoFileProps> = ({ video }) => {
  const nodeRef = useRef(null);
  const {setVideoBeingDragged} = useDragManager();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const {muteVideo} = useMuteVideoGate();
  const initPos = useRef<{ x: number; y: number }>({ x: Math.random() * 90, y: Math.random() * 90 });
  const {desktopImageLoaded} = useAllVideos();

  const onDrag :DraggableEventHandler = (e, data) => {  
    setVideoBeingDragged(video.id)
    setIsHovering(false);
  }  
  return (
    <DragWrapper nodeRef={nodeRef} onDrag={onDrag} dragID={slugify(video.id, {strict: true, remove: /[*+~.()'"!:@%]/g})}>
      <div
        className="desktopFile"
        style={{ position: "absolute", top: (initPos.current.x || 50) + "%", left: (initPos.current.y || 50) + "%" }}
        ref={nodeRef}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <div style={{ position: "relative" }} className={classNames({ noselect: true, noevents: true })}>
          {isHovering ? <video src={video.videoSrc} muted={muteVideo} autoPlay loop poster={video.imageSrc}/> : ""}
          <img src={video.imageSrc} alt={`Thumbnail for ${video.id}`} key={`img-${video.id}`} onLoad={() => { desktopImageLoaded(); }}/>
          <div>
            <div className="caption">{video.id}.mp4</div>
          </div>
        </div>
      </div>
    </DragWrapper>
  );
};

export default DesktopVideoFile;
