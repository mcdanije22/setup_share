import React, { ReactNode } from "react";
import Head from "next/head";
import styles from "./layout.module.scss";
import TopNavBar from "../NavMenus/TopNavBar";
import Footer from "../Footer/Footer";

type Props = {
  children?: ReactNode;
  title?: string;
};

const LayoutComponent = ({ children, title = "ShareStation" }: Props) => {
  return (
    <div id="layoutcontainer">
      <Head>
        <title>{`${title} | ShareStation`}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <TopNavBar />
      <div id={styles.pageContent}>{children}</div>
      <Footer />
    </div>
  );
};
export default LayoutComponent;
