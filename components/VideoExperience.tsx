import Desktop from "../components/Desktop";
import MergedVideoProvider from "../providers/MergedVideoProvider";

import VideoEditor from "../components/VideoEditor";
import LoadingScreen from "./LoadingGate";
import MuteButton from "./MuteVideoButton";

const VideoExperience = () => {
  return (
    <>
      <LoadingScreen />
      <MuteButton />
      <MergedVideoProvider>
        <Desktop />
        <VideoEditor />
      </MergedVideoProvider>
    </>
  );
};

export default VideoExperience;
