import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

import Desktop from "../components/Desktop";

import AllVideoProvider  from "../providers/AllVideoProvider";
import MergedVideoProvider from "../providers/MergedVideoProvider";

const VideoEditorDynamic = dynamic(() => import('../components/VideoEditor'), {ssr: false})


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
          <VideoEditorDynamic />
        </main>
      </MergedVideoProvider>
      </AllVideoProvider>
    </div>
  );
};

export default Home;
