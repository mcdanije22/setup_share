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
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";

const { Meta } = Card;
const { Text } = Typography;

type project = {
  _id: string;
  name: string;
  tag: string;
  dateCreated: string;
  thumbnailPhoto: string;
  description: string;
  thumbnailColor: string;
};

type ProjectProps = {
  activeProject: any;
  setProjectFunction: Function;
  projects: Array<project>;
};

const ProjectsList = (props: ProjectProps) => {
  const { projects, setProjectFunction, activeProject } = props;

  return (
    <div id="ProjectList">
      <Row gutter={[48, 28]} justify="start">
        {projects
          .sort((a, b) => (a.dateCreated < b.dateCreated ? 1 : -1))
          .map((project, i) => {
            return (
              <div key={i}>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                  <Card
                    hoverable
                    style={{
                      backgroundColor: `${project.thumbnailColor}`,
                    }}
                  >
                    <Meta
                      title={
                        <PageHeader
                          title={[<div key={1}>{project.name}</div>]}
                          extra={[<DeleteOutlined key={1} />]}
                        ></PageHeader>
                      }
                      description={<Tag color="blue">{project.tag}</Tag>}
                    />
                  </Card>
                </Col>
              </div>
            );
          })}
      </Row>
    </div>
  );
};
export default ProjectsList;
