import { useState } from "react";
import "/src/styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) { alert(data.message); return; }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("name", data.user.name);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-brand">          
          <span className="auth-brand-name">Hostel Booking</span>
        </div>

        <div className="auth-heading">
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn" type="submit">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <a href="/register">Create one</a>
        </div>

      </div>
    </div>
  );
}