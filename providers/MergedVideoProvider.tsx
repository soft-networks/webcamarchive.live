import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import { disableMergedVideosSyncDB, setMergedVideoDB, syncMergedVideosDB } from "../lib/firebase";

import { useAllVideos } from "./AllVideoProvider";

export const VIDEO_LENGTH = 1000;
export const NUM_VIDEO = 30;
export interface MergedVideoContextType {
  mergedVideoList: (string | null)[];
  mergeVideoAtIndex: (index: number, videoID: string) => void;
}
export const MergedVideoContext = createContext<MergedVideoContextType>({
  mergedVideoList: [],
  mergeVideoAtIndex: () => {},
});

const MergedVideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoListState, setVideoListState] = useState<(string | null)[]>([]);
  const { removeVideoFromDesktop, addVideoToDesktop } = useAllVideos();
  const stateRef = useRef<(string|null)[]>();

  const videoWasMerged = useCallback(
    (oldid: string | null, newid: string | undefined) => {
      if (oldid !== null) {
        addVideoToDesktop(oldid);
      }
      if (newid !== undefined) {
        removeVideoFromDesktop(newid);
      }
    },
    [addVideoToDesktop, removeVideoFromDesktop]
  );
  useEffect(() => {
    console.log("*^^^^^^*^*^*^^*^ UPDATING THE REFERENCE TO SYNC WITH STATE");
    stateRef.current = videoListState;
  }, [videoListState])
  const handleDBChange = (newMergedVideoList: { [key: string]: string }) => {
    console.log(" ***** RECEIVED UPDATE ******");

    let keys: string[] = Object.keys(newMergedVideoList);
    let swaps = [];
    let currentVideos = stateRef.current ? [...stateRef.current] : [];
    console.log("Current list is", currentVideos);

    //TODO: This can be more efficient, probably O(n = NUM_VIDEO), right now its O(2n or so)
    for (var i = 0; i < keys.length; i++) {
      let index;
      try {
        index = parseInt(keys[i]);
      } catch (e) {
        continue;
      }
      let newID = newMergedVideoList[index];
      let oldID = currentVideos[index];
      if (oldID == null && newID == undefined) {
        continue;
      } else if (oldID == newID) {
        continue;
      } else {
        console.log("UPDATING", oldID, newID, oldID == newID);
        swaps.push({ index: index, old: oldID, new: newID }); //Two cases: oldID is NOT null, newID is undefined or they are different keys
      }
    }
    for (let i = 0; i< currentVideos.length; i++) {
      if (currentVideos[i] && ! keys.includes(i + '')) {
        swaps.push({old: currentVideos[i], new: undefined, index: i});
      }
    }
    if (swaps.length > 0) {
      console.log(swaps);
      for (let i = 0; i < swaps.length; i++) {
        const swap = swaps[i];
        videoWasMerged(swap.old, swap.new);

        currentVideos[swap.index] = swap.new === undefined ? null : swap.new;
      }
      console.log("**** performing state update to", currentVideos);
      setVideoListState(currentVideos);
    }
  };
  const mergeVideoAtIndex = (index: number, videoID: string) => {
    let oldvideo = videoListState[index];
    setVideoListState((c) => {
      c[index] = videoID;
      console.log("Updated video list to", c);
      return [...c];
    });
    videoWasMerged(oldvideo, videoID);
    setMergedVideoDB(index, videoID);
  };

  useEffect(() => {
    //Initialize to null
    let vl = [];
    for (let i = 0; i < NUM_VIDEO; i++) {
      vl.push(null);
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
