import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import axios from "axios";
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
  Avatar,
  Divider,
  Collapse,
} from "antd";
import { UserContext } from "../../utils/context/userContext";
import { useRouter } from "next/router";
import { BaseAPI } from "../../utils/constants/common";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  EditTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import styles from "./createRoomForms.module.scss";

interface Props {
  handleStepChange(number: number): void;
  stepThreeForm: any;
  stepOneForm: StepOne;
  currentStep: number;
  stepTwoForm: any;
  availImagePositions: Array<string>;
  onLoadScreenType: string;
}
interface StepOne {
  title: string;
  description: string;
  setupType: string;
}

interface Image {
  areas: Array<object>;
  imagePosition: string;
  name: string;
}

const CreateSetupConfirmation: React.FC<Props> = ({
  handleStepChange,
  stepThreeForm,
  currentStep,
  stepOneForm,
  stepTwoForm,
  availImagePositions,
  onLoadScreenType,
}) => {
  const { Title, Text } = Typography;
  const { Panel } = Collapse;
  const router = useRouter();

  const { currentUser } = useContext<any>(UserContext);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitModalStatus, setSubmitModalStatus] = useState<boolean>(false);

  const [dataSubmitted, setDataSubmitStatus] = useState<boolean>(false);
  const [submissionSetup_id, setSubmissionSetup_id] = useState<string>("");

  const onPreview = async (imageNumber: number) => {
    const src: any = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(stepTwoForm[imageNumber].originFileObj);
      reader.onload = () => resolve(reader.result);
    });

    const image = new Image();
    image.src = src;
    const newList: any = previewImages;
    newList.push(src);
    setPreviewImages(newList);
  };

  useEffect(() => {
    if (availImagePositions.includes("Main")) {
      setModalStatus(true);
    }
    (async function loadPreviewImages() {
      setLoading(true);
      for (let i = 0; i < stepTwoForm.length; i++) {
        await onPreview(i);
      }
      setLoading(false);
    })();
  }, []);

  const handleBackStep = () => {
    switch (stepTwoForm.length) {
      case 1:
        handleStepChange(3);
        break;
      case 2:
        handleStepChange(4);
        break;
      case 3:
        handleStepChange(5);
        break;
    }
  };
  const handleSubmitModalCancel = () => {
    setSubmitModalStatus(false);
  };
  const openSubmitModal = () => {
    setSubmitModalStatus(true);
  };
  const addImagePositionNumber = (position: string) => {
    if (position === "Left") {
      return 0;
    } else if (position === "Main") {
      return 1;
    } else if (position === "Right") {
      return 2;
    }
  };

  const SubmitRoomData = async () => {
    setLoading(true);
    let imageFiles: Array<object> = [];
    const addImages = await stepTwoForm.map(async (item: any, i: number) => {
      if (i === 0) {
        imageFiles.push({
          ...stepThreeForm.imageOne,
          link: stepTwoForm[0].Location,
          key: stepTwoForm[0].key,
          filePath: item.filePath,
          fileName: item.fileName,
          //test this to add image for ordering
          imagePositionNumber: addImagePositionNumber(
            stepThreeForm.imageOne.imagePosition
          ),
        });
      } else if (i === 1) {
        imageFiles.push({
          ...stepThreeForm.imageTwo,
          filePath: item.filePath,
          fileName: item.fileName,
          imagePositionNumber: addImagePositionNumber(
            stepThreeForm.imageTwo.imagePosition
          ),
        });
      } else if (i === 2) {
        imageFiles.push({
          ...stepThreeForm.imageThree,
          filePath: item.filePath,
          fileName: item.fileName,
          imagePositionNumber: addImagePositionNumber(
            stepThreeForm.imageThree.imagePosition
          ),
        });
      }
    });
    const roomData = {
      userId: currentUser.user.user_id,
      title: stepOneForm.title,
      description: stepOneForm.description,
      setupType: stepOneForm.setupType,
      images: imageFiles,
      createdScreenType: onLoadScreenType,
    };
    try {
      const submitRoom = await axios.post(`${BaseAPI}/setup/create`, roomData, {
        withCredentials: true,
      });
      const response = submitRoom;
      setSubmissionSetup_id(response.data.setup_id);
      setDataSubmitStatus(true);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      message.error(errorMessage);
      if (error.response.status) {
        setTimeout(async () => {
          await router.push("/login");
        }, 1000);
      }
    }
    handleSubmitModalCancel();
    setLoading(false);
  };

  if (loading) {
    return <div>test</div>;
  } else {
    return (
      <div id={styles.setupConfirmationFormContainer}>
        <Modal
          visible={modalStatus}
          onCancel={handleBackStep}
          footer={[
            <Button key="back" type="primary" onClick={handleBackStep}>
              Go back
            </Button>,
          ]}
        >
          <div
            id="modalContainer"
            style={{ textAlign: "center", padding: "4rem" }}
          >
            <Text>Main image position not selected</Text>
            <br />
            <Text>Please go back and assign an image the main position</Text>
          </div>
        </Modal>
        <Modal
          visible={submitModalStatus}
          onCancel={handleSubmitModalCancel}
          footer={[
            <Button
              key="back"
              danger
              onClick={handleSubmitModalCancel}
              className="buttonShadow"
            >
              Go back
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={SubmitRoomData}
              className="buttonShadow"
            >
              Submit
            </Button>,
          ]}
        >
          <div
            className="modalContainer"
            style={{ textAlign: "center", padding: "4rem" }}
          >
            <Text>Submit Setup?</Text>
          </div>
        </Modal>
        <div
          id="confirmationConfirmationScreen"
          style={{ display: dataSubmitted ? "none" : "" }}
        >
          <div id="confirmationSection" style={{ margin: "1rem 0" }}>
            <Row justify="space-between">
              <Col>
                <Title level={5}>Setup Information</Title>
              </Col>
              <Col>
                <Button
                  type="link"
                  onClick={() => {
                    handleStepChange(1);
                  }}
                >
                  Edit
                </Button>
              </Col>
            </Row>
            <Divider style={{ margin: ".5rem 0" }} />
            <Row style={{ margin: "2rem 0" }}>
              <Col span={24}>
                <Text strong>Setup Title:</Text>
              </Col>
              <Col span={24}>
                <Text>{stepOneForm.title}</Text>
              </Col>
            </Row>
            <Row style={{ margin: "2rem 0" }}>
              <Col span={24}>
                <Text strong>Setup Type:</Text>
              </Col>
              <Col span={24}>
                <Text>{stepOneForm.setupType}</Text>
              </Col>
            </Row>
            <Row style={{ margin: "2rem 0" }}>
              <Col span={24}>
                <Text strong>Setup Description:</Text>
              </Col>
              <Col span={24}>
                <Text>{stepOneForm.description}</Text>
              </Col>
            </Row>
          </div>
          <div id="confirmationSection" style={{ margin: "1rem 0" }}>
            <Row>
              <Col span={24}>
                <Title level={5}>Images</Title>
              </Col>
            </Row>
            <Divider style={{ margin: ".5rem 0" }} />
            <Row>
              <Col span={24}>
                <Collapse
                  //   onChange={callback}
                  expandIconPosition={"right"}
                  ghost
                >
                  {stepTwoForm.map((item: any, i: number) => {
                    return (
                      <Panel
                        header={[
                          <Avatar key="avatar" src={previewImages[i]} />,
                          <Text key="text" style={{ paddingLeft: ".5rem" }}>
                            {item.name}
                          </Text>,
                        ]}
                        key={i}
                        extra={
                          <EditTwoTone
                            onClick={() => {
                              handleStepChange(i + 3);
                            }}
                          />
                        }
                      >
                        <div>
                          {i === 0 ? (
                            <Row>
                              <Col span={24}>
                                <Text strong>Items:</Text>
                              </Col>
                              {stepThreeForm.imageOne.areas.length === 0 ? (
                                <Col span={24}>
                                  <Text>No Items Added</Text>
                                </Col>
                              ) : (
                                stepThreeForm.imageOne.areas.map(
                                  (item: Image, i: number) => {
                                    return (
                                      <Col span={24} key={i}>
                                        <li>
                                          {i + 1}. {item.name}
                                        </li>
                                      </Col>
                                    );
                                  }
                                )
                              )}
                            </Row>
                          ) : i === 1 ? (
                            <Row>
                              <Col span={24}>
                                <Text strong>Items:</Text>
                              </Col>
                              {stepThreeForm.imageTwo.areas.length === 0 ? (
                                <Col span={24}>
                                  <Text>No Items Added</Text>
                                </Col>
                              ) : (
                                stepThreeForm.imageTwo.areas.map(
                                  (item: Image, i: number) => {
                                    return (
                                      <Col span={24} key={i}>
                                        <li>
                                          {i + 1}. {item.name}
                                        </li>
                                      </Col>
                                    );
                                  }
                                )
                              )}
                            </Row>
                          ) : i === 2 ? (
                            <Row>
                              <Col span={24}>
                                <Text strong>Items:</Text>
                              </Col>
                              {stepThreeForm.imageThree.areas.length === 0 ? (
                                <Col span={24}>
                                  <Text>No Items Added</Text>
                                </Col>
                              ) : (
                                stepThreeForm.imageThree.areas.map(
                                  (item: Image, i: number) => {
                                    return (
                                      <Col span={24} key={i}>
                                        <li>
                                          {i + 1}. {item.name}
                                        </li>
                                      </Col>
                                    );
                                  }
                                )
                              )}
                            </Row>
                          ) : (
                            ""
                          )}
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              </Col>
            </Row>
            <Row
              justify="space-between"
              style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              <Button
                onClick={() => {
                  handleBackStep();
                }}
                danger
                shape="circle"
                size="large"
                icon={<ArrowLeftOutlined />}
              />

              <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<ArrowRightOutlined />}
                onClick={openSubmitModal}
                loading={loading}
              />
            </Row>
          </div>
        </div>
        <div
          id="confirmationSuccessScreen"
          style={{ display: dataSubmitted ? "" : "none" }}
        >
          <Row justify="center" style={{ margin: "2rem 0" }}>
            <Col>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                className="successIcon"
              />
            </Col>
          </Row>
          <Row
            justify="center"
            style={{ margin: "2rem 0", textAlign: "center" }}
          >
            <Col span={24} className="submittedTitle">
              <Title level={1}>{stepOneForm.setupType} Complete!</Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Text style={{ fontSize: "1.2rem" }}>
                Your setup page is now{" "}
                <Link href={`/setup/${submissionSetup_id}`}>live!</Link>
              </Text>
            </Col>
          </Row>
          <Row justify="center" className="section">
            <Col span={20}>
              <Button
                size="large"
                shape="round"
                type="primary"
                block
                className="buttonShadow"
              >
                Go to Account
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
};

export default CreateSetupConfirmation;
