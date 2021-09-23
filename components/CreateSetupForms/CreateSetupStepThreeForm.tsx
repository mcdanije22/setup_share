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
import ImageMapper from "react-image-mapper";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setStepThreeForm: Dispatch<SetStateAction<object>>;
  handleNextStep: Dispatch<SetStateAction<number>>;
  handlePrevStep: Dispatch<SetStateAction<number>>;
  stepThreeForm: object;
  stepTwoForm: any;
  imageNumber: number;
}

const CreateSetupStepThreeForm: React.FC<Props> = ({
  setStepThreeForm,
  handleNextStep,
  handlePrevStep,
  stepThreeForm,
  stepTwoForm,
  imageNumber,
}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tempCoordList, setTempCoordList] = useState([]);
  const [drawingStatus, setDrawingStatus] = useState(false);
  const [addItemStatus, setAddItemStatus] = useState(false);
  const [tempAreas, setTempAreas] = useState([]);
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
    console.log("test");
    onPreview();
  }, []);

  const MAP = {
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

  const addCoordToItem = (coords) => {
    console.log("coords", coords);
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
  const finishAddItem = (values) => {
    if (MAP.areas[0].coords.length === 0) {
      message.error("Draw points on image before submitting");
    } else {
      console.log("test");
      tempAreas[0].name = values.name;
      tempAreas[0].url = values.url;
      setAddItemStatus(false);
      setDrawingStatus(false);
      setTempCoordList([]);
      onReset();
    }
  };
  const removeItem = (id) => {
    const currentArea = tempAreas;
    const filteredList = currentArea.filter((item) => item.id !== id);
    setTempAreas(filteredList);
    MAP.areas = filteredList;
  };
  const positionOnChange = (values) => {
    console.log(values);
    setPosition(values);
  };
  const openSubmitModal = () => {
    setSubmitModalStatus(true);
  };
  const submitImageData = () => {
    setStepThreeForm((prevState) => ({
      ...prevState,
      imageOne: { ...MAP },
    }));
  };
  console.log("3", stepThreeForm);
  console.log(submitModalStatus);
  console.log(tempAreas);

  if (image) {
    return (
      <div id="stepThreeFormContainer">
        <div id="imgContainer">
          <Row justify="center">
            <Col>
              <ImageMapper
                src={image}
                map={MAP}
                width={375}
                onMouseEnter={(area) => {
                  alert("test");
                }}
                onImageClick={(e) => {
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
                <Option value="main">Main</Option>
                <Option value="left">Left</Option>
                <Option value="right">Right</Option>
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
              onClick={() => {
                handlePrevStep(2);
              }}
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
