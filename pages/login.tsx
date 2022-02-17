import { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  message,
  PageHeader,
  Typography,
} from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { BaseAPI } from "../utils/constants/common";
import styles from "../pageStyles/login.module.scss";

const { Title, Text } = Typography;

interface User {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const userLogin = async (values: User) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const getUser = await axios.post(
        `${BaseAPI}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const response = getUser;
      message.success("Logged in successfully");
      setTimeout(() => {
        router.push("/");
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      message.error(errorMessage);
      setLoading(false);
    }
  };
  const test = async () => {
    const getTest = await axios.get(`${BaseAPI}/user/test`, {
      withCredentials: true,
    });
    const data = getTest;
    console.log(data);
  };
  return (
    <div id={styles.loginPageContainer}>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col
          xs={{ span: 20 }}
          md={{ span: 18 }}
          lg={{ span: 12 }}
          xl={{ span: 8 }}
          id={styles.formWindow}
        >
          <div style={{ textAlign: "center" }}>
            <Title level={2}>ShareStation</Title>
            <Title level={3}>Sign In</Title>
            <Text>To Continue</Text>
          </div>
          <Form
            labelCol={{ span: 24 }}
            name="login"
            onFinish={userLogin}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                shape="round"
                htmlType="submit"
                style={{ width: "100%", marginTop: ".5rem" }}
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/* <Button onClick={test}>test</Button> */}
      </Row>
    </div>
  );
}
