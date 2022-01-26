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
  Switch,
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
import { useMediaQuery } from "react-responsive";

const { Link, Title, Text } = Typography;
const { TabPane } = Tabs;

interface Props {
  getSetUpInfo: Array<any>;
}

export default function SetupPage(props: Props) {
  const [loading, setLoading] = useState(false);
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
  const [createdResolution, setCreatedResolution] = useState("Mobile");
  const [mobileLoaded, setMobileLoad] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const phoneWidth = 375;
  const phoneHeight = 350;
  const desktopWidth = 1000;
  const desktopHeight = 600;

  useEffect(() => {
    if (isMobile) {
      setMobileLoad(true);
    }
  }, []);
  useEffect(() => {
    console.log("getItems", getImageItems);
    if (
      (!isMobile && createdResolution === "Mobile") ||
      (isMobile && createdResolution === "Desktop")
    ) {
      mobileToDesktopCoords(getImageItems);
    }
  }, []);
  useEffect(() => {
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
    setHighlightingStatus(false);
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
  const createCurrentImageAreasList = async (status = false, id = null) => {
    let currentList = [];
    const createMapAreas = await getImageItems.map((item, i) => {
      if (item.image_id === currentImageObject.image_id) {
        const addToAreaList = currentList.push(createArea(item, status, id));
      }
      console.log(currentList);
      setImageAreas(currentList);
    });
  };

  const createArea = (item, status, id) => {
    let fill = "";
    if (status) {
      fill = "#649758";
    } else {
      fill = "";
    }
    if (id !== null && item.item_id == id) {
      fill = "#649758";
    }
    return {
      id: item.item_id,
      name: item.item_name,
      shape: "poly",
      coords: [...item.coords_list],
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
  function onToggle(checked) {
    if (checked) {
      showImageHighlighting();
    } else {
      hideHighlighting();
    }
  }
  const highlightItem = (id) => {
    setImageAreas([]);
    createCurrentImageAreasList(false, id);
    setDataPageInfo();
    setHighlightingStatus(false);
  };
  const mobileToDesktopCoords = (itemsList) => {
    let orgWidth, orgHeight;
    let newWidth, newHeight;
    if (!isMobile && createdResolution === "Mobile") {
      orgWidth = phoneWidth;
      orgHeight = phoneHeight;
      newWidth = desktopWidth;
      newHeight = desktopHeight;
    } else if (isMobile && createdResolution === "Desktop") {
      orgWidth = desktopWidth;
      orgHeight = desktopHeight;
      newWidth = phoneWidth;
      newHeight = phoneHeight;
    }
    itemsList.map((item, i) => {
      const newList = item.coords_list.map((coord, j) => {
        if (j % 2 === 0 || j === 0) {
          return Math.round((coord * newWidth) / orgWidth);
        } else {
          return Math.round((coord * newHeight) / orgHeight);
        }
      });
      item.coords_list = newList;
    });
  };
  // const mobileToDesktopCoords = (itemsList) => {
  //     itemsList.map((item, i) => {
  //       const newList = item.coords_list.map((coord, j) => {
  //         if (j % 2 === 0 || j === 0) {
  //           return Math.round((coord * 1000) / 375);
  //         } else {
  //           return Math.round((coord * 600) / 350);
  //         }
  //       });
  //       item.coords_list = newList;
  //     });
  //   }
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
          <Row justify="center">
            <Col>
              {/*Works as long not using carousel. List out images*/}
              {getSetUpInfo
                .sort((a, b) =>
                  a.image_position_number > b.image_position_number ? 1 : -1
                )
                .map((item, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        display:
                          item.image_position !== currentImageView
                            ? "none"
                            : "",
                      }}
                    >
                      <ImageMapContainer
                        src={item.image_url}
                        name={item.image_id}
                        areas={imageAreas}
                        onItemClick={highlightItem}
                        mobileLoaded={mobileLoaded}
                        phoneWidth={phoneWidth}
                        phoneHeight={phoneHeight}
                        desktopWidth={desktopWidth}
                        desktopHeight={desktopHeight}
                      />
                    </div>
                  );
                })}
            </Col>
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
                  <Row style={{ margin: ".5rem 0" }}>
                    <Col>
                      <Switch onChange={onToggle} checked={showHighlighting} />{" "}
                      <Text style={{ marginLeft: ".5rem" }}>
                        Highlight All{" "}
                      </Text>
                    </Col>
                  </Row>
                  {imageAreas.map((item, i) => {
                    return (
                      <div key={i} style={{ margin: "2rem 0" }}>
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
                          <EyeOutlined
                            onClick={() => {
                              highlightItem(item.id);
                            }}
                          />
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
