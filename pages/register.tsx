import { Row, Col, Form, Input, Button, Checkbox, PageHeader } from "antd";
import axios from "axios";

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
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      confrim_password,
    } = values;
    if (password !== confrim_password) {
      console.log("passwords dont match");
    } else {
      const registerUser = await axios.post(
        "http://localhost:5000/user/register",
        {
          first_name,
          last_name,
          username,
          email,
          password,
        }
      );
      const response = registerUser;
      console.log(response);
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
