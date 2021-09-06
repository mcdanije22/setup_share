import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  PageHeader,
  Typography,
  Space,
} from "antd";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import CreateSetupStepOneForm from "../components/CreateSetupForms/CreateSetupStepOneForm";
import CreateSetupStepTwoForm from "../components/CreateSetupForms/CreateSetupStepTwoForm";

const { Title } = Typography;

export default function CreateRoomPage() {
  const [stepOneForm, setStepOneForm] = useState({});
  const [stepTwoForm, setStepTwoForm] = useState({});
  const [stepThreeForm, setStepThreeForm] = useState({});
  const [currentStep, setCurrentStep] = useState(2);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  console.log(currentStep);
  return (
    <Layout>
      <div id="container">
        <Row justify="center">
          <Col xs={{ span: 20 }} sm={{ span: 16 }}>
            {currentStep === 1 ? (
              <CreateSetupStepOneForm
                setStepOneForm={setStepOneForm}
                handleNextStep={handleNextStep}
              />
            ) : currentStep === 2 ? (
              <CreateSetupStepTwoForm />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
