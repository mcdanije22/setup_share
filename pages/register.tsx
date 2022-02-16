import { useState } from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { BaseAPI } from "../utils/constants/common";

export default function RegisterPage() {
  interface User {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    confrim_password: string;
  }

  const userRegistration = async (values: User) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
        setTimeout(() => {
          router.push("/login");
          setLoading(false);
        }, 1000);
        console.log(response);
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        message.error(errorMessage);
        setLoading(false);
      }
    }
  };
  return (
    <div id="container">
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={{ span: 20 }} sm={{ span: 12 }}>
          <Form
            name="register"
            onFinish={userRegistration}
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
