import create from "zustand";


interface MuteVideoStoreState {
  muteVideo: boolean;
  toggleMuteVideo: () => void;
}

const useMuteVideoStore = create<MuteVideoStoreState>((set) => ({
  muteVideo: false,
  toggleMuteVideo: () => {
    set((state) => ({
      muteVideo: !state.muteVideo,
    }));
  }
}));

export default useMuteVideoStore;