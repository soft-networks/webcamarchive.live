import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useMergedVideo, VIDEO_LENGTH } from "../providers/MergedVideoProvider";

const VideoPreview: React.FunctionComponent = ({}) => {
  const {videoList} = useMergedVideo();
  const [videoNumber, setVideoNumber] = useState(0);
  const [sliderPos, setSliderPos] = useState(0);

  const startDate = useRef<number>(Date.now());


  useEffect(() => {
    console.log(videoList);
    const animateSlider = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - startDate.current;
      const elapsedVideos = Math.floor(elapsedTime / VIDEO_LENGTH);
      const videoNum = elapsedVideos % videoList.length;
      const totalVideoLength = videoList.length * VIDEO_LENGTH;
      const sliderPos = (elapsedTime %  totalVideoLength) / totalVideoLength;
      setVideoNumber(videoNum);
      setSliderPos(sliderPos);
    }, 100);
    return () => clearInterval(animateSlider);
  }, [setVideoNumber, videoList]);

  return (
    <div className="previewPlayer">
      <div>
      <div> Number: {videoNumber}</div>
      <div style={{position: "absolute", left: `${sliderPos * 100}%` }} className="sliderCursor"> </div>
      </div>
      <div>
        {videoList.map((video, index) => (
          <VideoPreviewPlayer key={index} videoSrc={video.videoSrc} playing={index === videoNumber} />
        ))}
      </div>
    </div>
  );
};

interface VideoPreviewPlayerProps {
  playing: boolean;
  videoSrc: string;
}

const VideoPreviewPlayer: React.FunctionComponent<VideoPreviewPlayerProps> = ({ playing, videoSrc }) => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoPlayerRef.current) {
      if (playing) {
        try {
          videoPlayerRef.current.play();
        } catch (e) {
          console.error("you need to click somewhere first");
        }
      } else {
        videoPlayerRef.current.pause();
      }
    }
  }, [playing]);
  return <video muted src={videoSrc} ref={videoPlayerRef} className={classnames({ hide: !playing, previewVideo: true })} />;
};

export default VideoPreview;
