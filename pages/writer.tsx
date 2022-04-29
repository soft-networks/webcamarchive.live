import type { NextPage } from "next";
import Head from "next/head";
import ChatAndVideo from "../components/layouts/ChatAndVideo";
import PasswordGate from "../components/PasswordGate";



export async function getStaticProps() {
  return {
    props: {passcode: process.env.WRITER_PASSCODE},
  };
}

interface WriterProps {
  passcode: string;
}
 

const Writer: NextPage<WriterProps> = (props) => {
  return (
    <div>
      <Head>
        <title> molly editor writer </title>
      </Head>
      <main className="padded ">
        <PasswordGate passcode={props.passcode}>
          <div id="preview-message" className="button"> 🌱 writing mode </div>
          <ChatAndVideo/>
        </PasswordGate>
      </main>
    </div>
  );
};

export default Writer;
