import { useDragManager } from "../providers/DragManagerProvider";
import { useMergedVideo } from "../providers/MergedVideoProvider";

interface VideoTimelineProps {
  videoNumber: number;
  sliderPos: number;
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({ videoNumber, sliderPos }) => {

  const numVideo = 10;

  const generateDropZones = () => {
    let dropZones = [];
    for (let i = 0; i < numVideo; i++) {
      dropZones.push(<VideoDropZone key={i} dropZoneNumber={i} />)  
    }
    return dropZones;
  }


  return (
    <div >
      <div style={{ left: `${sliderPos * 100}%` }} className="sliderCursor"></div>
      <div className="videoTimeline" >
        { generateDropZones() }
      </div>
    </div>
  );
};


interface VideoDropZoneProps {
  dropZoneNumber: number,
}
const VideoDropZone : React.FC<VideoDropZoneProps> = ({dropZoneNumber}) => {
  const {amDraggingGlobal, videoBeingDragged} = useDragManager();
  const {setVideoAtIndex} = useMergedVideo();

  const dropped = () =>{
    console.log("Eyy");
    if (amDraggingGlobal) {
      if (videoBeingDragged !== null) {
        console.log("YOU DROPPED THAT VIDEO SON IN NUMBER" + dropZoneNumber);
        console.log(videoBeingDragged);
        setVideoAtIndex(dropZoneNumber, videoBeingDragged);
      }
    }
  }
  return (
    <div style={{width: "3%", height: "100%"}} className="videoDropZone" onMouseUp={() => dropped()}>
      {dropZoneNumber}
    </div>
  )
}

export default VideoTimeline;
