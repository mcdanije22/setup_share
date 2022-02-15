import { useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

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
        "http://localhost:5000/user/login",
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
      }, 1000);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const test = async () => {
    const getTest = await axios.get("http://localhost:5000/user/test", {
      withCredentials: true,
    });
    const data = getTest;
    console.log(data);
  };
  return (
    <div id="container">
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={{ span: 20 }} sm={{ span: 12 }}>
          <Form
            name="login"
            initialValues={{ remember: true }}
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

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Button onClick={test}>test</Button>
      </Row>
    </div>
  );
}
