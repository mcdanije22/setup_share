import React, { useEffect, useState } from "react";
import ImageMapper from "react-image-mapper";

const ImageMapContainer = ({
  src,
  areas,
  name,
  onItemClick,
  onLoadScreenType,
  phoneWidth,
  phoneHeight,
  tabletWidth,
  tabletHeight,
  laptopWidth,
  laptopHeight,
}) => {
  var MAP = {
    name: name,
    areas: [...areas],
  };
  return (
    <ImageMapper
      src={`${src}`}
      map={MAP}
      width={
        onLoadScreenType === "Mobile"
          ? phoneWidth
          : onLoadScreenType === "Tablet"
          ? tabletWidth
          : laptopWidth
      }
      height={
        onLoadScreenType === "Mobile"
          ? phoneHeight
          : onLoadScreenType === "Tablet"
          ? tabletHeight
          : laptopHeight
      }
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
