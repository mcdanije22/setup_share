import React, { useState, useEffect } from "react";
import { Row, Col, Typography } from "antd";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout/Layout";
import CreateSetupStepOneForm from "../components/CreateSetupForms/CreateSetupStepOneForm";
import CreateSetupStepTwoForm from "../components/CreateSetupForms/CreateSetupStepTwoForm";
import CreateSetupStepThreeForm from "../components/CreateSetupForms/CreateSetupStepThreeForm";
import CreateSetupConfirmation from "../components/CreateSetupForms/CreateSetupConfirmation";
import styles from "../components/CreateSetupForms/createRoomForms.module.scss";
import { useMediaQuery } from "react-responsive";
import { authCheck } from "../utils/helperFunctions/pageAuthCheck";

const { Title } = Typography;

interface StepOne {
  title: string;
  description: string;
  setupType: string;
}

export default function CreateRoomPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [stepOneForm, setStepOneForm] = useState<StepOne>({
    title: "",
    description: "",
    setupType: "",
  });
  const [stepTwoForm, setStepTwoForm] = useState<any>([]);
  const [stepThreeForm, setStepThreeForm] = useState<object>({
    imageOne: null,
    imageTwo: null,
    imageThree: null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [availImagePositions, setAvailImagePositions] = useState([
    "Main",
    "Left",
    "Right",
  ]);
  const [onLoadScreenType, setOnLoadScreenType] = useState<string>("");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isLaptop = useMediaQuery({ minWidth: 992 });

  useEffect(() => {
    if (isMobile) {
      setOnLoadScreenType("Mobile");
    } else if (isTablet) {
      setOnLoadScreenType("Tablet");
    } else if (isLaptop) {
      setOnLoadScreenType("Laptop");
    }
  }, []);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };
  const removeImagePosition = (position: string) => {
    const orgList = availImagePositions;
    const newList = orgList.filter((item) => item !== position);
    setAvailImagePositions([...newList]);
  };
  //need to change logic so that if you go back steps it clears list from step point so that rest are availble
  // exmaple: three images and on confirmation screen. Click to edit 1st image, you would only be able to select that image position
  //however, if you are on confirmation screen and go back two steps manually then you would have access to both of those image positions
  const addImagePosition = (prevPosition: string) => {
    const orgList = availImagePositions;
    if (!orgList.includes(prevPosition)) {
      const newList = [prevPosition, ...orgList];
      setAvailImagePositions([...newList]);
    }
  };
  console.log({
    s1: stepOneForm,
    s2: stepTwoForm,
    s3: stepThreeForm,
  });
  return (
    <Layout title="Create Setup">
      <div id={styles.createRoomContainer}>
        <Row justify="center" style={{ minHeight: "100vh" }}>
          {currentStep === 1 ? (
            <Col xs={{ span: 22 }} sm={{ span: 16 }}>
              <CreateSetupStepOneForm
                setStepOneForm={setStepOneForm}
                handleStepChange={handleStepChange}
                stepOneForm={stepOneForm}
              />
            </Col>
          ) : currentStep === 2 ? (
            <Col xs={{ span: 22 }} sm={{ span: 16 }}>
              <CreateSetupStepTwoForm
                setStepTwoForm={setStepTwoForm}
                handleStepChange={handleStepChange}
                stepTwoForm={stepTwoForm}
                setStepThreeForm={setStepThreeForm}
                stepThreeForm={stepThreeForm}
              />
            </Col>
          ) : currentStep === 3 ? (
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <CreateSetupStepThreeForm
                key={1}
                setStepThreeForm={setStepThreeForm}
                handleStepChange={handleStepChange}
                stepThreeForm={stepThreeForm}
                stepTwoForm={stepTwoForm}
                imageNumber={0}
                currentStep={currentStep}
                availImagePositions={availImagePositions}
                removeImagePosition={removeImagePosition}
                addImagePosition={addImagePosition}
                onLoadScreenType={onLoadScreenType}
              />
            </Col>
          ) : currentStep === 4 ? (
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <CreateSetupStepThreeForm
                key={2}
                setStepThreeForm={setStepThreeForm}
                handleStepChange={handleStepChange}
                stepThreeForm={stepThreeForm}
                stepTwoForm={stepTwoForm}
                imageNumber={1}
                currentStep={currentStep}
                availImagePositions={availImagePositions}
                removeImagePosition={removeImagePosition}
                addImagePosition={addImagePosition}
                onLoadScreenType={onLoadScreenType}
              />
            </Col>
          ) : currentStep === 5 ? (
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <CreateSetupStepThreeForm
                key={3}
                setStepThreeForm={setStepThreeForm}
                handleStepChange={handleStepChange}
                stepThreeForm={stepThreeForm}
                stepTwoForm={stepTwoForm}
                imageNumber={2}
                currentStep={currentStep}
                availImagePositions={availImagePositions}
                removeImagePosition={removeImagePosition}
                addImagePosition={addImagePosition}
                onLoadScreenType={onLoadScreenType}
              />
            </Col>
          ) : currentStep === 6 ? (
            <Col xs={{ span: 22 }} sm={{ span: 16 }}>
              <CreateSetupConfirmation
                stepOneForm={stepOneForm}
                handleStepChange={handleStepChange}
                stepTwoForm={stepTwoForm}
                stepThreeForm={stepThreeForm}
                currentStep={currentStep}
                availImagePositions={availImagePositions}
                onLoadScreenType={onLoadScreenType}
              />
            </Col>
          ) : (
            ""
          )}
        </Row>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return authCheck(context);
};
