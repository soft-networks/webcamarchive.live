import Chat from "../apps/Chat";
import VideoExperience from "./VideoExperience";
import Stream from "../apps/Stream";
import Settings from "../apps/Settings";

const FullExperience = () => {
  return (
    <>
      <Chat chatRoom="editors" roomName="Editors" />
      <VideoExperience />
      <Stream/>
      <Settings/>
    </>
  );
};


export default FullExperience;
