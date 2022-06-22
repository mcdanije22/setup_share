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
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        ></script>
        <script>
          {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
        </script>
      </Head>
      <UserContext.Provider value={{ currentUser, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
