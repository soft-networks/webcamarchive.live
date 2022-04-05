import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

import Desktop from "../components/Desktop";

import AllVideoProvider from "../providers/AllVideoProvider";
import LoadingGate from "../providers/LoadingGate";
import MergedVideoProvider from "../providers/MergedVideoProvider";
import MuteVideoGate from "../providers/MuteVideoGate";

const VideoEditorDynamic = dynamic(() => import("../components/VideoEditor"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <LoadingGate>
        <MuteVideoGate>
          <AllVideoProvider>
            <MergedVideoProvider>
              <Head>
                <title>molly archive editor </title>
              </Head>
              <main className="padded">
                <Desktop />
                <VideoEditorDynamic />
              </main>
            </MergedVideoProvider>
          </AllVideoProvider>
        </MuteVideoGate>
      </LoadingGate>
    </div>
  );
};

export default Home;
