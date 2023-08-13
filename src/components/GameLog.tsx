import style from "./GameLog.module.css";

import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import useLocalStorage from "../hooks/useLocalStorage";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function GameLog() {
  const location = useLocation();

  const { state: { parsedGameDetails, key } = {} } = location;
  console.log("key: ", key);

  const { sessionId } = useParams();
  const navigate = useNavigate();
  // Retrieve the bookings data from route state
  const { state: { bookings } = {} } = useLocation();
  console.log(bookings);
  console.log("Game details from GameLog: ", parsedGameDetails);

  // Define the size of the board
  const boardSize = parsedGameDetails.boardSize;

  // Create an empty board with null values
  const emptyBoard = Array(boardSize * boardSize).fill(null);

  // Create a function to calculate the index based on row and column
  const calculateIndex = (row: number, col: number) => row * boardSize + col;

  // Initialize the board with stones from the moves array
  const boardWithMoves = emptyBoard.map((_, index) => {
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;
    const moveIndex = parsedGameDetails.moves.indexOf(calculateIndex(row, col));
    // Check if the current index is in the moves array
    if (parsedGameDetails.moves.includes(calculateIndex(row, col))) {
      return {
        stone:
          parsedGameDetails.moves.indexOf(calculateIndex(row, col)) % 2 === 0
            ? "Black"
            : "White",
        moveNumber: moveIndex + 1,
      };
    } else {
      return null;
    }
  });

  return (
    <div>
      <h1>Game Log for Session #{sessionId}</h1>
      <p>{parsedGameDetails.result}</p>
      <div className={style.container}>
        <div
          className={style.seats}
          style={{
            gridTemplateColumns: `repeat(${parsedGameDetails.boardSize}, 1fr)`,
          }}
        >
          {boardWithMoves.map((cell, index) => (
            <div key={index} className={style.cell}>
              {cell && (
                <div
                  className={
                    cell.stone === "Black" ? style.blackStone : style.whiteStone
                  }
                >
                  {cell.moveNumber}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={style.buttonContainer}>
        <button
          className={style.button}
          onClick={() =>
            navigate("/bookings", { state: { parsedGameDetails } })
          }
        >
          Back
        </button>
      </div>
    </div>
  );
}
