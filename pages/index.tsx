import styles from "../pageStyles/home.module.scss";
import Head from "next/head";
import {
  PageHeader,
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  message,
  Modal,
  Spin,
  Result,
  Typography,
  Space,
  Layout,
  Divider,
  Tabs,
  List,
  BackTop,
} from "antd";
import { CheckOutlined, MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { Header, Content, Footer } = Layout;
  const { Title, Text } = Typography;
  const { TabPane } = Tabs;
  const [drawerStatus, showDrawer] = useState<boolean>(false);

  const openDrawer = () => {
    showDrawer(true);
  };
  const closeDrawer = () => {
    showDrawer(false);
  };
  // const demoLogin = () => {
  //   signIn("username-login", {
  //     email: "john.smith@gmail.com",
  //     password: "abc",
  //     callbackUrl: "/dashboard",
  //   });
  // };

  const listData = [
    {
      title: "More Efficiency",
      text: "Finding all the tools to speed up your work flow in one place",
    },
    {
      title: "Easy access to inspiration",
      text: "Be able to save and access your creative inspiration instantly",
    },
    {
      title: "Mobility",
      text: "Gather information and ideas on the go",
    },
  ];

  return (
    <div id={styles.landingPageContainer}>
      <Drawer
        title="shareStation"
        placement="right"
        closable={true}
        onClose={closeDrawer}
        visible={drawerStatus}
        width={"100%"}
      >
        <Row
          justify="center"
          gutter={[0, 32]}
          style={{ width: "100%", textAlign: "center" }}
        >
          <Col span={24}>
            <Link href="/login">
              <a style={{ color: "black" }}>Login</a>
            </Link>
          </Col>
          <Col span={24}>
            <Link href="/signup">
              <a style={{ color: "black" }}>Sign up</a>
            </Link>
          </Col>
          <Col span={24}>
            <Button
              // onClick={demoLogin}
              type="primary"
              size="large"
              style={{
                borderRadius: ".5rem",
                padding: "0 1.5rem",
                width: "100%",
              }}
            >
              Live demo
            </Button>
          </Col>
        </Row>
      </Drawer>
      <BackTop />
      <Row justify="center">
        <Col xs={{ span: 22 }} lg={{ span: 16 }}>
          <Head>
            <title>shareStation</title>
            <link rel="icon" href="/icon.png" />
          </Head>
          <Layout>
            <Header>
              <Row justify="space-between">
                <Col xs={{ flex: "auto" }} lg={{ span: 8 }}>
                  <Title level={3} key="1" style={{ padding: "1rem 0" }}>
                    <Link href="/" key="2">
                      <a style={{ color: "black" }}>shareStation</a>
                    </Link>
                  </Title>
                </Col>
                <Col xs={{ span: 0 }} lg={{ span: 8 }}>
                  <Row justify="end">
                    <Space size="large">
                      <Col>
                        <Link href="/login">
                          <a style={{ color: "black" }}>Login</a>
                        </Link>
                      </Col>
                      <Col>
                        <Link href="/signup">
                          <a style={{ color: "black" }}>Sign up</a>
                        </Link>
                      </Col>
                      <Col>
                        <Button
                          // onClick={demoLogin}
                          type="primary"
                          size="large"
                          style={{ borderRadius: ".5rem", padding: "0 1.5rem" }}
                        >
                          Live demo
                        </Button>
                      </Col>
                    </Space>
                  </Row>
                </Col>
                <Col xs={{ span: 2 }} lg={{ span: 0 }}>
                  <MenuOutlined
                    style={{ fontSize: "1.2rem" }}
                    onClick={openDrawer}
                  />
                </Col>
              </Row>
            </Header>
          </Layout>
          <Layout>
            <Content style={{ padding: "4rem 0" }}>
              <Row justify="center">
                <Col>
                  <Title className="landingTitle">Jumpstart your next</Title>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Title className="landingTitle">project</Title>
                </Col>
              </Row>
              <Row justify="center">
                <Col className="titleDescription">
                  <Text type="secondary">
                    An all in one solution to plan your next code project
                  </Text>
                </Col>
              </Row>
              <Row justify="center" style={{ marginTop: "2rem" }}>
                <Col>
                  <Link href="/signup">
                    <Button
                      type="primary"
                      size="large"
                      style={{ borderRadius: ".5rem", padding: "0 1.5rem" }}
                    >
                      Start planning for free
                    </Button>
                  </Link>
                </Col>
              </Row>
              <Row justify="center" style={{ marginTop: ".5rem" }}>
                <Col>
                  <Text type="secondary">No Credit card required!</Text>
                </Col>
              </Row>
              <Row justify="center" className="containerSpace">
                <Col span={24}>
                  <Image
                    src=""
                    alt="Screen shot of main page for app"
                    width={3360}
                    height={1828}
                    className="landingImage"
                  />
                </Col>
              </Row>
              <Row className={styles.containerSpace}>
                <Col>
                  <Title level={2}>Why are we here?</Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Title level={5}>When coding a project, you need:</Title>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <List
                    itemLayout="horizontal"
                    dataSource={listData}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<CheckOutlined />}
                          title={<Text>{item.title}</Text>}
                          description={<Text>{item.text}</Text>}
                        />
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
              <Row justify="center" className="containerSpace">
                <Col>
                  <Title level={2}>How it works</Title>
                </Col>
              </Row>
              <Space
                direction="vertical"
                size="large"
                className={styles.containerSpace}
              >
                <Space direction="horizontal" size="large">
                  <Row justify="space-between" gutter={[0, 48]}>
                    <Col xs={{ span: 24, order: 2 }} lg={{ span: 8, order: 1 }}>
                      <Title level={4}>Develop a Plan</Title>
                      <Text>
                        Plan out your next code project and keep your goal in
                        sight. Plan out specific goals for what you want to
                        accomplish with the application, your target audience
                        needs, and a feature wishlist. Planning will stop you
                        from writing excess code that you will scrap later
                        because you didn't have a clear plan of what was needed.
                      </Text>
                    </Col>
                    <Col
                      xs={{ span: 24, order: 1 }}
                      lg={{ span: 14, order: 2 }}
                    >
                      <Image
                        src=""
                        alt="Screen shot of overview section"
                        width={3360}
                        height={1828}
                        className={styles.landingImage}
                      />
                    </Col>
                  </Row>
                </Space>
                <Space direction="horizontal" size="large">
                  <Row justify="space-between" gutter={[0, 48]}>
                    <Col xs={{ span: 24 }} lg={{ span: 14 }}>
                      <Image
                        src=""
                        alt="Screen shot of inspiration section"
                        width={3360}
                        height={1828}
                        className="landingImage"
                      />
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                      <Title level={4}>Add Inspiration</Title>
                      <Text>
                        Easily add and keep track of what sites and photos
                        inspire you, all in one place. Avoid losing photos and
                        websites you find when planning your next project by
                        saving them in one place.
                      </Text>
                    </Col>
                  </Row>
                </Space>
                <Space direction="horizontal" size="large">
                  <Row justify="space-between" gutter={[0, 48]}>
                    <Col xs={{ span: 24, order: 2 }} lg={{ span: 8, order: 1 }}>
                      <Title level={4}>Save Code</Title>
                      <Text>
                        Found code that you will need later? Save it for later,
                        don't lose it! Save Code you find while researching your
                        new project idea and be able to save it for later.
                        Document the code block with notes on why it's useful.
                        Syntax highlighting for several different languages,
                        readability is never an issue!
                      </Text>
                    </Col>
                    <Col
                      xs={{ span: 24, order: 1 }}
                      lg={{ span: 14, order: 2 }}
                    >
                      <Image
                        src=""
                        alt="Screen shot of adding a code snippet"
                        width={3360}
                        height={1828}
                        className={styles.landingImage}
                      />
                    </Col>
                  </Row>
                </Space>
              </Space>
              <Row justify="space-between" style={{ margin: "6rem 0" }}>
                <Col
                  xs={{ span: 24 }}
                  lg={{ span: 18 }}
                  className={styles.signUpFooter}
                >
                  <Col>
                    <Title level={4}>
                      Signup today with your email and get started for free.
                    </Title>
                  </Col>
                  <Col style={{ marginBottom: ".5rem" }}>
                    <Text type="secondary">No Credit card required!</Text>
                  </Col>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                  <Link href="/signup">
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        borderRadius: ".5rem",
                        padding: "0 1.5rem",
                        width: "100%",
                        marginTop: ".5rem",
                      }}
                    >
                      Create a free account
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Content>
          </Layout>
          <Layout>
            <Footer style={{ padding: "2rem 0" }}>
              <Divider style={{ marginBottom: "2rem" }} />
              <Row justify="space-between">
                <Text>© 2021 All rights reserved.</Text>
                <Text>
                  Made by <a href="https://www.joshmcdaniel.com/">Josh</a>
                </Text>
              </Row>
            </Footer>
          </Layout>
        </Col>
      </Row>
    </div>
  );
}
