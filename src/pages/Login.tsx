import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import users from "../data/users.json";
import "./Login.css";
import { log } from "console";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  console.log(username);

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      console.log("invalid username or password");
    } else {
      console.log("user logged in");
    }
  };
  return (
    <form
      className="container"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <Input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
