import { UserContext } from "../context";
import { useContext } from "react";
import "./Header.css";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(UserContext);
  const { sessionId } = useParams();
  console.log("sessionId: ", sessionId);
  const isBookingsPage = location.pathname === "/bookings";
  //const { state: { parsedGameDetails } = {} } = location;
  const { state } = location;
  const parsedGameDetails = state?.parsedGameDetails;
  const isGameLogPage = location.pathname.split("/")[1] === "game-log";
  console.log("parsedGameDetails from Header: ", parsedGameDetails);
  //console.log(`/game-log/${sessionId}`, `/game-log/${sessionId}`);
  //console.log("isGameLogPage: ", isGameLogPage);
  // const [bookings] = useLocalStorage<Record<string, number[]>>("bookings", {});
  const getActions = () => {
    if (user) {
      if (isGameLogPage) {
        return null; // Return null to hide buttons on GameLog page
      }
      return (
        <>
          {!isBookingsPage && (
            <button
              className="login-button"
              onClick={() => {
                navigate("bookings", {
                  state: { parsedGameDetails },
                });
              }}
            >
              Previous Games
            </button>
          )}
          {!isBookingsPage && (
            <button
              className="login-button"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          )}
        </>
      );
      //18 - Protect the session page
    } else {
      if (!isGameLogPage) {
        return location.pathname !== "/login" ? (
          <button className="login-button" onClick={() => navigate("login")}>
            Login
          </button>
        ) : (
          <button className="login-button" onClick={() => navigate("sign-up")}>
            Sign Up
          </button>
        );
      }
    }
  };

  return (
    <>
      <header className="header">
        <Link to="/">Gomoku</Link> {getActions()}
      </header>
    </>
  );
}
