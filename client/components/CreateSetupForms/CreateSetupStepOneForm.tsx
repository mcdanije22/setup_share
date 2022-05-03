import React from "react";
import { Row, Col, Form, Input, Button, Typography, Space, Select } from "antd";
import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "./createRoomForms.module.scss";

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

interface Props {
  setStepOneForm: Dispatch<SetStateAction<StepOne>>;
  handleStepChange(number: number): void;
  stepOneForm: StepOne;
}

interface StepOne {
  title: string;
  description: string;
  setupType: string;
}

const CreateSetupStepOneForm: React.FC<Props> = ({
  setStepOneForm,
  handleStepChange,
  stepOneForm,
}) => {
  const handleStepOneForm = (values: StepOne) => {
    setStepOneForm({ ...values });
    handleStepChange(2);
  };
  return (
    <div id={styles.stepOneFormContainer}>
      <Form
        initialValues={{
          title: `${stepOneForm ? stepOneForm.title : ""}`,
          description: `${stepOneForm ? stepOneForm.description : ""}`,
          setupType: `${stepOneForm ? stepOneForm.setupType : ""}`,
        }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        name="CreateSetupStepOneForm"
        onFinish={handleStepOneForm}
        style={{ height: "100vh" }}
        requiredMark={false}
        // onFinishFailed={onFinishFailed}
      >
        <Col sm={24} style={{ textAlign: "center" }} className="section">
          <Title level={2}>New Setup</Title>
        </Col>
        <Col sm={24}>
          <Form.Item
            name="title"
            label="Setup Title"
            rules={[
              {
                required: true,
                message: "Please input a setup title",
              },
            ]}
          >
            <Input
              style={{
                borderBottom: "1px solid #d9d9d9",
                width: "60%",
                paddingLeft: "0",
              }}
              bordered={false}
            />
          </Form.Item>
        </Col>
        <Col sm={24} className="section">
          <Form.Item
            name="setupType"
            label="Setup Type"
            rules={[
              {
                required: true,
                message: "Please choose a setup type",
              },
            ]}
          >
            <Select
              style={{ borderBottom: "1px solid #d9d9d9", width: "90%" }}
              bordered={false}
            >
              <Option value="Desk Setup">Desk Setup</Option>
              <Option value="Gaming Setup">Gaming Setup</Option>
              <Option value="Pc Build Setup">Pc Build Setup</Option>
              <Option value="Everyday Bag Setup">Everyday Bag Setup</Option>
              <Option value="Cooking Setup">Cooking Setup</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col sm={24} className="section">
          <Form.Item
            label="Give a Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter a description for your setup",
              },
            ]}
          >
            <TextArea rows={18} style={{ borderRadius: ".5rem" }} />
          </Form.Item>
        </Col>
        <Row
          justify="space-between"
          style={{ position: "absolute", bottom: "0", width: "100%" }}
        >
          <Col>
            <Form.Item>
              <Button
                danger
                htmlType="submit"
                shape="circle"
                size="large"
                icon={<CloseOutlined />}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                shape="circle"
                size="large"
                icon={<ArrowRightOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateSetupStepOneForm;
