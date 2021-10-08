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
} from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";

interface Props {
  handleStepChange(number: number): void;
  stepThreeForm: any;
  stepOneForm: StepOne;
  currentStep: number;
  stepTwoForm: Array<object>;
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
}) => {
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

    //load time issue. Images are not ready on first load
    //need to cause a re render after load
  };

  useEffect(() => {
    (async function loadPreviewImages() {
      setLoading(true);
      for (let i = 0; i < stepTwoForm.length; i++) {
        await onPreview(i);
      }

      setLoading(false);
    })();
  }, []);
  console.log("1", previewImages);

  if (loading) {
    return <div>test</div>;
  } else {
    return (
      <div id="setupConfirmationFormContainer">
        <Row>
          <Col span={24}>
            <List
              itemLayout="horizontal"
              dataSource={stepTwoForm}
              renderItem={(item, i) => (
                <List.Item>
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
        {/* <img src={previewImages[0]} /> */}
        <Row
          justify="space-between"
          style={{
            marginTop: "4rem",
          }}
        >
          <Button
            onClick={() => {
              handleStepChange(currentStep - 1);
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
