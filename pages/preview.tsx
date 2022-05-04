import type { NextPage } from "next";
import Head from "next/head";
import FullExperience from "../components/layouts/FullExperience";
import DragSyncProvider from "../providers/DragSyncProvider";


const Preview: NextPage = () => {
  return (
    <div>
      <Head>
        <title> molly editor preview </title>
      </Head>
      <main className="preview fullBleed">
          <div id="preview-message" className="button"> 👀 view only </div>
          <DragSyncProvider>
            <FullExperience/>
          </DragSyncProvider>
      </main>
    </div>
  );
};

export default Preview;
