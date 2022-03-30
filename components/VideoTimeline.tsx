/* eslint-disable @next/next/no-img-element */
import classnames from "classnames";
import { useAllVideos } from "../providers/AllVideoProvider";
import { useDragManager } from "../providers/DragManagerProvider";
import { NUM_VIDEO, useMergedVideo } from "../providers/MergedVideoProvider";

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
  const { setVideoAtIndex, videoList } = useMergedVideo();
  const { removeVideoFromDesktop, addVideoToDesktop } = useAllVideos();

  const dropped = () => {
    console.log("Eyy");
    if (amDraggingGlobal && videoBeingDragged !== null) {
      let oldVideo = videoList[dropZoneNumber];
      setVideoAtIndex(dropZoneNumber, videoBeingDragged);
      setVideoBeingDragged(null);
      removeVideoFromDesktop(videoBeingDragged);
      if (oldVideo !== null) {
        addVideoToDesktop(oldVideo);
      }
    }
  };
  return (
    <div style={{ width: 1000 / NUM_VIDEO + "%", height: "100%" }} onMouseUp={() => dropped()}>
      <VideoEditorThumbnail videoID={videoList[dropZoneNumber]} dropZonenumber={dropZoneNumber} />
    </div>
  );
};

interface VideoEditorThumbnailProps {
  videoID: string | null;
  dropZonenumber: number;
}

const VideoEditorThumbnail: React.FC<VideoEditorThumbnailProps> = ({ videoID, dropZonenumber }) => {
  const { getVideoById } = useAllVideos();
  const video = videoID ? getVideoById(videoID) : null;

  return (
    <div
      className={classnames({ videoDropZone: true, hasVideo: video !== null })}
      style={{ height: "100%", width: "100%", position: "relative", overflow: "hidden"}}
    >
      <div className="caption videoNumber"> {dropZonenumber + 1}</div>
      {video !== null ? <img className="poster" src={video.imageSrc} alt={`Thumbnail for ${video.id}`} /> : null}
    </div>
  );
};

export default VideoTimeline;
