import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import useLocalStorage from "../hooks/useLocalStorage";
import style from "./Bookings.module.css";

export default function Bookings() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [bookings] = useLocalStorage<Record<string, number[]>>("bookings", {});

  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className={style.container}>
      {Object.keys(bookings).map((key) => {
        const sessionId = key.split("-")[1];
        const storedGameDetails = localStorage.getItem(
          `gameDetails-${sessionId}`
        );
        const parsedGameDetails = storedGameDetails
          ? JSON.parse(storedGameDetails)
          : null;

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
              onClick={() => {
                navigate(`/game-log/${sessionId}`, {
                  state: { bookings, parsedGameDetails },
                });
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
