import React, { useEffect, useState } from "react";
import ImageMapper from "react-image-mapper";
import {
  MobileWidth,
  MobileHeight,
  TabletWidth,
  TabletHeight,
  LaptopWidth,
  LaptopHeight,
} from "../../utils/constants/screenSize";

const ImageMapContainer = ({
  src,
  areas,
  name,
  onItemClick,
  onLoadScreenType,
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
          ? MobileWidth
          : onLoadScreenType === "Tablet"
          ? TabletWidth
          : LaptopWidth
      }
      height={
        onLoadScreenType === "Mobile"
          ? MobileHeight
          : onLoadScreenType === "Tablet"
          ? TabletHeight
          : LaptopHeight
      }
      fillColor="#649758"
      strokeColor="black"
      onMouseEnter={(area: any) => {
        //Todo, add action
        console.log(area);
      }}
      onClick={(area: any) => {
        onItemClick(area.id);
      }}
    />
  );
};
export default ImageMapContainer;
