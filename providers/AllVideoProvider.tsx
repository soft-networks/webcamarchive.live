import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import { getAllVideoList } from "../lib/vidData";
import DragManagerProvider from "./DragManagerProvider";
import { useSetLoadingPercent } from "./LoadingGate";

interface AllVideoContextType {
  desktopVideoIDs: string[];
  removeVideoFromDesktop: (id: string) => void;
  addVideoToDesktop: (id: string) => void;
  desktopImageLoaded: () => void;
}
export const AllVideoContext = createContext<AllVideoContextType>({
  desktopVideoIDs: [],
  removeVideoFromDesktop: () => {},
  addVideoToDesktop: () => {},
  desktopImageLoaded: () => {},
});


const AllVideoProvider = ({ children }: { children: React.ReactNode }) => {
  
  const allVideos = useRef<{ [key: string]: Video }>({});

  const [desktopVideoIDs, setDesktopVideoIDs] = useState<string[]>([]);
  const [numLoaded, setNumLoaded] = useState<number>(0);
  const {setLoadingPercent} = useSetLoadingPercent();
  const desktopImageLoaded = useCallback(() => {
    setNumLoaded( p => p + 1);
    
  }, [setNumLoaded]);

  useEffect(() => {
    if (desktopVideoIDs.length > 0) {
        setLoadingPercent(numLoaded / desktopVideoIDs.length);
    }
  }, [numLoaded, desktopVideoIDs, setLoadingPercent]);
  
  const removeVideoFromDesktop = (id: string) => {
    if (id) {
      setDesktopVideoIDs((c) => c.filter((v) => v !== id));
    } 
  }
  const addVideoToDesktop = (id: string) => {
    if (allVideos.current?.[id] !== undefined) {
      setDesktopVideoIDs((c) => c.indexOf(id) == -1 ? [...c, id] : c);
    } else {
      console.log("video not found", id);
    }
  };
  useEffect(() => {
    let videoList = getAllVideoList(); //TODO: get from server

    let allv: { [key: string]: Video } = {};
    let dv: string[] = [];

    for (let i = 0; i < videoList.length; i++) {
      let vid = videoList[i];
      allv[vid.id] = vid;
      dv.push(vid.id);
    }
    allVideos.current = allv;
    setDesktopVideoIDs(dv);
  }, [setDesktopVideoIDs]);
  return (
    <AllVideoContext.Provider value={{ desktopVideoIDs, removeVideoFromDesktop, addVideoToDesktop,  desktopImageLoaded }}>
      <DragManagerProvider>{children}</DragManagerProvider>
    </AllVideoContext.Provider>
  );
};

export const useAllVideos = () => {
  const allVideos = React.useContext(AllVideoContext);
  return allVideos;
};



export default AllVideoProvider;
