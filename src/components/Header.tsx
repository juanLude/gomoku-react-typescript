import { UserContext } from "../context";
import { useContext } from "react";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(UserContext);

  const getActions = () => {
    if (user) {
      return (
        <>
          <button
            className="login-button"
            onClick={() => navigate("previous-games")}
          >
            Previous Games
          </button>
          <button
            className="login-button"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </>
      );
      //18 - Protect the session page
    } else {
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
  };
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };
  // const handlePreviousGames = () => {
  //   console.log("handle previous games");
  // };

  return (
    <>
      <header className="header">
        <Link to="/">Gomoku</Link> {getActions()}
        {/* {!isLoggedIn && (
          <button className="login-button" onClick={() => navigate("login")}>
            Login
          </button>
        )}{" "}
        {isLoggedIn && (
          <button
            className="previous-games-button"
            onClick={handlePreviousGames}
          >
            Previous Games
          </button>
        )} */}
      </header>
    </>
  );
}
