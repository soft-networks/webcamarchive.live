import Desktop from "../components/Desktop";
import AllVideoProvider from "../providers/AllVideoProvider";
import MergedVideoProvider from "../providers/MergedVideoProvider";
import MuteVideoGate from "../providers/MuteVideoGate";
import VideoEditor from "../components/VideoEditor";
import LoadingGate from "../providers/LoadingGate";

const VideoExperience = () => {
  return (
    <LoadingGate>
      <AllVideoProvider>
        <MergedVideoProvider>
          <MuteVideoGate>
            <Desktop />
            <VideoEditor />
          </MuteVideoGate>
        </MergedVideoProvider>
      </AllVideoProvider>
    </LoadingGate>
  );
};


export default VideoExperience;