import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  Upload,
  Row,
  Col,
  Typography,
  Space,
  Button,
  message,
  Modal,
  Form,
} from "antd";
import axios from "axios";
import ImgCrop from "antd-img-crop";
import styles from "./createRoomForms.module.scss";
import { BaseAPI } from "../../utils/constants/common";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  InboxOutlined,
  CheckCircleTwoTone,
  ConsoleSqlOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface Props {
  setStepTwoForm: Dispatch<SetStateAction<object>>;
  handleStepChange(number: number): void;
  stepTwoForm: Array<object>;
  setStepThreeForm: Dispatch<SetStateAction<object>>;
  stepThreeForm: any;
}

const CreateSetupStepTwoForm: React.FC<Props> = ({
  setStepTwoForm,
  handleStepChange,
  stepTwoForm,
  setStepThreeForm,
  stepThreeForm,
}) => {
  const [fileList, setFileList] = useState<Array<any>>([]);
  const [isLoading, setLoadingStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [awsList, setAwsList] = useState([]);
  const [warningModal, setWarningModal] = useState<boolean>(false);

  useEffect(() => {
    if (stepTwoForm) {
      setFileList([...stepTwoForm]);
    }
    if (
      stepThreeForm.imageOne ||
      stepThreeForm.imageTwo ||
      stepThreeForm.imageThree
    ) {
      openWarningModal();
    }
  }, []);
  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
    //Logic to handle removing file from list will also remove items added to all images.
    //alt option would be to try and track which file was removed, check corresponding image for items and then
    //give user prompt but would need custom logic to remove from list in prompt.
    //Need to eventually clean up this page logic to be able to specify deleting items and s3 images instead of just clearing all
    if (
      stepThreeForm.imageOne ||
      stepThreeForm.imageTwo ||
      stepThreeForm.imageThree
    ) {
      setStepThreeForm((prevState: any) => ({
        ...prevState,
        imageOne: null,
        imageTwo: null,
        imageThree: null,
      }));
      message.info("Unsaved Items For Images Deleted");
    }
  };
  const deleteS3File = async (key: number) => {
    const result = await axios.post(`${BaseAPI}/image/delete`, {
      key,
    });
  };
  //deletes all images in filelist from s3 when one image is removed
  const onRemove = async (file: any) => {
    if (file.key) {
      fileList.map(async (file, i) => {
        await deleteS3File(file.key);
      });
    }
  };
  const onPreview = async (file: any) => {
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
    const imgWindow: any = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const beforeUpload = () => {
    if (fileList.length >= 3) {
      message.error("Delete image first before adding another one");
      return false;
    } else {
      return true;
    }
  };
  const sendFormTwoData = async () => {
    await setStepTwoForm([...fileList]);
    await handleStepChange(3);
  };
  const handleModalCancel = () => {
    setModalStatus(false);
  };
  const upload = async (file: any, i: number) => {
    const data = new FormData();
    data.append("image-file", file.originFileObj);
    try {
      const result = await axios.post(`${BaseAPI}/image/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const awsData = { ...file, ...result.data.aws };
      const currentAws: any = awsList;
      const pushToAwsList = currentAws.push({
        ...awsData,
      });
      console.log("test", currentAws);
      setFileList([...currentAws]);
      setStepTwoForm([...currentAws]);
      message.success("sucess");
    } catch (error) {
      console.log(error);
    }
  };
  const uploadFile = async (values: any) => {
    if (!values.imageFile) {
      handleStepChange(3);
    } else if (fileList.length === 0) {
      message.error("Please upload a photo before continuing");
    } else {
      setLoadingStatus(true);
      const awsData = await values.imageFile.fileList.map(
        async (item: any, i: number) => {
          await upload(item, i);
        }
      );
      sendFormTwoData();
      setLoadingStatus(false);
      handleStepChange(3);
      //likely wont need this list tracking, will look to have custom preview images and single uploads
    }
  };
  const handleWarningModalClose = () => {
    setWarningModal(false);
  };
  const openWarningModal = () => {
    setWarningModal(true);
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
      <Modal
        visible={warningModal}
        onCancel={handleWarningModalClose}
        title="Warning"
        footer={[
          <Button
            key="back"
            danger
            onClick={handleWarningModalClose}
            className="buttonShadow"
          >
            Close
          </Button>,
        ]}
      >
        <div
          className="modalContainer"
          style={{ textAlign: "center", padding: "2rem" }}
        >
          <Text>
            Adding/removing images will lose progress of added items to all
            images.
          </Text>
        </div>
      </Modal>

      <Form name="file-upload-form" onFinish={uploadFile}>
        <Space size={30} direction="vertical" style={{ width: "100%" }}>
          <Col sm={24} className="section">
            <Title level={2} style={{ textAlign: "center" }}>
              Upload Three Photos
            </Title>
          </Col>
          <Row justify="center">
            <Col style={{ width: "100%" }}>
              <Form.Item name="imageFile">
                <Dragger
                  name="image"
                  listType="picture"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  onRemove={onRemove}
                  maxCount={3}
                  beforeUpload={beforeUpload}
                  multiple={true}
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
                      <p className="ant-upload-hint">
                        Delete Photo(s) or Continue
                      </p>
                    </>
                  )}
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
          <Row
            justify="space-between"
            style={{ position: "absolute", bottom: "0", width: "100%" }}
          >
            <Button
              onClick={() => {
                handleStepChange(1);
              }}
              danger
              shape="circle"
              size="large"
              icon={<ArrowLeftOutlined />}
            />
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
        </Space>
      </Form>
    </div>
  );
};

export default CreateSetupStepTwoForm;
