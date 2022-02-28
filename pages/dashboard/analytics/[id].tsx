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
  Tag,
  Divider,
  Typography,
  message,
  Table,
  Space,
} from "antd";
import { useEffect, useState } from "react";

const { Meta } = Card;
const { Title } = Typography;

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

export default function AnalyticsPage(props: Props) {
  const { setUpInfo, imageItems } = props;
  const [selectedImageItems, setSelectedImageItems] = useState<Array<Item>>();
  const [activeSelection, setActiveSelection] = useState<string>();
  const [isLoading, setLoading] = useState(false);

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

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const tableData = selectedImageItems?.map((item, i) => {
    return {
      key: i,
      ItemName: item.item_name,
      affilateLink: item.item_url,
    };
  });

  const columns = [
    {
      title: "Item Name",
      dataIndex: "ItemName",
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
      render: (text, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  console.log(props);
  return (
    <DashboardLayout>
      <div id={styles.analyticsContainer}>
        <PageHeader
          style={{ padding: "1rem 0" }}
          title={`${setUpInfo[0].setup_title} Analytics`}
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
  if (authCheck.props?.authStatus) {
    try {
      const response = await axios.get(`${BaseAPI}/user/analytics/${id}`);
      const setupAnalyticsInfo = await response.data;
      if (setupAnalyticsInfo.setUpInfo.length === 0) {
        return {
          redirect: {
            permanent: false,
            destination: "/login",
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
          destination: "/login",
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
