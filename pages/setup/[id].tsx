import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  PageHeader,
  Typography,
  Avatar,
  Space,
} from "antd";
import { GetServerSideProps } from "next";
import ImageMapper from "react-image-mapper";
import { Carousel } from "antd";
import { UserOutlined, HeartTwoTone } from "@ant-design/icons";
import styles from "./setupPage.module.scss";

const { Title } = Typography;

interface Props {
  getSetUpInfo: Array<any>;
}

export default function SetupPage(props: Props) {
  useEffect(() => {
    console.log(props);
  });

  const { getSetUpInfo } = props;

  function onChange(a, b, c) {
    console.log(a, b, c);
  }
  const test = ["test", "2", "3"];
  return (
    <Layout
      title={`${getSetUpInfo[0].username}'s ${getSetUpInfo[0].setup_title} setup`}
    >
      <div id={styles.setupPageContainer}>
        <div>
          <Row justify="center">
            <Col span={24}>
              <Title level={1} style={{ textAlign: "center" }}>
                {getSetUpInfo[0].setup_title}
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={24}>
              <PageHeader
                title="Username"
                extra={[
                  <Button key="1" type="link">
                    <HeartTwoTone twoToneColor="#eb2f96" />
                  </Button>,
                ]}
                avatar={{
                  src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
                }}
              />
            </Col>
          </Row>

          <Row justify="center">
            <Col span={24}>
              <Carousel afterChange={onChange}>
                {getSetUpInfo.map((item, i) => {
                  return (
                    <div key={i}>
                      <ImageMapper
                        src={item.image_url}
                        //map={MAP}
                        width={375}
                        height={350}
                        onMouseEnter={(area: any) => {
                          alert("test");
                        }}
                        onImageClick={(e: any) => {
                          console.log("test");
                        }}
                      />
                    </div>
                  );
                })}
              </Carousel>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await axios.get(`${process.env.BASE_API}/setup/${id}`);
  const setUpPageData = await response.data;
  return {
    props: setUpPageData,
  };
};
