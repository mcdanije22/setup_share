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
  stepTwoForm: Array<object>;
  availImagePositions: Array<string>;
}
interface StepOne {
  title: string;
  description: string;
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

  const onPreview = async (imageNumber: number) => {
    const src: any = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(stepTwoForm[imageNumber].originFileObj);
      reader.onload = () => resolve(reader.result);
    });

    const image = new Image();
    image.src = src;
    const newList = previewImages;
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
        <div id="confirmationSection" style={{ margin: "1rem 0" }}>
          <Row justify="space-between">
            <Col>
              <Title level={5}>Room Information</Title>
            </Col>
            <Col>
              <Button type="link">Edit</Button>
            </Col>
          </Row>
          <Divider style={{ margin: ".5rem 0" }} />
          <Row>
            <Col span={24}>
              <Text strong>Room Title:</Text>
            </Col>
            <Col span={24}>
              <Text>Test Title</Text>
            </Col>
          </Row>
          <Row style={{ margin: ".5rem 0" }}>
            <Col span={24}>
              <Text strong>Room Description:</Text>
            </Col>
            <Col span={24}>
              <Text>Test Description</Text>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={24}>
            <List
              header={<Title level={5}>Images</Title>}
              itemLayout="horizontal"
              dataSource={stepTwoForm}
              renderItem={(item, i) => (
                <List.Item
                  actions={[
                    <Button
                      onClick={() => {
                        handleStepChange(i + 3);
                      }}
                      type="link"
                    >
                      Edit
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    key={i}
                    avatar={<Avatar src={previewImages[i]} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <Collapse
          //   onChange={callback}
          expandIconPosition={"right"}
          ghost
        >
          {stepTwoForm.map((item, i) => {
            return (
              <Panel
                header={[
                  <Avatar key="avatar" src={previewImages[i]} />,
                  <Text key="text" style={{ paddingLeft: ".5rem" }}>
                    {item.name}
                  </Text>,
                ]}
                key={i}
                extra={<EditTwoTone />}
              >
                <div>
                  {i === 0 ? (
                    <>
                      <Text strong>Items:</Text>
                      {stepThreeForm.imageOne.areas.map((item, i) => {
                        return (
                          <li key={i}>
                            {i + 1}. {item.name}
                          </li>
                        );
                      })}
                    </>
                  ) : i === 1 ? (
                    stepThreeForm.imageTwo.areas.map((item, i) => {
                      return <li key={i}>{item.name}</li>;
                    })
                  ) : i === 2 ? (
                    stepThreeForm.imageThree.areas.map((item, i) => {
                      return <li key={i}>{item.name}</li>;
                    })
                  ) : (
                    ""
                  )}
                </div>
              </Panel>
            );
          })}
        </Collapse>
        {/* <img src={previewImages[0]} /> */}
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
            htmlType="submit"
            shape="circle"
            size="large"
            icon={<ArrowRightOutlined />}
          />
        </Row>
      </div>
    );
  }
};

export default CreateSetupConfirmation;
