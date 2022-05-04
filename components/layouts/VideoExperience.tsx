import Desktop from "../apps/Desktop";

import MergedVideoEditor from "../apps/MergedVideoEditor";
import BackgroundButton from "../ui/BackgroundButton";
import LoadingScreen from "../ui/LoadingScreen";
import MuteButton from "../ui/MuteVideoButton";

const VideoExperience = () => {
  return (
    <>
      <LoadingScreen />

      <Desktop />
      <MergedVideoEditor />
    </>
  );
};

export default VideoExperience;
