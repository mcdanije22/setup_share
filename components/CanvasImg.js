import React, { useState, useEffect, useRef } from "react";
import styles from "./Canvasimg.module.scss";
import ImageMapper from "react-image-mapper";

const CanvasImg = () => {
  const [x, setXCoord] = useState(0);
  const [y, setYCoord] = useState(0);
  const [coordList, setCoordList] = useState([]);
  //   const canvasRef = useRef(null);
  const URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg";
  const MAP = {
    name: "my-map",
    areas: [
      {
        name: "1",
        shape: "poly",
        coords: [25, 33, 27, 300, 128, 240, 128, 94],
        preFillColor: "green",
        fillColor: "blue",
      },
      {
        name: "2",
        shape: "poly",
        coords: [219, 118, 220, 210, 283, 210, 284, 119],
        preFillColor: "pink",
      },
      {
        name: "3",
        shape: "poly",
        coords: [381, 241, 383, 94, 462, 53, 457, 282],
        fillColor: "yellow",
      },
      {
        name: "4",
        shape: "poly",
        coords: [245, 285, 290, 285, 274, 239, 249, 238],
        preFillColor: "red",
      },
      { name: "5", shape: "circle", coords: [170, 100, 25] },
    ],
  };
  const MAP2 = {
    name: "my-map",
    areas: [
      {
        name: "1",
        shape: "poly",
        coords: [218, 77, 214, 120, 264, 119, 251, 79],
        preFillColor: "green",
        fillColor: "blue",
      },
    ],
  };
  useEffect(() => {
    // const canvas = canvasRef.current;
    // const context = canvas.getContext("2d");
    // // context.fillStyle = "#000000";
    // // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    // context.beginPath();
    // context.lineTo(218, 77);
    // context.lineTo(214, 120);
    // context.lineTo(264, 119);
    // context.lineTo(251, 79);
    // context.closePath();
    // context.stroke();
    // context.fillStyle = "red";
    // context.fill();

    // context.beginPath();
    // context.moveTo(21, 20);
    // context.lineTo(20, 100);
    // context.lineTo(70, 100);
    // context.lineTo(70, 21);
    // context.closePath();
    // context.stroke();
    // context.fillStyle = "blue";
    // context.fill();

    $(function () {
      $(".map").maphilight();
    });
  }, []);

  const onMove = (e) => {
    setXCoord(e.nativeEvent.offsetX);
    setYCoord(e.nativeEvent.offsetY);
  };

  return (
    <div id="imgContainer">
      {/* <img
        src="https://cdn-images-1.medium.com/max/1600/0*H8odJZNPmo13lEJ2"
        useMap="#image-map"
        className="map"
      />
      <map name="image-map">
        <area
          target=""
          alt=""
          title=""
          coords="421,528,383,596,424,672,416,828,455,850,486,836,548,726,613,610,581,583,544,568,461,508"
          shape="poly"
          onClick={() => {
            console.log("test");
          }}
        />
      </map> */}
      <ImageMapper
        src={
          "https://png.pngtree.com/thumb_back/fh260/background/20190625/pngtree-large-data-ray-abstraction-background-image_215660.jpg"
        }
        map={MAP2}
        width={800}
      />
      <ImageMapper src={URL} map={MAP} width={500} />

      <div id={styles.imageContainer}>
        {/* <img
          className={styles.img}
          onMouseDown={onMove}
          src="https://png.pngtree.com/thumb_back/fh260/background/20190625/pngtree-large-data-ray-abstraction-background-image_215660.jpg"
        /> */}
        <img
          className={styles.img}
          onMouseDown={onMove}
          useMap="#image-map"
          className="map"
          src="https://png.pngtree.com/thumb_back/fh260/background/20190625/pngtree-large-data-ray-abstraction-background-image_215660.jpg"
        />
        <map name="image-map">
          <area
            target=""
            alt=""
            title=""
            coords="218, 77,214, 120, 264, 119, 251, 79"
            shape="poly"
            onClick={() => {
              console.log("test");
            }}
          />
          <area
            target=""
            alt=""
            title=""
            coords="21, 20,20, 100, 70, 100, 70, 21"
            shape="poly"
            onClick={() => {
              console.log("test");
            }}
          />
        </map>
        {/* <canvas id="myCanvas" width="800" height="480" ref={canvasRef}></canvas> */}

        {/* <canvas
          onMouseDown={onMove}
          id="myCanvas"
          width="500"
          height="200"
          ref={canvasRef}
          style={{
            backgroundImage:
              "url(https://png.pngtree.com/thumb_back/fh260/background/20190625/pngtree-large-data-ray-abstraction-background-image_215660.jpg)",
          }}
        >
          Your browser does not support the HTML5 canvas tag.
        </canvas> */}
      </div>
      <p>{x}</p>
      <p>{y}</p>
    </div>
  );
};
export default CanvasImg;
