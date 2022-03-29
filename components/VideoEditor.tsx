import { useEffect, useRef, useState } from "react";
import { useMergedVideo, VIDEO_LENGTH } from "../providers/MergedVideoProvider";
import VideoPreview from "./VideoPreview";
import VideoTimeline from "./VideoTimeline";

const VideoEditor : React.FC = () => {

  const [videoNumber, setVideoNumber] = useState(0);
  const [sliderPos, setSliderPos] = useState(0);

  const startDate = useRef<number>(Date.now());

  const {numVideo} = useMergedVideo();
  
  useEffect(() => {
    const animateSlider = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - startDate.current;
      const elapsedVideos = Math.floor(elapsedTime / VIDEO_LENGTH);
      const videoNum = elapsedVideos % numVideo;
      const totalVideoLength = numVideo * VIDEO_LENGTH;
      const sliderPos = (elapsedTime %  totalVideoLength) / totalVideoLength;
      setVideoNumber(videoNum);
      setSliderPos(sliderPos);
    }, 100);
    return () => clearInterval(animateSlider);
  }, [numVideo]);

  return (
    <div className="videoEditor">
      <VideoPreview videoNumber={videoNumber} />
      <VideoTimeline videoNumber={videoNumber} sliderPos={sliderPos}/>
    </div>
  );
};

export default VideoEditor;
