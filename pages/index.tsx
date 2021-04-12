import Head from "next/head";
import { Button } from "antd";
import axios from "axios";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button
          type="primary"
          onClick={() => {
            axios.get("/ping");
          }}
        >
          Primary Button
        </Button>
      </main>

      <footer></footer>
    </div>
  );
}
