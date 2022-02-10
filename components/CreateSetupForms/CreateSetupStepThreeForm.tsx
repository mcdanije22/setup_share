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
} from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
// @ts-ignore
import ImageMapper from "react-image-mapper";
import { v4 as uuidv4 } from "uuid";
import {
  MobileWidth,
  MobileHeight,
  TabletWidth,
  TabletHeight,
  LaptopWidth,
  LaptopHeight,
} from "../../utils/constants/screenSize";
import layoutStyles from "../../components/Layout/layout.module.scss";

interface Props {
  setStepThreeForm: Dispatch<SetStateAction<object>>;
  handleStepChange(number: number): void;
  stepThreeForm: any;
  stepTwoForm: any;
  imageNumber: number;
  currentStep: number;
  availImagePositions: Array<string>;
  removeImagePosition(position: string): void;
  addImagePosition(position: string): void;
  onLoadScreenType: string;
}

interface Map {
  imagePosition: string;
  name: string;
  areas: Array<Area>;
}

interface Area {
  id: string;
  name: string;
  shape: string;
  coords: Array<number>;
  preFillColor: string;
  fillColor: string;
  url: string;
}

interface FormValues {
  name: string;
  url: string;
}

const CreateSetupStepThreeForm: React.FC<Props> = ({
  setStepThreeForm,
  handleStepChange,
  stepThreeForm,
  stepTwoForm,
  imageNumber,
  currentStep,
  availImagePositions,
  removeImagePosition,
  addImagePosition,
  onLoadScreenType,
}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tempCoordList, setTempCoordList] = useState<Array<number>>([]);
  const [drawingStatus, setDrawingStatus] = useState(false);
  const [addItemStatus, setAddItemStatus] = useState(false);
  const [tempAreas, setTempAreas] = useState<Array<Area>>([]);
  const [position, setPosition] = useState("");
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const [form] = Form.useForm();
  const { Option } = Select;
  const { Text } = Typography;

  const onPreview = async () => {
    setLoading(true);
    const src: any = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(stepTwoForm[imageNumber].originFileObj);
      reader.onload = () => resolve(reader.result);
    });

    const image = new Image();
    image.src = src;
    setImage(src);
    setLoading(false);
  };
  useEffect(() => {
    onPreview();
    if (imageNumber === 0 && stepThreeForm.imageOne) {
      setTempAreas([...stepThreeForm.imageOne.areas]);
      //removed so that it is not double adding positions after going through and then going back.
      //Saves image position in the image state object, just not for form
      // setPosition(stepThreeForm.imageOne.imagePosition);
      addImagePosition(stepThreeForm.imageOne.imagePosition);
    } else if (imageNumber === 1 && stepThreeForm.imageTwo) {
      setTempAreas([...stepThreeForm.imageTwo.areas]);
      // setPosition(stepThreeForm.imageTwo.imagePosition);
      addImagePosition(stepThreeForm.imageTwo.imagePosition);
    } else if (imageNumber === 2 && stepThreeForm.imageThree) {
      setTempAreas([...stepThreeForm.imageThree.areas]);
      // setPosition(stepThreeForm.imageThree.imagePosition);
      addImagePosition(stepThreeForm.imageThree.imagePosition);
    }
  }, []);

  let MAP: Map = {
    name: "image-map",
    imagePosition: position,
    areas: [...tempAreas],
  };
  const startItemAdd = () => {
    setTempAreas([
      {
        id: uuidv4(),
        name: "",
        shape: "poly",
        coords: [...tempCoordList],
        preFillColor: "green",
        fillColor: "blue",
        url: "",
      },
      ...tempAreas,
    ]);
    setAddItemStatus(true);
  };
  const cancelItemAdd = () => {
    //not great, mutating state directly
    tempAreas.shift();
    MAP.areas.shift();
    setTempCoordList([]);
    setAddItemStatus(false);
    setDrawingStatus(false);
    onReset();
  };
  const startDrawing = () => {
    setDrawingStatus(true);
  };

  const addCoordToItem = (coords: Array<number>) => {
    setTempCoordList([...tempCoordList, ...coords]);
  };
  const undoLastCoord = () => {
    MAP.areas[0].coords.pop();
    MAP.areas[0].coords.pop();
    setTempCoordList([...MAP.areas[0].coords]);
  };
  const onReset = () => {
    form.resetFields();
  };
  const finishAddItem = (values: FormValues) => {
    const { name, url } = values;
    if (MAP.areas[0].coords.length === 0) {
      message.error("Draw Points On Image Before Submitting");
    } else {
      tempAreas[0].name = name;
      tempAreas[0].url = url;
      setAddItemStatus(false);
      setDrawingStatus(false);
      setTempCoordList([]);
      onReset();
    }
  };
  const removeItem = (id: string) => {
    const currentArea = tempAreas;
    const filteredList = currentArea.filter((item) => item.id !== id);
    setTempAreas(filteredList);
    MAP.areas = filteredList;
  };
  const positionOnChange = (values: string) => {
    setPosition(values);
  };
  const handleModalCancel = () => {
    setModalStatus(false);
  };

  const addItemCheck = () => {
    if (addItemStatus) {
      setModalStatus(true);
    } else {
      submitImageData();
    }
  };
  const submitImageData = () => {
    if (position === "") {
      message.error("Please Select An Image Position First");
    } else {
      if (currentStep === 3) {
        setStepThreeForm((prevState) => ({
          ...prevState,
          imageOne: { ...MAP },
        }));
        if (stepTwoForm.length > 1) {
          handleStepChange(4);
        } else {
          handleStepChange(6);
        }
      } else if (currentStep === 4) {
        setStepThreeForm((prevState) => ({
          ...prevState,
          imageTwo: { ...MAP },
        }));
        if (stepTwoForm.length > 2) {
          handleStepChange(5);
        } else {
          handleStepChange(6);
        }
      } else if (currentStep === 5) {
        setStepThreeForm((prevState) => ({
          ...prevState,
          imageThree: { ...MAP },
        }));
        handleStepChange(6);
      }
      removeImagePosition(MAP.imagePosition);
    }
  };

  if (image) {
    return (
      <div id="stepThreeFormContainer">
        <Modal
          visible={modalStatus}
          title="Continue?"
          onCancel={handleModalCancel}
          footer={[
            <Button
              key="back"
              onClick={handleModalCancel}
              className="buttonShadow"
            >
              Go back
            </Button>,
            <Button
              key="submit"
              type="primary"
              className="buttonShadow"
              onClick={() => {
                setModalStatus(false);
                cancelItemAdd();
                submitImageData();
              }}
            >
              Continue
            </Button>,
          ]}
        >
          <div
            id="modalContainer"
            style={{ textAlign: "center", padding: "1rem" }}
          >
            <Text>Current Item Not Submitted</Text>
            <br />
            <Text>Continue Without Adding Item?</Text>
          </div>
        </Modal>
        <div>
          <Row justify="center" className={layoutStyles.container}>
            <Col>
              <ImageMapper
                src={image}
                map={MAP}
                width={
                  onLoadScreenType === "Mobile"
                    ? MobileWidth
                    : onLoadScreenType === "Tablet"
                    ? TabletWidth
                    : LaptopWidth
                }
                height={
                  onLoadScreenType === "Mobile"
                    ? MobileHeight
                    : onLoadScreenType === "Tablet"
                    ? TabletHeight
                    : LaptopHeight
                }
                onMouseEnter={(area: any) => {
                  alert("test");
                }}
                onImageClick={(e: any) => {
                  if (drawingStatus) {
                    addCoordToItem([
                      e.nativeEvent.offsetX,
                      e.nativeEvent.offsetY,
                    ]);
                    //fixes lagging state for preview by updating local MAP object and state in same function
                    MAP.areas[0].coords.push(
                      e.nativeEvent.offsetX,
                      e.nativeEvent.offsetY
                    );
                  }
                }}
              />
            </Col>
          </Row>

          <Row justify="center">
            <Col span={20} className="section">
              <Text>Image Position</Text>
              <Select
                placeholder="Image Position"
                style={{ width: "100%", margin: "1rem 0" }}
                onChange={positionOnChange}
                defaultValue={position ? position : ""}
              >
                {availImagePositions.map((item, i) => {
                  return (
                    <Option key={i} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>

          <Row
            justify="center"
            //need to handle height being too small and overlaping buttons
            style={{ minHeight: "70vh" }}
          >
            <Col span={20}>
              <Form
                name="form"
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={finishAddItem}
              >
                {addItemStatus ? (
                  <>
                    <Form.Item
                      label="Item Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input a item name",
                        },
                      ]}
                    >
                      <Input placeholder="Playstation 5" />
                    </Form.Item>
                    <Form.Item
                      label="URL"
                      name="url"
                      rules={[
                        { required: true, message: "Please input a url" },
                      ]}
                    >
                      <Input placeholder="www.amazon.com/youraffilatelink" />
                    </Form.Item>
                  </>
                ) : (
                  <Button
                    type="primary"
                    block
                    onClick={startItemAdd}
                    size="large"
                    shape="round"
                    className="buttonShadow"
                  >
                    Add Item
                  </Button>
                )}
                {drawingStatus ? (
                  <Row justify="space-between">
                    <Space
                      direction="vertical"
                      size={30}
                      style={{ width: "100%" }}
                    >
                      <Button
                        type="primary"
                        block
                        shape="round"
                        size="large"
                        htmlType="submit"
                        className="buttonShadow"
                      >
                        Submit Item
                      </Button>
                      <Button
                        danger
                        block
                        shape="round"
                        size="large"
                        onClick={undoLastCoord}
                        className="buttonShadow"
                      >
                        Undo Last point
                      </Button>
                      <Button
                        danger
                        block
                        shape="round"
                        size="large"
                        onClick={cancelItemAdd}
                        className="buttonShadow"
                      >
                        Cancel Add
                      </Button>
                    </Space>
                  </Row>
                ) : (
                  ""
                )}
              </Form>
              {addItemStatus && !drawingStatus ? (
                <Row justify="space-between">
                  <Space
                    direction="vertical"
                    size={30}
                    style={{ width: "100%" }}
                  >
                    <Button
                      type="primary"
                      block
                      shape="round"
                      size="large"
                      onClick={startDrawing}
                      className="buttonShadow"
                    >
                      Draw outline
                    </Button>
                    <Button
                      danger
                      block
                      size="large"
                      shape="round"
                      onClick={cancelItemAdd}
                      className="buttonShadow"
                    >
                      Cancel Adding Item
                    </Button>
                  </Space>
                </Row>
              ) : (
                ""
              )}
              {addItemStatus ? (
                ""
              ) : (
                <List style={{ marginTop: "1rem" }} itemLayout="horizontal">
                  {tempAreas.map((item) => {
                    return (
                      <List.Item
                        key={item.id}
                        actions={[<DeleteTwoTone />]}
                        onClick={() => {
                          removeItem(item.id);
                        }}
                      >
                        <List.Item.Meta title={item.name} />
                      </List.Item>
                    );
                  })}
                </List>
              )}
            </Col>
          </Row>
          <Row
            justify="space-between"
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              padding: "0 1rem",
              height: "64px",
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
              onClick={addItemCheck}
              type="primary"
              htmlType="submit"
              shape="circle"
              size="large"
              icon={<ArrowRightOutlined />}
            />
          </Row>
        </div>
      </div>
    );
  } else {
    return <div>test</div>;
  }
};

export default CreateSetupStepThreeForm;
