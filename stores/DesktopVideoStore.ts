import create from "zustand";
import videoInfo from "../providers/VideoInfo";

type DesktopVideos = { [key: string]: boolean };

interface DesktopVideoState {
  desktopVideos: DesktopVideos;
  removeVideoFromDesktop: (id: string) => void;
  addVideoToDesktop: (id: string) => void;
}

const getInitVideos = (): DesktopVideos => {
  const allVideos = videoInfo.getAllIDs();
  const dv: DesktopVideos = {};
  allVideos.forEach((id) => {
    dv[id] = true;
  });
  return dv;
};

const useDesktopVideoStore = create<DesktopVideoState>((set) => ({
  desktopVideos: getInitVideos(),
  removeVideoFromDesktop: (id: string) => {
    set((state) => ({
      desktopVideos: { ...state.desktopVideos, [id]: false },
    }));
  },
  addVideoToDesktop: (id: string) => {
    set((state) => ({
      desktopVideos: { ...state.desktopVideos, [id]: true },
    }));
  },
}));

export default useDesktopVideoStore;
