import type { NextPage } from "next";
import Head from "next/head";
import FullExperience from "../components/layouts/FullExperience";
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
        <title> webcam archive writer </title>
      </Head>
      <main className="fullBleed ">
        <PasswordGate passcode={props.passcode}>
          <div id="preview-message" className="button"> 🌱 writing mode </div>
          <FullExperience/>

        </PasswordGate>
      </main>
    </div>
  );
};

export default Writer;
