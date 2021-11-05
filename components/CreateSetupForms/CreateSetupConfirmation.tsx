import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  EditTwoTone,
} from "@ant-design/icons";

interface Props {
  handleStepChange(number: number): void;
  stepThreeForm: any;
  stepOneForm: StepOne;
  currentStep: number;
  stepTwoForm: any;
  availImagePositions: Array<string>;
}
interface StepOne {
  title: string;
  description: string;
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
}) => {
  const { Title, Text } = Typography;
  const { Panel } = Collapse;

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitModalStatus, setSubmitModalStatus] = useState<boolean>(false);

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

  const SubmitRoomData = async () => {
    let imageFiles: Array<object> = [];
    const addImages = stepTwoForm.map((item: any, i: number) => {
      if (i === 0) {
        imageFiles.push({
          ...stepThreeForm.imageOne,
          link: stepTwoForm[0].Location,
          key: stepTwoForm[0].key,
        });
      } else if (i === 1) {
        imageFiles.push({
          ...stepThreeForm.imageTwo,
          link: stepTwoForm[1].Location,
          key: stepTwoForm[1].key,
        });
      } else if (i === 2) {
        imageFiles.push({
          ...stepThreeForm.imageThree,
          link: stepTwoForm[2].Location,
          key: stepTwoForm[2].key,
        });
      }
    });
    const roomData = {
      title: stepOneForm.title,
      description: stepOneForm.description,
      images: imageFiles,
    };
    const submitRoom = await axios.post(
      "http://localhost:5000/room/create",
      roomData
    );
    const response = submitRoom;
    console.log(response);
  };
  console.log({ s1: stepOneForm, s2: stepTwoForm, s3: stepThreeForm });
  if (loading) {
    return <div>test</div>;
  } else {
    return (
      <div id="setupConfirmationFormContainer">
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
            style={{ textAlign: "center", padding: "1rem" }}
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
            <Button key="back" danger>
              Go back
            </Button>,
            <Button key="submit" type="primary" onClick={SubmitRoomData}>
              Submit
            </Button>,
          ]}
        >
          <div
            id="modalContainer"
            style={{ textAlign: "center", padding: "1rem" }}
          >
            <Text>Submit Room?</Text>
          </div>
        </Modal>
        <div id="confirmationSection" style={{ margin: "1rem 0" }}>
          <Row justify="space-between">
            <Col>
              <Title level={5}>Room Information</Title>
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
          <Row>
            <Col span={24}>
              <Text strong>Room Title:</Text>
            </Col>
            <Col span={24}>
              <Text>{stepOneForm.title}</Text>
            </Col>
          </Row>
          <Row style={{ margin: ".5rem 0" }}>
            <Col span={24}>
              <Text strong>Room Description:</Text>
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
        </div>
        <Row
          justify="space-between"
          style={{
            marginTop: "4rem",
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
          />
        </Row>
      </div>
    );
  }
};

export default CreateSetupConfirmation;
