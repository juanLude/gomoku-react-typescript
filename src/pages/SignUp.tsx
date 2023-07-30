import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import users from "../data/users.json";
import Message from "../components/Message";
import "./Login.css";

import { error } from "console";
export default function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    if (users.find((u) => u.username === username)) {
      setErrorMessage(`Username ${username} has been taken`);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
  };
  return (
    <form
      className="container"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}
    >
      {errorMessage && <Message variant="error" message={errorMessage} />}
      <Input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setErrorMessage("");
          setUserName(e.target.value);
        }}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setErrorMessage("");
          setPassword(e.target.value);
        }}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => {
          setErrorMessage("");
          setConfirmPassword(e.target.value);
        }}
      />
      <Button
        type="submit"
        disabled={!username || !password || !confirmPassword}
      >
        Sign Up
      </Button>
    </form>
  );
}
