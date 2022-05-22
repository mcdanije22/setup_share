import React, { ReactNode } from "react";
import Head from "next/head";
import styles from "./layout.module.scss";
import TopNavBar from "../NavMenus/TopNavBar";
import Footer from "../Footer/Footer";

const LayoutComponent = ({
  children,
  title = "MySetupShare",
  keywords = "Setups",
  description = "Setups",
  author = "",
  image_url,
}: any) => {
  return (
    <div id="layoutcontainer">
      <Head>
        <title>{`${title} | MySetupShare`}</title>
        <meta name="og:keywords" content={`${keywords}`} />
        <meta name="og:description" content={`${description}`} />
        <meta name="og:author" content={`${author}`} />
        <meta property="og:image" content={`${image_url}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <TopNavBar />
      <div id={styles.pageContent}>{children}</div>
      <Footer />
    </div>
  );
};
export default LayoutComponent;
