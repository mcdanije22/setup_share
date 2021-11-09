import React from "react";
import { Row, Col, Form, Input, Button, Typography, Space, Select } from "antd";
import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

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
  room_type: string;
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
    <div id="stepOneFormContainer">
      <Form
        initialValues={{
          title: `${stepOneForm ? stepOneForm.title : ""}`,
          description: `${stepOneForm ? stepOneForm.description : ""}`,
        }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        name="CreateSetupStepOneForm"
        onFinish={handleStepOneForm}
        style={{ height: "100vh" }}
        // onFinishFailed={onFinishFailed}
      >
        <Space size={30} direction="vertical" style={{ width: "100%" }}>
          <Col sm={24}>
            <Title
              level={2}
              style={{ textAlign: "center", paddingTop: "2rem" }}
            >
              New Setup
            </Title>
          </Col>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please input a setup title",
              },
            ]}
          >
            <Input
              style={{ borderBottom: "1px solid black", width: "14rem" }}
              bordered={false}
              placeholder="Choose a Setup Title"
            />
          </Form.Item>
          <Form.Item
            name="room_type"
            label="Room Type"
            rules={[
              {
                required: true,
                message: "Please choose a room type",
              },
            ]}
          >
            <Select>
              <Option value="Office">Office</Option>
              <Option value="Gaming">Gaming</Option>
              <Option value="Living Room">Living Room</Option>
              <Option value="Kitchen">Kitchen</Option>
            </Select>
          </Form.Item>
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
        </Space>
        <Row
          justify="space-between"
          style={{ position: "absolute", bottom: "0", width: "100%" }}
        >
          <Form.Item>
            <Button
              danger
              htmlType="submit"
              shape="circle"
              size="large"
              icon={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              shape="circle"
              size="large"
              icon={<ArrowRightOutlined />}
            />
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default CreateSetupStepOneForm;
