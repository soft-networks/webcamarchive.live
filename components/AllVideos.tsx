/* eslint-disable @next/next/no-img-element */
import { useAllVideos } from "../providers/AllVideoProvider";
import Image from "next/image";
import classNames from "classnames";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { useRef, useState } from "react";
import { useDragManager } from "../providers/DragManagerProvider";



const AllVideos: React.FunctionComponent = () => {
  const allVideos = useAllVideos();

  return (
    <div className="fullBleed">
      {allVideos.map((v) => (
        <VideoThumbnail key={v.id + "thumb"} video={v} initX={Math.random() * 90} initY={Math.random() * 90} />
      ))}
    </div>
  );
};

interface VideoThumbnailProps {
  video: Video;
  initX: number;
  initY: number;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ video, initX, initY }) => {
  const nodeRef = useRef(null);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const {setVideoBeingDragged} = useDragManager();

  const onDrag :DraggableEventHandler = (e, data) => {  
    setIsBeingDragged(true);
    setVideoBeingDragged(video);
  }

  const onStop: DraggableEventHandler = (e, data) => {
    setTimeout(() => {
      setIsBeingDragged(false);
      setVideoBeingDragged(null);
    }, 500);
  }
  
  
  return (
    <Draggable nodeRef={nodeRef} onDrag={onDrag} onStop={onStop}>
    <div style={{ position: "absolute" ,top: initX + "%", left: initY + "%"}} ref={nodeRef}>
      <div style={{  position: "relative" }} className={classNames({ noselect:true, noevents: true})}>
        <img
          src={video.imageSrc}
          alt={`Thumbnail for ${video.id}`}
          key={`img-${video.id}`}
          width={540/5}
          height={360/5}
        />
      </div>
    </div>
    </Draggable>
  );
};

export default AllVideos;
