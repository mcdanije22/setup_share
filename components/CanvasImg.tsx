// import React, { useState, useEffect, useRef } from "react";
// import styles from "./Canvasimg.module.scss";
// import ImageMapper from "react-image-mapper";

// const CanvasImg = ({ imgSource }) => {
//   const [x, setXCoord] = useState(0);
//   const [y, setYCoord] = useState(0);
//   const [editStatus, setEditStatus] = useState(false);
//   const [testList, setList] = useState([218, 77, 214, 120, 264, 119]);
//   const [tempCoordList, setTempCoordList] = useState([]);

//   const MAP = {
//     name: "my-map",
//     areas: [
//       {
//         name: "1",
//         shape: "poly",
//         coords: [25, 33, 27, 300, 128, 240, 128, 94],
//         preFillColor: "green",
//         fillColor: "blue",
//       },
//       {
//         name: "2",
//         shape: "poly",
//         coords: [219, 118, 220, 210, 283, 210, 284, 119],
//         preFillColor: "pink",
//       },
//       {
//         name: "3",
//         shape: "poly",
//         coords: [381, 241, 383, 94, 462, 53, 457, 282],
//         fillColor: "yellow",
//       },
//       {
//         name: "4",
//         shape: "poly",
//         coords: [245, 285, 290, 285, 274, 239, 249, 238],
//         preFillColor: "red",
//       },
//       { name: "5", shape: "circle", coords: [170, 100, 25] },
//     ],
//   };
//   const MAP2 = {
//     name: "my-map",
//     areas: [
//       {
//         name: "1",
//         shape: "poly",
//         coords: [...testList],
//         preFillColor: "green",
//         fillColor: "blue",
//       },
//     ],
//   };

//   const onMove = (e) => {
//     setXCoord(e.nativeEvent.offsetX);
//     setYCoord(e.nativeEvent.offsetY);
//   };

//   const addTo = (coords) => {
//     setList([...testList, ...coords]);
//     console.log(testList);
//   };
//   return (
//     <div id="imgContainer">
//       <ImageMapper
//         src={imgSource}
//         map={MAP2}
//         width={500}
//         onMouseEnter={(area) => {
//           alert("test");
//         }}
//         onImageClick={(e) => {
//           addTo([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
//           console.log(MAP2.areas[0]);
//           //fixes lagging state for preview by updating local MAP2 object and state in same function
//           MAP2.areas[0].coords.push(
//             e.nativeEvent.offsetX,
//             e.nativeEvent.offsetY
//           );
//         }}
//       />
//       <p>{x}</p>
//       <p>{y}</p>
//     </div>
//   );
// };
// export default CanvasImg;
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import styles from "./Canvasimg.module.scss";
import ImageMapper from "react-image-mapper";

const CanvasImg = ({ imgSource }: any) => {
  const [testList, setList] = useState([218, 77, 214, 120, 264, 119]);
  const [tempCoordList, setTempCoordList] = useState([]);
  const [drawingStatus, setDrawingStatus] = useState(false);
  const [addItemStatus, setAddItemStatus] = useState(false);

  const MAP2 = {
    name: "image-map",
    areas: [
      {
        name: "1",
        shape: "poly",
        coords: [...tempCoordList],
        preFillColor: "green",
        fillColor: "blue",
      },
    ],
  };
  const addTo = (coords) => {
    setList([...testList, ...coords]);
    console.log(testList);
  };
  const addItem = () => {
    setAddItemStatus(true);
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
    console.log(MAP2.areas[0].coords);

    MAP2.areas[0].coords.pop();
    console.log(MAP2.areas[0].coords);
    setTempCoordList([...MAP2.areas[0].coords]);
  };
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
      <Row justify="center">
        <Col span={20}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            // onFinish={onFinish}
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
              <Button type="primary" onClick={addItem}>
                Add Item
              </Button>
            )}
            {addItemStatus && !drawingStatus ? (
              <Button type="primary" onClick={startDrawing}>
                Draw outline
              </Button>
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
        </Col>
      </Row>
    </div>
  );
};
export default CanvasImg;
