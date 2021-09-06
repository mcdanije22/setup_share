import React, { useState, useEffect } from "react";
import {
  Upload,
  Row,
  Col,
  Typography,
  Space,
  Button,
  message,
  Modal,
} from "antd";
import ImgCrop from "antd-img-crop";
import styles from "./createRoomForms.module.scss";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  InboxOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const CreateSetupStepTwoForm = ({
  setStepTwoForm,
  handleNextStep,
  handlePrevStep,
  stepTwoForm,
}) => {
  const [fileList, setFileList] = useState([]);
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  useEffect(() => {
    if (stepTwoForm) {
      setFileList([...stepTwoForm]);
    }
  }, []);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const beforeUpload = () => {
    if (fileList.length >= 3) {
      message.error("Delete image first before trying to add a new one");
      return false;
    } else {
      return true;
    }
  };
  console.log(fileList);

  const sendFormTwoData = () => {
    setStepTwoForm([...fileList]);
    handleNextStep();
  };
  const handleModalCancel = () => {
    setModalStatus(false);
  };
  const handleStepTwoData = () => {
    if (fileList.length < 3) {
      setModalStatus(true);
    } else {
      sendFormTwoData();
      handleNextStep();
    }
  };
  return (
    <div id={styles.stepTwoFormContainer}>
      <Modal
        visible={modalStatus}
        title="Continue?"
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Go back
          </Button>,
          <Button key="submit" type="primary" onClick={sendFormTwoData}>
            Submit
          </Button>,
        ]}
      >
        <div
          id="modalContainer"
          style={{ textAlign: "center", padding: "1rem" }}
        >
          <Text>Less than three photos selected</Text>
          <br />
          <Text> Do you wish to continue?</Text>
        </div>
      </Modal>
      <Space
        size={30}
        direction="vertical"
        style={{ width: "100%", minHeight: "80vh" }}
      >
        <Col sm={24}>
          <Title level={2} style={{ textAlign: "center", paddingTop: "2rem" }}>
            Upload Three Photos
          </Title>
        </Col>
        <Row justify="center" style={{ paddingBottom: "2rem" }}>
          <Col style={{ width: "100%" }}>
            <Dragger
              listType="picture"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              maxCount={3}
              beforeUpload={beforeUpload}
            >
              {fileList.length < 3 && (
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Drag and Drop or Browse</p>
                </>
              )}
              {fileList.length >= 3 && (
                <>
                  <p className="ant-upload-drag-icon">
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                  </p>
                  <p className="ant-upload-text">Max photos selected</p>
                  <p className="ant-upload-hint">Delete Photo(s) or Continue</p>
                </>
              )}
            </Dragger>
          </Col>
        </Row>
        <Row
          justify="space-between"
          style={{ position: "absolute", bottom: "0", width: "100%" }}
        >
          <Button
            onClick={handlePrevStep}
            danger
            htmlType="submit"
            shape="circle"
            size="large"
            icon={<ArrowLeftOutlined />}
          />

          <Button
            onClick={handleStepTwoData}
            type="primary"
            htmlType="submit"
            shape="circle"
            size="large"
            icon={<ArrowRightOutlined />}
          />
        </Row>
      </Space>
    </div>
  );
};

export default CreateSetupStepTwoForm;
