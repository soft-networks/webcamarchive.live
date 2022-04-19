import type { NextPage } from "next";
import Head from "next/head";
import ChatAndVideo from "../components/layouts/ChatAndVideo";


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title> molly editor </title>
      </Head>
      <main className="padded">
          <ChatAndVideo/>
      </main>
    </div>
  );
};

export default Home;
