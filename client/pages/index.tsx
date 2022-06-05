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
      title: "Links",
      text: "The ability to link your audience to products you find most useful",
    },
    {
      title: "Ease",
      text: "Ease to share, add descriptions and highlights",
    },
    {
      //TODO: come back
      title: "Mobility",
      text: "Gather information and ideas on the go",
    },
  ];

  return (
    <div id={styles.landingPageContainer}>
      <Drawer
        title="MySetupShare"
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
            <title>MySetupShare</title>
            <link rel="icon" href="/icon.png" />
          </Head>
          <Layout>
            <Header>
              <Row justify="space-between">
                <Col xs={{ flex: "auto" }} lg={{ span: 8 }}>
                  <Title level={3} key="1" style={{ padding: "1rem 0" }}>
                    <Link href="/" key="2">
                      <a style={{ color: "black" }}>MySetupShare</a>
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
                  <Title className="landingTitle">
                    Simplify sharing your personal setups
                  </Title>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Title className="landingTitle">to your audience</Title>
                </Col>
              </Row>
              <Row justify="center">
                <Col className="titleDescription">
                  <Text type="secondary">
                    An all in one solution to showcase everything in your setup
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
                      Start sharing for free
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
                    src="/"
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
                  <Title level={5}>When sharing a setup, you need:</Title>
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
                      <Title level={4}>Upload your images!</Title>
                      <Text>
                        Upload up to three of your best images that showcase the
                        setup. Choose the order in which the images are shown
                        for the best viewing experience by using an image for
                        the left, main(front) and, right.
                      </Text>
                    </Col>
                    <Col
                      xs={{ span: 24, order: 1 }}
                      lg={{ span: 14, order: 2 }}
                    >
                      <Image
                        src="/"
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
                        src="/add_item.gif"
                        alt="Screen shot of inspiration section"
                        width={3360}
                        height={1828}
                        className="landingImage"
                      />
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                      <Title level={4}>Add your links!</Title>
                      <Text>
                        Easily add and highlight the items in your setup! Add
                        highlights to the items in your setup so that your
                        audience can effortlessly get information on what you
                        use. Add your personal affiliate links for all of the
                        items you are sending your audience.
                      </Text>
                    </Col>
                  </Row>
                </Space>
                <Space direction="horizontal" size="large">
                  <Row justify="space-between" gutter={[0, 48]}>
                    <Col xs={{ span: 24, order: 2 }} lg={{ span: 8, order: 1 }}>
                      <Title level={4}>Track everything!</Title>
                      <Text>
                        Obtained detailed analytics on your setup! Get
                        information on things such as how many unique visits its
                        receiving or how many times an item in your setup is
                        clicked. Giving you the ability to see what your
                        audience likes and doesn't like within your setup so
                        that you can adjust for the future.
                      </Text>
                    </Col>
                    <Col
                      xs={{ span: 24, order: 1 }}
                      lg={{ span: 14, order: 2 }}
                    >
                      <Image
                        src="/"
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
