import "./App.css";
import Header from "./components/Header";
import { Home, Login } from "./pages";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <Login />
      </main>
    </>
  );
}

export default App;
