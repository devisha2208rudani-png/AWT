import React, { useState } from "react";

const USERS = [
  {
    email: "student@test.com",
    password: "1234",
    name: "Rahul",
    role: "student",
    college: "PDPU",
  },
  {
    email: "faculty@test.com",
    password: "admin",
    name: "Dr Mehta",
    role: "faculty",
    college: "PDPU"
  },
];

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  setMsg("Checking credentials...");

  try {
    const response = await fetch(
      "http://localhost:5000/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setMsg("Login successful");

      setTimeout(() => {
        onLoginSuccess(data.user);
      }, 600);
    } else {
      setMsg("Invalid credentials");
    }
  } catch (err) {
    setMsg("Server error");
  }
};

  return (
    <div className="container">
      <h2>Portal Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}