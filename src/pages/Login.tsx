import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  console.log(username);
  return (
    <form>
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
