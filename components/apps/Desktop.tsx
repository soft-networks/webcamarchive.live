import videoInfo from "../../lib/videoInfo";
import DesktopVideoFile from "../ui/DesktopVideoFile";

const Desktop: React.FunctionComponent = () => {
  const desktopVideoIDs = videoInfo.getAllIDs();

  return (
    <div className="fullBleed hideOverflow backgroundHolder" >
      {desktopVideoIDs.map((vid) => (
        <DesktopVideoFile key={vid + "-thumb"} id={vid}/>
      ))}
    </div>
  );
};


export default Desktop;
