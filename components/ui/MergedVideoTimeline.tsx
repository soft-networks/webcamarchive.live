/* eslint-disable @next/next/no-img-element */
import classnames from "classnames";
import { NUM_VIDEO, useMergedVideo } from "../../providers/MergedVideoProvider";
import videoInfo from "../../lib/videoInfo";
import { useCallback, useState } from "react";
import useVideoDragStore from "../../stores/VideoDragStore";
import classNames from "classnames";


const VideoTimeline: React.FC = ({ }) => {
  const generateDropZones = useCallback( () => {
    let dropZones = [];
    for (let i = 0; i < NUM_VIDEO; i++) {
      dropZones.push(<VideoDropZone key={i} dropZoneNumber={i} />);
    }
    return dropZones;
  }, []);
  return (
      <div className="videoTimeline">
        {generateDropZones()}
      </div>
  );
};

interface VideoDropZoneProps {
  dropZoneNumber: number;
}
const VideoDropZone: React.FC<VideoDropZoneProps> = ({ dropZoneNumber }) => {
  const amDraggingGlobal = useVideoDragStore(useCallback(state => state.amDraggingGlobal, []));
  const videoBeingDragged = useVideoDragStore(useCallback(state => state.videoBeingDragged, []));
  const setVideoBeingDragged = useVideoDragStore(useCallback(state => state.setVideoBeingDragged, []));
  const [isHover, setIsHover] = useState(false);

  const { mergeVideoAtIndex, mergedVideoList } = useMergedVideo();

  const dropped = () =>  {
    console.log("dropped", amDraggingGlobal, videoBeingDragged);
    if (amDraggingGlobal && videoBeingDragged) {
      
      mergeVideoAtIndex(dropZoneNumber, videoBeingDragged);
      setVideoBeingDragged(undefined);
    }
  }

  return (
    <div className={classNames({videoTimelineThumb: true, isHovering: isHover})} onMouseUp={() => dropped()} onMouseOver={e => setIsHover(true)} onMouseOut={e => setIsHover(false)}>
      <VideoEditorThumbnail videoID={mergedVideoList[dropZoneNumber]} dropZonenumber={dropZoneNumber} />
    </div>
  );
};

interface VideoEditorThumbnailProps {
  videoID: string | undefined;
  dropZonenumber: number;
}

const VideoEditorThumbnail: React.FC<VideoEditorThumbnailProps> = ({ videoID, dropZonenumber }) => {
  const video = videoID ? videoInfo.getVideoById(videoID) : undefined;

  return (
    <div className={classnames({ videoDropZone: true, hasVideo: video !== undefined })}>
      <div className="caption videoNumber"> {dropZonenumber + 1}</div>
      {video && (
        <div className="poster">
          <picture>
            <source srcSet={video.webpSrc} type="image/webp" />
            <img src={video.pngSrc} alt={`Thumbnail for ${video.id}`} />
          </picture>
        </div>
      )}
    </div>
  );
};

export default VideoTimeline;
