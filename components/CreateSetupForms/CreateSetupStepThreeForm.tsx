import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import NextImage from "next/image";
import { Row, Col, Button } from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  InboxOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import CanvasImg from "../CanvasImg";

interface Props {
  setStepThreeForm: Dispatch<SetStateAction<object>>;
  handleNextStep: Dispatch<SetStateAction<number>>;
  handlePrevStep: Dispatch<SetStateAction<number>>;
  stepThreeForm: object;
  stepTwoForm: any;
}

const CreateSetupStepThreeForm: React.FC<Props> = ({
  setStepThreeForm,
  handleNextStep,
  handlePrevStep,
  stepThreeForm,
  stepTwoForm,
}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const onPreview = async () => {
    setLoading(true);
    const src: any = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(stepTwoForm[0].originFileObj);
      reader.onload = () => resolve(reader.result);
    });

    const image = new Image();

    image.src = src;
    setImage(src);
    setLoading(false);
  };
  useEffect(() => {
    onPreview();
  }, []);

  const buildImageItemData = (data) => {
    setStepThreeForm(data);
  };
  if (image) {
    return (
      <div id="stepThreeFormContainer">
        {/* <NextImage
          src={image || ""}
          layout="responsive"
          width={800}
          height={800}
        /> */}
        <CanvasImg imgSource={image} buildImageItemData={buildImageItemData} />
      </div>
    );
  } else {
    return <div>test</div>;
  }
};

export default CreateSetupStepThreeForm;
