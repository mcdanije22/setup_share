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
  Modal,
  Menu,
  Dropdown,
} from "antd";
import { GetServerSideProps } from "next";
import {
  LeftOutlined,
  RightOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  RedditCircleFilled,
} from "@ant-design/icons";
import styles from "./setupPage.module.scss";
import layoutStyles from "../../components/Layout/layout.module.scss";
import ImageMapContainer from "../../components/imageMapContainer/ImageMapContainer";
import { useMediaQuery } from "react-responsive";
import ItemList from "../../components/ItemList/ItemList";
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
  subscription_exp_date: Date;
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
  href: string;
}
interface Props {
  getSetUpInfo: Array<SetupObject>;
  getImageItems: Array<ImageItemsObject>;
  subscriptionStatus: boolean;
}

export default function SetupPage(props: Props) {
  const [loading, setLoading] = useState(false);
  const [currentImageView, setImageView] = useState<string>("Main");
  const [currentImageObject, setImageObject] = useState<any>({});
  const [currentImageItems, setImageItems] = useState<Array<ImageItemsObject>>(
    []
  );
  const [imageAreas, setImageAreas] = useState<Array<MapAreaItem>>([]);
  const { getSetUpInfo, getImageItems, subscriptionStatus } = props;
  const [imagePositions, setPositionList] = useState<Array<string>>([]);
  const [rightSideImageEnd, setRightSideEnd] = useState(false);
  const [leftSideImageEnd, setLeftSideEnd] = useState(false);
  const [areaItemsHidden, setItemsHidden] = useState(false);
  const [showHighlighting, setHighlightingStatus] = useState(false);
  const [createdResolution, setCreatedResolution] = useState(
    getSetUpInfo[0]?.created_screen_type
  );
  const [onLoadScreenType, setOnLoadScreenType] = useState<string>("");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isLaptop = useMediaQuery({ minWidth: 992 });
  const [cookies, setCookies] = useCookies<any>(["visitor"]);
  const [isOpen, setModalStatus] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<MapAreaItem | null>();
  // const isLaptop = useMediaQuery({ minWidth: 992, maxWidth: 1439 });

  console.log(props);

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
      fill = "rgba(0,255,0,0.3)";
    } else {
      fill = "";
    }
    if (id !== null && item.item_id == id) {
      fill = "rgba(0,255,0,0.3)";
    }
    return {
      id: item.item_id,
      name: item.item_name,
      shape: "poly",
      coords: [...item.coords_list],
      preFillColor: fill,
      href: item.item_url,
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
  const highlightItem = (id: string | null) => {
    setImageAreas([]);
    createCurrentImageAreasList(false, id);
    setDataPageInfo();
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

  const createCookie = (data: { setups: string[]; items: string[] }) => {
    setCookies("visitor", JSON.stringify(data), {
      path: "/",
      maxAge: 604800, // Expires after 24hr
      sameSite: true,
    });
  };
  const visitUpdate = async () => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_API}/setup/trackVisit`,
      {
        setupId: getSetUpInfo[0].setup_id,
        setupUserId: getSetUpInfo[0].user_id,
      },
      { withCredentials: true }
    );
    return response.data;
  };
  const setupCookieClickFunction = async () => {
    if (!cookies.visitor) {
      const initialData = {
        setups: [getSetUpInfo[0].setup_id],
        items: [],
      };
      const response = await visitUpdate();
      console.log("res", response);
      if (response) {
        createCookie(initialData);
      }
    } else {
      const cookieCheck = cookies.visitor.setups.includes(
        getSetUpInfo[0].setup_id
      );
      if (!cookieCheck) {
        const newData = {
          setups: [getSetUpInfo[0].setup_id, ...cookies.visitor.setups],
          items: [...cookies.visitor.items],
        };
        const response = await visitUpdate();
        if (response) {
          createCookie(newData);
        }
      }
    }
  };
  const itemClickUpdate = async (itemId: string) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_API}/setup/trackItemClick`,
      {
        itemId: itemId,
        setupUserId: getSetUpInfo[0].user_id,
      },
      { withCredentials: true }
    );
    return response.data;
  };
  const itemCookieClickFunction = async (itemId: string) => {
    if (!cookies.visitor) {
      const initialData = {
        setups: [],
        items: [itemId],
      };
      const response = await itemClickUpdate(itemId);
      console.log("res", response);
      if (response) {
        createCookie(initialData);
      }
    } else {
      const cookieCheck = cookies.visitor.items.includes(itemId);
      if (!cookieCheck) {
        const newData = {
          setups: [...cookies.visitor.setups],
          items: [itemId, ...cookies.visitor.items],
        };
        const response = await itemClickUpdate(itemId);
        if (response) {
          createCookie(newData);
        }
      }
    }
  };

  const handleModalOpen = (areaItem: any) => {
    console.log("new", areaItem);
    setCurrentItem(areaItem);
    setModalStatus(true);
  };
  const handleModalClose = () => {
    setCurrentItem(null);
    setModalStatus(false);
  };
  return (
    <Layout
      title={`${getSetUpInfo[0].username}'s ${getSetUpInfo[0].setup_title} setup`}
      keywords={getSetUpInfo[0].setup_type}
      description={getSetUpInfo[0].setup_description}
      author={getSetUpInfo[0].username}
      image_url={getSetUpInfo[0].image_url}
    >
      <Modal
        visible={isOpen}
        title={`${currentItem?.name} Item`}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Go back
          </Button>,
          <Button key="submit" type="primary">
            <Link
              onClick={() => {
                itemCookieClickFunction(currentItem?.id ?? "");
                handleModalClose();
              }}
              href={`${currentItem?.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continue
            </Link>
          </Button>,
        ]}
      >
        <div
          id="modalContainer"
          style={{ textAlign: "center", padding: "1rem" }}
        >
          <Text>Go to Product Page for More Info?</Text>
        </div>
      </Modal>
      <div id={styles.setupPageContainer}>
        <div>
          <Row justify="center" className={layoutStyles.container}>
            <Col span={24}>
              <Title
                level={1}
                style={{
                  textAlign: "center",
                  marginBottom: "0",
                  fontSize: "2.5rem",
                }}
              >
                {getSetUpInfo[0].setup_title}
              </Title>
            </Col>
            <Col span={24}>
              <Title
                level={2}
                type="secondary"
                style={{ textAlign: "center", fontSize: "1.2rem" }}
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
                  <Title key="1" level={3} style={{ margin: "0" }}>
                    {getSetUpInfo[0].username}
                  </Title>,
                ]}
                //TODO: need to change url when site name chosen
                extra={[
                  <Dropdown
                    key="0"
                    overlay={
                      <Menu>
                        <Menu.Item key="1">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmysetupshare.com//setup/${getSetUpInfo[0].setup_id}`}
                            target="_blank"
                            rel="noopener"
                          >
                            Facebook
                          </a>
                        </Menu.Item>
                        <Menu.Item key="2">
                          <a
                            href={`https://twitter.com/intent/tweet?url=https%3a%2f%2fmysetupshare.com/setup/${getSetUpInfo[0].setup_id}`}
                            target="_blank"
                          >
                            Twitter
                          </a>
                        </Menu.Item>
                        <Menu.Item key="3">
                          <a
                            href={`https://www.reddit.com/submit?url=https%3a%2f%2fmysetupshare.com/setup/${getSetUpInfo[0].setup_id}`}
                            target="_blank"
                          >
                            Reddit
                          </a>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button type="primary" ghost>
                      Share
                    </Button>
                  </Dropdown>,
                ]}
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
                        highlightItem={highlightItem}
                        onLoadScreenType={onLoadScreenType}
                        handleModalOpen={handleModalOpen}
                        showHighlighting={showHighlighting}
                        subscriptionStatus={subscriptionStatus}
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
              <ItemList
                itemList={imageAreas}
                subscriptionStatus={subscriptionStatus}
                itemCookieClickFunction={itemCookieClickFunction}
                handleModalOpen={handleModalOpen}
              />
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
                    subscriptionStatus={subscriptionStatus}
                    itemCookieClickFunction={itemCookieClickFunction}
                    handleModalOpen={handleModalOpen}
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
                  <Text style={{ fontSize: "1.2rem" }}>
                    {getSetUpInfo[0].setup_description}
                  </Text>
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API}/setup/${id}`
    );
    let setUpPageData = await response.data;
    const currentDate = new Date();
    const d1 = new Date(setUpPageData.getSetUpInfo[0]?.subscription_exp_date);
    const subscriptionStatus = d1 > currentDate;
    setUpPageData = { ...setUpPageData, subscriptionStatus };
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
