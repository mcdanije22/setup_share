import { useState } from "react";
import Link from "next/link";
import { Button, Drawer, Col, Row, Typography, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./topNavBar.module.scss";

const { Title, Text } = Typography;

const TopNavBar: React.FC<any> = () => {
  const [drawerStatus, showDrawer] = useState<boolean>(false);

  const openDrawer = () => {
    showDrawer(true);
  };
  const closeDrawer = () => {
    showDrawer(false);
  };

  return (
    <div id="landingPageContainer">
      <Drawer
        title="Plan Code"
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
        </Row>
      </Drawer>

      <Row justify="space-between">
        <Col xs={{ flex: "auto" }} lg={{ span: 8 }}>
          <Title level={3} key="1" style={{ padding: "1rem 0" }}>
            <Link href="/" key="2">
              <a style={{ color: "black" }}>Plan Code</a>
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
          <MenuOutlined style={{ fontSize: "1.2rem" }} onClick={openDrawer} />
        </Col>
      </Row>
    </div>
  );
};
export default TopNavBar;
