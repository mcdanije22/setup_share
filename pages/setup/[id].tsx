import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  PageHeader,
  Typography,
  Space,
} from "antd";
import { GetServerSideProps } from "next";
const { Title } = Typography;

interface Props {
  getSetUpInfo: Array<any>;
}

export default function SetupPage(props: Props) {
  useEffect(() => {
    console.log(props);
  });

  const { getSetUpInfo } = props;
  return (
    <Layout
      title={`${getSetUpInfo[0].username}'s ${getSetUpInfo[0].setup_title} setup`}
    >
      <div id="setupPageContainer">
        <div>
          <Row>
            <Col span={24}>
              <Title level={1} style={{ textAlign: "center" }}>
                {getSetUpInfo[0].setup_title}
              </Title>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await axios.get(`${process.env.BASE_API}/setup/${id}`);
  const setUpPageData = await response.data;
  return {
    props: setUpPageData,
  };
};
