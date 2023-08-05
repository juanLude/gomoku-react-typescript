import { UserContext } from "../context";
import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Box from "./Box";
import style from "./Game.module.css";

export default function Game() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  console.log("location: " + location);
  const searchParams = new URLSearchParams(location.search);
  const boardSize = searchParams.get("boardSize");
  // Check if the "boardSize" exists and has a valid value
  const size = boardSize ? parseInt(boardSize, 10) : 5;

  if (!user) return <Navigate to="/login" replace />;

  // use the square prop to set the number of squares
  return (
    <div className={style.container}>
      <p>Current player: Black</p>
      <div
        className={style.seats}
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {[...Array(size * size)].map((_, index) => (
          <Box key={`box-${index}`} id={index} />
        ))}
      </div>
      <div className={style.buttonContainer}>
        <button className={style.button}>Restart</button>
        <button className={style.button}>Leave</button>
      </div>
    </div>
  );
}
