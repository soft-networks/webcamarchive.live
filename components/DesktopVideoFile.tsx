/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import classNames from "classnames";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { useEffect, useRef, useState } from "react";
import { useDragManager } from "../providers/DragManagerProvider";
import { useMergedVideo } from "../providers/MergedVideoProvider";


interface DesktopVideoFileProps {
  video: Video;
}

const DesktopVideoFile: React.FC<DesktopVideoFileProps> = ({ video }) => {
  const nodeRef = useRef(null);
  const {setVideoBeingDragged} = useDragManager();
  const initPos = useRef<{ x: number; y: number }>({ x: Math.random() * 90, y: Math.random() * 90 });
  const onDrag :DraggableEventHandler = (e, data) => {  
    setVideoBeingDragged(video.id)
  }  
  return (
    <Draggable nodeRef={nodeRef} onDrag={onDrag}>
    <div className="desktopFile" style={{ position: "absolute" ,top: (initPos.current.x || 50) + "%", left: (initPos.current.y || 50) + "%"}} ref={nodeRef}>
      <div style={{  position: "relative"}} className={classNames({ noselect:true, noevents: true})}>
        <img
          src={video.imageSrc}
          alt={`Thumbnail for ${video.id}`}
          key={`img-${video.id}`}
        />
        <div >
          <div className="caption">{video.id}.mp4</div>
        </div>
      </div>
    </div>
    </Draggable>
  );
};

export default DesktopVideoFile;
