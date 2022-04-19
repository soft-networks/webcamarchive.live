import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import { disableMergedVideosSyncDB, setMergedVideoDB, syncMergedVideosDB } from "../lib/firebase";
import useDesktopVideoStore from "../stores/DesktopVideoStore";

import { useAllVideos } from "./AllVideoProvider";

export const VIDEO_LENGTH = 1000;
export const NUM_VIDEO = 30;
export interface MergedVideoContextType {
  mergedVideoList: (string | undefined)[];
  mergeVideoAtIndex: (index: number, videoID: string) => void;
}
export const MergedVideoContext = createContext<MergedVideoContextType>({
  mergedVideoList: [],
  mergeVideoAtIndex: () => {},
});

const MergedVideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoListState, setVideoListState] = useState<(string | undefined)[]>([]);
  // const { removeVideoFromDesktop, addVideoToDesktop } = useAllVideos();
  const removeVideoFromDesktop = useDesktopVideoStore(useCallback(state => state.removeVideoFromDesktop, []));
  const addVideoToDesktop = useDesktopVideoStore(useCallback(state => state.addVideoToDesktop, []));
  const stateRef = useRef<(string|undefined)[]>();
  useEffect(() => {
    stateRef.current = videoListState;
  }, [videoListState])
  const handleDBChange = (newMergedVideoList: { [key: string]: string }) => {
    console.log(" ***** RECEIVED UPDATE ******");
    let currentVideos = stateRef.current ? [...stateRef.current] : [];
    for (let i =0; i<NUM_VIDEO; i++) {
      let oldVid = currentVideos[i] ;
      let newVid = newMergedVideoList[i + ''] || undefined;
      
      if (oldVid !== newVid) {
        if (newVid) {  removeVideoFromDesktop(newVid)};
        if (oldVid) {  addVideoToDesktop(oldVid)};
        currentVideos[i] = newVid; 
      }
    }
    setVideoListState(currentVideos);
  };
  const mergeVideoAtIndex = (index: number, videoID: string) => {
    setMergedVideoDB(index, videoID);
  };
  useEffect(() => {
    //Initialize to null
    let vl = [];
    for (let i = 0; i < NUM_VIDEO; i++) {
      vl.push(undefined);
    }
    setVideoListState(vl);
    syncMergedVideosDB(handleDBChange);
    return () => disableMergedVideosSyncDB();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MergedVideoContext.Provider value={{ mergedVideoList: videoListState, mergeVideoAtIndex }}>
        {children}
      </MergedVideoContext.Provider>
    </>
  );
};

export const useMergedVideo = () => {
  const videoList = React.useContext(MergedVideoContext);
  return videoList;
};


export default MergedVideoProvider;
