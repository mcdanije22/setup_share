import React, { useState } from "react";
import { Upload, Row, Col, Typography, Space, Button } from "antd";
import ImgCrop from "antd-img-crop";
import styles from "./createRoomForms.module.scss";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

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
      <Space size={30} direction="vertical" style={{ width: "100%" }}>
        <Col sm={24}>
          <Title level={2} style={{ textAlign: "center", paddingTop: "2rem" }}>
            Upload Three Photos
          </Title>
        </Col>
        <Row
          justify="center"
          style={{ minHeight: "80vh", paddingBottom: "2rem" }}
        >
          <Col>
            <ImgCrop rotate>
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 3 && "+ Upload"}
              </Upload>
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
