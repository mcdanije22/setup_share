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

  const columns = [
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Clicks",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Affilate",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
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
        <div id={styles.ProjectList}>
          <Row gutter={[48, 28]} justify="start">
            {setUpInfo
              .sort((a, b) =>
                a.image_position_number > b.image_position_number ? 1 : -1
              )
              .map((project, i) => {
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
                          <img alt="setup photo" src={project.image_url} />
                        }
                      >
                        <Meta
                          title={[
                            //If setup is selected put classname as active
                            //Todo, track active selection and filter items based off selection
                            <Title level={5} className={styles.active}>
                              {project.image_position} Image
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
          style={{ marginTop: "8rem" }}
          columns={columns}
          dataSource={data}
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
      return {
        props: setupAnalyticsInfo,
      };
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
