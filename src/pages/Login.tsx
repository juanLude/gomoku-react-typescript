import { useState, useContext, useRef, useEffect } from "react";
import Input from "../components/Input";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import users from "../data/users.json";
import Message from "../components/Message";
import "./Login.css";

export default function Login() {
  const { login } = useContext(UserContext);
  const unsernameInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isCredentialInvalid, setIsCredentialInvalid] = useState(false);

  console.log(username);

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      setIsCredentialInvalid(true);
    } else {
      login(username);
      navigate("/");
      console.log("user logged in");
    }
  };
  useEffect(() => {
    if (unsernameInput.current) {
      unsernameInput.current.focus();
    }
  }, []);

  return (
    <form
      className="container"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      {isCredentialInvalid && (
        <Message variant="error" message="Invalid username or password" />
      )}
      <Input
        ref={unsernameInput}
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUserName(e.target.value);
          setIsCredentialInvalid(false);
        }}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setIsCredentialInvalid(false);
        }}
      />
      <Button type="submit" disabled={!username || !password}>
        Login
      </Button>
    </form>
  );
}
