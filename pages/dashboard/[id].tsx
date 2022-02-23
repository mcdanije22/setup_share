import Layout from "../../components/Layout/Layout";
import DashboardLayout from "../../components/Layout/dashboardLayout";
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
import { GetServerSideProps } from "next";
import { BaseAPI } from "../../utils/constants/common";
import axios from "axios";
import layoutStyles from "../../components/Layout/layout.module.scss";
import { pageAuthCheck } from "../../utils/helperFunctions/pageAuthCheck";

export default function Dashboard(props) {
  console.log(props);
  return <DashboardLayout>test</DashboardLayout>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return { props: {} };
};
