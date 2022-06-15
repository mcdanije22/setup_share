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
  Card,
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
      text: "The ability to link your audience to products you find most useful.",
    },
    {
      title: "Share",
      text: "Share everything that makes your setup unique, productive and aesthetic.",
    },
    {
      title: "Ease",
      text: "Easily create setups, add items and track what matters.",
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
          {/* <Col span={24}>
            <Link href="/register">
              <a style={{ color: "black" }}>Sign up</a>
            </Link>
          </Col> */}
          <Col span={24}>
            <Link
              href={`${process.env.BASE_URL}/setup/7a0fa791-4975-4ed0-9516-dc933d4b0ea2`}
              passHref
            >
              <a target="_blank">
                <Button
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
              </a>
            </Link>
          </Col>
        </Row>
      </Drawer>
      <BackTop />
      <Row justify="center">
        <Col xs={{ span: 22 }} lg={{ span: 18 }}>
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
                      {/* <Col>
                        <Link href="/register">
                          <a style={{ color: "black" }}>Sign up</a>
                        </Link>
                      </Col> */}
                      <Link
                        href={`${process.env.BASE_URL}/setup/7a0fa791-4975-4ed0-9516-dc933d4b0ea2`}
                        passHref
                      >
                        <a target="_blank">
                          <Button
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
                        </a>
                      </Link>
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
                  <Title level={1} className="landingTitle">
                    Simplify sharing your personal setups
                  </Title>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Title level={1} className="landingTitle">
                    to your audience
                  </Title>
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
                  <a href="#signupArea">
                    <Button
                      type="primary"
                      size="large"
                      style={{ borderRadius: ".5rem", padding: "0 1.5rem" }}
                    >
                      Start sharing for free
                    </Button>
                  </a>
                </Col>
              </Row>
              <Row justify="center" style={{ marginTop: ".5rem" }}>
                <Col>
                  <Text type="secondary">No Credit card required!</Text>
                </Col>
              </Row>
              <Row justify="center" className={styles.containerSpace}>
                <Col
                  span={24}
                  id={styles.heroImage}
                  style={{
                    backgroundColor: "#f7f7f8",
                  }}
                >
                  {/* <Image
                    src="/main.jpg"
                    alt="Screen shot of main page for app"
                    layout="fill"
                    placeholder="blur"
                    priority={true}
                  /> */}
                  <img
                    src="/main.jpg"
                    alt="Screen shot of main page for app"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: ".5rem",
                    }}
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
                  <Title level={5} style={{ marginTop: "2rem" }}>
                    When sharing a setup, you need:
                  </Title>
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
              <Row className={styles.containerSpace} id={styles.headerResponse}>
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
                        the left, front and, right.
                      </Text>
                    </Col>
                    <Col
                      xs={{ span: 24, order: 1 }}
                      lg={{ span: 14, order: 2 }}
                      className={styles.landingImage}
                    >
                      {/* <Image
                        src="/slide_show.gif"
                        alt="Screen shot of overview sides"
                        width={3360}
                        height={1828}
                        className={styles.landingImage}
                      /> */}
                      <img
                        src="/slide_show.gif"
                        alt="Screen shot of overview sides"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: ".5rem",
                        }}
                      />
                    </Col>
                  </Row>
                </Space>
                <Space
                  direction="horizontal"
                  size="large"
                  className={styles.containerSpace}
                >
                  <Row justify="space-between" gutter={[0, 48]}>
                    <Col
                      xs={{ span: 24 }}
                      lg={{ span: 14 }}
                      className={styles.landingImage}
                    >
                      {/* <Image
                        src="/add_item.gif"
                        alt="Screen record of adding items"
                        width={3360}
                        height={1828}
                        className="landingImage"
                      /> */}
                      <img
                        src="/add_item.gif"
                        alt="Screen record of adding items"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: ".5rem",
                        }}
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
                <Space
                  direction="horizontal"
                  size="large"
                  className={styles.containerSpace}
                >
                  <Row justify="space-between" gutter={[0, 48]}>
                    <Col xs={{ span: 24, order: 2 }} lg={{ span: 8, order: 1 }}>
                      <Title level={4}>Track everything!</Title>
                      <Text>
                        Obtain detailed analytics on your setup! Get information
                        on things such as how many unique visits its receiving
                        or how many times an item in your setup is clicked.
                        Giving you the ability to see what your audience likes
                        and doesn't like within your setup so that you can
                        adjust for the future.
                      </Text>
                    </Col>
                    <Col
                      xs={{ span: 24, order: 1 }}
                      lg={{ span: 14, order: 2 }}
                      className={styles.infoImage}
                    >
                      {/* <Image
                        src="/analytics.jpg"
                        alt="Screen shot of analytics dashboard"
                        layout="fill"
                        placeholder="blur"
                      /> */}
                      <img
                        src="/analytics.jpg"
                        alt="Screen shot of analytics dashboard"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Col>
                  </Row>
                </Space>
              </Space>
              <Row
                justify="center"
                className={styles.containerSpace}
                id="signupArea"
              >
                <Col className={styles.cardOptions}>
                  <Title level={2}>Starter</Title>
                  <div className={styles.cardMainContent}>
                    <ul>
                      <li>Lorem Ipsum has been the industry</li>
                      <li>Lorem Ipsum has been the industry</li>
                      <li>Lorem Ipsum has been the industry</li>
                    </ul>
                  </div>
                  <div className={styles.cardFooterContent}>
                    <Title level={3}>FREE</Title>
                    <Link href="/betasignup?level=starter">
                      <Button ghost type="primary" shape="round" size="large">
                        Sign up!
                      </Button>
                    </Link>
                  </div>
                </Col>
                <Col className={styles.cardOptions}>
                  <Title level={2}>hobbyist</Title>
                  <div className={styles.cardMainContent}>
                    <ul>
                      <li>Lorem Ipsum has been the industry</li>
                      <li>Lorem Ipsum has been the industry</li>
                      <li>Lorem Ipsum has been the industry</li>
                    </ul>
                  </div>
                  <div className={styles.cardFooterContent}>
                    <Title level={3}>$19.99/mo</Title>
                    <Link href="/betasignup?level=mid">
                      <Button ghost type="primary" shape="round" size="large">
                        Sign up!
                      </Button>
                    </Link>
                  </div>
                </Col>
                <Col className={styles.cardOptions}>
                  <Title level={2}>Professional</Title>
                  <div className={styles.cardMainContent}>
                    <ul>
                      <li>Lorem Ipsum has been the industry</li>
                      <li>Lorem Ipsum has been the industry</li>
                      <li>Lorem Ipsum has been the industry</li>
                    </ul>
                  </div>
                  <div className={styles.cardFooterContent}>
                    <Title level={3}>$49.99/mo</Title>
                    <Link href="/betasignup?level=pro">
                      <Button ghost type="primary" shape="round" size="large">
                        Sign up!
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
              {/* <Row justify="space-between" style={{ margin: "6rem 0" }}>
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
              </Row> */}
            </Content>
          </Layout>
          <Layout>
            <Footer style={{ padding: "2rem 0" }}>
              <Divider style={{ marginBottom: "2rem" }} />
              <Row justify="center">
                <Text>© {new Date().getFullYear()} All rights reserved.</Text>
              </Row>
            </Footer>
          </Layout>
        </Col>
      </Row>
    </div>
  );
}
