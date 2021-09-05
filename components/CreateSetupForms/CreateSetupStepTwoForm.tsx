import React, { useState } from "react";
import { Upload, Row, Col, Typography, Space, Button, message } from "antd";
import ImgCrop from "antd-img-crop";
import styles from "./createRoomForms.module.scss";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  InboxOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";

const { Title } = Typography;
const { Dragger } = Upload;

const CreateSetupStepTwoForm = () => {
  const [fileList, setFileList] = useState([]);

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
  console.log(fileList);
  return (
    <div id={styles.stepTwoFormContainer}>
      <Space
        size={30}
        direction="vertical"
        style={{ width: "100%", minHeight: "100vh" }}
      >
        <Col sm={24}>
          <Title level={2} style={{ textAlign: "center", paddingTop: "2rem" }}>
            Upload Three Photos
          </Title>
        </Col>
        <Row justify="center" style={{ paddingBottom: "2rem" }}>
          <Col style={{ width: "100%" }}>
            <ImgCrop rotate>
              <Dragger
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
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
                    <p className="ant-upload-text">
                      Delete Photo(s) or Continue
                    </p>
                  </>
                )}
              </Dragger>
            </ImgCrop>
          </Col>
        </Row>
        <Row
          justify="space-between"
          style={{ position: "absolute", bottom: "0", width: "100%" }}
        >
          <Button
            danger
            htmlType="submit"
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
      </Space>
    </div>
  );
};

export default CreateSetupStepTwoForm;
