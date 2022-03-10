import { useContext } from "react";
import styles from "../../pageStyles/analytics.module.scss";
import { useRouter } from "next/router";
import dashboardStyles from "../../../components/Layout/DashboardLayout.module.scss";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { pageAuthCheck } from "../../utils/helperFunctions/pageAuthCheck";
import { BaseAPI } from "../../utils/constants/common";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Modal,
  Button,
  PageHeader,
  Typography,
  Table,
  Space,
  Breadcrumb,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserContext } from "../../utils/context/userContext";

const { Meta } = Card;
const { Title, Text } = Typography;

interface Props {
  setUpInfo: Array<Setup>;
  imageItems: Array<Item>;
}

interface Setup {
  setup_id: string;
  setup_title: string;
  setup_description: string;
  setup_type: string;
  setup_created_date: Date;
  created_screen_type?: any;
  image_id: string;
  image_url: string;
  image_position: string;
  image_position_number: number;
  user_id: string;
  username: string;
}

interface Item {
  item_id: string;
  image_id: string;
  coords_list: number[];
  item_name: string;
  item_url: string;
}

interface RowItem {
  key: string;
  itemName: string;
  affilateLink: string;
}

export default function AnalyticsPage(props: Props) {
  const router = useRouter();
  const { setUpInfo, imageItems } = props;
  const [currentImageItems, setCurrentImageItems] = useState(imageItems);
  const { currentUser, setUser } = useContext<any>(UserContext);
  const [selectedImageItems, setSelectedImageItems] = useState<Array<Item>>();
  const [activeSelection, setActiveSelection] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isItemModalOpen, setItemModalStatus] = useState<boolean>(false);
  const [selectedItem, setItemSelection] = useState<RowItem | null>(null);
  const [isModalOpen, setModalStatus] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser) {
      reload();
    }
  }, []);

  const reload = async () => {
    try {
      const response = await axios.get(`${BaseAPI}/user/usercontext`, {
        withCredentials: true,
      });
      const userInfo = await response.data;
      setUser(userInfo);
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
  };

  useEffect(() => {
    if (!activeSelection) {
      setActiveSelection(setUpInfo[0].image_id);
    }
  }, []);

  useEffect(() => {
    filterActiveImageSelection();
  }, [activeSelection, currentImageItems]);

  const filterActiveImageSelection = async () => {
    setLoading(true);
    const orgList = currentImageItems;
    const newList = orgList.filter((item) => {
      return item.image_id === activeSelection;
    });
    setSelectedImageItems(newList);
    setLoading(false);
  };

  const tableData = selectedImageItems?.map((item, i) => {
    //need object to update here in useeffect after item delete
    return {
      key: item.item_id,
      itemName: item.item_name,
      affilateLink: item.item_url,
    };
  });

  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "name",
    },
    {
      title: "Affilate Link",
      dataIndex: "affilateLink",
      key: "link",
    },
    {
      title: "Clicks",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            danger
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedItem(record);
              handleItemModalOpen();
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const handleItemModalCancel = () => {
    setItemModalStatus(false);
    setItemSelection(null);
  };
  const handleItemModalOpen = () => {
    setItemModalStatus(true);
  };
  const setSelectedItem = (item: RowItem) => {
    setItemSelection(item);
  };
  const filterItemList = (itemId: string | undefined) => {
    const orgItemList = currentImageItems;
    const newList = orgItemList.filter((item) => {
      return item.item_id != itemId;
    });
    setCurrentImageItems(newList);
  };

  const deleteItem = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseAPI}/setup/item/delete`,
        {
          itemId: selectedItem?.key,
          userId: currentUser.user.user_id,
        },
        { withCredentials: true }
      );
      const result = await response.data;
      const successMessage = await result.message;
      filterItemList(selectedItem?.key);
      message.success(successMessage);
      handleItemModalCancel();
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      message.error(errorMessage);
      handleItemModalCancel();
    }
    setLoading(false);
  };

  const handleModalCancel = () => {
    setModalStatus(false);
  };
  const handleModalOpen = () => {
    setModalStatus(true);
  };

  const deleteSetup = async () => {
    try {
      const response = await axios.put(
        `${BaseAPI}/setup/delete`,
        {
          setupId: setUpInfo[0].setup_id,
          userId: currentUser.user.user_id,
        },
        { withCredentials: true }
      );
      const result = await response.data;
      const successMessage = await result.message;
      message.success(successMessage);
      handleModalCancel();
      setTimeout(async () => {
        await router.push("/dashboard");
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      message.error(errorMessage);
      handleModalCancel();
    }
  };

  return (
    <DashboardLayout title={`${setUpInfo[0].setup_title} setup`}>
      <Modal
        visible={isItemModalOpen}
        title={"Delete Item?"}
        onCancel={handleItemModalCancel}
        footer={[
          <Button
            key="back"
            onClick={handleItemModalCancel}
            className="buttonShadow"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            danger
            className="buttonShadow"
            onClick={deleteItem}
            disabled={isLoading}
          >
            Delete
          </Button>,
        ]}
      >
        <div
          id="modalContainer"
          style={{ textAlign: "center", padding: "1rem" }}
        >
          <Text>
            Delete <b>{selectedItem?.itemName}</b> Item From Setup
          </Text>
        </div>
      </Modal>
      <Modal
        visible={isModalOpen}
        title={"Delete setup?"}
        onCancel={handleModalCancel}
        footer={[
          <Button
            key="back"
            onClick={handleModalCancel}
            className="buttonShadow"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            danger
            className="buttonShadow"
            onClick={deleteSetup}
            disabled={isLoading}
          >
            Delete
          </Button>,
        ]}
      >
        <div
          id="modalContainer"
          style={{ textAlign: "center", padding: "1rem" }}
        >
          <Text>
            Delete <b>{setUpInfo[0].setup_title}</b> setup
          </Text>
        </div>
      </Modal>
      <div id={styles.analyticsContainer}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href={`/dashboard`}>Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{setUpInfo[0].setup_title} setup</Breadcrumb.Item>
        </Breadcrumb>
        <PageHeader
          style={{ padding: "1rem 0" }}
          title={`${setUpInfo[0].setup_title} Analytics`}
          subTitle="10 Views"
          extra={[
            <Button key="2" danger onClick={handleModalOpen}>
              Delete
            </Button>,
          ]}
        />
        <div>
          <Row gutter={[48, 28]} justify="start">
            {setUpInfo
              .sort((a, b) =>
                a.image_position_number > b.image_position_number ? 1 : -1
              )
              .map((setupImage, i) => {
                return (
                  <div key={i}>
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 12 }}
                      lg={{ span: 6 }}
                      className={styles.cardSpacer}
                    >
                      <Card
                        hoverable
                        cover={
                          <img alt="setup photo" src={setupImage.image_url} />
                        }
                        onClick={() => {
                          setActiveSelection(setupImage.image_id);
                        }}
                      >
                        <Meta
                          title={[
                            <Title
                              level={5}
                              className={
                                setupImage.image_id === activeSelection
                                  ? styles.active
                                  : ""
                              }
                              key="1"
                            >
                              {setupImage.image_position} Image
                            </Title>,
                          ]}
                        />
                      </Card>
                    </Col>
                  </div>
                );
              })}
          </Row>
        </div>
        <Table
          style={{ marginTop: "6rem" }}
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const authCheck = await pageAuthCheck(context);
  if (authCheck.props?.data.authd) {
    try {
      const response = await axios.get(`${BaseAPI}/user/analytics/${id}`);
      const setupAnalyticsInfo = await response.data;
      if (setupAnalyticsInfo.setUpInfo.length === 0) {
        return {
          redirect: {
            permanent: false,
            destination: "/404",
          },
        };
      }
      if (
        authCheck.props.data.user !== setupAnalyticsInfo.setUpInfo[0].user_id
      ) {
        return {
          redirect: {
            permanent: false,
            destination: "/dashboard",
          },
        };
      } else {
        return {
          props: setupAnalyticsInfo,
        };
      }
    } catch (e) {
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
