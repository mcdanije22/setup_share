import { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Input, Button, message, Typography } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { BaseAPI } from "../utils/constants/common";
import styles from "../pageStyles/login.module.scss";
import Link from "next/link";
// @ts-ignore
import MailchimpSubscribe from "react-mailchimp-subscribe";

const { Title, Text } = Typography;

interface User {
  email: string;
  password: string;
}

export default function BetaSignup() {
  const URL = process.env.MAILCHIMP_URL;
  const router = useRouter();
  const { query } = useRouter();

  const CustomForm = ({ status, message, onValidated }) => {
    let email;
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
            url={
              "https://mysetupshare.us10.list-manage.com/subscribe/post?u=804125a815c985d0d5f8277c9&amp;id=ca27d7cb29"
            }
            render={({ subscribe, status, message }) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={(formData) => subscribe(formData)}
              />
            )}
          />
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
