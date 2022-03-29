import React, { createContext, useEffect, useState } from "react";
import { testVideoList } from "../lib/testData";



export const AllVideoContext = createContext<VideoList>([]);


const AllVideoProvider = ({children}: {children: React.ReactNode}) => {

  const [allVideos, setAllVideos] = useState<VideoList>([]);

  useEffect(() => {
    setAllVideos(testVideoList());
  }, []);

  return (
    <AllVideoContext.Provider value={allVideos}> 
      {children}
    </AllVideoContext.Provider>
  )
}

export const useAllVideos = () => {
  const allVideos = React.useContext(AllVideoContext);
  return allVideos;
}

export default AllVideoProvider;