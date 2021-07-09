import React, { useState, useEffect, useRef } from "react";
// import "./canvasimg.css";

const CanvasImg = () => {
  const [x, setXCoord] = useState(0);
  const [y, setYCoord] = useState(0);
  const [coordList, setCoordList] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // context.fillStyle = "#000000";
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    context.moveTo(218, 77);
    context.lineTo(214, 120);
    context.lineTo(264, 119);
    context.lineTo(251, 79);
    context.closePath();
    context.stroke();
    context.fillStyle = "red";
    context.fill();

    context.beginPath();
    context.moveTo(21, 20);
    context.lineTo(20, 100);
    context.lineTo(70, 100);
    context.lineTo(70, 21);
    context.closePath();
    context.stroke();
    context.fillStyle = "blue";
    context.fill();
  }, []);

  const onMove = (e) => {
    setXCoord(e.nativeEvent.offsetX);
    setYCoord(e.nativeEvent.offsetY);
  };
  return (
    <div id="image-container">
      {/* <img
        className="img"
        onMouseDown={onMove}
        src="https://png.pngtree.com/thumb_back/fh260/background/20190625/pngtree-large-data-ray-abstraction-background-image_215660.jpg"
      /> */}
      <canvas
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
      </canvas>

      <p>{x}</p>
      <p>{y}</p>
    </div>
  );
};
export default CanvasImg;
