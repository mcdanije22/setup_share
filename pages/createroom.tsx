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
  const [stepOneForm, setStepOneForm] = useState(null);
  const [stepTwoForm, setStepTwoForm] = useState([]);
  const [stepThreeForm, setStepThreeForm] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  console.log(stepOneForm);
  return (
    <Layout title="Create Room">
      <div id="container">
        <Row justify="center">
          <Col xs={{ span: 20 }} sm={{ span: 16 }}>
            {currentStep === 1 ? (
              <CreateSetupStepOneForm
                setStepOneForm={setStepOneForm}
                handleNextStep={handleNextStep}
                stepOneForm={stepOneForm}
              />
            ) : currentStep === 2 ? (
              <CreateSetupStepTwoForm
                setStepTwoForm={setStepTwoForm}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                stepTwoForm={stepTwoForm}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
