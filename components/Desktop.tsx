/* eslint-disable @next/next/no-img-element */
import { useAllVideos } from "../providers/AllVideoProvider";
import videoInfo from "../providers/VideoInfo";
import DesktopVideoFile from "./DesktopVideoFile";

const Desktop: React.FunctionComponent = () => {
  const {desktopVideoIDs} = useAllVideos();

  return (
    <div className="fullBleed hideOverflow" >
      {desktopVideoIDs.map((vid) => (
        <DesktopVideoFile key={vid + "-thumb"} video={videoInfo.getVideoById(vid)}/>
      ))}
    </div>
  );
};


export default Desktop;
