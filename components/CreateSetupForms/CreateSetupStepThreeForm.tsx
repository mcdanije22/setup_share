import { useEffect } from "react";
import { useState } from "react";
import NextImage from "next/image";
import { Row, Col } from "antd";

const CreateSetupStepThreeForm = ({
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
    //    const imgWindow = window.open(src);
    //    imgWindow.document.write(image.outerHTML);
  };
  console.log(image);
  useEffect(() => {
    onPreview();
  }, []);
  if (image) {
    return (
      <div id="stepThreeFormContainer">
        <NextImage src={image} layout="responsive" width={800} height={800} />
      </div>
    );
  } else {
    return <div>test</div>;
  }
};

export default CreateSetupStepThreeForm;
