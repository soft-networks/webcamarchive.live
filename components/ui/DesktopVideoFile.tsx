/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import classNames from "classnames";
import { DraggableEventHandler } from "react-draggable";
import { useCallback, useEffect, useRef, useState } from "react";
import DragWrapper from "../DragWrapper";
import slugify from "slugify";
import useDesktopVideoStore from "../../stores/DesktopVideoStore";
import videoInfo from "../../lib/videoInfo";
import useLoadingStore from "../../stores/ThumbnailLoadingStore";
import useMuteVideoStore from "../../stores/MuteVideoStore";
import useVideoDragStore from "../../stores/VideoDragStore";

const DesktopVideoFile: React.FC<{ id: string }> = ({ id }) => {
  const videoIsOnDesktop = useDesktopVideoStore(useCallback((state) => state.desktopVideos[id], [id]));
  return videoIsOnDesktop ? <DesktopVideoFileInternal video={videoInfo.getVideoById(id)} /> : null;
};
interface DesktopVideoFileInternalProps {
  video: Video;
}

const DesktopVideoFileInternal: React.FC<DesktopVideoFileInternalProps> = ({ video }) => {
  const nodeRef = useRef(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const initPos = useRef<{ x: number; y: number }>({ x: Math.random() * 90, y: Math.random() * 90 });

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const muteVideo = useMuteVideoStore(useCallback((state) => state.muteVideo, []));
  const setVideoBeingDragged = useVideoDragStore(useCallback((state) => state.setVideoBeingDragged, []));
  const desktopFileLoaded = useLoadingStore((state) => state.desktopFileLoaded);

  const onDrag: DraggableEventHandler = useCallback(
    (e, data) => {
      setVideoBeingDragged(video.id);
      setIsHovering(false);
    },
    [setVideoBeingDragged, video.id]
  );

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      desktopFileLoaded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DragWrapper
      nodeRef={nodeRef}
      onStart={onDrag}
      onStop={() => {setTimeout(() => setVideoBeingDragged(undefined), 100)}}
      dragID={slugify(video.id, { strict: true, remove: /[*+~.()'"!:@%]/g })}
    >
      <div
        className="desktopFile"
        style={{ position: "absolute", top: (initPos.current.x || 50) + "%", left: (initPos.current.y || 50) + "%" }}
        ref={nodeRef}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <div style={{ position: "relative" }} className={classNames({ noselect: true, noevents: true , imageHolder: true})}>
          { isHovering && <video
            src={video.videoSrc}
            muted={muteVideo}
            autoPlay
            loop
            playsInline
          />}
          <picture
            ref={imageRef}
            onLoad={() => {
              desktopFileLoaded();
            }}
            key={`img-${video.id}`}
          >
            <source srcSet={video.webpSrc} type="image/webp" />
            <img src={video.pngSrc} alt={`Thumbnail for ${video.id}`} />
          </picture>
          <div>
            <div className="caption"> <span> {isHovering  ? video.id + ".mp4": video.id.substring(0,10) + "..."}</span></div>
          </div>
        </div>
      </div>
    </DragWrapper>
  );
};

export default DesktopVideoFile;
