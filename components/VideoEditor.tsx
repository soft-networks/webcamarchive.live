import { useEffect, useRef, useState } from "react";
import { NUM_VIDEO, useMergedVideo, VIDEO_LENGTH } from "../providers/MergedVideoProvider";
import VideoPreview from "./VideoPreview";
import VideoTimeline from "./VideoTimeline";
import Draggable from "react-draggable";

const VideoEditor : React.FC = () => {

  const [videoNumber, setVideoNumber] = useState(0);
  const [sliderPos, setSliderPos] = useState(0);

  const startDate = useRef<number>(Date.now());

  
  useEffect(() => {
    const animateSlider = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - startDate.current;
      const elapsedVideos = Math.floor(elapsedTime / VIDEO_LENGTH);
      const videoNum = elapsedVideos % NUM_VIDEO;
      const totalVideoLength = NUM_VIDEO * VIDEO_LENGTH;
      const sliderPos = (elapsedTime %  totalVideoLength) / totalVideoLength;
      setVideoNumber(videoNum);
      setSliderPos(sliderPos);
    }, 100);
    return () => clearInterval(animateSlider);
  }, []);

  return (
    <Draggable handle=".handle">
      <div className="videoEditor">
        <div className="handle"> ••• </div>
        <VideoPreview videoNumber={videoNumber} />
        <VideoTimeline videoNumber={videoNumber} sliderPos={sliderPos}/>
      </div>
    </Draggable>
  );
};

export default VideoEditor;
