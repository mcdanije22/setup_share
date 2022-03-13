import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  MobileWidth,
  MobileHeight,
  TabletWidth,
  TabletHeight,
  LaptopWidth,
  LaptopHeight,
} from "../../utils/constants/screenSize";
import { BaseAPI } from "../../utils/constants/common";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  PageHeader,
  Typography,
  Tabs,
  Divider,
  Switch,
} from "antd";
import { GetServerSideProps } from "next";
import { LeftOutlined, RightOutlined, HeartTwoTone } from "@ant-design/icons";
import styles from "./setupPage.module.scss";
import layoutStyles from "../../components/Layout/layout.module.scss";
import ImageMapContainer from "../../components/imageMapContainer/ImageMapContainer";
import { useMediaQuery } from "react-responsive";
import ItemList from "../../components/ItemList";
import { useCookies } from "react-cookie";

const { Link, Title, Text } = Typography;
const { TabPane } = Tabs;

interface SetupObject {
  setup_id: string;
  setup_title: string;
  setup_description: string;
  setup_type: string;
  setup_created_date: Date;
  created_screen_type?: any;
  image_url: string;
  image_position: string;
  image_position_number: number;
  user_id: string;
  username: string;
  image_id: string;
}
interface ImageItemsObject {
  item_id: string;
  image_id: string;
  user_id?: any;
  setup_id: string;
  coords_list: number[];
  item_name: string;
  item_url: string;
}
interface MapAreaItem {
  id: string;
  name: string;
  shape: string;
  coords: number[];
  preFillColor: string;
}
interface Props {
  getSetUpInfo: Array<SetupObject>;
  getImageItems: Array<ImageItemsObject>;
}

export default function SetupPage(props: Props) {
  const [loading, setLoading] = useState(false);
  const [currentImageView, setImageView] = useState<string>("Main");
  const [currentImageObject, setImageObject] = useState<any>({});
  const [currentImageItems, setImageItems] = useState<Array<ImageItemsObject>>(
    []
  );
  const [imageAreas, setImageAreas] = useState<Array<MapAreaItem>>([]);
  const { getSetUpInfo, getImageItems } = props;
  const [imagePositions, setPositionList] = useState<Array<string>>([]);
  const [rightSideImageEnd, setRightSideEnd] = useState(false);
  const [leftSideImageEnd, setLeftSideEnd] = useState(false);
  const [areaItemsHidden, setItemsHidden] = useState(false);
  const [showHighlighting, setHighlightingStatus] = useState(false);
  const [createdResolution, setCreatedResolution] = useState("Mobile");
  const [onLoadScreenType, setOnLoadScreenType] = useState<string>("");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isLaptop = useMediaQuery({ minWidth: 992 });
  const [cookies, setCookies] = useCookies<any>(["visitor"]);
  // const isLaptop = useMediaQuery({ minWidth: 992, maxWidth: 1439 });

  useEffect(() => {
    setupCookieClickFunction();
  }, []);

  useEffect(() => {
    if (isMobile) {
      setOnLoadScreenType("Mobile");
    } else if (isTablet) {
      setOnLoadScreenType("Tablet");
    } else if (isLaptop) {
      setOnLoadScreenType("Laptop");
    }
  }, []);
  useEffect(() => {
    if (
      (isMobile && createdResolution !== "Mobile") ||
      (isTablet && createdResolution !== "Tablet") ||
      (isLaptop && createdResolution !== "Laptop")
    ) {
      mobileToDesktopCoords(getImageItems);
    }
  }, []);
  useEffect(() => {
    if (getSetUpInfo.length > 1) {
    }
    const list: Array<string> = [];
    getSetUpInfo.map((item: SetupObject) => {
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
    const filteredImageObject = getSetUpInfo.filter(
      (imageObject: SetupObject) => {
        return imageObject.image_position === currentImageView;
      }
    );
    setImageObject(filteredImageObject[0]);
    //shouldn't need this logic but items dont show without it
    const currentItems = await getImageItems.filter(
      (item: ImageItemsObject) => {
        return item.image_id === filteredImageObject[0].image_id;
      }
    );
    setImageItems(currentItems);
  };
  const createCurrentImageAreasList = async (
    status: boolean = false,
    id: string | null = null
  ) => {
    let currentList: Array<MapAreaItem> = [];
    await getImageItems.map((item: ImageItemsObject) => {
      if (item.image_id === currentImageObject.image_id) {
        currentList.push(createArea(item, status, id));
      }
      setImageAreas(currentList);
    });
  };

  const createArea = (
    item: ImageItemsObject,
    status: boolean,
    id: string | null
  ) => {
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

  const goRightImage = () => {
    const positionListLength = imagePositions.length;
    const currentImageIndex = imagePositions.indexOf(currentImageView);
    if (currentImageIndex !== positionListLength - 1) {
      setImageView(imagePositions[currentImageIndex + 1]);
    }
    setItemsHidden(false);
  };
  const goLeftImage = () => {
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
  function onToggle(checked: boolean) {
    if (checked) {
      showImageHighlighting();
    } else {
      hideHighlighting();
    }
  }
  const highlightItem = (id: string) => {
    setImageAreas([]);
    createCurrentImageAreasList(false, id);
    setDataPageInfo();
    setHighlightingStatus(false);
  };
  //Ugly logic but it works. Nested if statements cause react to crash on max updates on itemslist state
  const mobileToDesktopCoords = (itemsList: Array<ImageItemsObject>) => {
    let orgWidth: number, orgHeight: number;
    let newWidth: number, newHeight: number;
    if (isLaptop && createdResolution === "Mobile") {
      orgWidth = MobileWidth;
      orgHeight = MobileHeight;
      newWidth = LaptopWidth;
      newHeight = LaptopHeight;
    } else if (isTablet && createdResolution === "Mobile") {
      orgWidth = MobileWidth;
      orgHeight = MobileHeight;
      newWidth = TabletWidth;
      newHeight = TabletHeight;
    } else if (isMobile && createdResolution === "Tablet") {
      orgWidth = TabletWidth;
      orgHeight = TabletHeight;
      newWidth = MobileWidth;
      newHeight = MobileHeight;
    } else if (isLaptop && createdResolution === "Tablet") {
      orgWidth = TabletWidth;
      orgHeight = TabletHeight;
      newWidth = LaptopWidth;
      newHeight = LaptopHeight;
    } else if (isMobile && createdResolution === "Laptop") {
      orgWidth = LaptopWidth;
      orgHeight = LaptopHeight;
      newWidth = MobileWidth;
      newHeight = MobileHeight;
    } else if (isTablet && createdResolution === "Laptop") {
      orgWidth = LaptopWidth;
      orgHeight = LaptopHeight;
      newWidth = TabletWidth;
      newHeight = TabletHeight;
    }
    itemsList.map((item: ImageItemsObject) => {
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

  const visitUpdate = () => {
    axios.put(`${BaseAPI}/setup/trackVisit`, {
      setupId: getSetUpInfo[0].setup_id,
    });
  };
  //not updating

  const setupCookieClickFunction = () => {
    if (!cookies.visitor) {
      const initialData = {
        setups: [getSetUpInfo[0].setup_id],
        items: [],
      };
      setCookies("visitor", JSON.stringify(initialData), {
        path: "/",
        maxAge: 604800, // Expires after 24hr
        sameSite: true,
      });
      visitUpdate();
    } else {
      const cookieCheck = cookies.visitor.setups.includes(
        getSetUpInfo[0].setup_id
      );
      if (!cookieCheck) {
        const newData = {
          setups: [getSetUpInfo[0].setup_id, ...cookies.visitor.setups],
          items: [...cookies.visitor.items],
        };
        setCookies("visitor", JSON.stringify(newData), {
          path: "/",
          maxAge: 604800, // Expires after 24hr
          sameSite: true,
        });
        visitUpdate();
      }
    }
  };
  console.log(cookies.visitor);
  return (
    <Layout
      title={`${getSetUpInfo[0].username}'s ${getSetUpInfo[0].setup_title} setup`}
    >
      <div id={styles.setupPageContainer}>
        <div>
          <Row justify="center" className={layoutStyles.container}>
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
                //need user route here. Can't put link on top of avatar
                title={[
                  <Title level={3} style={{ margin: "0" }}>
                    {getSetUpInfo[0].username}
                  </Title>,
                ]}
                // extra={<HeartTwoTone twoToneColor="#eb2f96" />}
                avatar={{
                  src: `https://avatars.dicebear.com/api/initials/${getSetUpInfo[0].username.charAt(
                    0
                  )}.svg`,
                }}
              />
            </Col>
          </Row>
          <Row justify={isMobile ? "center" : "space-around"}>
            <Col order={1}>
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
                        onLoadScreenType={onLoadScreenType}
                      />
                    </div>
                  );
                })}
            </Col>
            <Col
              xs={{ span: 0, order: 3 }}
              md={{ span: 22 }}
              xl={{ span: 6, order: 2 }}
              style={{
                border: "1px #D9D9D9 solid",
                borderRadius: ".5rem",
                padding: "1rem",
                backgroundColor: "white",
                boxShadow: "0 8px 12px -4px #D9D9D9",
              }}
            >
              <Row justify="end">
                <Text>Show All </Text>
                <Switch
                  onChange={onToggle}
                  checked={showHighlighting}
                  style={{ marginLeft: ".5rem" }}
                />
              </Row>
              <Divider>
                <Title level={3}>Items</Title>
              </Divider>
              <ItemList itemList={imageAreas} highlightItem={highlightItem} />
            </Col>
            <Col
              span={24}
              xs={{ order: 2 }}
              xl={{ order: 3 }}
              className={layoutStyles.container}
            >
              <Row justify="center">
                <Col>
                  <Row justify="center" style={{ alignItems: "center" }}>
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
                      <Title level={3} style={{ margin: "0 1rem" }}>
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
            </Col>
          </Row>
          <Row className={layoutStyles.container} justify="center">
            <Col xs={{ span: 24 }} md={{ span: 0 }}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Items" key="1">
                  <Row style={{ margin: "0 0 1rem 0" }}>
                    <Col>
                      <Switch onChange={onToggle} checked={showHighlighting} />{" "}
                      <Text style={{ marginLeft: ".5rem" }}>Show All</Text>
                    </Col>
                  </Row>
                  <ItemList
                    itemList={imageAreas}
                    highlightItem={highlightItem}
                  />
                </TabPane>
                <TabPane tab="Description" key="2">
                  {getSetUpInfo[0].setup_description}
                </TabPane>
              </Tabs>
            </Col>
            <Col span={22}>
              <Col
                xs={{ span: 0 }}
                md={{ span: 24 }}
                xl={{ span: 18 }}
                style={{
                  padding: "1rem",
                  minHeight: "400px",
                  border: "1px #D9D9D9 solid",
                  borderRadius: ".5rem",
                  backgroundColor: "white",
                  boxShadow: "0 8px 12px -4px #D9D9D9",
                }}
              >
                <div style={{ padding: "1rem" }}>
                  <Divider>
                    <Title level={3}>About This Setup</Title>
                  </Divider>
                  {getSetUpInfo[0].setup_description}
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const response = await axios.get(`${BaseAPI}/setup/${id}`);
    const setUpPageData = await response.data;
    // const uniqueVisitUpdate = await axios.put(`${BaseAPI}/setup/trackVisit`, {
    //   id,
    // });
    return {
      props: setUpPageData,
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
};
