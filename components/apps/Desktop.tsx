import { useRouter } from "next/router";
import { useCallback } from "react";
import videoInfo from "../../lib/videoInfo";
import getPreCalcRnd from "../../lib/vidPos";
import DesktopVideoFile from "../ui/DesktopVideoFile";

const Desktop: React.FunctionComponent = () => {
  const desktopVideoIDs = videoInfo.getAllIDs();

  const { pathname } = useRouter();

  const getiP = useCallback((i) => {
    if (pathname == "/preview" || pathname == "/writer") {
      return getPreCalcRnd(i);
    } else {
      return undefined;
    }
  }, [pathname]);

  return (
    <div className="fullBleed hideOverflow " >
      {desktopVideoIDs.map((vid, index) => (
        <DesktopVideoFile key={vid + "-thumb"} id={vid} iP={getiP(index)}/>
      ))}
    </div>
  );
};


export default Desktop;
