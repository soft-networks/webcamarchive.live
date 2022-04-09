import { createContext, useContext, useEffect, useState } from "react";
import { setupDragSync } from "../lib/firebase";



interface DragSyncContextType {
  syncedDragObjects: { [key: string]: {top: number, left: number} };
}

const DragSyncContext = createContext<DragSyncContextType>({syncedDragObjects: {}});

const DragSyncProvider = ({ children }: { children: React.ReactNode }) => {
  const [syncedDragObjects, setSyncedDragObjects] = useState<{ [key: string]: {top: number, left: number} }>({});

  useEffect(() => {
    setupDragSync((d) => setSyncedDragObjects(d));
  }, [])
  return (
    <DragSyncContext.Provider value={{ syncedDragObjects }}>
      {children}
    </DragSyncContext.Provider>
  );
}

export const useDragSyncForID = (id: string) => { 
  const { syncedDragObjects } = useContext(DragSyncContext);
  return syncedDragObjects[id];
}

export default DragSyncProvider;  