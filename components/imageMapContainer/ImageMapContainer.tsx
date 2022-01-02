import React, { useEffect, useState } from "react";
import ImageMapper from "react-image-mapper";

const ImageMapContainer = ({ src, area, name }) => {
  var MAP = {
    name: name,
    areas: [...area],
  };
  return (
    <ImageMapper
      src={`${src}`}
      map={MAP}
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
export default ImageMapContainer;
