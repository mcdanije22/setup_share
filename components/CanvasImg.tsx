import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Input, Row, Col, List, Space, message } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

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
    MAP2.areas.shift();
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
    MAP2.areas[0].coords.pop();
    MAP2.areas[0].coords.pop();
    setTempCoordList([...MAP2.areas[0].coords]);
  };
  const onReset = () => {
    form.resetFields();
  };
  const finishAddItem = (values) => {
    if (MAP2.areas[0].coords.length === 0) {
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
    MAP2.areas = filteredList;
  };
  console.log(MAP2);
  return (
    <div id="imgContainer">
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
                addCoordToItem([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
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
      <Row justify="center" style={{ marginTop: "2rem" }}>
        <Col span={20}>
          <Form
            name="form"
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
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
              <Button type="primary" block onClick={startItemAdd} shape="round">
                Add Item
              </Button>
            )}
            {drawingStatus ? (
              <Row justify="space-between">
                <Space direction="vertical" size={30} style={{ width: "100%" }}>
                  <Button type="primary" block shape="round" htmlType="submit">
                    Submit Item
                  </Button>
                  <Button danger block shape="round" onClick={undoLastCoord}>
                    Undo Last point
                  </Button>
                  <Button danger block shape="round" onClick={cancelItemAdd}>
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
              <Space direction="vertical" size={30} style={{ width: "100%" }}>
                <Button
                  type="primary"
                  block
                  shape="round"
                  onClick={startDrawing}
                >
                  Draw outline
                </Button>
                <Button danger block shape="round" onClick={cancelItemAdd}>
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
    </div>
  );
};
export default CanvasImg;
