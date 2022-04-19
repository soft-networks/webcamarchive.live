import Desktop from "../apps/Desktop";

import MergedVideoEditor from "../apps/MergedVideoEditor";
import LoadingScreen from "../ui/LoadingScreen";
import MuteButton from "../ui/MuteVideoButton";

const VideoExperience = () => {
  return (
    <>
      <LoadingScreen />
      <MuteButton />
      <Desktop />
      <MergedVideoEditor />
    </>
  );
};

export default VideoExperience;
