import type { NextPage } from "next";
import Head from "next/head";
import ChatAndVideo from "../components/layouts/ChatAndVideo";


const Writer: NextPage = () => {
  return (
    <div>
      <Head>
        <title> molly editor writer </title>
      </Head>
      <main className="padded ">
          <div id="preview-message" className="button"> 🌱 writing mode </div>
          <ChatAndVideo/>
      </main>
    </div>
  );
};

export default Writer;
