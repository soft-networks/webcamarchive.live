import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import ChatAndVideo from "../components/layouts/ChatAndVideo";
import PasswordGate from "../components/PasswordGate";
import { InferGetStaticPropsType } from 'next'
import BackgroundButton from "../components/ui/BackgroundButton";

export async function getStaticProps() {
  return {
    props: {passcode: process.env.PASSCODE},
  };
}

interface HomeProps {
  passcode: string;
}
  
const Home: NextPage<HomeProps> = (props) => {
  return (
    <div>
      <Head>
        <title> molly editor </title>
      </Head>
      <main className="padded">
        <PasswordGate passcode={props.passcode}>
          <ChatAndVideo/>
        </PasswordGate>
      </main>
    </div>
  );
};

export default Home;
