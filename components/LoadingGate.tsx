import { createContext, useContext, useState } from "react";
import useLoadingStore from "../stores/ThumbnailLoadingStore";
const LoadingScreen = () => {
  const loaded = useLoadingStore((state) => state.loaded);
  return !loaded ? <LoadingDisplay /> : null;
};

const LoadingDisplay = () => {
  const percentLoaded = useLoadingStore((state) => state.percentLoaded);
  return (
    <div className="loading-overlay fullBleed">
      <div>
        ｡*◇☆*｡ﾟ <br />
        Loading.... {Math.round(percentLoaded * 100)}%<pre></pre>
      </div>
    </div>
  );
};

export default LoadingScreen;
