import { UserContext } from "../context";
import { useContext, useEffect, useState } from "react";
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

  const [board, setBoard] = useState<Array<string | null>>(
    Array(size * size).fill(null)
  );
  const [currentPlayer, setCurrentPlayer] = useState<string>("Black");
  const [winner, setWinner] = useState<string | null>(null);

  // Function to handle a player move
  const handleMove = (index: number) => {
    if (board[index] === null && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkForWinner(newBoard);
      togglePlayerTurn();
    }
  };

  // Function to check for a winner
  const checkForWinner = (board: Array<string | null>) => {
    const winningLines: number[][] = [];

    // Horizontal lines
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - 5; col++) {
        winningLines.push(
          Array.from({ length: 5 }, (_, i) => row * size + col + i)
        );
      }
    }

    // Vertical lines
    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - 5; row++) {
        winningLines.push(
          Array.from({ length: 5 }, (_, i) => (row + i) * size + col)
        );
      }
    }

    // Diagonal lines (top-left to bottom-right)
    for (let row = 0; row <= size - 5; row++) {
      for (let col = 0; col <= size - 5; col++) {
        winningLines.push(
          Array.from({ length: 5 }, (_, i) => (row + i) * size + col + i)
        );
      }
    }

    // Diagonal lines (top-right to bottom-left)
    for (let row = 0; row <= size - 5; row++) {
      for (let col = size - 1; col >= 4; col--) {
        winningLines.push(
          Array.from({ length: 5 }, (_, i) => (row + i) * size + col - i)
        );
      }
    }

    return winningLines;
  };
  // Function to toggle player turn
  const togglePlayerTurn = () => {
    setCurrentPlayer(currentPlayer === "Black" ? "White" : "Black");
  };

  // Function to restart the game
  const restartGame = () => {
    setBoard(Array(size * size).fill(null));
    setWinner(null);
    setCurrentPlayer("Black");
  };

  // Function to leave the game (handle redirecting to another page)
  const leaveGame = () => {
    // Implement functionality to leave the game and redirect to another page
  };

  useEffect(() => {
    // Check for a winner after each move
    if (board.includes(null)) {
      // If there are still empty squares, check for a winner
      checkForWinner(board);
    } else {
      // If the board is full and there's no winner, it's a draw
      setWinner("Draw");
    }
  }, [board]);

  if (!user) return <Navigate to="/login" replace />;
  // use the square prop to set the number of squares
  return (
    <div className={style.container}>
      <p>Current player: {currentPlayer}</p>
      <div
        className={style.seats}
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {[...Array(size * size)].map((_, index) => (
          <Box
            key={`box-${index}`}
            id={index}
            handleMove={handleMove}
            currentPlayer={currentPlayer}
          />
        ))}
      </div>
      <div className={style.buttonContainer}>
        <button className={style.button} onClick={restartGame}>
          Restart
        </button>
        <button className={style.button} onClick={leaveGame}>
          Leave
        </button>
      </div>
    </div>
  );
}
