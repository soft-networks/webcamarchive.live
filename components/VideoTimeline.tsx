/* eslint-disable @next/next/no-img-element */
import classnames from "classnames";
import { useDragManager } from "../providers/DragManagerProvider";
import { NUM_VIDEO, useMergedVideo } from "../providers/MergedVideoProvider";
import videoInfo from "../lib/videoInfo";

interface VideoTimelineProps {
  videoNumber: number;
  sliderPos: number;
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({ videoNumber, sliderPos }) => {
  const generateDropZones = () => {
    let dropZones = [];
    for (let i = 0; i < NUM_VIDEO; i++) {
      dropZones.push(<VideoDropZone key={i} dropZoneNumber={i} />);
    }
    return dropZones;
  };
  return (
    <div className="videoTimelineContainer"> 
      <div style={{ left: `${sliderPos * 100}%` }} className="timelineCursor"></div>
      <div className="videoTimeline">{generateDropZones()}</div>
    </div>
  );
};

interface VideoDropZoneProps {
  dropZoneNumber: number;
}
const VideoDropZone: React.FC<VideoDropZoneProps> = ({ dropZoneNumber }) => {
  const { amDraggingGlobal, videoBeingDragged, setVideoBeingDragged } = useDragManager();
  const { mergeVideoAtIndex, mergedVideoList } = useMergedVideo();

  const dropped = () => {
    if (amDraggingGlobal && videoBeingDragged) {
      mergeVideoAtIndex(dropZoneNumber, videoBeingDragged);
      setVideoBeingDragged(undefined);
    }
  };
  return (
    <div style={{ width: 1000 / NUM_VIDEO + "%", height: "100%" }} onMouseUp={() => dropped()}>
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
    <div
      className={classnames({ videoDropZone: true, hasVideo: video !== undefined })}
      style={{ height: "100%", width: "100%", position: "relative", overflow: "hidden"}}
    >
      <div className="caption videoNumber"> {dropZonenumber + 1}</div>
      {video !== undefined ? <img className="poster" src={video.imageSrc} alt={`Thumbnail for ${video.id}`} /> : ""}
    </div>
  );
};

export default VideoTimeline;
