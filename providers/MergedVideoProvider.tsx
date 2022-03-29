import React, { createContext, useEffect, useState } from "react";
import { testVideoList } from "../lib/testData";


export const VIDEO_LENGTH = 1000;

export interface MergedVideoContextType {
  videoList: VideoList,
  setVideoAtIndex: (index: number, video: Video) => void,
}
export const MergedVideoContext = createContext<MergedVideoContextType>({ videoList: [], setVideoAtIndex: () => {} });

const MergedVideoProvider = ({ children }: { children: React.ReactNode }) => {

  const [videoList, setVideoList] = useState<VideoList>([]);

  useEffect(()=> {
    setVideoList( testVideoList());
  }, [])

  const setVideoAtIndex = (index: number, video: Video) => {
    setVideoList( c => {
      c[index] = video;
      return [...c];
    })
  }
  return (
    <>
      <MergedVideoContext.Provider value={{ videoList: videoList, setVideoAtIndex }}>
        {children}
      </MergedVideoContext.Provider>
    </>
  );
};

export const useMergedVideo = () => {
  const videoList = React.useContext(MergedVideoContext);
  return videoList;
}

export default MergedVideoProvider;

