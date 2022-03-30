import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Desktop from "../components/Desktop";
import VideoEditor from "../components/VideoEditor";
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
          <div> hello. u have to click somewhere for sound to play. u can also move everything around </div>
          <Desktop/>
          <VideoEditor />
        </main>
      </MergedVideoProvider>
      </AllVideoProvider>
    </div>
  );
};

export default Home;
