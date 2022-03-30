import React, { createContext, useEffect, useState } from "react";
import { setMergedVideo, syncMergedVideos } from "../lib/firebase";
import { testVideoList } from "../lib/testData";
import { useAllVideos } from "./AllVideoProvider";


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
  const {removeVideoFromDesktop, addVideoToDesktop} = useAllVideos();

  useEffect(()=> {
    //Initialize to null
    let vl = [];
    for (let i =0; i < NUM_VIDEO; i++) {
      vl.push(null);
    }
    setVideoList(vl);
  }, []);

  const videoSwappedIntoTimeline = (oldid: string | null, newid: string | null)  => {
    if (oldid) {
      addVideoToDesktop(oldid);
    }
    if (newid) {
      removeVideoFromDesktop(newid);
    }
    
  }

  useEffect(() => {
    //sync to server
    syncMergedVideos((newMergedVideoList) => {
      console.log("RECEIVED UPDATE", newMergedVideoList);
      let indexes = Object.keys(newMergedVideoList);
      
      for (let i =0 ; i < indexes.length; i++) {
        let index = parseInt(indexes[i]);
        let newID = newMergedVideoList[index];
        let oldID = videoList[index];
        if (newID !== oldID) {
          setVideoList((c) => {
            let newList = [...c];
            newList[index] = newID;
            return newList;
          });
          videoSwappedIntoTimeline(oldID, newID);
        }
      }
    })
  }, [videoList])


  const setVideoAtIndex = (index: number, videoID: string) => {
    let oldvideo = videoList[index];
    setVideoList( c => {
      c[index] = videoID;
      console.log("Updated video list to", c);
      return [...c];
    })
    videoSwappedIntoTimeline(oldvideo, videoID);
    setMergedVideo(index, videoID);
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

