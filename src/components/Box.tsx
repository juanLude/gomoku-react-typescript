import { useState } from "react";
import style from "./Box.module.css";
import { BOX_STATUS } from "../constants";

type BoxProps = {
  id: number;
};

export default function Box(props: BoxProps) {
  const { id } = props;
  const [status, setStatus] = useState(BOX_STATUS.AVAILABLE);

  const getClassNames = () => {
    const className = style.box;
    switch (status) {
      case BOX_STATUS.AVAILABLE:
        return `${className} ${style.available}`;
      case BOX_STATUS.SELECTED:
        return `${className} ${style.selected}`;
      case BOX_STATUS.OCCUPIED:
        return `${className} ${style.occupied}`;
      default:
        return className;
    }
  };
  const handleClick = () => {
    if (status === BOX_STATUS.AVAILABLE) {
      console.log("select box", id);
      setStatus(BOX_STATUS.SELECTED);
    } else if (status === BOX_STATUS.SELECTED) {
      console.log("deselect box", id);
      setStatus(BOX_STATUS.SELECTED);
    }
  };
  return <div className={getClassNames()} onClick={handleClick}></div>;
}
