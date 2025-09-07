import React, {useState} from 'react'
const NODE_IP = "<NODE_IP>"; // replace with your node IP, e.g., 184.72.213.3
const BACKEND_PORT = "30050";
const API_BASE = `http://${NODE_IP}:${BACKEND_PORT}`;

export default function App(){
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const signup = async () => {
    const res = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({username,password})
    });
    const data = await res.json();
    alert(data.message || res.statusText);
  };
  const signin = async () => {
    const res = await fetch(`${API_BASE}/signin`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({username,password})
    });
    const data = await res.json();
    alert(data.message || res.statusText);
  };
  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h1>Guestbook App (kubeadm demo)</h1>
      <div style={{marginBottom:8}}>
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
      </div>
      <div style={{marginBottom:8}}>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={signup} style={{marginRight:8}}>Signup</button>
        <button onClick={signin}>Signin</button>
      </div>
      <p style={{marginTop:12, color:'#666'}}>Note: Replace &lt;NODE_IP&gt; in <code>src/App.jsx</code> with your node IP before building.</p>
    </div>
  )
}
