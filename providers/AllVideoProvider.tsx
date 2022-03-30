import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import { testVideoList } from "../lib/testData";
import DragManagerProvider from "./DragManagerProvider";

interface AllVideoContextType {
  desktopVideoIDs: string[];
  getVideoById: (id: string) => Video;
  removeVideoFromDesktop: (id: string) => void;
  addVideoToDesktop: (id: string) => void;
}
export const AllVideoContext = createContext<AllVideoContextType>({
  desktopVideoIDs: [],
  getVideoById: () => {
    return {} as Video;
  },
  removeVideoFromDesktop: () => {},
  addVideoToDesktop: () => {},
});

const AllVideoProvider = ({ children }: { children: React.ReactNode }) => {
  
  const allVideos = useRef<{ [key: string]: Video }>({});

  const [desktopVideoIDs, setDesktopVideoIDs] = useState<string[]>([]);
  

  const getVideoById = (id: string): Video => {
    return allVideos.current?.[id];
  };

  const removeVideoFromDesktop = (id: string) => {
    console.log("removing", id);
    if (id) {
      setDesktopVideoIDs((c) => c.filter((v) => v !== id));
    } 
  }
  const addVideoToDesktop = (id: string) => {
    console.log("adding", id);
    if (allVideos.current?.[id] !== undefined) {
      setDesktopVideoIDs((c) => c.indexOf(id) == -1 ? [...c, id] : c);
    } else {
      console.log("video not found", id);
    }
  };

  useEffect(() => {
    let videoList = testVideoList(); //TODO: get from server

    let allv: { [key: string]: Video } = {};
    let dv: string[] = [];

    for (let i = 0; i < videoList.length; i++) {
      let vid = videoList[i];
      allv[vid.id] = vid;
      dv.push(vid.id);
    }
    allVideos.current = allv;
    setDesktopVideoIDs(dv);
    console.log("!!!!!!!!" ,dv);
  }, [setDesktopVideoIDs]);

  return (
    <AllVideoContext.Provider value={{ desktopVideoIDs, removeVideoFromDesktop, addVideoToDesktop, getVideoById }}>
      <DragManagerProvider>{children}</DragManagerProvider>
    </AllVideoContext.Provider>
  );
};

export const useAllVideos = () => {
  const allVideos = React.useContext(AllVideoContext);
  return allVideos;
};

export default AllVideoProvider;
