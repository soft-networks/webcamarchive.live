import create from "zustand";

interface VideoDragStoreState {
  amDraggingGlobal: boolean;
  videoBeingDragged: string | undefined;
  setVideoBeingDragged: (videoBeingDragged: string | undefined) => void;
}

const useVideoDragStore = create<VideoDragStoreState>((set) => ({
  amDraggingGlobal: false,
  videoBeingDragged: undefined,
  setVideoBeingDragged: (videoBeingDragged: string | undefined) =>
    {
      console.log("Video being dragged set to ", videoBeingDragged);
    set((state) => ({
      amDraggingGlobal: videoBeingDragged == undefined ? false : true,
      videoBeingDragged: videoBeingDragged,
    }))},
}));

export default useVideoDragStore;
