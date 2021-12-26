import React, { useEffect, useState } from "react";
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
import { Carousel, Tabs, Divider } from "antd";
import { UserOutlined, HeartTwoTone, EyeOutlined } from "@ant-design/icons";
import styles from "./setupPage.module.scss";

const { Link, Title } = Typography;
const { TabPane } = Tabs;

interface Props {
  getSetUpInfo: Array<any>;
}

export default function SetupPage(props: Props) {
  const [currentImageView, setImageView] = useState<string>("Main");
  const [currentImageObject, setImageObject] = useState<object>({});
  const [currentImageItems, setImageItems] = useState([]);
  const [currentImageCoordList, setImageCoordList] = useState([]);
  const [imageAreas, setImageAreas] = useState([]);
  const { getSetUpInfo, getImageItems } = props;

  useEffect(() => {
    console.log(props);
    if (getSetUpInfo.length > 1) {
      carouselRef.current.goTo(1, true);
    }
  }, []);
  //issues with use effect, need correct logic
  useEffect(() => {
    setDataPageInfo();
  }, [currentImageView]);
  // useEffect(() => {
  //   const createMapAreas = getImageItems.map((item, i) => {
  //     let currentList = imageAreas;
  //     if (item.image_id === currentImageObject.image_id) {
  //       const addToAreaList = currentList.push(createArea(item));
  //       console.log("test", imageAreas);
  //     }
  //   });
  // }, [currentImageObject]);
  // changing from currentimageview to currentimageobject for use effect may cause issue
  useEffect(() => {
    setDataPageInfo();
    const test = async () => {
      const createMapAreas = await getImageItems.map((item, i) => {
        let currentList = imageAreas;
        if (item.image_id === currentImageObject.image_id) {
          const addToAreaList = currentList.push(createArea(item));
          console.log("test", imageAreas);
        }
        setImageAreas(currentList);
      });
    };
    test();
  }, [currentImageObject]);
  const setDataPageInfo = async () => {
    const filteredImageObject = getSetUpInfo.filter((imageObject, i) => {
      return imageObject.image_position === currentImageView;
    });
    setImageObject(filteredImageObject[0]);
    const currentItems = await getImageItems.filter((item, i) => {
      return item.image_id === filteredImageObject[0].image_id;
    });
    const setItemCoords = await getImageItems.map((item, i) => {
      if (item.image_id === currentImageObject.image_id) {
        getItemcoordsList(item);
      }
    });
    //use area functions only
    // const createMapAreas = await getImageItems.map((item, i) => {
    //   if (item.image_id === filteredImageObject[0].image_id) {
    //     const currentList = imageAreas;
    //     const addToAreaList = currentList.push(createArea(item));
    //     console.log("test", imageAreas);
    //   }
    // });
    console.log("new", imageAreas);
    setImageItems(currentItems);
  };
  const createArea = (item) => {
    return {
      id: item.item_id,
      name: item.item_name,
      shape: "poly",
      coords: [...item.coords_list],
      url: item.item_url,
      preFillColor: "green",
      fillColor: "blue",
    };
  };
  const getItemcoordsList = (item) => {
    const currentList = currentImageCoordList;
    const addToCoordList = currentList.push(...item.coords_list);
    setImageCoordList(currentList);
  };
  console.log(currentImageCoordList);
  let MAP = {
    name: "image-map",
    areas: [...imageAreas],
  };

  function onChange(a) {
    setImageView(getSetUpInfo[a].image_position);
  }
  function callback(key) {
    console.log(key);
  }

  const carouselRef = React.createRef();

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
                title={`${getSetUpInfo[0].username}`}
                extra={[<HeartTwoTone twoToneColor="#eb2f96" />]}
                avatar={{
                  src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
                }}
              />
            </Col>
          </Row>

          <Row justify="center">
            <Col span={24}>
              <Carousel afterChange={onChange} ref={carouselRef}>
                {getSetUpInfo
                  .sort((a, b) =>
                    a.image_position_number > b.image_position_number ? 1 : -1
                  )
                  .map((item, i) => {
                    return (
                      <div key={i}>
                        <ImageMapper
                          src={item.image_url}
                          map={MAP}
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
                {currentImageObject.image_position}
              </Title>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Items" key="1">
                  {currentImageItems.map((item, i) => {
                    return (
                      <div key={i}>
                        <Row justify="space-between">
                          <Col key={i}>
                            {i + 1}.{" "}
                            <Link
                              href={`${item.item_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.item_name}
                            </Link>
                          </Col>
                          <EyeOutlined />
                        </Row>
                        {i !== currentImageItems.length - 1 ? (
                          <Divider orientation="left" />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
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
