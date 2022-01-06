import React, { useEffect, useState } from "react";
import ImageMapper from "react-image-mapper";

const ImageMapContainer = ({ src, area, name, onItemClick }) => {
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
      fillColor="#649758"
      strokeColor="black"
      onMouseEnter={(area: any) => {
        console.log(area);
      }}
      onClick={(area: any) => {
        onItemClick(area.id);
      }}
    />
  );
};
export default ImageMapContainer;
