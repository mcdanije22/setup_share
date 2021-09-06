import React, { ReactNode, useState, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./layout.module.scss";
import {
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Drawer,
  Button,
  Menu,
  message,
} from "antd";
import {
  DashboardOutlined,
  FileOutlined,
  HeartOutlined,
  CodeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import TopNav from "../NavMenus/TopNav";

type Props = {
  children?: ReactNode;
  title?: string;
};

const LayoutComponent = ({ children, title = "Project Plann" }: Props) => {
  const router = useRouter();
  const { Title, Text } = Typography;
  const [drawerStatus, showDrawer] = useState<boolean>(false);
  const { SubMenu } = Menu;

  const openDrawer = () => {
    showDrawer(true);
  };
  const closeDrawer = () => {
    showDrawer(false);
  };

  return (
    <div id="layoutcontainer">
      <Head>
        <title>{`${title} | Plan Code`}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <TopNav />
      <div id="pageContent">{children}</div>
    </div>
  );
};
export default LayoutComponent;
