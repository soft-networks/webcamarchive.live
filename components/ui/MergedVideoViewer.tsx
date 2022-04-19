import { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useMergedVideo } from "../../providers/MergedVideoProvider";
import videoInfo from "../../lib/videoInfo";
import useMuteVideoStore from "../../stores/MuteVideoStore";

interface MergedVideoPlayerProps {
  videoNumber: number;
}
const MergedVideoPlayer: React.FC<MergedVideoPlayerProps> = ({ videoNumber }) => {
  const { mergedVideoList } = useMergedVideo();
  
  return (
    <div>
      {mergedVideoList.map((videoID, index) => {
        let video = videoID ? videoInfo.getVideoById(videoID) : undefined;
        return <IndividualMergedVideoPlayer key={index} video={video} playing={index === videoNumber} />;
      })}
    </div>
  );
};

interface IndividualMergedVideoPlayerProps {
  playing: boolean;
  video?: Video;
}

const IndividualMergedVideoPlayer: React.FunctionComponent<IndividualMergedVideoPlayerProps> = ({ playing, video }) => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const muteVideo = useMuteVideoStore( useCallback(state => state.muteVideo , [] ));

  useEffect(() => {
    if (videoPlayerRef.current) {
      if (playing) {
          videoPlayerRef.current.play();
      } else {
        videoPlayerRef.current.pause();
      }
    }
  }, [playing]);
  return (
    <div className={classnames({hide: !playing, previewVideo: true})} >
      {video ? (
        <video
          muted={muteVideo || video === undefined}
          src={video.videoSrc}
          ref={videoPlayerRef}
          preload={"auto"}
          poster={video ? video.imageSrc : ""}
        />
      ) : null}
    </div>
  );
};

export default MergedVideoPlayer;
