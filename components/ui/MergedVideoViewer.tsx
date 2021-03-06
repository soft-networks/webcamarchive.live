import { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useMergedVideo } from "../../providers/MergedVideoProvider";
import videoInfo from "../../lib/videoInfo";
import useMuteVideoStore from "../../stores/MuteVideoStore";

interface MergedVideoPlayerProps {
  videoNumber: number;
  localMuted?: boolean;
}
const MergedVideoPlayer: React.FC<MergedVideoPlayerProps> = ({ videoNumber, localMuted }) => {
  const { mergedVideoList } = useMergedVideo();
  
  return (
    <div className="videoPlayer">
      {mergedVideoList.map((videoID, index) => {
        let video = videoID ? videoInfo.getVideoById(videoID) : undefined;
        return <IndividualMergedVideoPlayer key={index} video={video} playing={index === videoNumber } localMuted={localMuted} />;
      })}
    </div>
  );
};

interface IndividualMergedVideoPlayerProps {
  playing: boolean;
  video?: Video;
  localMuted?: boolean;
}

const IndividualMergedVideoPlayer: React.FunctionComponent<IndividualMergedVideoPlayerProps> = ({ playing, video, localMuted }) => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const muteVideo = useMuteVideoStore( useCallback(state => state.muteVideo , [] ));
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (videoPlayerRef.current && videoLoaded) {
      if (playing) {
          videoPlayerRef.current.currentTime = 0;
          videoPlayerRef.current.play();
      } else {
        videoPlayerRef.current.pause();
        videoPlayerRef.current.currentTime = 0;
      }
    }
  }, [playing, videoLoaded]);
  return (
    <div className={classnames({hide: !playing, previewVideo: true})} >
      {!videoLoaded && video && <div className="loading-indicator">Loading...</div>}
      {video ? (
        <video
          muted={localMuted || muteVideo || !playing || video === undefined}
          ref={videoPlayerRef}
          onLoadedData={() => setVideoLoaded(true)}
          src={video.videoSrc}
          autoPlay={playing}
          preload="auto"
        /> 
      ) : null}
    </div>
  );
};

export default MergedVideoPlayer;
