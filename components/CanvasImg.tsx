import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Input, Row, Col, List, Space } from "antd";
import styles from "./Canvasimg.module.scss";
import ImageMapper from "react-image-mapper";
import { v4 as uuidv4 } from "uuid";

const CanvasImg = ({ imgSource, buildImageItmData }: any) => {
  const [tempCoordList, setTempCoordList] = useState([]);
  const [drawingStatus, setDrawingStatus] = useState(false);
  const [addItemStatus, setAddItemStatus] = useState(false);
  const [tempAreas, setTempAreas] = useState([]);

  const [form] = Form.useForm();

  const MAP2 = {
    name: "image-map",
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
    console.log(tempAreas);

    setAddItemStatus(false);
    console.log(MAP2);
  };
  const startDrawing = () => {
    setDrawingStatus(true);
  };

  const addCoordToItem = (coords) => {
    console.log("coords", coords);
    setTempCoordList([...tempCoordList, ...coords]);
  };
  const undoLastCoord = () => {
    MAP2.areas[0].coords.pop();
    MAP2.areas[0].coords.pop();
    setTempCoordList([...MAP2.areas[0].coords]);
  };
  const onReset = () => {
    form.resetFields();
  };
  const finishAddItem = (values) => {
    tempAreas[0].name = values.name;
    tempAreas[0].url = values.url;
    // setTempAreas((tempAreas[0] = updatedArea));
    console.log(tempAreas);
    setAddItemStatus(false);
    setDrawingStatus(false);
    setTempCoordList([]);
    onReset();
  };
  console.log(MAP2);
  return (
    <div id="imgContainer">
      <Space size={30} direction="vertical">
        <Row justify="center">
          <Col>
            <ImageMapper
              src={imgSource}
              map={MAP2}
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
                  //fixes lagging state for preview by updating local MAP2 object and state in same function
                  MAP2.areas[0].coords.push(
                    e.nativeEvent.offsetX,
                    e.nativeEvent.offsetY
                  );
                }
              }}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col span={20}>
            <Form
              name="basic"
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={finishAddItem}
            >
              {addItemStatus ? (
                //form would be in fragments instead
                <>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please input a item name" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Url"
                    name="url"
                    rules={[{ required: true, message: "Please input a url" }]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ) : (
                <Button type="primary" onClick={startItemAdd}>
                  Add Item
                </Button>
              )}
              {addItemStatus && !drawingStatus ? (
                <Row justify="space-between">
                  <Button danger onClick={cancelItemAdd}>
                    Cancel Add
                  </Button>
                  <Button type="primary" onClick={startDrawing}>
                    Draw outline
                  </Button>
                </Row>
              ) : drawingStatus ? (
                <Row justify="space-between">
                  <Col>
                    <Button danger onClick={undoLastCoord}>
                      Undo Last point
                    </Button>
                  </Col>
                  <Col>
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        Submit Item
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </Form>
            {addItemStatus ? (
              ""
            ) : (
              <List style={{ marginTop: "1rem" }}>
                {tempAreas.map((item) => {
                  return (
                    <List.Item key={item.id}>
                      <List.Item.Meta title={item.name} />
                    </List.Item>
                  );
                })}
              </List>
            )}
          </Col>
        </Row>
      </Space>
    </div>
  );
};
export default CanvasImg;
