import { useState } from "react";
import "antd/dist/antd.css";
import Head from "next/head";
import "../pageStyles/global.css";
import type { AppProps } from "next/app";
import { UserContext } from "../utils/context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setUser] = useState<string | null>(null);

  return (
    <>
      <Head>
        {/* This ways to add css on global website use local asset folder withhtml link tag */}
        <link href="../Roboto/Roboto-Regular.ttf" rel="stylesheet" />
        <link href="../OpenSans/OpenSans.ttf" rel="stylesheet" />
      </Head>
      <UserContext.Provider value={{ currentUser, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
