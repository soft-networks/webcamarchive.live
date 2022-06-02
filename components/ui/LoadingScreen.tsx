/* eslint-disable @next/next/no-img-element */
import { createContext, useContext, useState } from "react";
import useLoadingStore from "../../stores/ThumbnailLoadingStore";
const LoadingScreen = () => {
  const loaded = useLoadingStore((state) => state.loaded);
  return !loaded ? <LoadingDisplay /> : null;
};

const LoadingDisplay = () => {
  const percentLoaded = useLoadingStore((state) => state.percentLoaded);
  return (
    <>
    <div className="loading-scrim fullBleed">

    </div>
    <div className="app" id="loader">
      <div className="handle">
        <div className="icon">
          <img src="/icons/drag.svg" alt="drag window"/>
        </div>
        <div className="title">Loading...</div>
      </div>
      <div className="padded" style={{minWidth: "20ch"}}>
        Loading.... {Math.round(percentLoaded * 100)}%
      </div>
    </div>
    </>
  );
};

export default LoadingScreen;
