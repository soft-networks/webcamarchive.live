import { useCallback, useEffect, useRef, useState } from "react";
import MergedVideoProvider, { NUM_VIDEO, useMergedVideo, VIDEO_LENGTH } from "../../providers/MergedVideoProvider";
import MergedVideoPlayer from "../ui/MergedVideoViewer";
import VideoTimeline from "../ui/MergedVideoTimeline";
import DragWrapper from "../DragWrapper";
import useLoadingStore from "../../stores/ThumbnailLoadingStore";

const MergedVideoEditor : React.FC = () => {

  const [videoNumber, setVideoNumber] = useState(0);
  const [sliderPos, setSliderPos] = useState(0);
  const myRef = useRef<HTMLDivElement>(null);
  const startDate = useRef<number>(Date.now());
  const [pause, setPause] = useState(false);
  const loaded = useLoadingStore(state => state.loaded);

  const updateTime = useCallback(() => {
    if (pause == false) {
      const now = Date.now();
      const elapsedTime = now - startDate.current;
      const elapsedVideos = Math.floor(elapsedTime / VIDEO_LENGTH);
      const videoNum = elapsedVideos % NUM_VIDEO;
      const totalVideoLength = NUM_VIDEO * VIDEO_LENGTH;
      const sliderPos = (elapsedTime % totalVideoLength) / totalVideoLength;
      setVideoNumber(videoNum);
      setSliderPos(sliderPos);
    }
  }, [pause])

  useEffect(() => {
    const animateSlider = setInterval(() => {
      updateTime();
    }, 100);
    return () => clearInterval(animateSlider);
  }, [updateTime]);


  return (
    loaded ? <DragWrapper handle=".handle" nodeRef={myRef} dragID={"EDITOR"}>
      <div className="videoEditor" ref={myRef}>
        <div className="handle"> •••</div>
        <div onClick={ () => setPause(!pause)} className="pause button"> {pause ? "unpause" : "pause" } </div>
        <MergedVideoProvider>
         <MergedVideoPlayer videoNumber={videoNumber} />
          <VideoTimeline videoNumber={videoNumber} sliderPos={sliderPos}/>
        </MergedVideoProvider>
      </div>
    </DragWrapper> : null
  );
};

export default MergedVideoEditor;
