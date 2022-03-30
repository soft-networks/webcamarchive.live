import { createContext, useContext, useState } from "react";



export interface DragManagerProviderProps {
  amDraggingGlobal: boolean;
  videoBeingDragged: string | undefined;
  setVideoBeingDragged: (videoBeingDragged: string | undefined) => void;
}

export const DragManagerContext = createContext<DragManagerProviderProps>({
  amDraggingGlobal: false,
  videoBeingDragged: undefined,
  setVideoBeingDragged: () => {},
});

const DragManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [amDragging, setAmDragging] = useState(false);
  const [videoBeingDragged, setVideoBeingDragged] = useState<string | undefined>(undefined);
  
  const videoDragged = (videoBeingDragged: string | undefined) => {
    setVideoBeingDragged(videoBeingDragged);
    if (videoBeingDragged !== undefined) {
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