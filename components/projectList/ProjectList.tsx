import { useState } from "react";
import styles from "./projectList.module.scss";
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
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";

const { Meta } = Card;
const { Text } = Typography;

interface DashboardItem {
  setup_id: string;
  setup_title: string;
  setup_description: string;
  setup_type: string;
  setup_created_date: Date;
  created_screen_type: any;
  image_id: string;
  image_url: string;
  image_position: string;
  image_position_number: number;
}

type DashboardProps = {
  projects: Array<DashboardItem>;
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
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
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

const ProjectsList = (props: DashboardProps) => {
  const { projects } = props;
  console.log("test", projects);
  return (
    <div id={styles.ProjectList}>
      <Row gutter={[48, 28]} justify="start">
        {projects
          .sort((a, b) =>
            a.setup_created_date < b.setup_created_date ? 1 : -1
          )
          .map((project, i) => {
            return (
              <div key={i}>
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  style={{ padding: "4rem 2rem" }}
                >
                  <Card
                    hoverable
                    cover={<img alt="Main photo" src={project.image_url} />}
                  >
                    <Meta
                      title={
                        <PageHeader
                          title={[
                            <div key={1}>{project.setup_title} setup</div>,
                          ]}
                          extra={[
                            <DeleteOutlined
                              key={1}
                              onClick={() => {
                                alert("test");
                              }}
                            />,
                          ]}
                        ></PageHeader>
                      }
                      description={<Tag color="blue">{project.setup_type}</Tag>}
                    />
                  </Card>
                </Col>
              </div>
            );
          })}
      </Row>
      <Table
        style={{ marginTop: "8rem" }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default ProjectsList;
