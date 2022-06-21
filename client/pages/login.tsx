import { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Input, Button, message, Typography } from "antd";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from "../pageStyles/login.module.scss";
import { UserContext } from "../utils/context/userContext";

const { Title, Text } = Typography;

interface User {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { setUser } = useContext<any>(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { query } = useRouter();

  const userLogin = async (values: User) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const getUser = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const response = getUser;
      setUser(getUser.data.user);
      message.success("Logged in successfully");
      setTimeout(async () => {
        await router.push("/dashboard");
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      message.error(errorMessage);
      setLoading(false);
    }
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
          style={{ minHeight: "400px" }}
        >
          <div style={{ textAlign: "center" }}>
            <Title level={1}>{query.prior ? "Logged out" : "Log in"}</Title>
            <Text style={{ fontSize: "1.2rem" }}>
              {query.prior ? "Log in Again?" : ""}
            </Text>
          </div>
          <Form labelCol={{ span: 24 }} name="login" onFinish={userLogin}>
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
              <Input type="email" />
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
      </Row>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const cookie = context.req.headers.cookie;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/pageauth`,
      {
        cookie,
      }
    );
    const data = await response.data;
    //If logged in already with cookie, redirect to dashboard page
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
