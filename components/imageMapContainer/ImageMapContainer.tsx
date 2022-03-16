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

interface Props {
  src: string;
  areas: Array<Item>;
  name: string;
  highlightItem: (id: string) => void;
  onLoadScreenType: string;
  handleModalOpen: any;
}
interface Item {
  coords: number[];
  href: string;
  id: string;
  name: string;
  preFillColor: string;
  shape: string;
}

const ImageMapContainer = ({
  src,
  areas,
  name,
  highlightItem,
  onLoadScreenType,
  handleModalOpen,
}: Props) => {
  var MAP = {
    name: name,
    areas: [...areas],
  };
  console.log(areas);
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
      fillColor="transparent"
      strokeColor="black"
      onMouseEnter={(area: Item) => {
        highlightItem(area.id);
      }}
      onClick={(area: Item) => {
        handleModalOpen(area);
      }}
    />
  );
};
export default ImageMapContainer;
