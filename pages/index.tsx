import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import FullExperience from "../components/layouts/FullExperience";
import PasswordGate from "../components/PasswordGate";
import { InferGetStaticPropsType } from 'next'
import BackgroundButton from "../components/ui/BackgroundButton";
import Chat from "../components/apps/Chat";

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
      <main className="fullBleed">
        <PasswordGate passcode={props.passcode} waitingRoom={<Chat chatRoom="waiting" roomName="Waiting room" />}>
          <FullExperience />
        </PasswordGate>
      </main>
    </div>
  );
};

export default Home;
