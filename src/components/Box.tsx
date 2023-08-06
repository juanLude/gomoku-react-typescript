import { useState } from "react";
import style from "./Box.module.css";
import { BOX_STATUS } from "../constants";

type BoxProps = {
  id: number;
  handleMove: (index: number) => void; // Prop to handle the move
  currentPlayer: string;
};

export default function Box(props: BoxProps) {
  const { id, handleMove, currentPlayer } = props;
  const [status, setStatus] = useState(BOX_STATUS.AVAILABLE);
  const [stone, setStone] = useState<"Black" | "White" | null>(null); // Track black or white stone

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
  console.log("Stone?: ", stone);

  const handleClick = () => {
    if (status === BOX_STATUS.AVAILABLE && stone === null) {
      handleMove(id);
      setStatus(BOX_STATUS.OCCUPIED);
      setStone(currentPlayer === "Black" ? "Black" : "White");
    }
  };
  return (
    <div className={getClassNames()} onClick={handleClick}>
      {stone === "Black" && <div className={style.blackStone} />}
      {stone === "White" && <div className={style.whiteStone} />}
    </div>
  );
}
