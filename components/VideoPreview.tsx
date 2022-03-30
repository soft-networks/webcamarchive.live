import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useMergedVideo, VIDEO_LENGTH } from "../providers/MergedVideoProvider";
import { useAllVideos } from "../providers/AllVideoProvider";
import { TEST_STATIC_URL } from "../lib/testData";


const VS = [1080, 720];
interface VideoPreviewProps {
  videoNumber: number;
}
const VideoPreview: React.FC<VideoPreviewProps> = ({ videoNumber }) => {
  const { videoList } = useMergedVideo();
  const {getVideoById} = useAllVideos();
  return (
    <div>
      {videoList.map((video, index) => (
          <VideoPreviewPlayer key={index} video={ video ? getVideoById(video) : null} playing={index === videoNumber} /> ))}
    </div>
  );
};

interface VideoPreviewPlayerProps {
  playing: boolean;
  video: Video | null;
}

const VideoPreviewPlayer: React.FunctionComponent<VideoPreviewPlayerProps> = ({ playing, video }) => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [muteVids, setMuteVids] = useState<boolean>(true);
  useEffect(() => {
    document.addEventListener("click", () => setMuteVids(false));
  })
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
    <video muted={muteVids || (video === null)} src={video ? video.videoSrc : TEST_STATIC_URL} ref={videoPlayerRef} className={classnames({ hide: !playing, previewVideo: true })} />
  );
};

export default VideoPreview;
