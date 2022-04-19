/* eslint-disable @next/next/no-img-element */

import videoInfo from "../providers/VideoInfo";
import useDesktopVideoStore from "../stores/DesktopVideoStore";
import DesktopVideoFile from "./DesktopVideoFile";

const Desktop: React.FunctionComponent = () => {
  const desktopVideoIDs = videoInfo.getAllIDs();

  return (
    <div className="fullBleed hideOverflow" >
      {desktopVideoIDs.map((vid) => (
        <DesktopVideoFile key={vid + "-thumb"} id={vid}/>
      ))}
    </div>
  );
};


export default Desktop;
