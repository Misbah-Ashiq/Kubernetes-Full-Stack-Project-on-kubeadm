import React, { useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Guestbook App (kubeadm demo)</h1>
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setPage("signup")} style={{ marginRight: 10 }}>
          Signup
        </button>
        <button onClick={() => setPage("signin")}>Signin</button>
      </nav>

      {page === "signup" && <Signup />}
      {page === "signin" && <Signin />}
      {page === "home" && <p>Please select an option above.</p>}
    </div>
  );
}

