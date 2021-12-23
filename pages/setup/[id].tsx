import { useEffect, useState } from "react";
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
import { Carousel, Tabs } from "antd";
import { UserOutlined, HeartTwoTone } from "@ant-design/icons";
import styles from "./setupPage.module.scss";

const { Title } = Typography;
const { TabPane } = Tabs;

interface Props {
  getSetUpInfo: Array<any>;
}

export default function SetupPage(props: Props) {
  useEffect(() => {
    console.log(props);
    const filteredImageObject = props.getSetUpInfo.filter((imageObject, i) => {
      return imageObject.image_position === currentImageView;
    });
    setImageObject(filteredImageObject[0]);
    console.log(currentImageObject);
  });
  const [currentImageView, setImageView] = useState<string>("Main");
  const [currentImageObject, setImageObject] = useState<object>({});
  const { getSetUpInfo } = props;

  function onChange(a) {
    //need to figure out logic for putting main in middle. left<-main->right
    setImageView(getSetUpInfo[a].image_position);
  }
  function callback(key) {
    console.log(key);
  }
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
            <Col span={22}>
              <PageHeader
                title="Username"
                extra={[<HeartTwoTone twoToneColor="#eb2f96" />]}
                avatar={{
                  src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
                }}
              />
            </Col>
          </Row>

          <Row justify="center">
            <Col span={24}>
              <Carousel afterChange={onChange}>
                {getSetUpInfo
                  .sort((a, b) =>
                    a.image_position_number > b.image_position_number ? 1 : -1
                  )
                  .map((item, i) => {
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
          <Row justify="center">
            <Col span={24}>
              <Title
                level={3}
                style={{ textAlign: "center", marginTop: "1rem" }}
              >
                {getSetUpInfo[0].setup_title}
              </Title>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Items" key="1">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Description" key="2">
                  {getSetUpInfo[0].setup_description}
                </TabPane>
                <TabPane tab="Comments" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
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
