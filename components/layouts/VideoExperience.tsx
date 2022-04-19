import Desktop from "../apps/Desktop";
import MergedVideoProvider from "../../providers/MergedVideoProvider";

import MergedVideoEditor from "../apps/MergedVideoEditor";
import LoadingScreen from "../ui/LoadingScreen";
import MuteButton from "../ui/MuteVideoButton";

const VideoExperience = () => {
  return (
    <>
      <LoadingScreen />
      <MuteButton />
      <MergedVideoProvider>
        <Desktop />
        <MergedVideoEditor />
      </MergedVideoProvider>
    </>
  );
};

export default VideoExperience;
