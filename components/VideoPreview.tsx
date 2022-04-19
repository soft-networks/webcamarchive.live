import { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useMergedVideo } from "../providers/MergedVideoProvider";
import videoInfo from "../lib/videoInfo";
import useMuteVideoStore from "../stores/MuteVideoStore";

interface VideoPreviewProps {
  videoNumber: number;
}
const VideoPreview: React.FC<VideoPreviewProps> = ({ videoNumber }) => {
  const { mergedVideoList } = useMergedVideo();
  
  return (
    <div>
      {mergedVideoList.map((videoID, index) => {
        let video = videoID ? videoInfo.getVideoById(videoID) : undefined;
        return <VideoPreviewPlayer key={index} video={video} playing={index === videoNumber} />;
      })}
    </div>
  );
};

interface VideoPreviewPlayerProps {
  playing: boolean;
  video?: Video;
}

const VideoPreviewPlayer: React.FunctionComponent<VideoPreviewPlayerProps> = ({ playing, video }) => {
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

// interface StaticVideoPlayerProps {}
// const StaticVideoPlayer: React.FC<StaticVideoPlayerProps> = ({}) => {
//   return (
//     <div style={{ width: "100%" }}>
//       <div style={{ paddingBottom: "66.66%" }}></div>
//     </div>
//   );
// };

export default VideoPreview;
