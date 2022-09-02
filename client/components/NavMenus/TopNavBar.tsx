import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Button,
  Drawer,
  Col,
  Row,
  Typography,
  Space,
  List,
  Avatar,
  message,
  Popover,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./topNavBar.module.scss";
import { UserContext } from "../../utils/context/userContext";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const { Title } = Typography;

const TopNavBar = () => {
  const [cookies, removeCookie] = useCookies<any>(["token"]);
  const router = useRouter();
  const [drawerStatus, showDrawer] = useState<boolean>(false);
  const { currentUser, setUser } = useContext<any>(UserContext);

  useEffect(() => {
    if (!currentUser) {
      reload();
    }
  }, []);

  const reload = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}/user/usercontext`,
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

  const openDrawer = () => {
    showDrawer(true);
  };
  const closeDrawer = () => {
    showDrawer(false);
  };

  const logUserOut = async () => {
    if (currentUser) {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}/user/logout`,
          {
            withCredentials: true,
          }
        );
        const response = data;
        setUser(null);
        message.success("Logged out sucessfully");
        await router.push("/login?prior=true");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div id={styles.topNavBarContainer}>
      <Drawer
        title="MySetupShare"
        placement="right"
        closable={true}
        onClose={closeDrawer}
        visible={drawerStatus}
        width={"100%"}
      >
        {!currentUser ? (
          <Row
            justify="center"
            gutter={[0, 32]}
            style={{ width: "100%", textAlign: "center" }}
            id={styles.topNavBar}
          >
            <Col span={24}>
              <Link href="/login">
                <a style={{ color: "black" }}>Login</a>
              </Link>
            </Col>
            {/* <Col span={24}>
              <Link href="/register">
                <a style={{ color: "black" }}>Register</a>
              </Link>
            </Col> */}
          </Row>
        ) : (
          <Row
            justify="center"
            gutter={[0, 32]}
            style={{ width: "100%", textAlign: "center" }}
            id={styles.topNavBar}
          >
            <Col span={24}>
              <Link href="/dashboard">
                <a
                  className={
                    router.pathname === "/dashboard" ? styles.active : ""
                  }
                  style={{ color: "black" }}
                >
                  Dashboard
                </a>
              </Link>
            </Col>
          </Row>
        )}
      </Drawer>

      <Row
        justify="space-between"
        style={{
          padding: router.pathname === "/setup/*" ? "1rem 4rem" : "1rem",
          borderBottom: "1px solid #D9D9D9",
          boxShadow: "0 8px 12px -4px #D9D9D9",
          alignItems: "center",
        }}
      >
        <Col xs={{ flex: "auto" }} lg={{ span: 8 }}>
          <Title level={3} key="1">
            <Link href={currentUser ? "/dashboard" : "/"} key="2">
              <a style={{ color: "black" }}>MySetupShare</a>
            </Link>
          </Title>
        </Col>
        {!currentUser ? (
          <Col xs={{ span: 0 }} md={{ span: 8 }}>
            <Row justify="end">
              <Space size="large">
                <Col>
                  <Link href="/login">
                    <a style={{ color: "black" }}>Login</a>
                  </Link>
                </Col>
                {/* <Col>
                  <Link href="/register">
                    <a style={{ color: "black" }}>Register</a>
                  </Link>
                </Col> */}
                {/* <Col>
                  <Button
                    type="primary"
                    size="large"
                    style={{ borderRadius: ".5rem", padding: "0 1.5rem" }}
                  >
                    Live demo
                  </Button>
                </Col> */}
              </Space>
            </Row>
          </Col>
        ) : (
          <Col xs={{ span: 0 }} md={{ span: 8 }}>
            <Row justify="end">
              <Col>
                <Popover
                  placement="bottomRight"
                  content={[
                    <List key="0">
                      <List.Item key="1">
                        <Link href="/dashboard">
                          <a style={{ color: "black" }}>Dashboard</a>
                        </Link>
                      </List.Item>
                      <List.Item key="2">
                        <a style={{ color: "black" }} onClick={logUserOut}>
                          Sign Out
                        </a>
                      </List.Item>
                    </List>,
                  ]}
                  trigger="click"
                >
                  <Avatar
                    key="3"
                    style={{ cursor: "pointer" }}
                    size="large"
                    src={`https://avatars.dicebear.com/api/initials/${currentUser.user?.username.charAt(
                      0
                    )}.svg`}
                  />
                </Popover>
              </Col>
            </Row>
          </Col>
        )}
        <Col xs={{ span: 2 }} md={{ span: 0 }} style={{ alignSelf: "center" }}>
          <MenuOutlined style={{ fontSize: "1.2rem" }} onClick={openDrawer} />
        </Col>
      </Row>
    </div>
  );
};
export default TopNavBar;
