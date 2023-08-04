import "./App.css";
import Header from "./components/Header";
import { Home, Login, SignUp, PreviousGames, Game } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import UserProvider from "./components/UserProvider";

function App() {
  return (
    <UserProvider>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="previous-games" element={<PreviousGames />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="game" element={<Game />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </UserProvider>
  );
}

export default App;
