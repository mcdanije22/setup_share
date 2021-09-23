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
import CreateSetupStepThreeForm from "../components/CreateSetupForms/CreateSetupStepThreeForm";

const { Title } = Typography;

interface StepOne {
  title: string;
  description: string;
}

export default function CreateRoomPage() {
  const [stepOneForm, setStepOneForm] = useState<StepOne>({
    title: "",
    description: "",
  });
  const [stepTwoForm, setStepTwoForm] = useState<any>(null);
  const [stepThreeForm, setStepThreeForm] = useState({
    //other option array full of objects with image type. main, left, right
    imageOne: null,
    imageTwo: null,
    imageThree: null,
  });
  const [currentStep, setCurrentStep] = useState(2);

  const handleNextStep = (nextStep) => {
    // setCurrentStep(currentStep + 1);
    setCurrentStep(nextStep);
  };
  const handlePrevStep = (prevStep) => {
    // setCurrentStep(currentStep - 1);
    setCurrentStep(prevStep);
  };
  console.log(currentStep);

  return (
    <Layout title="Create Room">
      <div id="container">
        <Row justify="center" style={{ minHeight: "100vh" }}>
          <Col xs={{ span: 24 }} sm={{ span: 16 }}>
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
            ) : currentStep === 3 ? (
              <CreateSetupStepThreeForm
                setStepThreeForm={setStepThreeForm}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                stepThreeForm={stepThreeForm}
                stepTwoForm={stepTwoForm}
                imageNumber={0}
              />
            ) : currentStep === 4 ? (
              <CreateSetupStepThreeForm
                setStepThreeForm={setStepThreeForm}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                stepThreeForm={stepThreeForm}
                stepTwoForm={stepTwoForm}
                imageNumber={1}
              />
            ) : currentStep === 5 ? (
              <CreateSetupStepThreeForm
                setStepThreeForm={setStepThreeForm}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                stepThreeForm={stepThreeForm}
                stepTwoForm={stepTwoForm}
                imageNumber={2}
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
