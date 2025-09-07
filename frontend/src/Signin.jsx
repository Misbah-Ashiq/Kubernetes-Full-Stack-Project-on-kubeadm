import React, { useState } from "react";

const API_BASE = "/api";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignin = async () => {
    try {
      const res = await fetch(`${API_BASE}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setMessage(data.message || "Signin failed");
    } catch (err) {
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignin}>Signin</button>
      {message && <p>{message}</p>}
    </div>
  );
}

