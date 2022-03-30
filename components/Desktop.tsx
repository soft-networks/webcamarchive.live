/* eslint-disable @next/next/no-img-element */
import { useAllVideos } from "../providers/AllVideoProvider";
import DesktopVideoFile from "./DesktopVideoFile";

const Desktop: React.FunctionComponent = () => {
  const {desktopVideoIDs, getVideoById} = useAllVideos();

  return (
    <div className="fullBleed hideOverflow" >
      {desktopVideoIDs.map((vid) => (
        <DesktopVideoFile key={vid + "-thumb"} video={getVideoById(vid)}/>
      ))}
    </div>
  );
};


export default Desktop;
