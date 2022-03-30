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
  const { mergedVideoList: videoList } = useMergedVideo();
  const { getVideoById } = useAllVideos();
  return (
    <div>
      <StaticVideoPlayer playing={videoList[videoNumber] == undefined} />
      {videoList.map((video, index) =>
        video ? <VideoPreviewPlayer key={index} video={getVideoById(video)} playing={index === videoNumber} /> : ""
      )}
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
    const unmuteme = () => setMuteVids(false);
    let listener = document.addEventListener("click", unmuteme );
    return () => document.removeEventListener("click", unmuteme);
  });
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
    <video
      muted={muteVids || video === undefined}
      src={video ? video.videoSrc : TEST_STATIC_URL}
      ref={videoPlayerRef}
      className={classnames({ hide: !playing, previewVideo: true })}
      preload={"auto"}
    />
  );
};

interface StaticVideoPlayerProps {
  playing: boolean;
}
const StaticVideoPlayer: React.FC<StaticVideoPlayerProps> = ({ playing }) => {
  return (
    <video
      muted
      autoPlay
      src={TEST_STATIC_URL}
      className={classnames({ hide: !playing, previewVideo: true })}
      preload={"auto"}
      loop
    />
  );
};

export default VideoPreview;
