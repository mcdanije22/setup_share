import React, { ReactNode } from "react";
import Head from "next/head";
import styles from "./layout.module.scss";
import TopNavBar from "../NavMenus/TopNavBar";
import Footer from "../Footer/Footer";

type Props = {
  children?: ReactNode;
  title?: string;
  keywords: string;
  description: string;
  author: string;
  image_url: string;
};

const LayoutComponent = ({
  children,
  title = "ShareStation",
  keywords = "Setups",
  description = "Setups",
  author = "",
  image_url,
}: Props) => {
  return (
    <div id="layoutcontainer">
      <Head>
        <title>{`${title} | ShareStation`}</title>
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
