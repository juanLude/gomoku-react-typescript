import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import useLocalStorage from "../hooks/useLocalStorage";
import style from "./Bookings.module.css";
import { useLocation } from "react-router-dom";

export default function Bookings() {
  const location = useLocation();
  const { state: { gameDetails } = {} } = location;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [bookings] = useLocalStorage<Record<string, number[]>>("bookings", {});

  useEffect(() => {
    // Retrieve the gameDetails from localStorage and update state
    const storedGameDetails = localStorage.getItem(
      `gameDetails-${gameDetails?.gameNumber}`
    );
    if (storedGameDetails) {
      const parsedGameDetails = JSON.parse(storedGameDetails);
      // Update the gameDetails in state if needed
      console.log("parsedGameDetails: ", parsedGameDetails);
    }
  }, [gameDetails]);
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className={style.container}>
      {/* <h1 className={style.header}>
        You have {Object.keys(bookings).length} bookings
      </h1> */}
      {Object.keys(bookings).map((key) => {
        const sessionId = key.split("-")[1];
        const storedGameDetails = localStorage.getItem(
          `gameDetails-${sessionId}`
        );
        const parsedGameDetails = storedGameDetails
          ? JSON.parse(storedGameDetails)
          : null;
        console.log(Object);

        return (
          <div className={style.list} key={key}>
            <p className="style.title">
              Game #{sessionId} &nbsp;&nbsp;@{parsedGameDetails?.date}
              &nbsp;&nbsp;&nbsp;
              {parsedGameDetails?.result === "Draw"
                ? "Game is a draw"
                : parsedGameDetails?.result}
            </p>
            <button
              className={style.button}
              // key={sessionId}
              onClick={() => {
                navigate(`/game-log/${sessionId}`, {
                  state: { bookings, parsedGameDetails },
                });
                console.log("Session id: ", sessionId);
              }}
            >
              View game log
            </button>
          </div>
        );
      })}
    </div>
  );
}
