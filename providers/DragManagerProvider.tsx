import { createContext, useContext, useState } from "react";



export interface DragManagerProviderProps {
  amDraggingGlobal: boolean;
  videoBeingDragged: string | null;
  setVideoBeingDragged: (videoBeingDragged: string | null) => void;
}

export const DragManagerContext = createContext<DragManagerProviderProps>({
  amDraggingGlobal: false,
  videoBeingDragged: null,
  setVideoBeingDragged: () => {},
});

const DragManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [amDragging, setAmDragging] = useState(false);
  const [videoBeingDragged, setVideoBeingDragged] = useState<string | null>(null);
  
  const videoDragged = (videoBeingDragged: string | null) => {
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