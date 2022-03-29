import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AllVideos from "../components/AllVideos";
import VideoPreview from "../components/VideoPreview";
import AllVideoProvider  from "../providers/AllVideoProvider";
import MergedVideoProvider from "../providers/MergedVideoProvider";

const Home: NextPage = () => {
  return (
    <div>
      <AllVideoProvider>
      <MergedVideoProvider>
        <Head>
          <title>spawn trees</title>
        </Head>

        <main className="padded">
          hello world
          <VideoPreview />
          <AllVideos/>
          
        </main>
      </MergedVideoProvider>
      </AllVideoProvider>
    </div>
  );
};

export default Home;
