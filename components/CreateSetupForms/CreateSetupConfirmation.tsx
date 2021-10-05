import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  List,
  Space,
  message,
  Select,
  Typography,
  Modal,
} from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";

interface Props {
  handleStepChange(number: number): void;
  stepThreeForm: any;
  currentStep: number;
}
const CreateSetupConfirmation: React.FC<Props> = ({
  handleStepChange,
  stepThreeForm,
  currentStep,
}) => {
  console.log(stepThreeForm);
  return (
    <div>
      test
      <Row
        justify="space-between"
        style={{
          marginTop: "4rem",
        }}
      >
        <Button
          onClick={() => {
            handleStepChange(currentStep - 1);
          }}
          danger
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined />}
        />

        <Button
          type="primary"
          htmlType="submit"
          shape="circle"
          size="large"
          icon={<ArrowRightOutlined />}
        />
      </Row>
    </div>
  );
};

export default CreateSetupConfirmation;
