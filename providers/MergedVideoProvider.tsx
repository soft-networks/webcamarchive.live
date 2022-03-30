import React, { createContext, useEffect, useState } from "react";
import { testVideoList } from "../lib/testData";


export const VIDEO_LENGTH = 1000;
export const NUM_VIDEO = 30;
export interface MergedVideoContextType {
  videoList: (string|null)[],
  setVideoAtIndex: (index: number, videoID: string) => void
}
export const MergedVideoContext = createContext<MergedVideoContextType>({
  videoList: [],
  setVideoAtIndex: () => {},
});

const MergedVideoProvider = ({ children }: { children: React.ReactNode }) => {

  const [videoList, setVideoList] = useState< (string | null)[]>([]);


  useEffect(()=> {
    let vl = [];
    for (let i =0; i < NUM_VIDEO; i++) {
      vl.push(null);
    }
    setVideoList(vl);
  }, [])


  const setVideoAtIndex = (index: number, videoID: string) => {
    setVideoList( c => {
      c[index] = videoID;
      console.log("Updated video list to", c);
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

