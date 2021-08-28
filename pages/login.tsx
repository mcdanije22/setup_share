import { Row, Col, Form, Input, Button, Checkbox, PageHeader } from "antd";
import axios from "axios";

export default function LoginPage() {
  const userLogin = async (values) => {
    const { email, password } = values;
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
    const response = await getUser;
    console.log(response);
  };
  const test = async () => {
    const getTest = await axios.get("http://localhost:5000/user/test", {
      withCredentials: true,
    });
    const data = getTest;
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
              <Button type="primary" htmlType="submit">
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
