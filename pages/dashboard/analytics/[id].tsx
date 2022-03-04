import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "../../../pageStyles/analytics.module.scss";
import dashboardStyles from "../../../components/Layout/DashboardLayout.module.scss";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { pageAuthCheck } from "../../../utils/helperFunctions/pageAuthCheck";
import { BaseAPI } from "../../../utils/constants/common";
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
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserContext } from "../../../utils/context/userContext";

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
  const { currentUser, setUser } = useContext<any>(UserContext);
  const [selectedImageItems, setSelectedImageItems] = useState<Array<Item>>();
  const [activeSelection, setActiveSelection] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setModalStatus] = useState<boolean>(false);
  const [selectedItem, setItemSelection] = useState<RowItem>();

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
  }, [activeSelection]);

  const filterActiveImageSelection = async () => {
    setLoading(true);
    const orgList = imageItems;
    const newList = orgList.filter((item) => {
      return item.image_id === activeSelection;
    });
    setSelectedImageItems(newList);
    setLoading(false);
  };

  const tableData = selectedImageItems?.map((item, i) => {
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
              handleModalOpen();
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const handleModalCancel = () => {
    setModalStatus(false);
  };
  const handleModalOpen = () => {
    setModalStatus(true);
  };
  const setSelectedItem = (item: RowItem) => {
    setItemSelection(item);
  };
  const deleteItem = async () => {
    axios.post(`${BaseAPI}/setup/item/delete`, {
      itemId: selectedItem?.key,
      userId: setUpInfo[0].user_id,
    });
  };
  console.log(props);
  return (
    <DashboardLayout>
      <Modal
        visible={isModalOpen}
        title={`Delete Item ${selectedItem?.itemName}?`}
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
            onClick={() => {}}
          >
            Delete
          </Button>,
        ]}
      >
        <div
          id="modalContainer"
          style={{ textAlign: "center", padding: "1rem" }}
        >
          <Text>Delete Item From Setup</Text>
        </div>
      </Modal>
      <div id={styles.analyticsContainer}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href={`/dashboard/${currentUser?.user.user_id}`}>
              Dashboard
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{setUpInfo[0].setup_title} setup</Breadcrumb.Item>
        </Breadcrumb>
        <PageHeader
          style={{ padding: "1rem 0" }}
          title={`${setUpInfo[0].setup_title} Analytics`}
          subTitle="10 Views"
          extra={[
            <Button key="2" danger>
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
                          console.log(setupImage.setup_id);
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
            destination: `/dashboard/${authCheck.props.data.user}`,
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
