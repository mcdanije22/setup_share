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
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  InboxOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface Props {
  setStepTwoForm: Dispatch<SetStateAction<object>>;
  handleStepChange(number: number): void;
  stepTwoForm: Array<object>;
  setAwsImageList: Dispatch<SetStateAction<Array<object>>>;
  awsImageList: Array<object>;
}

const CreateSetupStepTwoForm: React.FC<Props> = ({
  setStepTwoForm,
  handleStepChange,
  stepTwoForm,
  awsImageList,
  setAwsImageList,
}) => {
  const [fileList, setFileList] = useState<Array<any>>([]);
  const [isLoading, setLoadingStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [awsList, setAwsList] = useState([]);

  useEffect(() => {
    if (stepTwoForm) {
      setFileList([...stepTwoForm]);
    }
  }, []);
  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
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
    console.log(imgWindow);
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
  const sendFormTwoData = async () => {
    await setStepTwoForm([...fileList]);
    await handleStepChange(3);
  };
  const handleModalCancel = () => {
    setModalStatus(false);
  };
  const upload = async (file, i) => {
    const data = new FormData();
    data.append("image-file", file.originFileObj);
    try {
      const result = await axios.post(
        "http://localhost:5000/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      console.log(file);
      // const currentImageList = awsImageList;
      // const pushImageToList = currentImageList.push({
      //   aws: result.data.aws,
      //   id: result.data.orgFile.originalname,
      // });
      // setAwsImageList(currentImageList);
      const awsData = { ...file, ...result.data.aws };
      console.log(file);
      const currentAws = awsList;
      const pushToAwsList = currentAws.push({
        ...awsData,
      });
      console.log(currentAws);
      setFileList([...currentAws]);
      setStepTwoForm([...currentAws]);
      message.success("sucess");
    } catch (error) {
      console.log(error);
    }
  };
  const uploadFile = async (values) => {
    console.log(values);
    if (!values.imageFile) {
      handleStepChange(3);
    } else if (fileList.length === 0) {
      message.error("Please upload a photo before continuing");
    } else {
      setLoadingStatus(true);
      const awsData = await values.imageFile.fileList.map(async (item, i) => {
        // await upload(item.originFileObj, i);
        await upload(item, i);
      });
      sendFormTwoData();
      setLoadingStatus(false);
      handleStepChange(3);
      //likely wont need this list tracking, will look to have custom preview images and single uploads
    }
  };
  console.log(fileList);
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

      <Form name="file-upload-form" onFinish={uploadFile}>
        <Space size={30} direction="vertical" style={{ width: "100%" }}>
          <Col sm={24}>
            <Title
              level={2}
              style={{ textAlign: "center", paddingTop: "2rem" }}
            >
              Upload Three Photos
            </Title>
          </Col>
          <Row justify="center" style={{ paddingBottom: "2rem" }}>
            <Col style={{ width: "100%" }}>
              <Form.Item name="imageFile">
                <Dragger
                  name="image"
                  listType="picture"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
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
                // onClick={handleStepTwoData}
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

// import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
// import {
//   Upload,
//   Row,
//   Col,
//   Typography,
//   Space,
//   Button,
//   message,
//   Modal,
// } from "antd";
// import ImgCrop from "antd-img-crop";
// import styles from "./createRoomForms.module.scss";
// import {
//   ArrowRightOutlined,
//   ArrowLeftOutlined,
//   InboxOutlined,
//   CheckCircleTwoTone,
// } from "@ant-design/icons";

// const { Title, Text } = Typography;
// const { Dragger } = Upload;

// interface Props {
//   setStepTwoForm: Dispatch<SetStateAction<object>>;
//   handleStepChange(number: number): void;
//   stepTwoForm: Array<object>;
// }

// const CreateSetupStepTwoForm: React.FC<Props> = ({
//   setStepTwoForm,
//   handleStepChange,
//   stepTwoForm,
// }) => {
//   const [fileList, setFileList] = useState<Array<any>>([]);
//   const [modalStatus, setModalStatus] = useState<boolean>(false);

//   useEffect(() => {
//     if (stepTwoForm) {
//       setFileList([...stepTwoForm]);
//     }
//   }, []);

//   const onChange = ({ fileList: newFileList }: any) => {
//     setFileList(newFileList);
//   };

//   const onPreview = async (file: any) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow: any = window.open(src);
//     console.log(imgWindow);
//     imgWindow.document.write(image.outerHTML);
//   };
//   const beforeUpload = () => {
//     if (fileList.length >= 3) {
//       message.error("Delete image first before trying to add a new one");
//       return false;
//     } else {
//       return true;
//     }
//   };
//   console.log(fileList);

//   const sendFormTwoData = () => {
//     setStepTwoForm([...fileList]);
//     handleStepChange(3);
//   };
//   const handleModalCancel = () => {
//     setModalStatus(false);
//   };
//   const handleStepTwoData = () => {
//     if (fileList.length === 0) {
//       message.error("Please upload a photo before continuing");
//     } else if (fileList.length < 3) {
//       setModalStatus(true);
//     } else {
//       sendFormTwoData();
//     }
//   };
//   return (
//     <div id={styles.stepTwoFormContainer}>
//       <Modal
//         visible={modalStatus}
//         title="Continue?"
//         onCancel={handleModalCancel}
//         footer={[
//           <Button key="back" onClick={handleModalCancel}>
//             Go back
//           </Button>,
//           <Button key="submit" type="primary" onClick={sendFormTwoData}>
//             Submit
//           </Button>,
//         ]}
//       >
//         <div
//           id="modalContainer"
//           style={{ textAlign: "center", padding: "1rem" }}
//         >
//           <Text>Less than three photos selected</Text>
//           <br />
//           <Text> Do you wish to continue?</Text>
//         </div>
//       </Modal>
//       <Space size={30} direction="vertical" style={{ width: "100%" }}>
//         <Col sm={24}>
//           <Title level={2} style={{ textAlign: "center", paddingTop: "2rem" }}>
//             Upload Three Photos
//           </Title>
//         </Col>
//         <Row justify="center" style={{ paddingBottom: "2rem" }}>
//           <Col style={{ width: "100%" }}>
//             <Dragger
//               listType="picture"
//               fileList={fileList}
//               onChange={onChange}
//               onPreview={onPreview}
//               maxCount={3}
//               beforeUpload={beforeUpload}
//             >
//               {fileList.length < 3 && (
//                 <>
//                   <p className="ant-upload-drag-icon">
//                     <InboxOutlined />
//                   </p>
//                   <p className="ant-upload-text">Drag and Drop or Browse</p>
//                 </>
//               )}
//               {fileList.length >= 3 && (
//                 <>
//                   <p className="ant-upload-drag-icon">
//                     <CheckCircleTwoTone twoToneColor="#52c41a" />
//                   </p>
//                   <p className="ant-upload-text">Max photos selected</p>
//                   <p className="ant-upload-hint">Delete Photo(s) or Continue</p>
//                 </>
//               )}
//             </Dragger>
//           </Col>
//         </Row>
//         <Row
//           justify="space-between"
//           style={{ position: "absolute", bottom: "0", width: "100%" }}
//         >
//           <Button
//             onClick={() => {
//               handleStepChange(1);
//             }}
//             danger
//             htmlType="submit"
//             shape="circle"
//             size="large"
//             icon={<ArrowLeftOutlined />}
//           />

//           <Button
//             onClick={handleStepTwoData}
//             type="primary"
//             htmlType="submit"
//             shape="circle"
//             size="large"
//             icon={<ArrowRightOutlined />}
//           />
//         </Row>
//       </Space>
//     </div>
//   );
// };

// export default CreateSetupStepTwoForm;
