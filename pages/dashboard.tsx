import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../utils/context/userContext";
import styles from "../pageStyles/dashboard.module.scss";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { Button, PageHeader } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { GetServerSideProps } from "next";
import { BaseAPI } from "../utils/constants/common";
import axios from "axios";
import { pageAuthCheck } from "../utils/helperFunctions/pageAuthCheck";
import ProjectsList from "../components/projectList/ProjectList";
import Link from "next/link";

interface Props {
  userDashboardInfo: Array<dashboardItem>;
}
interface dashboardItem {
  user_id: string;
  username: string;
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
  const router = useRouter();
  const { currentUser, setUser } = useContext<any>(UserContext);
  const { userDashboardInfo } = props;
  const [activeSetup, setActiveSetup] = useState();

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

  return (
    <DashboardLayout title="Dashboard">
      <div id={styles.dashboardContainer}>
        <PageHeader
          style={{ padding: "1rem 0" }}
          title="Setups"
          extra={[
            <Link href="/createroom" key="0">
              <Button type="primary" key="1" value="small" shape="round">
                <PlusOutlined key="2" />
                New setup
              </Button>
            </Link>,
          ]}
        />

        <ProjectsList projects={userDashboardInfo} />
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authCheck = await pageAuthCheck(context);
  if (authCheck.props?.data.authd) {
    try {
      const response = await axios.get(
        `${BaseAPI}/user/dashboard/${authCheck.props.data.user}`
      );
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
