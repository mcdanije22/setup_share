import { useEffect, useContext } from "react";
import { UserContext } from "../../utils/context/userContext";
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
import { ConsoleSqlOutlined, PlusOutlined } from "@ant-design/icons";
import { GetServerSideProps } from "next";
import { BaseAPI } from "../../utils/constants/common";
import axios from "axios";
import { pageAuthCheck } from "../../utils/helperFunctions/pageAuthCheck";
import ProjectsList from "../../components/projectList/ProjectList";

interface Props {
  userDashboardInfo: Array<dashboardItem>;
}
interface dashboardItem {
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

export default function Dashboard(props: Props) {
  const { currentUser, setUser } = useContext<any>(UserContext);
  const { userDashboardInfo } = props;
  console.log(props);
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
  console.log(props);
  return (
    <DashboardLayout>
      <div id={styles.dashboardContainer}>
        <PageHeader
          style={{ padding: "1rem 0" }}
          title="Setups"
          extra={[
            <Button type="primary" key="1" value="small" shape="round">
              <PlusOutlined key="2" />
              New setup
            </Button>,
          ]}
        />
        <ProjectsList
          projects={userDashboardInfo}
          // setProjectFunction={setActiveProject}
          // activeProject={activeProject}
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
      const response = await axios.get(`${BaseAPI}/user/dashboard/${id}`);
      const userDashboardInfo = await response.data;
      return {
        props: userDashboardInfo,
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
