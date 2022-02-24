import { useState } from "react";
import Link from "next/link";
import { Button, Drawer, Col, Row, Typography, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./topNavBar.module.scss";

const { Title } = Typography;

const TopNavBar: React.FC = () => {
  const [drawerStatus, showDrawer] = useState<boolean>(false);

  const openDrawer = () => {
    showDrawer(true);
  };
  const closeDrawer = () => {
    showDrawer(false);
  };

  return (
    <div id={styles.topNavBarContainer}>
      <Drawer
        title="ShareStation"
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
          id={styles.topNavBar}
        >
          <Col span={24}>
            <Link href="/login">
              <a style={{ color: "black" }}>Login</a>
            </Link>
          </Col>
          <Col span={24}>
            <Link href="/signup">
              <a style={{ color: "black" }}>Register</a>
            </Link>
          </Col>
        </Row>
      </Drawer>

      <Row
        justify="space-between"
        style={{
          padding: "1rem",
          borderBottom: "1px solid #D9D9D9",
          boxShadow: "0 8px 12px -4px #D9D9D9",
        }}
      >
        <Col xs={{ flex: "auto" }} lg={{ span: 8 }}>
          <Title level={3} key="1">
            <Link href="/" key="2">
              <a style={{ color: "black" }}>ShareStation</a>
            </Link>
          </Title>
        </Col>
        <Col xs={{ span: 0 }} md={{ span: 8 }}>
          <Row justify="end">
            <Space size="large">
              <Col>
                <Link href="/login">
                  <a style={{ color: "black" }}>Login</a>
                </Link>
              </Col>
              <Col>
                <Link href="/signup">
                  <a style={{ color: "black" }}>Register</a>
                </Link>
              </Col>
              <Col>
                <Button
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
        <Col xs={{ span: 2 }} md={{ span: 0 }} style={{ alignSelf: "center" }}>
          <MenuOutlined style={{ fontSize: "1.2rem" }} onClick={openDrawer} />
        </Col>
      </Row>
    </div>
  );
};
export default TopNavBar;
