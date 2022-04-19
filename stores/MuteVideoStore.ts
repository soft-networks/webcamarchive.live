import create from "zustand";


interface MuteVideoStoreState {
  muteVideo: boolean;
  toggleMuteVideo: () => void;
}

const useMuteVideoStore = create<MuteVideoStoreState>((set) => ({
  muteVideo: true,
  toggleMuteVideo: () => {
    set((state) => ({
      muteVideo: !state.muteVideo,
    }));
  }
}));

export default useMuteVideoStore;