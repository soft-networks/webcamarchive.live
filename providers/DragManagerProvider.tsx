import { createContext, useContext, useState } from "react";



export interface DragManagerProviderProps {
  amDraggingGlobal: boolean;
  videoBeingDragged: Video | null;
  setVideoBeingDragged: (videoBeingDragged: Video | null) => void;
}

export const DragManagerContext = createContext<DragManagerProviderProps>({
  amDraggingGlobal: false,

  videoBeingDragged: null,
  setVideoBeingDragged: () => {},
});

const DragManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [amDragging, setAmDragging] = useState(false);
  const [videoBeingDragged, setVideoBeingDragged] = useState<Video | null>(null);

  const videoDragged = (videoBeingDragged: Video | null) => {
    setVideoBeingDragged(videoBeingDragged);
    if (videoBeingDragged !== null) {
      setAmDragging(true);
    } else {
      setAmDragging(false);
    }
  }

  return (
    <DragManagerContext.Provider
      value={{
        amDraggingGlobal: amDragging,
        videoBeingDragged,
        setVideoBeingDragged: videoDragged,
      }}
    >
      {children}
    </DragManagerContext.Provider>
  );
}

export const useDragManager = () => {
  const dragManager = useContext(DragManagerContext);
  return dragManager;
}
export default DragManagerProvider;