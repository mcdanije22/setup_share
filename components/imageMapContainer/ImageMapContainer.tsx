import React, { useEffect, useState } from "react";
import ImageMapper from "react-image-mapper";

const ImageMapContainer = ({
  src,
  areas,
  name,
  onItemClick,
  mobileLoaded,
  phoneWidth,
  phoneHeight,
  desktopWidth,
  desktopHeight,
}) => {
  var MAP = {
    name: name,
    areas: [...areas],
  };
  return (
    <ImageMapper
      src={`${src}`}
      map={MAP}
      width={mobileLoaded ? phoneWidth : desktopWidth}
      height={mobileLoaded ? phoneHeight : desktopHeight}
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
