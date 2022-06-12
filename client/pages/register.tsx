import { useState } from "react";
import { Row, Col, Form, Input, Button, message, Typography } from "antd";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { BaseAPI } from "../utils/constants/common";
import styles from "../pageStyles/register.module.scss";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confrim_password: string;
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const userRegistration = async (values: User) => {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      confrim_password,
    } = values;
    if (password !== confrim_password) {
      message.error("Passswords do not match");
    } else {
      try {
        setLoading(true);
        const registerUser = await axios.post(`${BaseAPI}/user/register`, {
          first_name,
          last_name,
          username,
          email,
          password,
        });
        const response = registerUser;
        message.success("Registration successful");
        setTimeout(async () => {
          await router.push("/login");
          setLoading(false);
        }, 1000);
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        message.error(errorMessage);
        setLoading(false);
      }
    }
  };
  return (
    <div id={styles.registerPageContainer}>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col
          xs={{ span: 20 }}
          md={{ span: 18 }}
          lg={{ span: 12 }}
          xl={{ span: 8 }}
          id={styles.formWindow}
        >
          <div style={{ textAlign: "center" }}>
            <Title level={1}>Registration</Title>
          </div>
          <Form
            name="register"
            onFinish={userRegistration}
            labelCol={{ span: 24 }}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "Please input your first name",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Please input your last name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="User Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your user name",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
            <Form.Item
              label="Confirm Passwrod"
              name="confrim_password"
              rules={[
                { required: true, message: "Please confirm your password" },
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
    const response = await axios.post(`${BaseAPI}/user/pageauth`, { cookie });
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
