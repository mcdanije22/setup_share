import styles from "../../pageStyles/dashboard.module.scss";
import DashboardLayout from "../../components/Layout/DashboardLayout";
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
import { PlusOutlined } from "@ant-design/icons";
import { GetServerSideProps } from "next";
import { BaseAPI } from "../../utils/constants/common";
import axios from "axios";
import { pageAuthCheck } from "../../utils/helperFunctions/pageAuthCheck";
import ProjectsList from "../../components/projectList/ProjectList";

export default function Dashboard(props) {
  return (
    <DashboardLayout>
      <div id={styles.dashboardContainer}>
        <PageHeader
          style={{ padding: "1rem 0" }}
          title="Projects"
          extra={[
            <Button type="primary" key="1" value="small" shape="round">
              <PlusOutlined key="2" />
              New Project
            </Button>,
          ]}
        />
        <ProjectsList
          projects={}
          setProjectFunction={setActiveProject}
          activeProject={activeProject}
        />
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return { props: {} };
};
