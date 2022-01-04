//import React, { useEffect, useState } from "react";
//import Layout from "../../components/Layout/Layout";
//import { v4 as uuidv4 } from "uuid";
//import axios from "axios";
//import {
//  Row,
//  Col,
//  Form,
//  Input,
//  Button,
//  Checkbox,
//  PageHeader,
//  Typography,
//  Avatar,
//  Space,
//} from "antd";
//import { GetServerSideProps } from "next";
//import ImageMapper from "react-image-mapper";
//import { Carousel, Tabs, Divider } from "antd";
//import {
//  UserOutlined,
//  HeartTwoTone,
//  EyeOutlined,
//  LeftOutlined,
//  RightOutlined,
//} from "@ant-design/icons";
//import styles from "./setupPage.module.scss";
//import ImageOneMapContainer from "../../components/imageMapContainers/ImageOneMapContainer";
//import ImageTwoMapContainer from "../../components/imageMapContainers/ImageTwoMapContainer";
//import ImageThreeMapContainer from "../../components/imageMapContainers/ImageThreeMapContainer";

//const { Link, Title } = Typography;
//const { TabPane } = Tabs;

//interface Props {
//  getSetUpInfo: Array<any>;
//}

//export default function SetupPage(props: Props) {
//  const [currentImageView, setImageView] = useState<string>("Main");
//  const [currentImageObject, setImageObject] = useState<object>({});
//  const [currentImageItems, setImageItems] = useState([]);
//  const [isActive, setActiveStatus] = useState(false);
//  const [imageAreas, setImageAreas] = useState([]);
//  const { getSetUpInfo, getImageItems } = props;
//  const [fillColor, setFillColor] = useState("");

//  useEffect(() => {
//    console.log(props);
//    if (getSetUpInfo.length > 1) {
//      carouselRef.current.goTo(1, true);
//    }
//  }, []);
//  useEffect(() => {
//    setDataPageInfo();
//    resetCurrentImageAreas();
//  }, [currentImageView]);

//  useEffect(() => {
//    setDataPageInfo();
//    createCurrentImageAreasList();
//  }, [currentImageObject]);

//  const setDataPageInfo = async () => {
//    const filteredImageObject = getSetUpInfo.filter((imageObject, i) => {
//      return imageObject.image_position === currentImageView;
//    });
//    setImageObject(filteredImageObject[0]);
//    //shouldn't need this logic but items dont show without it
//    const currentItems = await getImageItems.filter((item, i) => {
//      return item.image_id === filteredImageObject[0].image_id;
//    });
//    setImageItems(currentItems);
//  };
//  const createCurrentImageAreasList = async () => {
//    const createMapAreas = await getImageItems.map((item, i) => {
//      let currentList = imageAreas;
//      if (item.image_id === currentImageObject.image_id) {
//        const addToAreaList = currentList.push(createArea(item));
//        console.log("test", imageAreas);
//      }
//      setImageAreas(currentList);
//    });
//  };

//  const createArea = (item) => {
//    return {
//      id: item.item_id,
//      name: item.item_name,
//      shape: "poly",
//      coords: [...item.coords_list],
//      href: item.item_url,
//      preFillColor: "transparent",
//    };
//  };

//  const resetCurrentImageAreas = () => {
//    MAP.areas = [];
//    setImageAreas([]);
//  };
//  let MAP = {
//    name: uuidv4(),
//    areas: [...imageAreas],
//  };
//  let MAP2 = {
//    name: uuidv4(),
//    areas: [...imageAreas],
//  };

//  function onChange(a) {
//    setImageView(getSetUpInfo[a].image_position);
//  }
//  function callback(key) {
//    console.log(key);
//  }

//  const carouselRef = React.createRef();
//  console.log(currentImageObject);

//  return (
//    <Layout
//      title={`${getSetUpInfo[0].username}'s ${getSetUpInfo[0].setup_title} setup`}
//    >
//      <div id={styles.setupPageContainer}>
//        <div>
//          <Row justify="center">
//            <Col span={24}>
//              <Title level={1} style={{ textAlign: "center" }}>
//                {getSetUpInfo[0].setup_title}
//              </Title>
//            </Col>
//          </Row>
//          <Row justify="center">
//            <Col span={22}>
//              <PageHeader
//                title={`${getSetUpInfo[0].username}`}
//                extra={<HeartTwoTone twoToneColor="#eb2f96" />}
//                avatar={{
//                  src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
//                }}
//              />
//            </Col>
//          </Row>
//          <Row>
//            <Col span={24} style={{ display: "" }}>
//              <ImageOneMapContainer
//                name={getSetUpInfo[0].image_id}
//                area={imageAreas}
//              />
//            </Col>
//            <Col span={24} style={{ display: "none" }}>
//              <ImageTwoMapContainer
//                name={getSetUpInfo[1].image_id}
//                area={imageAreas}
//              />
//            </Col>
//            <Col span={24} style={{ display: "none" }}>
//              <ImageThreeMapContainer name={"test"} area={imageAreas} />
//            </Col>
//          </Row>
//          <Row justify="center" style={{ padding: ".5rem 0" }}>
//            <Col span={22}>
//              <Row justify="space-between" style={{ alignItems: "center" }}>
//                <Col>
//                  <LeftOutlined />
//                </Col>
//                <Col>
//                  <Title level={3} style={{ margin: "0" }}>
//                    {currentImageObject.image_position}
//                  </Title>
//                </Col>
//                <Col>
//                  <RightOutlined />
//                </Col>
//              </Row>
//            </Col>
//          </Row>
//          <Row justify="center">
//            <Col span={24}>
//              <Carousel afterChange={onChange} ref={carouselRef}>
//                {getSetUpInfo
//                  .sort((a, b) =>
//                    a.image_position_number > b.image_position_number ? 1 : -1
//                  )
//                  .map((item, i) => {
//                    return (
//                      <div key={i}>
//                        <ImageMapper
//                          src={item.image_url}
//                          map={MAP}
//                          fillColor={"red"}
//                          width={375}
//                          height={350}
//                          onMouseEnter={(area: any) => {
//                            console.log(area);
//                          }}
//                          onImageClick={(e: any) => {
//                            console.log("test");
//                          }}
//                        />
//                      </div>
//                    );
//                  })}
//              </Carousel>
//            </Col>
//          </Row>
//          <Row justify="center">
//            <Col span={24}>
//              <Title
//                level={3}
//                style={{ textAlign: "center", marginTop: "1rem" }}
//              >
//                {currentImageObject.image_position}
//              </Title>
//            </Col>
//          </Row>
//          <Row>
//            <Col span={24}>
//              <Tabs defaultActiveKey="1" onChange={callback}>
//                <TabPane tab="Items" key="1">
//                  {imageAreas.map((item, i) => {
//                    return (
//                      <div key={i}>
//                        <Row justify="space-between">
//                          <Col key={i}>
//                            {i + 1}.{" "}
//                            <Link
//                              href={`${item.href}`}
//                              target="_blank"
//                              rel="noopener noreferrer"
//                            >
//                              {item.name}
//                            </Link>
//                          </Col>
//                          <EyeOutlined />
//                        </Row>
//                        {i !== imageAreas.length - 1 ? (
//                          <Divider orientation="left" />
//                        ) : (
//                          ""
//                        )}
//                      </div>
//                    );
//                  })}
//                </TabPane>
//                <TabPane tab="Description" key="2">
//                  {getSetUpInfo[0].setup_description}
//                </TabPane>
//                <TabPane tab="Comments" key="3">
//                  Content of Tab Pane 3
//                </TabPane>
//              </Tabs>
//            </Col>
//          </Row>
//        </div>
//      </div>
//    </Layout>
//  );
//}

//export const getServerSideProps: GetServerSideProps = async (context) => {
//  const { id } = context.query;
//  const response = await axios.get(`${process.env.BASE_API}/setup/${id}`);
//  const setUpPageData = await response.data;
//  return {
//    props: setUpPageData,
//  };
//};
//
//
//
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { v4 as uuidv4 } from "uuid";
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
  Tabs,
  Divider,
} from "antd";
import { GetServerSideProps } from "next";
import {
  HeartTwoTone,
  EyeOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import styles from "./setupPage.module.scss";
import ImageMapContainer from "../../components/imageMapContainer/ImageMapContainer";

const { Link, Title, Text } = Typography;
const { TabPane } = Tabs;

interface Props {
  getSetUpInfo: Array<any>;
}

export default function SetupPage(props: Props) {
  const [currentImageView, setImageView] = useState<string>("Main");
  const [currentImageObject, setImageObject] = useState<object>({});
  const [currentImageItems, setImageItems] = useState([]);
  const [imageAreas, setImageAreas] = useState([]);
  const { getSetUpInfo, getImageItems } = props;
  const [fillColor, setFillColor] = useState("");
  const [imagePositions, setPositionList] = useState([]);
  const [rightSideImageEnd, setRightSideEnd] = useState(false);
  const [leftSideImageEnd, setLeftSideEnd] = useState(false);
  const [areaItemsHidden, setItemsHidden] = useState(false);
  const [showHighlighting, setHighlightingStatus] = useState(false);

  useEffect(() => {
    console.log(props);
    if (getSetUpInfo.length > 1) {
    }
    const list = [];
    getSetUpInfo.map((item, i) => {
      list.push(item.image_position);
      setPositionList(list);
    });
  }, []);

  useEffect(() => {
    setDataPageInfo();
  }, [currentImageView]);

  useEffect(() => {
    setDataPageInfo();
    createCurrentImageAreasList();
    onImageChangeRightSideCheck();
    onImageChangeLeftSideCheck();
  }, [currentImageObject]);

  const setDataPageInfo = async () => {
    const filteredImageObject = getSetUpInfo.filter((imageObject, i) => {
      return imageObject.image_position === currentImageView;
    });
    setImageObject(filteredImageObject[0]);
    //shouldn't need this logic but items dont show without it
    const currentItems = await getImageItems.filter((item, i) => {
      return item.image_id === filteredImageObject[0].image_id;
    });
    setImageItems(currentItems);
  };
  const createCurrentImageAreasList = async (status = false) => {
    let currentList = [];
    const createMapAreas = await getImageItems.map((item, i) => {
      if (item.image_id === currentImageObject.image_id) {
        const addToAreaList = currentList.push(createArea(item, status));
        console.log("test", imageAreas);
      }
      setImageAreas(currentList);
    });
  };

  const createArea = (item, status) => {
    let fill = "";
    if (status) {
      fill = "red";
    } else {
      fill = "transparent";
    }
    return {
      id: item.item_id,
      name: item.item_name,
      shape: "poly",
      coords: [...item.coords_list],
      href: item.item_url,
      preFillColor: fill,
    };
  };

  function callback(key) {
    console.log(key);
  }
  const goRightImage = () => {
    //fix logic to disable buttons on end of images and not to loop
    const positionListLength = imagePositions.length;
    const currentImageIndex = imagePositions.indexOf(currentImageView);
    if (currentImageIndex !== positionListLength - 1) {
      setImageView(imagePositions[currentImageIndex + 1]);
    }
    setItemsHidden(false);
  };
  const goLeftImage = () => {
    const positionListLength = imagePositions.length;
    const currentImageIndex = imagePositions.indexOf(currentImageView);
    if (currentImageIndex !== 0) {
      setImageView(imagePositions[currentImageIndex - 1]);
    }

    setItemsHidden(false);
  };
  const onImageChangeRightSideCheck = () => {
    if (
      imagePositions.length - 1 ===
      imagePositions.indexOf(currentImageView)
    ) {
      setRightSideEnd(true);
    } else {
      setRightSideEnd(false);
    }
  };
  const onImageChangeLeftSideCheck = () => {
    if (imagePositions.indexOf(currentImageView) === 0) {
      setLeftSideEnd(true);
    } else {
      setLeftSideEnd(false);
    }
  };
  const hideItemAreas = () => {
    setItemsHidden(true);
    setHighlightingStatus(false);
    setImageAreas([]);
    setDataPageInfo();
  };
  const showItemAreas = () => {
    setItemsHidden(false);
    createCurrentImageAreasList();
    setDataPageInfo();
  };
  const hideHighlighting = () => {
    setHighlightingStatus(false);
    setImageAreas([]);
    createCurrentImageAreasList();
    setDataPageInfo();
  };
  const showImageHighlighting = () => {
    setHighlightingStatus(true);
    setImageAreas([]);
    createCurrentImageAreasList(true);
    setDataPageInfo();
  };
  console.log(showHighlighting);
  return (
    <Layout
      title={`${getSetUpInfo[0].username}'s ${getSetUpInfo[0].setup_title} setup`}
    >
      <div id={styles.setupPageContainer}>
        <div>
          <Row justify="center">
            <Col span={24}>
              <Title
                level={1}
                style={{ textAlign: "center", marginBottom: "0" }}
              >
                {getSetUpInfo[0].setup_title}
              </Title>
            </Col>
            <Col span={24}>
              <Title
                level={2}
                type="secondary"
                style={{ textAlign: "center", fontSize: ".8rem" }}
              >
                {getSetUpInfo[0].setup_type}
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={22}>
              <PageHeader
                title={`${getSetUpInfo[0].username}`}
                extra={<HeartTwoTone twoToneColor="#eb2f96" />}
                avatar={{
                  src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
                }}
              />
            </Col>
          </Row>
          <Row>
            {/*Works as long not using carousel. List out images*/}
            {getSetUpInfo
              .sort((a, b) =>
                a.image_position_number > b.image_position_number ? 1 : -1
              )
              .map((item, i) => {
                return (
                  <Col
                    key={i}
                    span={24}
                    style={{
                      display:
                        item.image_position !== currentImageView ? "none" : "",
                    }}
                  >
                    <ImageMapContainer
                      src={item.image_url}
                      name={item.image_id}
                      area={imageAreas}
                    />
                  </Col>
                );
              })}
          </Row>
          <Row justify="center" style={{ padding: ".5rem 0" }}>
            <Col span={22}>
              <Row justify="space-between" style={{ alignItems: "center" }}>
                <Col>
                  <Button
                    type="link"
                    disabled={leftSideImageEnd}
                    style={{ padding: "0" }}
                  >
                    <LeftOutlined onClick={goLeftImage} />
                  </Button>
                </Col>
                <Col>
                  <Title level={3} style={{ margin: "0" }}>
                    {currentImageObject.image_position}
                  </Title>
                </Col>
                <Col>
                  <Button
                    type="link"
                    disabled={rightSideImageEnd}
                    style={{ padding: "0" }}
                  >
                    <RightOutlined onClick={goRightImage} />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Items" key="1">
                  {areaItemsHidden ? (
                    <Button
                      type="link"
                      style={{ margin: "1rem 0", padding: "0" }}
                      onClick={showItemAreas}
                    >
                      Show Items
                    </Button>
                  ) : (
                    <Button
                      danger
                      type="link"
                      style={{ margin: "1rem 0", padding: "0" }}
                      onClick={hideItemAreas}
                    >
                      Hide Items
                    </Button>
                  )}
                  {!areaItemsHidden ? <Divider type="vertical" /> : ""}
                  {showHighlighting && !areaItemsHidden ? (
                    <Button
                      danger
                      type="link"
                      style={{ margin: "1rem 0", padding: "0" }}
                      onClick={hideHighlighting}
                    >
                      Hide Highlight
                    </Button>
                  ) : !showHighlighting && !areaItemsHidden ? (
                    <Button
                      type="link"
                      style={{ margin: "1rem 0", padding: "0" }}
                      onClick={showImageHighlighting}
                    >
                      Highlight Items
                    </Button>
                  ) : (
                    ""
                  )}

                  {imageAreas.map((item, i) => {
                    return (
                      <div key={i} style={{ margin: "1rem 0" }}>
                        <Row justify="space-between">
                          <Col key={i}>
                            {i + 1}.{" "}
                            <Link
                              href={`${item.href}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.name}
                            </Link>
                          </Col>
                          <EyeOutlined />
                        </Row>
                        {i !== imageAreas.length - 1 ? (
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
