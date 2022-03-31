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
          <title>molly archive editor </title>
        </Head>

        <main className="padded">
          <Desktop/>
          <VideoEditorDynamic />
        </main>
      </MergedVideoProvider>
      </AllVideoProvider>
    </div>
  );
};

export default Home;
