import { UserContext } from "../context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Game() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <div>Game</div>;
}
