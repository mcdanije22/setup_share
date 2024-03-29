import { Row, Col, Form, Input, Button, message, Typography } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "../pageStyles/login.module.scss";
import Link from "next/link";
// @ts-ignore
import MailchimpSubscribe from "react-mailchimp-subscribe";

const { Title, Text } = Typography;

interface User {
  email: string;
  password: string;
}

interface Form {
  status: string;
  message: string;
  onValidated: any;
}

interface Render {
  subscribe: any;
  status: string;
  message: string;
}

interface FormData {
  EMAIL: string;
  LNAME: string;
}

export default function BetaSignup() {
  const URL = process.env.MAILCHIMP_URL;
  const router = useRouter();
  const { query } = useRouter();

  const CustomForm = ({ status, message, onValidated }: Form) => {
    let email: any;
    const submit = () => {
      email &&
        email.value.indexOf("@") > -1 &&
        onValidated({
          EMAIL: email.value,
          LNAME: query?.level,
        });
    };

    return (
      <div id={styles.beta}>
        <div>
          {status === "sending" && (
            <div style={{ color: "blue" }}>sending...</div>
          )}
          {status === "error" && (
            <div
              style={{ color: "red" }}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          {status === "success" && (
            <div style={{ color: "green" }}>
              Thank you for signing up! If selected, you will receive an email
              with more information.
            </div>
          )}
          {status !== "success" && (
            <input
              ref={(node) => (email = node)}
              type="email"
              placeholder="Your email"
            />
          )}
          {status !== "success" && (
            <Button type="primary" shape="round" onClick={submit}>
              Submit
            </Button>
          )}

          {status === "success" && (
            <div className={styles.betaFooter}>
              <div className={styles.footerButton}>
                <ArrowLeftOutlined
                  style={{ color: "#1890ff", paddingRight: ".5rem" }}
                />
                <Link href="/">Learn More</Link>
              </div>
              <div className={styles.footerButton}>
                <Link href="http://localhost:3000/setup/7a0fa791-4975-4ed0-9516-dc933d4b0ea2">
                  View Demo Setup
                </Link>
                <ArrowRightOutlined
                  style={{ color: "#1890ff", paddingLeft: ".5rem" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
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
          <Title level={1}>Beta Signups</Title>
          <div className={styles.betaText}>
            <Text>
              Thank you for showing interest in our product! We are excited to
              show you what MySetupShare can do for you and your audience. We
              are still in the early stages of launching and are looking for
              users who would love to give us a try during our private beta. Get
              early access to MySetupShare by signing up below.
            </Text>
          </div>
          <MailchimpSubscribe
            url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
            render={({ subscribe, status, message }: Render) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={(formData: FormData) => subscribe(formData)}
              />
            )}
          />
        </Col>
      </Row>
    </div>
  );
}
