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

interface Props {
  setStepThreeForm: Dispatch<SetStateAction<object>>;
  handleNextStep(): void;
  handlePrevStep(): void;
  stepThreeForm: object;
  stepTwoForm: any;
  imageNumber: number;
  currentStep: number;
  availImagePositions: Array<string>;
  removeImagePosition(position: string): void;
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
  handleNextStep,
  handlePrevStep,
  stepThreeForm,
  stepTwoForm,
  imageNumber,
  currentStep,
  availImagePositions,
  removeImagePosition,
}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tempCoordList, setTempCoordList] = useState<Array<number>>([]);
  const [drawingStatus, setDrawingStatus] = useState(false);
  const [addItemStatus, setAddItemStatus] = useState(false);
  const [tempAreas, setTempAreas] = useState<Array<Area>>([]);
  const [position, setPosition] = useState("");
  const [submitModalStatus, setSubmitModalStatus] = useState(false);

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
      message.error("Draw points on image before submitting");
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
  const openSubmitModal = () => {
    setSubmitModalStatus(true);
  };
  const handleModalCancel = () => {
    setSubmitModalStatus(false);
  };
  const submitImageData = () => {
    if (currentStep === 3) {
      setStepThreeForm((prevState) => ({
        ...prevState,
        imageOne: { ...MAP },
      }));
    } else if (currentStep === 4) {
      setStepThreeForm((prevState) => ({
        ...prevState,
        imageTwo: { ...MAP },
      }));
    } else if (currentStep === 5) {
      setStepThreeForm((prevState) => ({
        ...prevState,
        imageThree: { ...MAP },
      }));
    }
    removeImagePosition(MAP.imagePosition);
    handleNextStep();
  };
  console.log(MAP);
  if (image) {
    return (
      <div id="stepThreeFormContainer">
        <Modal
          visible={submitModalStatus}
          title="Continue?"
          onCancel={handleModalCancel}
          footer={[
            <Button key="back" onClick={handleModalCancel}>
              Go back
            </Button>,
            <Button key="submit" type="primary">
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
        <div id="imgContainer">
          <Row justify="center">
            <Col>
              <ImageMapper
                src={image}
                map={MAP}
                width={375}
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
            <Col span={20} style={{ margin: "1rem 0" }}>
              <Text>Image Position</Text>
              <Select
                placeholder="Image Position"
                style={{ width: "100%", margin: "1rem 0" }}
                onChange={positionOnChange}
              >
                {availImagePositions.map((item) => {
                  return <Option value={item}>{item}</Option>;
                })}
              </Select>
            </Col>
          </Row>

          <Row
            justify="center"
            style={{ marginTop: "1rem", minHeight: "20vh" }}
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
                        { required: true, message: "Please input a item name" },
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
                      >
                        Submit Item
                      </Button>
                      <Button
                        danger
                        block
                        shape="round"
                        size="large"
                        onClick={undoLastCoord}
                      >
                        Undo Last point
                      </Button>
                      <Button
                        danger
                        block
                        shape="round"
                        size="large"
                        onClick={cancelItemAdd}
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
                    >
                      Draw outline
                    </Button>
                    <Button
                      danger
                      block
                      size="large"
                      shape="round"
                      onClick={cancelItemAdd}
                    >
                      Cancel Add
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
              marginTop: "4rem",
            }}
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
              onClick={submitImageData}
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
