import type { NextPage } from "next";
import Head from "next/head";
import ChatAndVideo from "../components/ChatAndVideo";
import DragSyncProvider from "../providers/DragSyncProvider";


const Preview: NextPage = () => {
  return (
    <div>
      <Head>
        <title> molly editor preview </title>
      </Head>
      <main className="padded preview">
          <div id="preview-message" className="button"> 👀 view only </div>
          <DragSyncProvider>
            <ChatAndVideo/>
          </DragSyncProvider>
      </main>
    </div>
  );
};

export default Preview;
