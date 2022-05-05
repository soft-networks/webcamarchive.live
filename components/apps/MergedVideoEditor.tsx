/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import MergedVideoProvider, { NUM_VIDEO, useMergedVideo, VIDEO_LENGTH } from "../../providers/MergedVideoProvider";
import MergedVideoPlayer from "../ui/MergedVideoViewer";
import VideoTimeline from "../ui/MergedVideoTimeline";
import DragWrapper from "../DragWrapper";
import useLoadingStore from "../../stores/ThumbnailLoadingStore";
import useVideoDragStore from "../../stores/VideoDragStore";
import { usePageVisibility } from 'react-page-visibility';


const MergedVideoEditor : React.FC = () => {

  const [videoNumber, setVideoNumber] = useState(0);
  const [sliderPos, setSliderPos] = useState(0);
  const myRef = useRef<HTMLDivElement>(null);
  const elapsedTime = useRef<number>(0);
  const [pause, setPause] = useState(false);
  const loaded = useLoadingStore(state => state.loaded);
  const amDraggingGlobal = useVideoDragStore(useCallback(state => state.amDraggingGlobal, []));
  
  const pageIsVisible = usePageVisibility();

  useEffect(() => {
    if (pageIsVisible == false) {
      setPause(true);
    }
  }, [pageIsVisible])
  const updateTime = useCallback(() => {
    if (pause == false) {
      elapsedTime.current += 100;
      const elapsedVideos = Math.floor(elapsedTime.current / VIDEO_LENGTH);
      const videoNum = elapsedVideos % NUM_VIDEO;
      const totalVideoLength = NUM_VIDEO * VIDEO_LENGTH;
      const sliderPos = (elapsedTime.current % totalVideoLength) / totalVideoLength;
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
      <div id="videoEditor" className="app" ref={myRef}>
        <div className="handle">
          <div className="icon"></div>
          <div className="title">Movie on 06-03-22 at 1.00 PM</div>
        </div>
        <MergedVideoProvider>
         <MergedVideoPlayer videoNumber={videoNumber} />
         <div className="videoTimelineContainer"> 
        
          <div style={{ left: `${sliderPos * 100}%` }} className="timelineCursor" onClick={() => setPause(!pause)}>
            {pause ?   <img src="/icons/play.png" alt="play icon"/> : <img src="/icons/pause.png" alt="pause-icon"/>} 
          </div>
          { amDraggingGlobal && <div className="videoTimelineGuide">
            <span> drop video here!</span>
          </div>}
            <VideoTimeline/>
          </div>
        </MergedVideoProvider>
      </div>
    </DragWrapper> : null
  );
};

export default MergedVideoEditor;
