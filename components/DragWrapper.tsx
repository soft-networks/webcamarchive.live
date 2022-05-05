import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Draggable, { DraggableCore, DraggableProps } from "react-draggable";
import { setupDragSync, syncDragWithID } from "../lib/firebase";
import { useDragSyncForID } from "../providers/DragSyncProvider";

type DRAG_STATE = "normal" | "no-drag" | "sync-drag";

type DragWrapperProps = Partial<DraggableProps> & { dragID: string };

const DragWrapper: React.FC<DragWrapperProps> = (props) => {
  const { pathname } = useRouter();
  switch (pathname) {
    case "/preview":
      return <ServerSyncedDragWrapper {...props} />;
    case "/writer":
      return <ServerWriterDragWrapper {...props} />;
    default:
      return <Draggable {...props} >{props.children}</Draggable>; ;
  }
};

const ServerWriterDragWrapper: React.FC<DragWrapperProps> = (props) => {
  const { onStop, onStart, dragID } = props;
  
  const stopAndSync = useCallback(
    (e: any, data: any) => {
      if (onStop) onStop(e, data);
      syncDragWithID(dragID, data.x, data.y);
    },
    [onStop, dragID]
  );

  return (
    <Draggable {...props} onStop={(e,d) => stopAndSync(e,d)}>
      {props.children}
    </Draggable>
  );
}

const ServerSyncedDragWrapper: React.FC<DragWrapperProps> = (props) => {
  
  const myDragInfo = useDragSyncForID(props.dragID);
  
  return (
    <div className="reading-dragger">
      <Draggable {...props} disabled position={myDragInfo ? {x: myDragInfo.top, y: myDragInfo.left} : undefined} >
        {props.children}
      </Draggable>  
    </div>
  );
};

export default DragWrapper;
