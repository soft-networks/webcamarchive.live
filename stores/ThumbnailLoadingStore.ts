import create from "zustand";
import videoInfo from "../lib/videoInfo";

interface LoadingStoreState {
  loaded: boolean;
  percentLoaded: number;
  numLoaded: number;
  desktopFileLoaded: () => void;
}

const useLoadingStore = create<LoadingStoreState>((set) => ({
  loaded: false,
  percentLoaded: 0,
  numLoaded: 0,
  desktopFileLoaded: () => {
    let nVideos = videoInfo.getNumVideos() - 30;
    set((state) => {
      let n = state.numLoaded+1;
      let p = n / nVideos;
      return {
        percentLoaded: p,
        loaded: p >= 0.99,
        numLoaded: n,
      };
    });
  },
}));

export default useLoadingStore;