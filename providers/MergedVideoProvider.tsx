import React, { createContext, useEffect, useState } from "react";
import { testVideoList } from "../lib/testData";


export const VIDEO_LENGTH = 1000;

export interface MergedVideoContextType {
  videoList: VideoList,
  setVideoAtIndex: (index: number, video: Video) => void,
  numVideo: number
}
export const MergedVideoContext = createContext<MergedVideoContextType>({
  videoList: [],
  setVideoAtIndex: () => {},
  numVideo: 0,
});

const MergedVideoProvider = ({ children }: { children: React.ReactNode }) => {

  const [videoList, setVideoList] = useState<VideoList>([]);
  const [numVideo, setNumVideo] = useState<number>(0);

  useEffect(()=> {
    setVideoList( testVideoList());
  }, [])

  useEffect(() => {
    setNumVideo(videoList.length);
  }, [videoList])

  const setVideoAtIndex = (index: number, video: Video) => {
    setVideoList( c => {
      c[index] = video;
      console.log("Updated video list to", c);
      return [...c];
    })
  }
  return (
    <>
      <MergedVideoContext.Provider value={{ videoList: videoList, setVideoAtIndex, numVideo }}>
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

