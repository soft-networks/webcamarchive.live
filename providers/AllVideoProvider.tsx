import React, { createContext, useEffect, useState } from "react";
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
  const [allVideos, setAllVideos] = useState<{ [key: string]: Video }>({});

  const [desktopVideoIDs, setDesktopVideoIDs] = useState<string[]>([]);

  const getVideoById = (id: string): Video => {
    return allVideos[id];
  };
  const removeVideoFromDesktop = (id: string) => {
    setDesktopVideoIDs((c) => c.filter((vid) => vid !== id));
  };
  const addVideoToDesktop = (id: string) => {
    setDesktopVideoIDs((c) => [...c, id]);
  };

  useEffect(() => {
    let videoList = testVideoList(); //TODO: get from server

    let allv: { [key: string]: Video } = {};
    let dv: string[] = [];

    for (let i = 0; i < videoList.length; i++) {
      let vid = videoList[i];
      allv[vid.id] = vid;

      //TODO: IF this video is NOT in the editor, add it to desktop
      //NOTE THAT if i've removed it locally, it may already be in the editor though ill figure it out later
      dv.push(vid.id);
    }
    setAllVideos(allv);
    setDesktopVideoIDs(dv);
  }, [setAllVideos, setDesktopVideoIDs]);

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
