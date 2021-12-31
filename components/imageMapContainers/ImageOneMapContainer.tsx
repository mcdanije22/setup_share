import React, { useEffect, useState } from "react";
import ImageMapper from "react-image-mapper";

const ImageOneMapContainer = ({ area, name }) => {
  var MAP1 = {
    name: name,
    areas: [...area],
  };
  return (
    <ImageMapper
      src={"https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg"}
      map={MAP1}
      width={375}
      height={350}
      fillColor={"red"}
      onMouseEnter={(area: any) => {
        console.log(area);
      }}
      onImageClick={(e: any) => {
        console.log("test");
      }}
    />
  );
};
export default ImageOneMapContainer;
