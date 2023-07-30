import "./App.css";
import Header from "./components/Header";
import { Home, Login, SignUp } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
