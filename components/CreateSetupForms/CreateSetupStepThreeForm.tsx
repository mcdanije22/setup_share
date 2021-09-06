import { useEffect } from "react";
import { useState } from "react";

const CreateSetupStepThreeForm = ({
  setStepThreeForm,
  handleNextStep,
  handlePrevStep,
  stepThreeForm,
  stepTwoForm,
}) => {
  const [image, setImage] = useState();
  const onPreview = async () => {
    const src: any = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(stepTwoForm[0].originFileObj);
      reader.onload = () => resolve(reader.result);
      console.log(reader);
    });

    const image = new Image();

    image.src = src;
    console.log(image);
    setImage(src);
    //    const imgWindow = window.open(src);
    //    imgWindow.document.write(image.outerHTML);
  };
  useEffect(() => {
    onPreview();
  });
  return (
    <div id="stepThreeFormContainer">
      <img src={image} />
    </div>
  );
};

export default CreateSetupStepThreeForm;
