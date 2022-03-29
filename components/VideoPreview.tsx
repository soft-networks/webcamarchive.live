import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useMergedVideo, VIDEO_LENGTH } from "../providers/MergedVideoProvider";

interface VideoPreviewProps {
  videoNumber: number;
}
const VideoPreview: React.FC<VideoPreviewProps> = ({ videoNumber }) => {
  const { videoList } = useMergedVideo();

  return (
    <div>
      {videoList.map((video, index) => (
        <VideoPreviewPlayer key={index} videoSrc={video.videoSrc} playing={index === videoNumber} />
      ))}
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
  return (
    <video muted src={videoSrc} ref={videoPlayerRef} className={classnames({ hide: !playing, previewVideo: true })} />
  );
};

export default VideoPreview;
