import Chat from "../apps/Chat";
import VideoExperience from "./VideoExperience";
import Stream from "../apps/Stream";
import Settings from "../apps/Settings";
import { isMobile } from 'react-device-detect';


const FullExperience = () => {
  return (
    <>
      <Chat chatRoom="editors" roomName="Editors" />
      <Stream/>
      {!isMobile && <VideoExperience /> }
      <Settings />
    </>
  );
};


export default FullExperience;
