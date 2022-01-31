import React, { ReactNode } from "react";
import Head from "next/head";
import styles from "./layout.module.scss";
import TopNav from "../NavMenus/TopNav";
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
      <TopNav />
      <div id="pageContent" style={{ backgroundColor: "#F7F7F8" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default LayoutComponent;
