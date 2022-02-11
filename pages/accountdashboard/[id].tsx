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
import axios from "axios";
import layoutStyles from "../../components/Layout/layout.module.scss";

export default function AccountDashboard(props) {
  console.log(props);
  return <Layout>test</Layout>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await axios.get(`${process.env.BASE_API}/setup/${id}`);
  const setUpPageData = await response.data;
  return {
    props: setUpPageData,
  };
};
