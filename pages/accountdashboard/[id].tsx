import Layout from "../../components/Layout/Layout";
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

export default function AccountDashboard(props) {
  console.log(props);
  return <Layout>test</Layout>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
};
