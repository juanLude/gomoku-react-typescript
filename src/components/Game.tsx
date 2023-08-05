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
    <div
      className={style.seats}
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {/* {squareNumber} */}
      {[...Array(size * size)].map((_, index) => (
        <Box key={`box-${index}`} id={index} />
      ))}
    </div>
  );
}
// (
//   <div>
//     <h1>Gomoku Game</h1>

//     <div>
//       {/* Display the Gomoku board with the chosen size */}
//       {/* Implement your Gomoku board rendering logic here */}
//       {/* For simplicity, you can use a simple grid representation */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: `repeat(${5}, 30px)`,
//           gap: "2px",
//           // Add other necessary styling for board cells
//         }}
//       >
//         {/* Render the cells of the board */}
//         {Array.from({ length: 5 * 5 }, (_, index) => (
//           <div
//             key={index}
//             style={{
//               width: "30px",
//               height: "30px",
//               border: "2px solid #333",
//               // Add other necessary styling for individual cells
//             }}
//           >
//             {/* Add your game logic and interactions here */}
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );
