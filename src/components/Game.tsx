import { UserContext } from "../context";
import { useContext, useEffect, useState, useRef, useReducer } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Box from "./Box";
import style from "./Game.module.css";
import { BookingActionType } from "../constants";
import useLocalStorage from "../hooks/useLocalStorage";
type BookingAction = {
  type: BookingActionType;
  payload: number;
};

function bookingReducer(state: number[], action: BookingAction) {
  const { type, payload } = action;
  switch (type) {
    case BookingActionType.SELECT:
      return [...state, payload];
    // case BookingActionType.WHITE:
    //   return [...state, payload];
    default:
      return state;
  }
}
export default function Game() {
  const { user } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const boardSize = searchParams.get("boardSize");
  // Check if the "boardSize" exists and has a valid value
  const size = boardSize ? parseInt(boardSize, 10) : 5;

  const [board, setBoard] = useState<Array<string | null>>(
    Array(size * size).fill(null)
  );
  const [currentPlayer, setCurrentPlayer] = useState<string>("Black");
  const [bookings, saveBookings] = useLocalStorage<Record<string, number[]>>(
    "bookings",
    {}
  );
  const selectedStones = bookings[`session-${sessionStorage}`] || [];
  const [state, dispatch] = useReducer(bookingReducer, selectedStones);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const [restart, setRestart] = useState<boolean>(false);

  // Function to handle a player move
  const handleMove = (index: number) => {
    if (!gameOver && board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkForWinner(newBoard);
      togglePlayerTurn();
    }
  };

  // Function to check for a winner
  const checkForWinner = (board: Array<string | null>) => {
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal (top-left to bottom-right)
      [-1, 1], // Diagonal (top-right to bottom-left)
    ];

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const currentStone = board[row * size + col];
        if (currentStone === null) continue;

        // Check for winning streak in each direction
        for (const [dx, dy] of directions) {
          let streak = 1;
          for (let i = 1; i < 5; i++) {
            const newRow = row + dx * i;
            const newCol = col + dy * i;
            if (
              newRow < 0 ||
              newRow >= size ||
              newCol < 0 ||
              newCol >= size ||
              board[newRow * size + newCol] !== currentStone
            ) {
              break;
            }
            streak++;
          }

          if (streak === 5) {
            setWinner(currentStone === "Black" ? "Black" : "White");
            setGameOver(true);
            return;
          }
        }
      }
    }

    if (!board.includes(null)) {
      // If the board is full and there's no winner, it's a draw
      setWinner("Draw");
      setGameOver(true);
    }
  };
  // Function to toggle player turn
  const togglePlayerTurn = () => {
    setCurrentPlayer(currentPlayer === "Black" ? "White" : "Black");
  };

  // Function to restart the game
  const restartGame = () => {
    console.log("Restarting the game");
    console.log("size:", size);
    console.log("new board:", Array(size * size).fill(null));
    setBoard(Array(size * size).fill(null));
    setWinner(null);
    setCurrentPlayer("Black");
    setGameOver(false); // Reset game over state
    setRestart(!restart);
    // setRestart((prevRestart) => !prevRestart);
  };

  // Function to leave the game (handle redirecting to another page)
  const leaveGame = () => {
    if (gameOver) {
      // Get the current game count from localStorage
      const gameCount = parseInt(localStorage.getItem("gameCount") || "0", 10);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      } as const;
      const formattedDate = new Date().toLocaleDateString(undefined, options);

      const gameDetails = {
        gameNumber: gameCount + 1,
        boardSize: size,
        date: formattedDate,
        result: winner === "Draw" ? "Draw" : `Winner: ${winner}`,
        moves: state,
      };
      console.log(gameDetails);
      //const gameKey = `gameDetails-${gameCount + 1}`;
      // Retrieve the existing selected stones or initialize an empty array
      //const existingSelectedStones = bookings[gameKey] || [];
      // Combine the existing and new selected stones arrays
      //const updatedSelectedStones = [...existingSelectedStones, state];
      // Convert the gameDetails object to a JSON string
      const gameDetailsString = JSON.stringify(gameDetails);
      // Store the JSON string in the localStorage
      localStorage.setItem(`gameDetails-${gameCount + 1}`, gameDetailsString);
      //localStorage.setItem(gameKey, gameDetailsString);
      localStorage.setItem("gameCount", (gameCount + 1).toString());
      //saveBookings({ ...bookings, [`session-${gameCount + 1}`]: state });
      saveBookings({ ...bookings, [`session-${gameCount + 1}`]: state });

      navigate("/bookings", { state: { ...gameDetails, gameDetails } });
      //navigate("/bookings");
    } else navigate("/");
    //console.log(state);
  };
  useEffect(() => {
    // Check for a winner after each move
    if (board.includes(null)) {
      // If there are still empty squares, check for a winner
      checkForWinner(board);
      //setGameOver(false); // Reset the gameOver state
    } else if (!board.includes(null)) {
      checkForWinner(board);
    } else {
      // If the board is full and there's no winner, it's a draw
      setWinner("Draw");
      setGameOver(true);

      if (boardRef.current) {
        boardRef.current.style.pointerEvents = "none"; // Disable user interaction
        //boardRef.current.classList.add("disable-hover"); // Add hover disable
      }
    }
  }, [board]);

  if (!user) return <Navigate to="/login" replace />;
  // use the square prop to set the number of squares
  return (
    <div className={style.container}>
      {winner === null ? (
        " "
      ) : winner === "Draw" ? (
        <p>It's a draw</p>
      ) : (
        <p>Winner is: {winner}</p>
      )}
      {!gameOver && <p>Current player: {currentPlayer}</p>}
      <div
        ref={boardRef}
        className={style.seats}
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {[...Array(size * size)].map((_, index) => (
          <Box
            key={`box-${index}-${restart}`}
            id={index}
            handleMove={handleMove}
            currentPlayer={currentPlayer}
            disabled={gameOver}
            restart={restart}
            onSelect={() =>
              dispatch({ type: BookingActionType.SELECT, payload: index })
            }
            //isSelected={selectedStones.includes(index)}
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
