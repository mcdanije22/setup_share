import React, { ReactNode, useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./dashboardlayout.module.scss";
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
import axios from "axios";
import TopNavBar from "../NavMenus/TopNavBar";
import SideNavBar from "../NavMenus/SideNavBar";
import {
  DashboardOutlined,
  FileOutlined,
  HeartOutlined,
  CodeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { UserContext } from "../../utils/context/userContext";

type Props = {
  children?: ReactNode;
  title?: string;
};

const { Header, Footer, Sider, Content } = Layout;

const DashboardLayout = ({ children, title = "MySetupShare" }: Props) => {
  const { currentUser, setUser } = useContext<any>(UserContext);
  const { Title, Text } = Typography;
  const [drawerStatus, showDrawer] = useState<boolean>(false);
  const { SubMenu } = Menu;

  const openDrawer = () => {
    showDrawer(true);
  };
  const closeDrawer = () => {
    showDrawer(false);
  };

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_API}/user/usercontext`,
        {
          withCredentials: true,
        }
      );
      const userInfo = await response.data;
      setUser(userInfo);
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
  };
  return (
    <div id={styles.layoutcontainer}>
      <Head>
        <title>{`${title} | MySetupShare`}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Layout>
        <Layout>
          <div id={styles.siderContent}>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              trigger={null}
              width={200}
              theme="light"
            >
              <SideNavBar user={currentUser} />
            </Sider>
          </div>
          <Layout>
            <Content
              className={styles.contentContainer}
              style={{ minHeight: "100vh" }}
            >
              <TopNavBar />
              <div id={styles.pageContent}>{children}</div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
